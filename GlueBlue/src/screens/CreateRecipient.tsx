import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { createRecipient } from '../services/payments';
import { useSelector } from 'react-redux';

const CreateRecipient = ({ navigation }: any) => {
  const [name, setName] = useState('');
  const [account, setAccount] = useState('');
  const [bankCode, setBankCode] = useState('');
  const auth = useSelector((s: any) => s.auth);

  const handleCreate = async () => {
    const userId = auth.user?.id || 'devuser';
    if (!name || !account || !bankCode) return alert('fill all');
    const r = await createRecipient({ userId, name, account_number: account, bank_code: bankCode });
    if (r?.data) {
      alert('recipient created');
      navigation.goBack();
    } else alert('failed');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Recipient</Text>
      <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Account number" value={account} onChangeText={setAccount} style={styles.input} keyboardType="numeric" />
      <TextInput placeholder="Bank code" value={bankCode} onChangeText={setBankCode} style={styles.input} />
      <Button title="Create" onPress={handleCreate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, marginBottom: 12 },
  input: { borderWidth: 1, padding: 8, marginBottom: 12 }
});

export default CreateRecipient;
