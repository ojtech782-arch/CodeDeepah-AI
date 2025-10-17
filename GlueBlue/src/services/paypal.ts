import axios from 'axios';

const PAYPAL_API_URL = 'https://api.paypal.com'; // Use sandbox URL for testing: https://api.sandbox.paypal.com

export const createPayment = async (amount: number, currency: string) => {
    try {
        const response = await axios.post(`${PAYPAL_API_URL}/v1/payments/payment`, {
            intent: 'sale',
            payer: {
                payment_method: 'paypal',
            },
            transactions: [{
                amount: {
                    total: amount.toString(),
                    currency: currency,
                },
                description: 'Payment for services',
            }],
            redirect_urls: {
                return_url: 'https://yourapp.com/success',
                cancel_url: 'https://yourapp.com/cancel',
            },
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await getAccessToken()}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating payment:', error);
        throw error;
    }
};

export const executePayment = async (paymentId: string, payerId: string) => {
    try {
        const response = await axios.post(`${PAYPAL_API_URL}/v1/payments/payment/${paymentId}/execute`, {
            payer_id: payerId,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await getAccessToken()}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error executing payment:', error);
        throw error;
    }
};

const getAccessToken = async () => {
    const clientId = 'YOUR_CLIENT_ID';
    const clientSecret = 'YOUR_CLIENT_SECRET';
    const response = await axios.post(`${PAYPAL_API_URL}/v1/oauth2/token`, null, {
        auth: {
            username: clientId,
            password: clientSecret,
        },
        params: {
            grant_type: 'client_credentials',
        },
    });
    return response.data.access_token;
};