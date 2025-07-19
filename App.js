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

  const onNavigationStateChange = useCallback((navState) => {
    console.log('onNavigationStateChange:', navState.url);
    if (navState.url !== initialUrl && !navState.url.startsWith(initialUrl)) {
      if (webviewRef.current) {
        webviewRef.current.stopLoading();
        webviewRef.current.injectJavaScript(`window.location.href = "${navState.url}";`);
      }
    }
  }, [initialUrl]);

  return (
    <View style={styles.container}>
      <WebView
        ref={webviewRef}
        source={{ uri: initialUrl }}
        style={styles.webview}
        onShouldStartLoadWithRequest={(request) => {
          console.log('onShouldStartLoadWithRequest:', request.url);
          return true;
        }}
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