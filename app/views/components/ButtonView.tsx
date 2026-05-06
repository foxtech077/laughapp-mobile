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

type ButtonVariant = 'normal' | 'outline' | 'ghost';

interface ButtonViewProps extends TouchableOpacityProps {
  label: string;
  variant?: ButtonVariant;
  fillWidth?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
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
  ...rest
}: ButtonViewProps) {
  const { colors } = useTheme();

  const containerStyle = getContainerStyle(variant, colors, fillWidth, disabled);
  const labelStyle = getLabelStyle(variant, colors, disabled);

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      disabled={disabled || loading}
      style={[styles.base, containerStyle, style]}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'normal' ? '#FFFFFF' : '#000000'}
          size="small"
        />
      ) : (
        <>
          {leftIcon ?? null}
          <TextView variant="description" style={[styles.label, labelStyle]}>
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
  const opacity = disabled ? 0.45 : 1;

  const base: ViewStyle = {
    alignSelf: fillWidth ? 'stretch' : 'flex-start',
    opacity,
  };

  switch (variant) {
    case 'outline':
      return { ...base, backgroundColor: 'transparent', borderWidth: 1.5, borderColor: '#000000' };
    case 'ghost':
      return { ...base, backgroundColor: 'transparent', borderWidth: 0 };
    case 'normal':
    default:
      return { ...base, backgroundColor: '#000000' };
  }
}

function getLabelStyle(
  variant: ButtonVariant,
  colors: ReturnType<typeof useTheme>['colors'],
  disabled?: boolean | null,
): TextStyle {
  switch (variant) {
    case 'outline':
    case 'ghost':
      return { color: '#000000' };
    case 'normal':
    default:
      return { color: '#FFFFFF' };
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
