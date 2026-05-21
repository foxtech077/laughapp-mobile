import React from 'react';
import { Text, TextProps, StyleSheet, TextStyle } from 'react-native';
import { fontScale } from '../../utils/dimensions';
import { useTheme } from '@react-navigation/native';

type TextVariant = 'title' | 'subtitle' | 'description' | 'caption' | 'heading' | 'subheading' | 'input' | 'heading' | 'subheading' | 'input';

interface TextViewProps extends TextProps {
  variant?: TextVariant;
  align?: 'left' | 'center' | 'right';
  weight?: TextStyle['fontWeight'];
  color?: TextStyle['color'];
  size?: number;
}

const variantStyles: Record<TextVariant, object> = {
  title: {
    fontSize: fontScale(32),
    fontWeight: '700',
    letterSpacing: -0.5,
    lineHeight: "100%",
  },
  subtitle: {
    fontSize: fontScale(18),
    fontWeight: '500',
    letterSpacing: -0.5,
    lineHeight: fontScale(26),
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
  heading: {
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: fontScale(26),
    lineHeight: fontScale(26),
    letterSpacing: -0.5,
  },
  subheading: {
    fontFamily: 'Inter',
    fontWeight: '500',
    fontSize: fontScale(18),
    lineHeight: fontScale(26),
    letterSpacing: -0.5,
  },
  input: {
    fontFamily: 'Inter',
    fontWeight: '500',
    fontSize: fontScale(18),
    lineHeight: fontScale(26),
    letterSpacing: -0.5,
  },
};

function TextView({ variant = 'description', style, children, align = 'left', weight, color, size, ...rest }: TextViewProps) {
  const { colors } = useTheme();
  const typography: TextStyle = {
    textAlign: align,
    ...(weight && { fontWeight: weight }),
    ...(color && { color }),
    ...(size !== undefined && { fontSize: fontScale(size) }),
  };
  return (
    <Text style={[{ color: colors.text }, styles.base, variantStyles[variant], style, typography]} {...rest}>
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
