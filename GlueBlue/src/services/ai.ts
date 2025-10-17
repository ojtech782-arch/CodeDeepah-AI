import axios from 'axios';
import { API_URL } from '../config/env';

export async function fetchSmartReplies(context: { role: string; content: string }[]) {
  // Proxy to backend to avoid exposing keys in client
  const res = await axios.post(`${API_URL}/openai/smart-replies`, { context });
  return res.data?.replies || [];
}
