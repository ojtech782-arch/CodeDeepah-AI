import { getSocket } from './socket';
import store from '../store';
import { setActiveUsers, setMessagesSent, setTransactionsCompleted, setUserEngagement } from '../store/slices/analyticsSlice';

export function subscribeAnalytics() {
  try {
    const s = getSocket();
    s.on('analytics:update', (data: any) => {
      if (typeof data.activeUsers === 'number') store.dispatch(setActiveUsers(data.activeUsers));
      if (typeof data.messagesSent === 'number') store.dispatch(setMessagesSent(data.messagesSent));
      if (typeof data.transactionsCompleted === 'number') store.dispatch(setTransactionsCompleted(data.transactionsCompleted));
      if (typeof data.userEngagement === 'number') store.dispatch(setUserEngagement(data.userEngagement));
    });
    s.emit('analytics:subscribe');
  } catch (e) {
    console.warn('analytics subscribe error', e);
  }
}

export function unsubscribeAnalytics() {
  try {
    const s = getSocket();
    s.off('analytics:update');
    s.emit('analytics:unsubscribe');
  } catch (e) {}
}
import { Analytics, PageHit } from 'expo-firebase-analytics';

const analytics = {
  logScreenView: async (screenName: string) => {
    await Analytics.logEvent('screen_view', {
      screen_name: screenName,
    });
  },

  logEvent: async (eventName: string, params?: { [key: string]: any }) => {
    await Analytics.logEvent(eventName, params);
  },

  logUserSignIn: async (userId: string) => {
    await Analytics.logEvent('user_sign_in', {
      user_id: userId,
    });
  },

  logUserSignOut: async (userId: string) => {
    await Analytics.logEvent('user_sign_out', {
      user_id: userId,
    });
  },

  logTransaction: async (transactionId: string, amount: number, currency: string) => {
    await Analytics.logEvent('transaction', {
      transaction_id: transactionId,
      amount: amount,
      currency: currency,
    });
  },

  logNotificationReceived: async (notificationId: string) => {
    await Analytics.logEvent('notification_received', {
      notification_id: notificationId,
    });
  },
};

export default analytics;