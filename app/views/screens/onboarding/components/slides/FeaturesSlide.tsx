import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { spacing, fontScale, moderateScale, verticalScale } from '../../../../../utils/dimensions';
import TextView from '../../../../components/TextView';
import OnboardingFeatureItem from '../../intro/components/OnboardingFeatureItem';
import { images } from '../../../../../constants/images';

const { OnboardingWatch, LaughAppLogo, SupporterOnboarding } = images;

interface FeaturesSlideProps {
  width: number;
}


export default function FeaturesSlide({ width }: FeaturesSlideProps) {
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
          On LaughApp, it’s simple:
        </TextView>
      </View>

      <View style={styles.featuresList}>
        <OnboardingFeatureItem
          Icon={OnboardingWatch}
          title="Watch"
          description="Short stand-up clips from comedians"
        />
        <OnboardingFeatureItem
          Icon={LaughAppLogo}
          title="Laugh"
          description="React when it hits"
          iconWidth={moderateScale(65)}
          iconHeight={moderateScale(65)}
        />
        <OnboardingFeatureItem
          Icon={SupporterOnboarding}
          title="Support"
          description="Back the comedians you love"
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
    lineHeight: verticalScale(50),
    marginTop: spacing(80),
  },
  featuresList: {
    width: '100%',
    paddingHorizontal: spacing(16),
    flex: 1,
    justifyContent: 'center',
  },
});
