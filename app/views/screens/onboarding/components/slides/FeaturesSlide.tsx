import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { spacing, fontScale, moderateScale } from '../../../../../utils/dimensions';
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
          iconWidth={moderateScale(80)}
          iconHeight={moderateScale(80)}
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
    paddingHorizontal: spacing(32),
    paddingTop: spacing(124),
    marginBottom: spacing(32),
  },
  featuresTitle: {
    lineHeight: spacing(34),
  },
  featuresList: {
    width: '100%',
    paddingHorizontal: spacing(32),
    flex: 1,
    justifyContent: 'center',
  },
});
