import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacityProps,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { spacing, fontScale } from '../../utils/dimensions';
import TextView from './TextView';

type ButtonVariant = 'normal' | 'secondary' | 'outline' | 'ghost' | 'auth';

interface ButtonViewProps extends TouchableOpacityProps {
  label: string;
  variant?: ButtonVariant;
  fillWidth?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  labelStyle?: TextStyle;
}

function ButtonView({
  label,
  variant = 'normal',
  fillWidth = false,
  loading = false,
  leftIcon,
  rightIcon,
  disabled,
  style,
  labelStyle,
  ...rest
}: ButtonViewProps) {
  const { colors } = useTheme();

  const containerStyle = getContainerStyle(variant, colors, fillWidth, disabled);
  const defaultLabelStyle = getLabelStyle(variant, colors);

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      disabled={disabled || loading}
      style={[styles.base, containerStyle, style]}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'normal' || variant === 'auth' ? colors.white : colors.black}
          size="small"
        />
      ) : (
        <>
          {leftIcon ?? null}
          <TextView variant="description" style={[styles.label, defaultLabelStyle, labelStyle]}>
            {label}
          </TextView>
          {rightIcon ?? null}
        </>
      )}
    </TouchableOpacity>
  );
}

function getContainerStyle(
  variant: ButtonVariant,
  colors: ReturnType<typeof useTheme>['colors'],
  fillWidth: boolean,
  disabled?: boolean | null,
): ViewStyle {
  const enabledColor = colors.buttonEnabled;
  const disabledColor = colors.buttonDisabled;

  const base: ViewStyle = {
    alignSelf: fillWidth ? 'stretch' : 'flex-start',
  };

  switch (variant) {
    case 'outline':
      return { ...base, backgroundColor: colors.transparent, borderWidth: 1.5, borderColor: disabled ? disabledColor : enabledColor };
    case 'ghost':
      return { ...base, backgroundColor: colors.transparent, borderWidth: 0 };
    case 'secondary':
      return { ...base, backgroundColor: disabled ? disabledColor : colors.gray100 };
    case 'auth':
      return {
        ...base,
        backgroundColor: disabled ? colors.placeholder : colors.buttonEnabled,
        borderRadius: 30,
        height: 54,
        paddingVertical: 16,
        paddingHorizontal: 60,
      };
    case 'normal':
    default:
      return { ...base, backgroundColor: disabled ? disabledColor : enabledColor };
  }
}

function getLabelStyle(
  variant: ButtonVariant,
  colors: ReturnType<typeof useTheme>['colors'],
): TextStyle {
  switch (variant) {
    case 'outline':
    case 'ghost':
      return { color: colors.black };
    case 'secondary':
      return { color: colors.primaryText };
    case 'auth':
    case 'normal':
    default:
      return { color: colors.white };
  }
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: spacing(24),
    paddingVertical: spacing(14),
    paddingHorizontal: spacing(24),
    gap: spacing(8),
  },
  label: {
    fontWeight: '600',
    fontSize: fontScale(15),
  },
});

export default ButtonView;
