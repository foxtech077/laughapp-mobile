import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { spacing, moderateScale } from '../../../../../utils/dimensions';

interface OnboardingPaginationProps {
  activeIndex?: number;
  totalDots?: number;
}

export default function OnboardingPagination({
  activeIndex = 0,
  totalDots = 3,
}: OnboardingPaginationProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      {Array.from({ length: totalDots }).map((_, index) => {
        const isActive = index === activeIndex;
        return (
          <View
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor: isActive ? colors.primaryText : colors.radioUnselectedBorder,
              },
            ]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing(8),
  },
  dot: {
    width: spacing(8),
    height: spacing(8),
    borderRadius: moderateScale(4),
  },
});
