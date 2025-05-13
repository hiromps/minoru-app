import { View, StyleSheet, ViewProps } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

interface CardProps extends ViewProps {
  variant?: 'default' | 'outlined' | 'elevated';
  padding?: 'none' | 'small' | 'default' | 'large';
}

export default function Card({
  children,
  style,
  variant = 'default',
  padding = 'default',
  ...props
}: CardProps) {
  const { colors } = useTheme();

  const getVariantStyle = () => {
    switch (variant) {
      case 'outlined':
        return {
          backgroundColor: colors.card,
          borderWidth: 1,
          borderColor: colors.border,
          shadowOpacity: 0,
        };
      case 'elevated':
        return {
          backgroundColor: colors.card,
          shadowColor: colors.text,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 4,
        };
      default:
        return {
          backgroundColor: colors.card,
        };
    }
  };

  const getPaddingStyle = () => {
    switch (padding) {
      case 'none':
        return { padding: 0 };
      case 'small':
        return { padding: 8 };
      case 'large':
        return { padding: 24 };
      default:
        return { padding: 16 };
    }
  };

  return (
    <View
      style={[
        styles.card,
        getVariantStyle(),
        getPaddingStyle(),
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    overflow: 'hidden',
  },
});