import React, { useCallback, useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
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

    if (request.url.startsWith(initialUrl) || request.url === 'about:blank') {
      return true;
    } else {
      if (webviewRef.current) {
        webviewRef.current.injectJavaScript(`window.location.href = "${request.url}";`);
      }
      return false;
    }
  }, [initialUrl]);

  const onNavigationStateChange = useCallback((navState) => {
    console.log('onNavigationStateChange (after decision):', navState.url);
  }, []);

  return (
    <View style={styles.container}>
      <WebView
        ref={webviewRef}
        source={{ uri: initialUrl }}
        style={styles.webview}
        onShouldStartLoadWithRequest={handleShouldStartLoadWithRequest}
        onNavigationStateChange={onNavigationStateChange}
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
