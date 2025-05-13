import { Text, StyleSheet, TextProps } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

interface TypographyProps extends TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'caption' | 'label';
  color?: string;
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  weight?: 'normal' | 'bold' | 'medium';
}

export default function Typography({
  children,
  style,
  variant = 'body',
  color,
  align = 'left',
  weight,
  ...props
}: TypographyProps) {
  const { colors } = useTheme();
  
  const getWeightStyle = (weight?: string) => {
    switch (weight) {
      case 'bold':
        return { fontWeight: '700' as const };
      case 'medium':
        return { fontWeight: '500' as const };
      default:
        return {};
    }
  };

  const getVariantStyle = (variant: string) => {
    switch (variant) {
      case 'h1':
        return { ...styles.h1, ...getWeightStyle('bold') };
      case 'h2':
        return { ...styles.h2, ...getWeightStyle('bold') };
      case 'h3':
        return { ...styles.h3, ...getWeightStyle('medium') };
      case 'h4':
        return { ...styles.h4, ...getWeightStyle('medium') };
      case 'caption':
        return styles.caption;
      case 'label':
        return { ...styles.label, ...getWeightStyle('medium') };
      default:
        return styles.body;
    }
  };

  return (
    <Text
      style={[
        getVariantStyle(variant),
        {
          color: color || colors.text,
          textAlign: align,
        },
        getWeightStyle(weight),
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  h1: {
    fontSize: 28,
    lineHeight: 34,
    marginBottom: 16,
  },
  h2: {
    fontSize: 24,
    lineHeight: 29,
    marginBottom: 12,
  },
  h3: {
    fontSize: 20,
    lineHeight: 24,
    marginBottom: 8,
  },
  h4: {
    fontSize: 16,
    lineHeight: 19,
    marginBottom: 4,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
  },
  caption: {
    fontSize: 12,
    lineHeight: 18,
    opacity: 0.7,
  },
  label: {
    fontSize: 14,
    lineHeight: 18,
    marginBottom: 4,
  },
});