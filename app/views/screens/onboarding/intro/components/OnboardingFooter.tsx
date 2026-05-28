import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Svg, { Path } from 'react-native-svg';
import { spacing, moderateScale, verticalScale } from '../../../../../utils/dimensions';
import OnboardingPagination from './OnboardingPagination';
import OnboardingGradientCircle from './OnboardingGradientCircle';

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
            stroke={colors.primaryText}
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
        style={styles.nextButton}
        activeOpacity={0.8}
        onPress={onNext}
      >
        <OnboardingGradientCircle size={verticalScale(68)}>
          <Svg
            width={verticalScale(28)}
            height={verticalScale(28)}
            viewBox="0 0 24 24"
            fill="none"
            stroke={colors.primaryText}
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <Path d="M5 12h14M12 5l7 7-7 7" />
          </Svg>
        </OnboardingGradientCircle>
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
    paddingHorizontal: spacing(16),
    paddingBottom: spacing(24),
  },
  spacer: {
    width: verticalScale(68),
    height: verticalScale(68),
  },
  backButton: {
    width: verticalScale(68),
    height: verticalScale(68),
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButton: {
    width: verticalScale(68),
    height: verticalScale(68),
    borderRadius: verticalScale(34),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
});
