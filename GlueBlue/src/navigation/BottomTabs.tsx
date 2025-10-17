import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'lucide-react-native'; // Assuming you have a Lucide icon package
import HomeScreen from '../screens/Home';
import MessagingScreen from '../screens/Messaging';
import NotificationsScreen from '../screens/Notifications';
import WalletScreen from '../screens/Wallet';
import DashboardScreen from '../screens/Dashboard';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#1E90FF' }, // GlueBlue color
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#B0C4DE',
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          tabBarIcon: ({ color }) => <Icon name="home" color={color} />,
        }} 
      />
      <Tab.Screen 
        name="Messaging" 
        component={MessagingScreen} 
        options={{
          tabBarIcon: ({ color }) => <Icon name="message-circle" color={color} />,
        }} 
      />
      <Tab.Screen 
        name="Notifications" 
        component={NotificationsScreen} 
        options={{
          tabBarIcon: ({ color }) => <Icon name="bell" color={color} />,
        }} 
      />
      <Tab.Screen 
        name="Wallet" 
        component={WalletScreen} 
        options={{
          tabBarIcon: ({ color }) => <Icon name="credit-card" color={color} />,
        }} 
      />
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardScreen} 
        options={{
          tabBarIcon: ({ color }) => <Icon name="bar-chart" color={color} />,
        }} 
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;