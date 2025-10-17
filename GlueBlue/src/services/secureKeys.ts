import * as SecureStore from 'expo-secure-store';
import { generateKeyPair } from './crypto';
import { API_URL } from '../config/env';

const SECRET_KEY = 'glueblue_secret_key_v1';

export async function ensureKeyPair(userId: string) {
  const existing = await SecureStore.getItemAsync(SECRET_KEY + '_' + userId);
  if (existing) return JSON.parse(existing);
  const kp = generateKeyPair();
  await SecureStore.setItemAsync(SECRET_KEY + '_' + userId, JSON.stringify(kp));
  // register public key with server
  try {
    await fetch(`${API_URL}/keys/register`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId, publicKey: kp.publicKey }) });
  } catch (e) { console.warn('key register failed', e); }
  return kp;
}

export async function getLocalKeyPair(userId: string) {
  const v = await SecureStore.getItemAsync(SECRET_KEY + '_' + userId);
  return v ? JSON.parse(v) : null;
}
