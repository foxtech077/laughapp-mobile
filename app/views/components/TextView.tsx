import React from 'react';
import { Text, TextProps, StyleSheet, TextStyle } from 'react-native';
import { fontScale } from '../../utils/dimensions';
import { useTheme } from '@react-navigation/native';

type TextVariant = 'title' | 'subtitle' | 'description' | 'caption';

interface TextViewProps extends TextProps {
  variant?: TextVariant;
  align?: 'left' | 'center' | 'right';
}

const variantStyles: Record<TextVariant, object> = {
  title: {
    fontSize: fontScale(24),
    fontWeight: '700',
    letterSpacing: 0.3,
    lineHeight: fontScale(36),
  },
  subtitle: {
    fontSize: fontScale(18),
    fontWeight: '600',
    letterSpacing: 0.2,
    lineHeight: fontScale(28),
  },
  description: {
    fontSize: fontScale(14),
    fontWeight: '400',
    letterSpacing: 0.1,
    lineHeight: fontScale(22),
  },
  caption: {
    fontSize: fontScale(12),
    fontWeight: '400',
    letterSpacing: 0.2,
    lineHeight: fontScale(18),
  },
};

function TextView({ variant = 'description', style, children, align = 'left', ...rest }: TextViewProps) {
  const { colors } = useTheme(); 
  const typography: TextStyle = {
    textAlign: align,
  };
  return (
    <Text style={[ {color: colors.text},styles.base, variantStyles[variant], style, typography]} {...rest}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  base: {
    // color: 
  },
});

export default TextView;
