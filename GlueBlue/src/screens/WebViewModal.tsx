import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const WebViewModal = ({ route, navigation }) => {
  const { url, reference } = route.params || {};
  return (
    <View style={styles.container}>
      <WebView source={{ uri: url }} onNavigationStateChange={(navState) => {
        // could detect callback url and close
      }} />
    </View>
  );
};

const styles = StyleSheet.create({ container: { flex: 1 } });

export default WebViewModal;
