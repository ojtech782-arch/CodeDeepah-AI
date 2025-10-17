import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AnalyticsState {
    userEngagement: number;
    activeUsers: number;
    messagesSent: number;
    transactionsCompleted: number;
}

const initialState: AnalyticsState = {
    userEngagement: 0,
    activeUsers: 0,
    messagesSent: 0,
    transactionsCompleted: 0,
};

const analyticsSlice = createSlice({
    name: 'analytics',
    initialState,
    reducers: {
        setUserEngagement(state, action: PayloadAction<number>) {
            state.userEngagement = action.payload;
        },
        setActiveUsers(state, action: PayloadAction<number>) {
            state.activeUsers = action.payload;
        },
        setMessagesSent(state, action: PayloadAction<number>) {
            state.messagesSent = action.payload;
        },
        setTransactionsCompleted(state, action: PayloadAction<number>) {
            state.transactionsCompleted = action.payload;
        },
        resetAnalytics(state) {
            state.userEngagement = 0;
            state.activeUsers = 0;
            state.messagesSent = 0;
            state.transactionsCompleted = 0;
        },
    },
});

export const {
    setUserEngagement,
    setActiveUsers,
    setMessagesSent,
    setTransactionsCompleted,
    resetAnalytics,
} = analyticsSlice.actions;

export default analyticsSlice.reducer;