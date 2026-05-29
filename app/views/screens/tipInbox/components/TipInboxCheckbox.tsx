import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { moderateScale, spacing } from '../../../../utils/dimensions';
import Svg, { Path } from 'react-native-svg';
import { images } from '../../../../constants/images';
const { SelectedCheckMark } = images;
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
        <SelectedCheckMark width={moderateScale(12)} height={moderateScale(9)} />
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
