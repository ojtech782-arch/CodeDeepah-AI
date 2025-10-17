import OneSignal from 'react-native-onesignal';
import { ONESIGNAL_APP_ID } from '../config/env';

export function initOneSignal() {
  try {
    if (!ONESIGNAL_APP_ID) return;
    OneSignal.setAppId(ONESIGNAL_APP_ID);

    OneSignal.setNotificationWillShowInForegroundHandler((event) => {
      const notification = event.getNotification();
      // Complete so OS shows it (you can customize behaviour)
      event.complete(notification);
    });

    OneSignal.setNotificationOpenedHandler((opened) => {
      console.log('OneSignal opened', opened);
    });
  } catch (e) {
    console.warn('OneSignal init error', e);
  }
}
import OneSignal from 'react-native-onesignal';

// Initialize OneSignal
const initializeOneSignal = () => {
  OneSignal.setAppId('YOUR_ONESIGNAL_APP_ID');

  // Optional settings
  OneSignal.promptForPushNotificationsWithUserResponse();
  OneSignal.setNotificationOpenedHandler(notification => {
    console.log('Notification opened:', notification);
  });
};

// Function to send a notification
const sendNotification = async (message: string, userId: string) => {
  const notification = {
    contents: { en: message },
    include_player_ids: [userId],
  };

  try {
    await OneSignal.postNotification(notification);
  } catch (error) {
    console.error('Error sending notification:', error);
  }
};

// Function to subscribe a user to OneSignal
const subscribeUser = (userId: string) => {
  OneSignal.setExternalUserId(userId);
};

// Function to unsubscribe a user from OneSignal
const unsubscribeUser = () => {
  OneSignal.removeExternalUserId();
};

export { initializeOneSignal, sendNotification, subscribeUser, unsubscribeUser };