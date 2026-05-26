import React from 'react';
import { TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { spacing, fontScale, moderateScale, verticalScale } from '../../../../../utils/dimensions';
import TextView from '../../../../components/TextView';

interface OnboardingPrimaryButtonProps {
  label: string;
  onPress: () => void;
  loading?: boolean;
}

export default function OnboardingPrimaryButton({
  label,
  onPress,
  loading = false,
}: OnboardingPrimaryButtonProps) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={loading}
      style={[styles.button, { backgroundColor: colors.buttonEnabled }]}
    >
      {loading ? (
        <ActivityIndicator color={colors.white} size="small" />
      ) : (
        <TextView
          variant="description"
          size={fontScale(18)}
          weight="600"
          style={[styles.label, { color: colors.white }]}
        >
          {label}
        </TextView>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    maxWidth: spacing(398),
    height: verticalScale(54),
    borderRadius: moderateScale(30),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing(24),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignSelf: 'center',
  },
  label: {
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
});
