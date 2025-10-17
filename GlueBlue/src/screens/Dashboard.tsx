import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import DashboardCard from '../components/DashboardCard';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { subscribeAnalytics, unsubscribeAnalytics } from '../services/analytics';

const Dashboard = () => {
  const analyticsState = useSelector((state: RootState) => state.analytics);

  useEffect(() => {
    subscribeAnalytics();
    return () => unsubscribeAnalytics();
  }, []);

  const cardsData = [
    { label: 'Active Users', value: analyticsState.activeUsers },
    { label: 'Messages Sent', value: analyticsState.messagesSent },
    { label: 'Transactions', value: analyticsState.transactionsCompleted },
    { label: 'Engagement', value: analyticsState.userEngagement },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {cardsData.map((data, index) => (
          <DashboardCard key={index} data={data} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F7FA', // Light blue background
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00796B', // Darker blue for title
    marginBottom: 16,
  },
  scrollContainer: {
    paddingBottom: 16,
  },
});

export default Dashboard;