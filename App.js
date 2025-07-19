import React, { useCallback, useEffect, useRef } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const webviewRef = useRef(null);
  const initialUrl = 'https://my.its.ac.id/';

  useEffect(() => {
    setTimeout(async () => {
      await SplashScreen.hideAsync();
    }, 2000);
  }, []);

  const handleShouldStartLoadWithRequest = useCallback((request) => {
    console.log('onShouldStartLoadWithRequest:', request.url);

    const isInternalDomain = request.url.includes('.its.ac.id');

    if (isInternalDomain || request.url === 'about:blank') {
      return true;
    } else {
      console.log('Blocked external navigation to:', request.url);
      return false;
    }
  }, []);

  const onNavigationStateChange = useCallback((navState) => {
    console.log('onNavigationStateChange (after decision):', navState.url);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        ref={webviewRef}
        source={{ uri: initialUrl }}
        style={styles.webview}
        onShouldStartLoadWithRequest={handleShouldStartLoadWithRequest}
        onNavigationStateChange={onNavigationStateChange}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  webview: {
    flex: 1,
  },
});
