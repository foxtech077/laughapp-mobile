import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { spacing, fontScale, moderateScale, verticalScale } from '../../../../../utils/dimensions';
import TextView from '../../../../components/TextView';
import OnboardingFeatureItem from '../../intro/components/OnboardingFeatureItem';
import { images } from '../../../../../constants/images';

const { SupporterHelp, SupporterPremium, supporterLaughs } = images;

interface SupporterSlideProps {
  width: number;
}

export default function SupporterSlide({ width }: SupporterSlideProps) {
  const { colors } = useTheme();

  return (
    <View style={[styles.slide, { width }]}>
      <View style={styles.featuresHeader}>
        <TextView
          variant="heading"
          size={fontScale(32)}
          weight="700"
          style={[styles.featuresTitle, { color: colors.primaryText }]}
        >
          Become a supporter:
        </TextView>
      </View>

      <View style={styles.featuresList}>
        <OnboardingFeatureItem
          Icon={SupporterHelp}
          title={"Help comedians\nto win"}
          hasCircleBackground={false}
          iconWidth={moderateScale(60)}
          iconHeight={moderateScale(60)}
          titleStyle={styles.supporterTitle}
        />
        <OnboardingFeatureItem
          Icon={SupporterPremium}
          title="Get premium features"
          hasCircleBackground={false}
          iconWidth={moderateScale(60)}
          iconHeight={moderateScale(60)}
          titleStyle={styles.supporterTitle}
        />
        <OnboardingFeatureItem
          Icon={supporterLaughs}
          title={"Bring more laughs into\nthe world"}
          hasCircleBackground={false}
          iconWidth={moderateScale(60)}
          iconHeight={moderateScale(60)}
          titleStyle={styles.supporterTitle}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'space-between',
  },
  featuresHeader: {
    width: '100%',
    paddingHorizontal: spacing(16),
    paddingTop: verticalScale(30),
    marginBottom: verticalScale(20),
  },
  featuresTitle: {
    lineHeight: verticalScale(38),
    marginTop: verticalScale(80),
  },
  featuresList: {
    width: '100%',
    marginBottom: verticalScale(20),
    paddingHorizontal: spacing(16),
    flex: 1,
    justifyContent: 'center',
  },
  supporterTitle: {
    fontSize: fontScale(26),
    fontWeight: '700',
    lineHeight: fontScale(26),
    letterSpacing: -0.5,
    paddingVertical: spacing(5)
  },
});
