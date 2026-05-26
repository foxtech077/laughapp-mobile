import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { spacing, fontScale, moderateScale, verticalScale } from '../../../../../utils/dimensions';
import TextView from '../../../../components/TextView';
import OnboardingPrimaryButton from '../../intro/components/OnboardingPrimaryButton';
import OnboardingSecondaryButton from '../../intro/components/OnboardingSecondaryButton';
import { images } from '../../../../../constants/images';

const { tipCoin2 } = images;

interface CoinSlideProps {
  width: number;
  onGetCoins: () => void;
  onSkip: () => void;
}


export default function CoinSlide({ width, onGetCoins, onSkip }: CoinSlideProps) {
  const { colors } = useTheme();

  return (
    <View style={[styles.coinSlide, { width }]}>
      {/* Centered Coin Icon */}
      <View style={styles.coinIllustrationContainer}>
        <Image source={tipCoin2} style={{ width: moderateScale(94), height: moderateScale(94) }} />
      </View>

      {/* Typography Content */}
      <View style={styles.coinTextContainer}>
        <TextView
          variant="heading"
          align="center"
          size={fontScale(44)}
          weight="700"
          style={[styles.coinTitle, { color: colors.primaryText }]}
        >
          Back your first comedian
        </TextView>

        <TextView
          variant="subheading"
          align="center"
          size={fontScale(24)}
          weight="500"
          style={{ color: colors.secondaryText, lineHeight: verticalScale(32) }}
        >
          Get coins to support the sets you love. Keep the laughs going
        </TextView>
      </View>

      {/* Action Buttons */}
      <View style={styles.coinButtonContainer}>
        <OnboardingPrimaryButton
          label="Get coins"
          onPress={onGetCoins}
        />
        <View style={{ height: spacing(12) }} />
        <OnboardingSecondaryButton
          label="Skip for now"
          onPress={onSkip}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  coinSlide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coinIllustrationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing(24),
    marginTop: spacing(30),
  },
  coinTextContainer: {
    alignItems: 'center',
    paddingHorizontal: spacing(22),
    marginBottom: spacing(40),
  },
  coinTitle: {
    marginBottom: spacing(12),
    lineHeight: verticalScale(50),
  },
  coinButtonContainer: {
    width: '100%',
    paddingHorizontal: spacing(32),
    marginBottom: verticalScale(48),
  },
});
