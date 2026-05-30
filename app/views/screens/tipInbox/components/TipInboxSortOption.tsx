import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import TextView from '../../../components/TextView';
import { fontScale, moderateScale, spacing } from '../../../../utils/dimensions';

interface TipInboxSortOptionProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

export default function TipInboxSortOption({
  label,
  selected,
  onPress,
}: TipInboxSortOptionProps) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={styles.container}
    >
      <TextView
        size={fontScale(17)}
        weight="500"
        style={{ color: colors.primaryText }}
      >
        {label}
      </TextView>

      <View
        style={[
          styles.radioButton,
          {
            borderColor: selected ? colors.primaryText : colors.subtitle,
          },
        ]}
      >
        {selected && (
          <View
            style={[
              styles.radioButtonInner,
              { backgroundColor: colors.buttonEnabled },
            ]}
          />
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing(10),
    paddingHorizontal: spacing(20),
  },
  radioButton: {
    width: moderateScale(19),
    height: moderateScale(19),
    borderRadius: moderateScale(11),
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonInner: {
    width: moderateScale(10),
    height: moderateScale(10),
    borderRadius: moderateScale(5),
  },
});
