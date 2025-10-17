const path = require('path');
const fs = require('fs');
const Database = require('better-sqlite3');

const DB_FILE = path.join(__dirname, 'data', 'app.db');
const DIR = path.dirname(DB_FILE);
if (!fs.existsSync(DIR)) fs.mkdirSync(DIR, { recursive: true });

const db = new Database(DB_FILE);

function migrate() {
  // wallets table: userId primary key, balanceNGN, balanceUSD
  db.prepare(`CREATE TABLE IF NOT EXISTS wallets (userId TEXT PRIMARY KEY, balanceNGN INTEGER DEFAULT 0, balanceUSD REAL DEFAULT 0)`).run();
  // transactions table
  db.prepare(`CREATE TABLE IF NOT EXISTS transactions (id TEXT PRIMARY KEY, userId TEXT, provider TEXT, reference TEXT, status TEXT, amountNGN INTEGER, amountUSD REAL, meta TEXT, createdAt INTEGER)`).run();
  // recipients table
  db.prepare(`CREATE TABLE IF NOT EXISTS recipients (recipientCode TEXT PRIMARY KEY, userId TEXT, name TEXT, account_number TEXT, bank_code TEXT, currency TEXT, meta TEXT, createdAt INTEGER)`).run();
}

migrate();

module.exports = {
  db,
  getWallet: (userId) => {
    const r = db.prepare('SELECT * FROM wallets WHERE userId = ?').get(userId);
    if (!r) return { balanceNGN: 0, balanceUSD: 0 };
    return { balanceNGN: r.balanceNGN, balanceUSD: r.balanceUSD };
  },
  upsertWallet: (userId, { balanceNGN, balanceUSD }) => {
    const exists = db.prepare('SELECT 1 FROM wallets WHERE userId = ?').get(userId);
    if (exists) {
      db.prepare('UPDATE wallets SET balanceNGN = ?, balanceUSD = ? WHERE userId = ?').run(balanceNGN, balanceUSD, userId);
    } else {
      db.prepare('INSERT INTO wallets (userId, balanceNGN, balanceUSD) VALUES (?, ?, ?)').run(userId, balanceNGN || 0, balanceUSD || 0, userId);
    }
    return module.exports.getWallet(userId);
  },
  addTransaction: (tx) => {
    const stmt = db.prepare('INSERT OR REPLACE INTO transactions (id, userId, provider, reference, status, amountNGN, amountUSD, meta, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
    stmt.run(tx.id || tx.reference || `${Date.now()}`, tx.userId || tx.meta?.userId || null, tx.provider || null, tx.reference || null, tx.status || null, tx.amountNGN || null, tx.amountUSD || null, JSON.stringify(tx.meta || {}), tx.createdAt || Date.now());
    return tx;
  },
  getTransactionsForUser: (userId) => {
    const rows = db.prepare('SELECT * FROM transactions WHERE userId = ? ORDER BY createdAt DESC').all(userId);
    return rows.map(r => ({ ...r, meta: JSON.parse(r.meta || '{}') }));
  },
  saveRecipient: (rec) => {
    const stmt = db.prepare('INSERT OR REPLACE INTO recipients (recipientCode, userId, name, account_number, bank_code, currency, meta, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
    stmt.run(rec.recipientCode, rec.userId || null, rec.name || null, rec.account_number || null, rec.bank_code || null, rec.currency || null, JSON.stringify(rec.meta || {}), Date.now());
    return rec;
  },
  getRecipient: (code) => {
    const r = db.prepare('SELECT * FROM recipients WHERE recipientCode = ?').get(code);
    if (!r) return null;
    return { ...r, meta: JSON.parse(r.meta || '{}') };
  }
};
