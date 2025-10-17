const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

function filePath(name) {
  return path.join(DATA_DIR, `${name}.json`);
}

function read(name) {
  const p = filePath(name);
  try {
    if (!fs.existsSync(p)) return {};
    const raw = fs.readFileSync(p, 'utf8');
    return JSON.parse(raw || '{}');
  } catch (e) {
    console.warn('storage read error', name, e.message);
    return {};
  }
}

function write(name, data) {
  const p = filePath(name);
  fs.writeFileSync(p, JSON.stringify(data, null, 2), 'utf8');
}

module.exports = {
  getUsers: () => read('users'),
  saveUsers: (d) => write('users', d),
  getTransactions: () => read('transactions'),
  saveTransactions: (d) => write('transactions', d),
  getRecipients: () => read('recipients'),
  saveRecipients: (d) => write('recipients', d),
  getWallets: () => read('wallets'),
  saveWallets: (d) => write('wallets', d),
  getWebhookLogs: () => read('webhookLogs'),
  saveWebhookLogs: (d) => write('webhookLogs', d),
};
