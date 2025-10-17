require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const multer = require('multer');
const { Server } = require('socket.io');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const crypto = require('crypto');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

// Simple persistent file-based storage (dev only)
const storage = require('./storage');
const users = new Map(Object.entries(storage.getUsers()));
const transactions = new Map(Object.entries(storage.getTransactions()));
const recipients = new Map(Object.entries(storage.getRecipients()));
const wallets = new Map(Object.entries(storage.getWallets()));

// Try to use SQLite DB for wallets/transactions/recipients for more robust dev persistence
let db = null;
try {
  db = require('./db');
  console.log('SQLite DB loaded');
} catch (e) {
  console.warn('SQLite DB not available, using file-based storage', e.message);
}

io.on('connection', (socket) => {
  console.log('client connected', socket.id);

  socket.on('send_message', (msg) => {
    // Broadcast for demo; in prod route to recipients and handle encryption per recipient
    io.emit('receive_message', msg);
  });

  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', data);
  });

  socket.on('analytics:subscribe', () => {
    // send periodic demo analytics
    const iv = setInterval(() => {
      socket.emit('analytics:update', { activeUsers: Math.floor(Math.random()*1000), messagesSent: Math.floor(Math.random()*500), transactionsCompleted: Math.floor(Math.random()*50), userEngagement: Math.random()*100 });
    }, 5000);
    socket.on('disconnect', () => clearInterval(iv));
  });
});

// Upload endpoint (stores files to /uploads)
const upload = multer({ dest: path.join(__dirname, 'uploads/') });
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).send({ error: 'no file' });
  res.send({ url: `/uploads/${req.file.filename}`, name: req.file.originalname, size: req.file.size });
});

// Proxy OpenAI completions for smart replies (dev)
// AI proxy — use Gemini/Vertex when configured, otherwise fallback mock
app.post('/openai/smart-replies', async (req, res) => {
  const messages = req.body.context || [];
  // If GEMINI_API_KEY provided, call real API (placeholder)
  const GEMINI_KEY = process.env.GEMINI_API_KEY;
  if (GEMINI_KEY) {
    // Implement real Gemini call here — placeholder returns mock until configured
    // TODO: call official Gemini REST API with appropriate model and return replies
  }
  const last = messages.slice(-3).map(m=>m.content).join('\n');
  return res.send({ replies: [`Reply to: ${last}`, 'Sure, I can help with that.', 'Can you clarify?'] });
});

// Translate endpoint (dev) - pass-through using libretranslate public instance
app.post('/translate', async (req, res) => {
  try {
    const { q, target } = req.body;
    const r = await axios.post('https://libretranslate.de/translate', { q, source: 'auto', target, format: 'text' });
    res.send({ translated: r.data.translatedText });
  } catch (e) { res.status(500).send({ error: 'translate error' }); }
});

// Paystack production endpoints
const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY || '';
const NGN_RATE = parseFloat(process.env.NGN_RATE || '410');

app.post('/payments/paystack/create', async (req, res) => {
  try {
    const idem = req.headers['idempotency-key'] || req.body.idempotencyKey;
    if (idem) {
      // check existing mapping
      const txs = storage.getTransactions();
      for (const k of Object.keys(txs || {})) {
        const t = txs[k];
        if (t.idempotencyKey === idem) return res.send({ authorization_url: t.authorization_url, reference: t.reference });
      }
    }
    const { userId, email, amountUSD, callback_url } = req.body;
    if (!email || !amountUSD) return res.status(400).send({ error: 'email_and_amount_required' });

    const amountNGN = Math.round((amountUSD || 0) * NGN_RATE);
    const amountKobo = amountNGN * 100; // Paystack expects kobo

    const payload = { email, amount: amountKobo, metadata: { userId }, callback_url: callback_url || '' };

    const r = await axios.post('https://api.paystack.co/transaction/initialize', payload, { headers: { Authorization: `Bearer ${PAYSTACK_SECRET}` } });
    const data = r.data;
    const reference = data.data.reference;
    const tx = { provider: 'paystack', reference, status: 'pending', amountUSD, amountNGN, userId, idempotencyKey: idem, authorization_url: data.data.authorization_url };
    transactions.set(reference, tx);
    storage.saveTransactions(Object.fromEntries(transactions));
    res.send({ authorization_url: data.data.authorization_url, reference });
  } catch (e) {
    console.error('paystack init error', e?.response?.data || e.message);
    res.status(500).send({ error: 'paystack_init_failed', details: e?.response?.data || e.message });
  }
});

