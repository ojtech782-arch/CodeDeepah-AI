import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
        setBalance(state, action: PayloadAction<number>) {
            state.balance = action.payload;
        },
        addTransaction(state, action: PayloadAction<{ id: string; amount: number; currency: string; date: string }>) {
            state.transactions.push(action.payload);
        },
        clearTransactions(state) {
            state.transactions = [];
        },
        convertCurrency(state, action: PayloadAction<{ amount: number; fromCurrency: string; toCurrency: string }>) {
            // Logic for currency conversion can be implemented here
        },
    },
});

export const { setBalance, addTransaction, clearTransactions, convertCurrency } = walletSlice.actions;

export default walletSlice.reducer;