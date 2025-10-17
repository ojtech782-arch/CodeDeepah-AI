import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { initiateTransfer, fetchRecipients } from '../services/payments';
import { useSelector } from 'react-redux';

const InitiateTransfer = ({ navigation }) => {
  const [amount, setAmount] = useState('');
  const [recipients, setRecipients] = useState([]);
  const [selected, setSelected] = useState(null);
  const auth = useSelector((s) => s.auth);

  useEffect(() => {
    (async () => {
      const r = await fetchRecipients(auth.user?.id || 'devuser');
      setRecipients(r || []);
    })();
  }, []);

  const handleSend = async () => {
    if (!selected) return alert('select recipient');
    const amt = parseFloat(amount);
    if (!amt) return alert('enter amount');
    const r = await initiateTransfer({ userId: auth.user?.id || 'devuser', recipient: selected.recipientCode, amountNGN: Math.round(amt) });
    if (r?.data) {
      alert('transfer initiated');
      navigation.goBack();
    } else alert('failed');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transfer</Text>
      <FlatList data={recipients} keyExtractor={(i) => i.recipientCode} renderItem={({ item }) => (
        <TouchableOpacity onPress={() => setSelected(item)} style={[styles.item, selected?.recipientCode === item.recipientCode && styles.selected]}>
          <Text>{item.name} - {item.account_number}</Text>
        </TouchableOpacity>
      )} />
      <TextInput placeholder="Amount (NGN)" value={amount} onChangeText={setAmount} keyboardType="numeric" style={styles.input} />
      <Button title="Send" onPress={handleSend} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, marginBottom: 12 },
  input: { borderWidth: 1, padding: 8, marginBottom: 12 },
  item: { padding: 12, borderBottomWidth: 1 },
  selected: { backgroundColor: '#e6f7ff' }
});

export default InitiateTransfer;
