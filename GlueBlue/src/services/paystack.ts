import axios from 'axios';
import { PaystackOptions, PaystackResponse } from '../types/index';

const PAYSTACK_BASE_URL = 'https://api.paystack.co';
const PAYSTACK_SECRET_KEY = 'YOUR_PAYSTACK_SECRET_KEY'; // Replace with your actual Paystack secret key

// Function to initialize a payment
export const initializePayment = async (options: PaystackOptions): Promise<PaystackResponse> => {
    try {
        const response = await axios.post(`${PAYSTACK_BASE_URL}/transaction/initialize`, options, {
            headers: {
                Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(`Payment initialization failed: ${error.response?.data?.message || error.message}`);
    }
};

// Function to verify a payment
export const verifyPayment = async (reference: string): Promise<PaystackResponse> => {
    try {
        const response = await axios.get(`${PAYSTACK_BASE_URL}/transaction/verify/${reference}`, {
            headers: {
                Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(`Payment verification failed: ${error.response?.data?.message || error.message}`);
    }
};

// Function to fund wallet
export const fundWallet = async (amount: number, userId: string): Promise<PaystackResponse> => {
    const options = {
        amount: amount * 100, // Convert to kobo
        email: userId, // Assuming userId is the user's email
        currency: 'NGN',
    };
    return initializePayment(options);
};