import React, { useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWalletData, fetchTransactions, selectWallet } from '../store/slices/walletSlice';
import { convertCurrency } from '../utils/currency';

const Wallet = () => {
  const dispatch = useDispatch();
  const walletData = useSelector(selectWallet);

  useEffect(() => {
    dispatch(fetchWalletData());
    dispatch(fetchTransactions());
  }, [dispatch]);

  const handleCurrencyConversion = (amount, currency) => {
    return convertCurrency(amount, currency);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wallet</Text>
      <FlatList
        data={walletData.transactions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.transaction}>
            <Text>{item.description}</Text>
            <Text>{handleCurrencyConversion(item.amount, item.currency)}</Text>
          </View>
        )}
      />
      <Button title="Add Funds" onPress={() => { navigation.navigate('FundWallet'); }} />
      <Button title="Create Recipient" onPress={() => { navigation.navigate('CreateRecipient'); }} />
      <Button title="Transfer" onPress={() => { navigation.navigate('InitiateTransfer'); }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E0F7FA', // Light blue background
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00796B', // Darker blue for title
    marginBottom: 20,
  },
  transaction: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#B2EBF2', // Light blue for transaction separator
  },
});

export default Wallet;