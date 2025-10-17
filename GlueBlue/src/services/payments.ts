import axios from 'axios';
import { API_URL, PAYSTACK_PUBLIC_KEY, PAYPAL_CLIENT_ID } from '../config/env';

export async function createPaystackTransaction(userId: string, amountUSD: number, email: string, callback_url?: string) {
  // The backend will convert USD->NGN, initialize Paystack transaction and return authorization URL
  const res = await axios.post(`${API_URL}/payments/paystack/create`, { userId, amountUSD, email, callback_url });
  return res.data; // { authorization_url, reference }
}

export async function createPaypalOrder(userId: string, amountUSD: number) {
  const res = await axios.post(`${API_URL}/payments/paypal/create`, { userId, amountUSD });
  return res.data;
}

export async function createRecipient({ userId, name, account_number, bank_code, currency = 'NGN' }: any) {
  const res = await axios.post(`${API_URL}/payments/paystack/recipient`, { userId, name, account_number, bank_code, currency });
  return res.data;
}

export async function fetchRecipients(userId: string) {
  const res = await axios.get(`${API_URL}/recipients?userId=${userId}`);
  try { return (res.data.recipients || []); } catch (e) { return []; }
}

export async function initiateTransfer({ userId, recipient, amountNGN, idempotencyKey }: any) {
  const res = await axios.post(`${API_URL}/payments/paystack/transfer`, { userId, recipient, amountNGN, idempotencyKey });
  return res.data;
}

export async function verifyPayment(provider: 'paystack' | 'paypal', reference: string) {
  if (provider === 'paystack') {
    const res = await axios.post(`${API_URL}/payments/paystack/verify`, { reference });
    return res.data;
  }
  const res = await axios.post(`${API_URL}/payments/paypal/verify`, { reference });
  return res.data;
}
