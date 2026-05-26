import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { moderateScale } from '../../../../../utils/dimensions';

interface OnboardingGradientCircleProps {
  children?: React.ReactNode;
  size?: number;
  style?: ViewStyle;
}

export default function OnboardingGradientCircle({
  children,
  size = moderateScale(56),
  style,
}: OnboardingGradientCircleProps) {
  const { colors } = useTheme();

  const startColor = colors.onboardingGradientStart || '#FFE372';
  const endColor = colors.onboardingGradientEnd || '#FEC091';

  return (
    <LinearGradient
      colors={[startColor, endColor]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[
        styles.circle,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
        style,
      ]}
    >
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  circle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
