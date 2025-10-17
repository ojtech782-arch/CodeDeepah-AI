import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { createPaystackTransaction } from '../services/payments';
import { useSelector } from 'react-redux';

const FundWallet = ({ navigation }: any) => {
  const [amount, setAmount] = useState('');
  const auth = useSelector((s: any) => s.auth);

  const handleFund = async () => {
    const userId = auth.user?.id || 'devuser';
    const email = auth.user?.email || 'test@example.com';
    const amt = parseFloat(amount);
    if (!amt) return alert('enter amount');
    const r = await createPaystackTransaction({ userId, email, amountUSD: amt });
    if (r?.authorization_url) {
      // open WebView for authorization_url
      navigation.navigate('WebViewModal', { url: r.authorization_url, reference: r.reference });
    } else {
      alert('failed to initialize payment');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fund Wallet</Text>
      <TextInput keyboardType="numeric" placeholder="Amount (USD)" value={amount} onChangeText={setAmount} style={styles.input} />
      <Button title="Pay with Paystack" onPress={handleFund} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, marginBottom: 12 },
  input: { borderWidth: 1, padding: 8, marginBottom: 12 }
});

export default FundWallet;
