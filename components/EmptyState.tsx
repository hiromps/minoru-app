import { View, StyleSheet } from 'react-native';
import Typography from './Typography';
import Button from './Button';
import { useTheme } from '@/hooks/useTheme';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({
  title,
  description,
  icon,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <Typography variant="h3" align="center" style={styles.title}>
        {title}
      </Typography>
      {description && (
        <Typography
          variant="body"
          align="center"
          color={colors.textSecondary}
          style={styles.description}
        >
          {description}
        </Typography>
      )}
      {actionLabel && onAction && (
        <Button
          title={actionLabel}
          onPress={onAction}
          style={styles.button}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 200,
  },
  iconContainer: {
    marginBottom: 16,
  },
  title: {
    marginBottom: 8,
  },
  description: {
    marginBottom: 24,
    maxWidth: 300,
  },
  button: {
    minWidth: 150,
  },
});