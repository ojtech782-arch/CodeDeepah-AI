import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../screens/Auth/SignIn';
import SignUp from '../screens/Auth/SignUp';
import GoogleSignIn from '../screens/Auth/GoogleSignIn';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="GoogleSignIn" component={GoogleSignIn} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;