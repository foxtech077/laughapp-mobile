import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { moderateScale } from '../../../../utils/dimensions';
import Svg, { Path } from 'react-native-svg';

interface TipInboxCheckboxProps {
  checked: boolean;
  onPress: () => void;
  disabled?: boolean;
}

export default function TipInboxCheckbox({ checked, onPress, disabled = false }: TipInboxCheckboxProps) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.checkboxContainer,
        {
          borderColor: checked ? colors.filterTabSelected : colors.placeholder,
          backgroundColor: checked ? colors.filterTabSelected : colors.white,
        },
      ]}
    >
      {checked && (
        <Svg width="spacing(12)" height="spacing(12)" viewBox="0 0 12 12" fill="none">
          <Path
            d="M2.5 6L5 8.5L9.5 3.5"
            stroke={colors.white}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  checkboxContainer: {
    width: moderateScale(20),
    height: moderateScale(20),
    borderWidth: 1.5,
    borderRadius: moderateScale(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
