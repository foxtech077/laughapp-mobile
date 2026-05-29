import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import TextView from '../../../components/TextView';
import { fontScale, moderateScale, spacing } from '../../../../utils/dimensions';
import { TipStatus } from '../types';

interface TipInboxStatusBadgeProps {
  status: TipStatus;
}

export default function TipInboxStatusBadge({ status }: TipInboxStatusBadgeProps) {
  const { colors } = useTheme();
  const isReplied = status === 'replied';

  const badgeStyles = {
    backgroundColor: isReplied ? colors.badgeGreenBg : colors.badgeRedBg,
    borderColor: isReplied ? colors.green_600 : colors.red_600,
    textColor: isReplied ? colors.green_600 : colors.red_600,
  };

  return (
    <View style={[styles.badgeContainer, { backgroundColor: badgeStyles.backgroundColor, borderColor: badgeStyles.borderColor }]}>
      <TextView
        size={fontScale(13)}
        weight="600"
        style={{ color: badgeStyles.textColor, includeFontPadding: false, textAlignVertical: 'center' }}
      >
        {isReplied ? 'Replied' : 'Unreplied'}
      </TextView>
    </View>
  );
}

const styles = StyleSheet.create({
  badgeContainer: {
    paddingHorizontal: spacing(6),
    paddingVertical: spacing(1.5),
    borderRadius: moderateScale(20),
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
});
