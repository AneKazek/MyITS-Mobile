import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, StyleSheet, SafeAreaView, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const webviewRef = useRef(null);
  const initialUrl = 'https://my.its.ac.id/';
  const [currentWebViewUrl, setCurrentWebViewUrl] = useState(initialUrl);

  useEffect(() => {
    setTimeout(async () => {
      await SplashScreen.hideAsync();
    }, 2000);
  }, []);

  const handleShouldStartLoadWithRequest = useCallback((request) => {
    console.log('onShouldStartLoadWithRequest:', request.url);

    const isInternalDomain = request.url.includes('.its.ac.id');

    if (isInternalDomain || request.url === 'about:blank') {
      setCurrentWebViewUrl(request.url);
      return false;
    } else {
      console.log('Blocked external navigation to:', request.url);
      return false;
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        ref={webviewRef}
        source={{ uri: currentWebViewUrl }}
        style={styles.webview}
        onShouldStartLoadWithRequest={handleShouldStartLoadWithRequest}
        onOpenWindow={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          const targetUrl = nativeEvent.targetUrl;
          console.log('onOpenWindow triggered for:', targetUrl);

          const isInternalDomain = targetUrl.includes('.its.ac.id');

          if (isInternalDomain) {
            setCurrentWebViewUrl(targetUrl);
          } else {
            console.log('Blocked window.open to external URL:', targetUrl);
          }
        }}
        cacheEnabled={true}
        domStorageEnabled={true}
        javaScriptCanOpenWindowsAutomatically={true}
        {...(Platform.OS === 'android' && {
          renderToHardwareTextureAndroid: true,
          androidLayerType: 'hardware',
        })}
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
