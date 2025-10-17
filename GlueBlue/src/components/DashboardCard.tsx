import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface DashboardCardProps {
  title: string;
  value: string | number;
  description?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, description }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
      {description && <Text style={styles.description}>{description}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#E0F7FA', // Light blue background
    borderRadius: 10,
    padding: 16,
    margin: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00796B', // Darker blue for title
  },
  value: {
    fontSize: 24,
    fontWeight: '600',
    color: '#004D40', // Even darker blue for value
  },
  description: {
    fontSize: 14,
    color: '#004D40', // Dark blue for description
  },
});

export default DashboardCard;