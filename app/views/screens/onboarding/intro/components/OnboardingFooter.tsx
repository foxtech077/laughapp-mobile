import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Svg, { Path } from 'react-native-svg';
import { spacing, moderateScale } from '../../../../../utils/dimensions';
import OnboardingPagination from './OnboardingPagination';

interface OnboardingFooterProps {
  activeIndex?: number;
  onNext: () => void;
  onBack?: () => void;
}

export default function OnboardingFooter({
  activeIndex = 0,
  onNext,
  onBack,
}: OnboardingFooterProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      {/* Invisible spacer or Back arrow button on the left to perfectly center the middle pagination */}
      {onBack ? (
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.7}
          onPress={onBack}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke={colors.primaryText || '#231F20'}
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <Path d="M19 12H5M12 19l-7-7 7-7" />
          </Svg>
        </TouchableOpacity>
      ) : (
        <View style={styles.spacer} />
      )}

      {/* Centered progress indicator */}
      <View style={styles.centerContainer}>
        <OnboardingPagination activeIndex={activeIndex} />
      </View>

      {/* Warm Yellow Circular Action Button */}
      <TouchableOpacity
        style={[styles.nextButton, { backgroundColor: colors.supporterGradientStart || '#FFE372' }]}
        activeOpacity={0.8}
        onPress={onNext}
      >
        <Svg
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke={colors.primaryText || '#231F20'}
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <Path d="M5 12h14M12 5l7 7-7 7" />
        </Svg>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing(24),
    paddingBottom: spacing(24),
  },
  spacer: {
    width: spacing(56),
    height: spacing(56),
  },
  backButton: {
    width: spacing(56),
    height: spacing(56),
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButton: {
    width: spacing(56),
    height: spacing(56),
    borderRadius: moderateScale(28),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
});
