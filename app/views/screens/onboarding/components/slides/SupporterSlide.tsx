import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { spacing, fontScale, moderateScale } from '../../../../../utils/dimensions';
import TextView from '../../../../components/TextView';
import OnboardingFeatureItem from '../../intro/components/OnboardingFeatureItem';
import { images } from '../../../../../constants/images';

const { SupporterHelp, SupporterPremium, SupporterLaughs } = images;

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
          title="Help comedians to win"
          hasCircleBackground={false}
        />
        <OnboardingFeatureItem
          Icon={SupporterPremium}
          title="Get premium features"
          hasCircleBackground={false}
        />
        <OnboardingFeatureItem
          Icon={SupporterLaughs}
          title="Bring more laughs into the world"
          hasCircleBackground={false}
          iconWidth={moderateScale(77)}
          iconHeight={moderateScale(76)}
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
