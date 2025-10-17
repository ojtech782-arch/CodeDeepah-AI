export const APP_NAME = "GlueBlue";
export const API_BASE_URL = "https://api.glueblue.com";
export const ONE_SIGNAL_APP_ID = "your-onesignal-app-id";
export const GOOGLE_CLIENT_ID = "your-google-client-id";
export const PAYSTACK_PUBLIC_KEY = "your-paystack-public-key";
export const PAYPAL_CLIENT_ID = "your-paypal-client-id";

export const CURRENCY = {
    USD: "USD",
    NGN: "NGN",
};

export const NOTIFICATION_TYPES = {
    MESSAGE: "MESSAGE",
    TRANSACTION: "TRANSACTION",
    ALERT: "ALERT",
};

export const DEFAULT_CURRENCY = CURRENCY.NGN;

export const SOUND_EFFECTS = {
    MESSAGE_RECEIVED: require("../../assets/sounds/message_received.mp3"),
    NOTIFICATION: require("../../assets/sounds/notification.mp3"),
};