import { useState } from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Typography from './Typography';
import { useTheme } from '@/hooks/useTheme';
import { Eye, EyeOff, CircleAlert as AlertCircle } from 'lucide-react-native';

interface TextFieldProps extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  hidePasswordIcon?: boolean;
}

export default function TextField({
  label,
  error,
  helperText,
  style,
  secureTextEntry,
  startIcon,
  endIcon,
  hidePasswordIcon = false,
  ...props
}: TextFieldProps) {
  const { colors } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const isPassword = secureTextEntry !== undefined;
  const actualSecureTextEntry = isPassword && !passwordVisible;

  return (
    <View style={styles.container}>
      {label && (
        <Typography variant="label" style={styles.label}>
          {label}
        </Typography>
      )}
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: error
              ? colors.error
              : isFocused
              ? colors.primary
              : colors.border,
            backgroundColor: colors.background,
          },
          Platform.OS === 'web' && styles.webInputFix,
        ]}
      >
        {startIcon && <View style={styles.iconContainer}>{startIcon}</View>}
        <TextInput
          style={[
            styles.input,
            { color: colors.text },
            startIcon && styles.inputWithStartIcon,
            (endIcon || isPassword) && styles.inputWithEndIcon,
            style,
          ]}
          placeholderTextColor={colors.textSecondary}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={actualSecureTextEntry}
          {...props}
        />
        {isPassword && !hidePasswordIcon && (
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={togglePasswordVisibility}
          >
            {passwordVisible ? (
              <EyeOff size={20} color={colors.textSecondary} />
            ) : (
              <Eye size={20} color={colors.textSecondary} />
            )}
          </TouchableOpacity>
        )}
        {endIcon && <View style={styles.iconContainer}>{endIcon}</View>}
      </View>
      {(error || helperText) && (
        <View style={styles.messageContainer}>
          {error && (
            <View style={styles.errorContainer}>
              <AlertCircle size={14} color={colors.error} />
              <Typography
                variant="caption"
                color={colors.error}
                style={styles.errorText}
              >
                {error}
              </Typography>
            </View>
          )}
          {!error && helperText && (
            <Typography variant="caption" color={colors.textSecondary}>
              {helperText}
            </Typography>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: '100%',
  },
  label: {
    marginBottom: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  webInputFix: {
    // Fix for web
    outlineStyle: 'none' as any,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  inputWithStartIcon: {
    paddingLeft: 0,
  },
  inputWithEndIcon: {
    paddingRight: 0,
  },
  iconContainer: {
    paddingHorizontal: 12,
  },
  messageContainer: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorText: {
    marginLeft: 4,
  },
});