app.post('/payments/paystack/verify', async (req, res) => {
  try {
    const { reference } = req.body;
    if (!reference) return res.status(400).send({ error: 'reference_required' });
    const r = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, { headers: { Authorization: `Bearer ${PAYSTACK_SECRET}` } });
    const data = r.data;
    const status = data.data.status;
    const tx = transactions.get(reference) || { reference };
    tx.status = status;
    tx.paystack = data.data;
    // amount that was initialized may be in tx.amountNGN or in paystack data
    const amountNGN = tx.amountNGN || Math.round((data.data.amount || 0) / 100);
    transactions.set(reference, tx);
    storage.saveTransactions(Object.fromEntries(transactions));

    // if successful, credit user's wallet
    if (status === 'success') {
      const userId = tx.userId || data.data.metadata?.userId;
      if (userId) {
        if (db) {
          const w = db.getWallet(userId);
          const newBal = (w.balanceNGN || 0) + (amountNGN || 0);
          db.upsertWallet(userId, { balanceNGN: newBal, balanceUSD: (newBal/NGN_RATE).toFixed(2) });
        } else {
          const walletsData = storage.getWallets();
          const w = walletsData[userId] || { balanceNGN: 0, balanceUSD: 0 };
          w.balanceNGN = (w.balanceNGN || 0) + (amountNGN || 0);
          walletsData[userId] = w;
          storage.saveWallets(walletsData);
        }
      }
    }

    res.send({ ok: true, transaction: tx });
  } catch (e) {
    console.error('paystack verify error', e?.response?.data || e.message);
    res.status(500).send({ error: 'paystack_verify_failed', details: e?.response?.data || e.message });
  }
});

// Paystack transfer recipient creation
app.post('/payments/paystack/recipient', async (req, res) => {
  try {
    const { type = 'nuban', name, account_number, bank_code, currency = 'NGN' } = req.body;
    const payload = { type, name, account_number, bank_code, currency };
    const r = await axios.post('https://api.paystack.co/transferrecipient', payload, { headers: { Authorization: `Bearer ${PAYSTACK_SECRET}` } });
    const data = r.data;
    const code = data.data.recipient_code;
    const rec = { recipientCode: code, details: data.data, name, account_number, bank_code, currency };
    recipients.set(code, rec);
    storage.saveRecipients(Object.fromEntries(recipients));
    // persist to DB if available
    if (db) db.saveRecipient({ recipientCode: code, userId: req.body.userId || null, name, account_number, bank_code, currency, meta: data.data });
    res.send(data);
  } catch (e) {
    console.error('paystack recipient error', e?.response?.data || e.message);
    res.status(500).send({ error: 'recipient_failed', details: e?.response?.data || e.message });
  }
});

// Initiate transfer
app.post('/payments/paystack/transfer', async (req, res) => {
  try {
    const { source = 'balance', reason = 'transfer', amountNGN, recipient, userId, idempotencyKey } = req.body;
    if (!recipient || !amountNGN || !userId) return res.status(400).send({ error: 'recipient_userid_and_amount_required' });
    // idempotency: check existing
    if (idempotencyKey) {
      const txs = db ? db.getTransactionsForUser(userId) : Object.values(storage.getTransactions());
      for (const t of txs) {
        const meta = t.meta || {};
        if (meta.idempotencyKey === idempotencyKey) return res.send({ ok: true, existing: t });
      }
    }
    const amountKobo = Math.round(amountNGN) * 100;
    const payload = { source, amount: amountKobo, recipient, reason };
    const r = await axios.post('https://api.paystack.co/transfer', payload, { headers: { Authorization: `Bearer ${PAYSTACK_SECRET}` } });
    const data = r.data;
    // store transaction record
    const record = { id: data.data.id, provider: 'paystack', reference: data.data.reference, status: data.data.status, meta: data.data, amountNGN, userId };
    // persist
    transactions.set(data.data.reference || data.data.id, record);
    storage.saveTransactions(Object.fromEntries(transactions));
    if (db) db.addTransaction({ id: data.data.id, userId, provider: 'paystack', reference: data.data.reference, status: data.data.status, amountNGN, amountUSD: (amountNGN/NGN_RATE).toFixed(2), meta: data.data, createdAt: Date.now() });
    // deduct from user's wallet if using balance
    if (db) {
      const w = db.getWallet(userId);
      const newBal = Math.max(0, (w.balanceNGN || 0) - amountNGN);
      db.upsertWallet(userId, { balanceNGN: newBal, balanceUSD: (newBal/NGN_RATE).toFixed(2) });
    } else {
      // file-based wallets
      const walletsData = storage.getWallets();
      const w = walletsData[userId] || { balanceNGN: 0, balanceUSD: 0 };
      w.balanceNGN = Math.max(0, (w.balanceNGN || 0) - amountNGN);
      walletsData[userId] = w;
      storage.saveWallets(walletsData);
    }
    res.send(data);
  } catch (e) {
    console.error('paystack transfer error', e?.response?.data || e.message);
    res.status(500).send({ error: 'transfer_failed', details: e?.response?.data || e.message });
  }
});

