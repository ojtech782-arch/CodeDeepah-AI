import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../store/slices/authSlice';
import { ensureKeyPair } from '../../services/secureKeys';

export default function SignIn({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  async function onSignIn() {
    // Demo: accept any email/name and create fake user
    const user = { id: email || `user_${Date.now()}`, name: name || 'User', email };
    // ensure keys registered
    await ensureKeyPair(user.id);
    dispatch(loginSuccess(user));
    navigation.replace('Main');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GlueBlue Sign In</Text>
      <TextInput placeholder="Name" style={styles.input} value={name} onChangeText={setName} />
      <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />
      <Button title="Sign In (dev)" onPress={onSignIn} />
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, padding: 16, justifyContent: 'center' }, input: { borderWidth: 1, padding: 10, marginVertical: 8 }, title: { fontSize: 22, marginBottom: 12 } });
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { login } from '../../store/slices/authSlice';
import IconInput from '../../components/IconInput';
import PasswordToggle from '../../components/PasswordToggle';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const dispatch = useDispatch();

  const handleSignIn = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    dispatch(login({ email, password }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <IconInput
        icon="mail"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <PasswordToggle
        icon="lock"
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        isVisible={isPasswordVisible}
        toggleVisibility={() => setIsPasswordVisible(!isPasswordVisible)}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.link}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.link}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#E0F7FA', // Light blue background
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#00796B', // Darker blue for title
  },
  button: {
    backgroundColor: '#00796B', // Darker blue for button
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  link: {
    color: '#00796B',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default SignIn;