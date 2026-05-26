import React from 'react';
import { View, StyleSheet, TextStyle, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { SvgProps } from 'react-native-svg';
import { spacing, fontScale, moderateScale, verticalScale } from '../../../../../utils/dimensions';
import TextView from '../../../../components/TextView';
import OnboardingGradientCircle from './OnboardingGradientCircle';

interface OnboardingFeatureItemProps {
  Icon: React.FC<SvgProps> | number | any;
  title: string;
  description?: string;
  hasCircleBackground?: boolean;
  iconWidth?: number;
  iconHeight?: number;
  titleStyle?: TextStyle;
}

export default function OnboardingFeatureItem({
  Icon,
  title,
  description,
  hasCircleBackground = true,
  iconWidth,
  iconHeight,
  titleStyle,
}: OnboardingFeatureItemProps) {
  const { colors } = useTheme();

  const renderIcon = () => {
    if (!Icon) return null;

    const width = iconWidth ?? (hasCircleBackground ? moderateScale(55) : moderateScale(75));
    const height = iconHeight ?? (hasCircleBackground ? moderateScale(56) : moderateScale(75));

    if (typeof Icon === 'number') {
      return (
        <Image
          source={Icon}
          style={{
            width,
            height,
            resizeMode: 'contain',
          }}
        />
      );
    }

    const IconComponent = Icon;
    return (
      <IconComponent
        width={width}
        height={height}
      />
    );
  };

  return (
    <View style={styles.container}>
      {/* Icon Wrapper */}
      <View style={styles.iconContainer}>
        {hasCircleBackground ? (
          <OnboardingGradientCircle size={moderateScale(65)}>
            {renderIcon()}
          </OnboardingGradientCircle>
        ) : (
          <View style={styles.directIconWrapper}>
            {renderIcon()}
          </View>
        )}
      </View>

      {/* Text Container */}
      <View style={styles.textContainer}>
        <TextView
          variant="description"
          size={fontScale(26)}
          weight="700"
          style={[
            styles.title,
            {
              color: colors.primaryText,
              marginBottom: description ? spacing(2) : 0,
            },
            titleStyle,
          ]}        >
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
    marginBottom: spacing(40),
  },
  iconContainer: {
    marginRight: spacing(16),
    justifyContent: 'center',
    alignItems: 'center',
  },
  directIconWrapper: {
    width: moderateScale(65),
    height: moderateScale(65),
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: fontScale(26),
    fontWeight: '700',
    lineHeight: fontScale(26),
    letterSpacing: -0.5,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: spacing(4),
  },
});
