import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Redirect } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import * as SplashScreen from 'expo-splash-screen';

export default function Index() {
  const { isLoading, user } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      try {
        SplashScreen.hideAsync();
      } catch (e) {
        console.warn('Error hiding splash screen:', e);
      }
    }
  }, [isLoading]);

  if (isLoading) {
    return <View style={styles.container} />;
  }

  // Redirect to login if not authenticated, otherwise to dashboard
  if (!user) {
    return <Redirect href="/auth/login" />;
  } else {
    return <Redirect href="/(tabs)" />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});