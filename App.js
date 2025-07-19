import React, { useCallback, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function App() {
  useEffect(() => {
    // Here you can add any logic you want to run while the splash screen is displayed.
    // For example, you could fetch data from an API.
    // For this example, we'll just wait for 2 seconds.
    setTimeout(async () => {
      await SplashScreen.hideAsync();
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: 'https://my.its.ac.id/' }}
        style={styles.webview}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});
