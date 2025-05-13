import { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Typography from './Typography';
import { useTheme } from '@/hooks/useTheme';
import { X, CircleAlert as AlertCircle, CircleCheck as CheckCircle, Info, TriangleAlert as AlertTriangle } from 'lucide-react-native';

type AlertType = 'info' | 'success' | 'warning' | 'error';

interface AlertBannerProps {
  type: AlertType;
  title: string;
  message?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
}

export default function AlertBanner({
  type = 'info',
  title,
  message,
  dismissible = true,
  onDismiss,
}: AlertBannerProps) {
  const { colors } = useTheme();
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) {
    return null;
  }

  const handleDismiss = () => {
    setDismissed(true);
    onDismiss?.();
  };

  const getAlertStyle = () => {
    switch (type) {
      case 'success':
        return {
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          borderColor: colors.success,
          icon: <CheckCircle size={20} color={colors.success} />,
        };
      case 'warning':
        return {
          backgroundColor: 'rgba(245, 158, 11, 0.1)',
          borderColor: colors.warning,
          icon: <AlertTriangle size={20} color={colors.warning} />,
        };
      case 'error':
        return {
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          borderColor: colors.error,
          icon: <AlertCircle size={20} color={colors.error} />,
        };
      default:
        return {
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          borderColor: colors.primary,
          icon: <Info size={20} color={colors.primary} />,
        };
    }
  };

  const alertStyle = getAlertStyle();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: alertStyle.backgroundColor,
          borderColor: alertStyle.borderColor,
        },
      ]}
    >
      <View style={styles.iconContainer}>{alertStyle.icon}</View>
      <View style={styles.contentContainer}>
        <Typography variant="body" weight="medium">
          {title}
        </Typography>
        {message && <Typography variant="caption">{message}</Typography>}
      </View>
      {dismissible && (
        <TouchableOpacity style={styles.dismissButton} onPress={handleDismiss}>
          <X size={20} color={colors.textSecondary} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 16,
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 12,
  },
  contentContainer: {
    flex: 1,
  },
  dismissButton: {
    marginLeft: 8,
  },
});