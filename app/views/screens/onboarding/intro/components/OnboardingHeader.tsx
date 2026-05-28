import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { fontScale, spacing, verticalScale } from '../../../../../utils/dimensions';
import TextView from '../../../../components/TextView';

interface OnboardingHeaderProps {
  onSkip: () => void;
  showSkip?: boolean;
}

export default function OnboardingHeader({ onSkip, showSkip = true }: OnboardingHeaderProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      {showSkip ? (
        <TouchableOpacity
          onPress={onSkip}
          activeOpacity={0.7}
          hitSlop={{ top: 16, bottom: 16, left: 16, right: 16 }}
        >
          <TextView
            weight="600"
            size={fontScale(18)}
            style={{ color: colors.primaryText }}
          >
            Skip
          </TextView>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: spacing(16),
    paddingTop: verticalScale(30),
    paddingBottom: verticalScale(8),
  },
});
