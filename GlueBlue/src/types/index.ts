export interface User {
    id: string;
    name: string;
    email: string;
    profilePicture?: string;
}

export interface Message {
    id: string;
    senderId: string;
    receiverId: string;
    content: string;
    timestamp: Date;
}

export interface Notification {
    id: string;
    userId: string;
    message: string;
    type: 'info' | 'warning' | 'error';
    timestamp: Date;
}

export interface Transaction {
    id: string;
    userId: string;
    amount: number;
    currency: 'USD' | 'NGN';
    type: 'credit' | 'debit';
    timestamp: Date;
}

export interface Wallet {
    userId: string;
    balance: number;
    currency: 'USD' | 'NGN';
}

export interface AnalyticsData {
    totalUsers: number;
    totalMessages: number;
    totalTransactions: number;
    revenue: number;
}