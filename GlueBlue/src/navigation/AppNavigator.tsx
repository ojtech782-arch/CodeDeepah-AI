import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthNavigator from './AuthNavigator';
import BottomTabs from './BottomTabs';
import Home from '../screens/Home';
import Messaging from '../screens/Messaging';
import Notifications from '../screens/Notifications';
import Wallet from '../screens/Wallet';
import Transactions from '../screens/Transactions';
import Dashboard from '../screens/Dashboard';
import AccountUpgrade from '../screens/AccountUpgrade';
import Settings from '../screens/Settings';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Auth" component={AuthNavigator} />
        <Stack.Screen name="Main" component={BottomTabs} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Messaging" component={Messaging} />
        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen name="Wallet" component={Wallet} />
        <Stack.Screen name="Transactions" component={Transactions} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="AccountUpgrade" component={AccountUpgrade} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;