import OneSignal from 'react-native-onesignal';

export function showLocalNotification(title: string, body: string, data = {}) {
  try {
    OneSignal.postNotification({ contents: { en: body }, headings: { en: title }, data });
  } catch (e) {
    console.warn('local notification error', e);
  }
}

export function formatIncomingNotification(raw: any) {
  return {
    id: raw.notificationId || Date.now().toString(),
    title: raw.title || raw.heading || 'Notification',
    body: raw.body || raw.contents?.en || '',
    data: raw.data || {},
    date: new Date().toISOString(),
  };
}
import { Notifications } from 'expo-notifications';
import * as Permissions from 'expo-permissions';

export const registerForPushNotificationsAsync = async () => {
  const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    alert('Failed to get push token for push notification!');
    return;
  }

  const token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log(token);
  return token;
};

export const scheduleNotification = async (title: string, body: string) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
    },
    trigger: {
      seconds: 2,
    },
  });
};

export const handleNotification = (notification: any) => {
  console.log('Notification received:', notification);
};