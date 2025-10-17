import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL } from '../../../src/config/env';

export const fetchWalletData = createAsyncThunk('wallet/fetchWallet', async (userId:string|undefined) => {
    const id = userId || 'devuser';
    const res = await fetch(`${API_URL}/wallet/${id}`);
    const data = await res.json();
    return data.wallet;
});

export const fetchTransactions = createAsyncThunk('wallet/fetchTransactions', async (userId:string|undefined) => {
    const id = userId || 'devuser';
    const res = await fetch(`${API_URL}/transactions/${id}`);
    const data = await res.json();
    return data.transactions || [];
});

interface WalletState {
    balance: number;
    transactions: Array<{ id: string; amount: number; currency: string; date: string }>;
}

const initialState: WalletState = {
    balance: 0,
    transactions: [],
};

const walletSlice = createSlice({
    name: 'wallet',
    initialState,
    reducers: {
        setBalance(state: WalletState, action: PayloadAction<number>) {
            state.balance = action.payload;
        },
        addTransaction(state: WalletState, action: PayloadAction<{ id: string; amount: number; currency: string; date: string }>) {
            state.transactions.push(action.payload);
        },
        clearTransactions(state: WalletState) {
            state.transactions = [];
        },
        convertCurrency(state: WalletState, action: PayloadAction<{ amount: number; fromCurrency: string; toCurrency: string }>) {
            // Logic for currency conversion can be implemented here
        },
    },
});

export const { setBalance, addTransaction, clearTransactions, convertCurrency } = walletSlice.actions;

export default walletSlice.reducer;

export const selectWallet = (state:any) => ({ balance: state.wallet.balance, transactions: state.wallet.transactions });