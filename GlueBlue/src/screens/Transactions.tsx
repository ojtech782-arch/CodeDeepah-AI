import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { fetchTransactions } from '../services/paystack'; // Assuming this function fetches transactions
import { TransactionItem } from '../components/TransactionItem'; // Assuming you have a TransactionItem component

const Transactions = () => {
  const transactions = useSelector((state: RootState) => state.wallet.transactions);
  
  useEffect(() => {
    const loadTransactions = async () => {
      await fetchTransactions(); // Fetch transactions when the component mounts
    };
    loadTransactions();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transaction History</Text>
      <FlatList
        data={transactions}
        renderItem={({ item }) => <TransactionItem transaction={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f4ff', // Light blue background
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#003366', // Dark blue text
    marginBottom: 16,
  },
});

export default Transactions;