// Create virtual account (dedicated account)
app.post('/payments/paystack/virtual_account', async (req, res) => {
  try {
    const { customer, preferred_bank, first_name, last_name, email } = req.body;
    const payload = { customer, preferred_bank, first_name, last_name, email };
    const r = await axios.post('https://api.paystack.co/dedicated_account', payload, { headers: { Authorization: `Bearer ${PAYSTACK_SECRET}` } });
    const data = r.data;
    storage.saveRecipients(Object.fromEntries(recipients));
    res.send(data);
  } catch (e) {
    console.error('paystack virtual account error', e?.response?.data || e.message);
    res.status(500).send({ error: 'virtual_account_failed', details: e?.response?.data || e.message });
  }
});

// Paystack webhook (validate signature)
app.post('/payments/paystack/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  try {
    const signature = req.headers['x-paystack-signature'];
    const payload = req.body; // raw buffer
    const expected = crypto.createHmac('sha512', PAYSTACK_SECRET).update(payload).digest('hex');
    if (signature !== expected) return res.status(400).send('invalid signature');
    const event = JSON.parse(payload.toString());
    // handle event (e.g., transaction succeeded)
    const reference = event?.data?.reference;
    if (reference && transactions.has(reference)) {
      const tx = transactions.get(reference);
      tx.status = event?.data?.status || tx.status;
      tx.paystack = event.data;
      transactions.set(reference, tx);
      storage.saveTransactions(Object.fromEntries(transactions));
    }
    // log webhook
    const logs = storage.getWebhookLogs();
    logs[Date.now()] = { provider: 'paystack', event: event?.event, payload: event };
    storage.saveWebhookLogs(logs);
    res.send('ok');
  } catch (e) {
    console.error('webhook error', e);
    res.status(500).send('error');
  }
});

// Key registry for demo E2EE (dev only) - store public keys by user id
app.post('/keys/register', (req, res) => {
  const { userId, publicKey } = req.body;
  if (!userId || !publicKey) return res.status(400).send({ error: 'missing' });
  users.set(userId, { publicKey });
  storage.saveUsers(Object.fromEntries(users));
  res.send({ ok: true });
});

app.get('/keys/:userId', (req, res) => {
  const user = users.get(req.params.userId);
  if (!user) return res.status(404).send({ error: 'not_found' });
  res.send({ userId: req.params.userId, publicKey: user.publicKey });
});

// Get wallet for user
app.get('/wallet/:userId', (req, res) => {
  if (db) {
    const wallet = db.getWallet(req.params.userId || req.query.userId);
    return res.send({ userId: req.params.userId, wallet });
  }
  const walletsData = storage.getWallets();
  const wallet = walletsData[req.params.userId] || { balanceNGN: 0, balanceUSD: 0 };
  res.send({ userId: req.params.userId, wallet });
});

app.get('/transactions/:userId', (req, res) => {
  if (db) {
    const list = db.getTransactionsForUser(req.params.userId);
    return res.send({ transactions: list });
  }
  const txs = storage.getTransactions() || {};
  const list = Object.values(txs).filter(t => t.userId === req.params.userId || (t.meta && t.meta.userId === req.params.userId));
  res.send({ transactions: list });
});

// list recipients for a user
app.get('/recipients', (req, res) => {
  const userId = req.query.userId;
  if (db) {
    const stmt = db.db.prepare('SELECT * FROM recipients WHERE userId = ? ORDER BY createdAt DESC');
    const rows = stmt.all(userId || null || '');
    const list = rows.map(r => ({ recipientCode: r.recipientCode, name: r.name, account_number: r.account_number, bank_code: r.bank_code, currency: r.currency, meta: JSON.parse(r.meta || '{}') }));
    return res.send({ recipients: list });
  }
  const all = storage.getRecipients() || {};
  const list = Object.values(all).filter((r) => !userId || r.userId === userId);
  res.send({ recipients: list });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log('Server running on', PORT));
