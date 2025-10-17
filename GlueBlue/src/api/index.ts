import axios from 'axios';

const API_BASE_URL = 'https://your-api-url.com'; // Replace with your actual API base URL

// Function to handle API requests
const apiRequest = async (endpoint, method = 'GET', data = null) => {
    try {
        const response = await axios({
            url: `${API_BASE_URL}${endpoint}`,
            method,
            data,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('API Request Error:', error);
        throw error;
    }
};

// Example API calls
export const fetchMessages = async () => {
    return await apiRequest('/messages');
};

export const sendMessage = async (messageData) => {
    return await apiRequest('/messages/send', 'POST', messageData);
};

export const fetchNotifications = async () => {
    return await apiRequest('/notifications');
};

export const fetchUserProfile = async (userId) => {
    return await apiRequest(`/users/${userId}`);
};

// Add more API functions as needed
