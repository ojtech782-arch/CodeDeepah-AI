import React, { useEffect } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import AppNavigator from './src/navigation/AppNavigator';
import rootReducer from './src/store';
import { StatusBar } from 'expo-status-bar';
import { initOneSignal } from './src/services/onesignal';
import { initSocket } from './src/services/socket';

const store = createStore(rootReducer);

const App = () => {
  useEffect(() => {
    initOneSignal();
    initSocket();
  }, []);

  return (
    <Provider store={store}>
      <StatusBar style="auto" />
      <AppNavigator />
    </Provider>
  );
};

export default App;