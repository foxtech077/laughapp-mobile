import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { SvgProps } from 'react-native-svg';
import { spacing, fontScale, moderateScale, verticalScale } from '../../../../../utils/dimensions';
import TextView from '../../../../components/TextView';
import OnboardingGradientCircle from './OnboardingGradientCircle';

interface OnboardingFeatureItemProps {
  Icon: React.FC<SvgProps>;
  title: string;
  description?: string;
  hasCircleBackground?: boolean;
  iconWidth?: number;
  iconHeight?: number;
}

export default function OnboardingFeatureItem({
  Icon,
  title,
  description,
  hasCircleBackground = true,
  iconWidth,
  iconHeight,
}: OnboardingFeatureItemProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      {/* Icon Wrapper */}
      <View style={styles.iconContainer}>
        {hasCircleBackground ? (
          <OnboardingGradientCircle size={moderateScale(80)}>
            <Icon
              width={iconWidth ?? moderateScale(55)}
              height={iconHeight ?? moderateScale(56)}
            />
          </OnboardingGradientCircle>
        ) : (
          <View style={styles.directIconWrapper}>
            <Icon
              width={iconWidth ?? moderateScale(75)}
              height={iconHeight ?? moderateScale(75)}
            />
          </View>
        )}
      </View>

      {/* Text Container */}
      <View style={styles.textContainer}>
        <TextView
          variant="description"
          size={fontScale(26)}
          weight="700"
          style={{ color: colors.primaryText, marginBottom: description ? spacing(2) : 0, lineHeight: verticalScale(32) }}
        >
          {title}
        </TextView>

        {description ? (
          <TextView
            variant="caption"
            size={fontScale(21)}
            weight="500"
            style={{ color: colors.secondaryText, lineHeight: verticalScale(32), marginTop: spacing(2) }}
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
    paddingVertical: spacing(2),
    marginBottom: spacing(30),
  },
  iconContainer: {
    marginRight: spacing(16),
    justifyContent: 'center',
    alignItems: 'center',
  },
  directIconWrapper: {
    width: moderateScale(80),
    height: moderateScale(80),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: spacing(4),
  },
});
