import React from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../store/slices/authSlice';
import { ensureKeyPair } from '../../services/secureKeys';
import { GOOGLE_CLIENT_ID } from '../../config/env';

WebBrowser.maybeCompleteAuthSession();

export default function GoogleSignIn({ navigation }: any) {
  const dispatch = useDispatch();
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: GOOGLE_CLIENT_ID,
    iosClientId: GOOGLE_CLIENT_ID,
    androidClientId: GOOGLE_CLIENT_ID,
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      // In prod: fetch profile from Google and authenticate with backend
      const user = { id: `google_${Date.now()}`, name: 'Google User', email: 'user@google.com' };
      (async () => { await ensureKeyPair(user.id); dispatch(loginSuccess(user)); navigation.replace('Main'); })();
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign in with Google</Text>
      <Button disabled={!request} title="Sign in with Google" onPress={() => promptAsync()} />
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, padding: 16, justifyContent: 'center' }, title: { fontSize: 20, marginBottom: 12 } });
import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/slices/authSlice';

const GoogleSignIn = () => {
  const dispatch = useDispatch();

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      dispatch(setUser(userInfo));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Sign in with Google" onPress={signInWithGoogle} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GoogleSignIn;