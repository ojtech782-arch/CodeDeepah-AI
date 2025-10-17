import axios from 'axios';
import { API_URL } from '../config/env';

export async function translateText(text: string, target = 'en') {
  try {
    const res = await axios.post(`${API_URL}/translate`, { q: text, target });
    return res.data?.translated || text;
  } catch (e) {
    console.warn('translate error', e);
    return text;
  }
}
