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

export async function verifyPayment(provider: 'paystack' | 'paypal', reference: string) {
  if (provider === 'paystack') {
    const res = await axios.post(`${API_URL}/payments/paystack/verify`, { reference });
    return res.data;
  }
  const res = await axios.post(`${API_URL}/payments/paypal/verify`, { reference });
  return res.data;
}
