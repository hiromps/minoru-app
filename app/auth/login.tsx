import { useState } from 'react';
import { View, StyleSheet, Image, useWindowDimensions, Platform } from 'react-native';
import { router } from 'expo-router';
import Typography from '@/components/Typography';
import TextField from '@/components/TextField';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { useTheme } from '@/hooks/useTheme';
import { useAuth } from '@/hooks/useAuth';
import { Lock, Mail } from 'lucide-react-native';

export default function Login() {
  const { colors } = useTheme();
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { width } = useWindowDimensions();
  
  const isSmallScreen = width < 768;

  const handleLogin = async () => {
    try {
      setError(null);
      await login(email, password);
      router.replace('/(tabs)');
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.content, isSmallScreen ? styles.contentSmall : styles.contentLarge]}>
        <View style={styles.header}>
          <Typography variant="h1" align="center">
            Inventory Manager
          </Typography>
          <Typography
            variant="body"
            align="center"
            color={colors.textSecondary}
            style={styles.subtitle}
          >
            Sign in to manage your inventory and orders
          </Typography>
        </View>

        <Card 
          variant="elevated" 
          style={styles.card}
        >
          <Typography variant="h3" style={styles.formTitle}>
            Sign In
          </Typography>

          {error && (
            <View style={[styles.errorContainer, { backgroundColor: `${colors.error}15` }]}>
              <Typography color={colors.error}>{error}</Typography>
            </View>
          )}

          <TextField
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            startIcon={<Mail size={20} color={colors.textSecondary} />}
          />

          <TextField
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            secureTextEntry
            startIcon={<Lock size={20} color={colors.textSecondary} />}
          />

          <Button
            title="Sign In"
            onPress={handleLogin}
            loading={isLoading}
            style={styles.button}
            fullWidth
          />

          <Typography
            variant="caption"
            align="center"
            color={colors.textSecondary}
            style={styles.demoNote}
          >
            Demo Credentials: demo@example.com / any password
          </Typography>
        </Card>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  content: {
    width: '100%',
    maxWidth: 480,
  },
  contentSmall: {
    padding: 16,
  },
  contentLarge: {
    padding: 24,
  },
  header: {
    marginBottom: 24,
  },
  subtitle: {
    marginTop: 8,
  },
  card: {
    padding: 24,
  },
  formTitle: {
    marginBottom: 24,
  },
  errorContainer: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
  demoNote: {
    marginTop: 24,
  },
});