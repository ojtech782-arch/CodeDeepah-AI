import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { signupSuccess } from '../../store/slices/authSlice';
import { ensureKeyPair } from '../../services/secureKeys';

export default function SignUp({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  async function onSignUp() {
    const user = { id: email || `user_${Date.now()}`, name: name || 'User', email };
    await ensureKeyPair(user.id);
    dispatch(signupSuccess(user));
    navigation.replace('Main');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GlueBlue Sign Up</Text>
      <TextInput placeholder="Name" style={styles.input} value={name} onChangeText={setName} />
      <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />
      <Button title="Sign Up (dev)" onPress={onSignUp} />
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, padding: 16, justifyContent: 'center' }, input: { borderWidth: 1, padding: 10, marginVertical: 8 }, title: { fontSize: 22, marginBottom: 12 } });
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import PasswordToggle from '../../components/PasswordToggle';
import IconInput from '../../components/IconInput';

const SignUp = () => {
    const { signUp } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSignUp = () => {
        if (password === confirmPassword) {
            signUp(email, password);
        } else {
            alert("Passwords do not match");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>
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
                showPassword={showPassword}
                setShowPassword={setShowPassword}
            />
            <PasswordToggle
                icon="lock"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                showPassword={showConfirmPassword}
                setShowPassword={setShowConfirmPassword}
            />
            <Button title="Sign Up" onPress={handleSignUp} />
            <TouchableOpacity onPress={() => {/* Navigate to Sign In */}}>
                <Text style={styles.link}>Already have an account? Sign In</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#E0F7FA', // GlueBlue color
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    link: {
        marginTop: 15,
        textAlign: 'center',
        color: '#007BFF',
    },
});

export default SignUp;