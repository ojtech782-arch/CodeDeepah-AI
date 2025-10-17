import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Platform } from 'react-native';

const configureGoogleSignIn = () => {
  GoogleSignin.configure({
    webClientId: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com', // Replace with your web client ID
    offlineAccess: true,
    forceCodeForRefreshToken: true,
    accountName: '', // Optional, if you want to specify a particular account
  });
};

const signInWithGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    return userInfo;
  } catch (error) {
    console.error('Google Sign-In Error:', error);
    throw error;
  }
};

const signOutFromGoogle = async () => {
  try {
    await GoogleSignin.signOut();
  } catch (error) {
    console.error('Google Sign-Out Error:', error);
    throw error;
  }
};

export { configureGoogleSignIn, signInWithGoogle, signOutFromGoogle };