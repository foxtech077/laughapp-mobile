import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { SvgProps } from 'react-native-svg';
import { spacing, fontScale, moderateScale } from '../../../../../utils/dimensions';
import TextView from '../../../../components/TextView';

interface OnboardingFeatureItemProps {
  Icon: React.FC<SvgProps>;
  title: string;
  description?: string;
}


export default function OnboardingFeatureItem({
  Icon,
  title,
  description,
}: OnboardingFeatureItemProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      {/* Icon Wrapper */}
      <View style={styles.iconContainer}>
        <Icon width={moderateScale(54)} height={moderateScale(54)} />
      </View>

      {/* Text Container */}
      <View style={styles.textContainer}>
        <TextView
          variant="description"
          size={16}
          weight="700"
          style={{ color: colors.primaryText, marginBottom: description ? spacing(2) : 0 }}
        >
          {title}
        </TextView>

        {description ? (
          <TextView
            variant="caption"
            size={14}
            weight="400"
            style={{ color: colors.secondaryText, lineHeight: spacing(18) }}
          >
            {description}
          </TextView>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingVertical: spacing(8),
    marginBottom: spacing(16),
  },
  iconContainer: {
    marginRight: spacing(16),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});
