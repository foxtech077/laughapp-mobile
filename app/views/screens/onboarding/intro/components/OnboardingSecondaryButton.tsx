import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { spacing, fontScale, moderateScale, verticalScale } from '../../../../../utils/dimensions';
import TextView from '../../../../components/TextView';

interface OnboardingSecondaryButtonProps {
  label: string;
  onPress: () => void;
}

export default function OnboardingSecondaryButton({
  label,
  onPress,
}: OnboardingSecondaryButtonProps) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[
        styles.button,
        {
          backgroundColor: colors.transparent,
          borderColor: colors.cardSelectedBorder,
        },
      ]}
    >
      <TextView
        variant="description"
        size={fontScale(18)}
        weight="600"
        style={[styles.label, { color: colors.primaryText }]}
      >
        {label}
      </TextView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    maxWidth: spacing(398),
    height: verticalScale(54),
    borderRadius: moderateScale(27),
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing(24),
    alignSelf: 'center',
  },
  label: {
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
});
