import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';
import TextView from '../../../components/TextView';
import { fontScale, moderateScale, spacing, verticalScale } from '../../../../utils/dimensions';
import { images } from '../../../../constants/images';
const { SupporterOnboarding } = images;

interface TipInboxEmptyStateProps {
  title: string;
  description: string;
}

export default function TipInboxEmptyState({ title, description }: TipInboxEmptyStateProps) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.white }]}>
      <View style={[styles.iconWrapper, { backgroundColor: colors.emptyStateBackground || '#F9F9F9' }]}>
        <SupporterOnboarding width={spacing(36)} height={spacing(36)} />
      </View>
      <TextView
        size={18}
        weight="800"
        align="center"
        style={[styles.title, { color: colors.primaryText || '#231F20' }]}
      >
        {title}
      </TextView>
      <TextView
        size={14}
        weight="500"
        align="center"
        style={[styles.description, { color: colors.secondaryText || '#5A5656' }]}
      >
        {description}
      </TextView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing(32),
    paddingVertical: verticalScale(60),
  },
  iconWrapper: {
    width: moderateScale(70),
    height: moderateScale(70),
    borderRadius: moderateScale(35),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing(16),
  },
  icon: {
    width: moderateScale(36),
    height: moderateScale(36),
  },
  title: {
    marginBottom: spacing(8),
  },
  description: {
    lineHeight: fontScale(20),
  },
});
