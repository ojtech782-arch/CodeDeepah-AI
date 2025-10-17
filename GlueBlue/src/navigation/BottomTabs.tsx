import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'lucide-react-native'; // Assuming you have a Lucide icon package
import HomeScreen from '../screens/Home';
import MessagingScreen from '../screens/Messaging';
import NotificationsScreen from '../screens/Notifications';
import WalletScreen from '../screens/Wallet';
import DashboardScreen from '../screens/Dashboard';
import FundWallet from '../screens/FundWallet';
import CreateRecipient from '../screens/CreateRecipient';
import InitiateTransfer from '../screens/InitiateTransfer';
import WebViewModal from '../screens/WebViewModal';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={BottomTabs} />
      <Stack.Screen name="FundWallet" component={FundWallet} />
      <Stack.Screen name="CreateRecipient" component={CreateRecipient} />
      <Stack.Screen name="InitiateTransfer" component={InitiateTransfer} />
      <Stack.Screen name="WebViewModal" component={WebViewModal} />
    </Stack.Navigator>
  );
}

export default BottomTabs;