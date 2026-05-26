import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { spacing, fontScale, moderateScale, verticalScale, isSmallDevice } from '../../../../../utils/dimensions';
import TextView from '../../../../components/TextView';
import { images } from '../../../../../constants/images';

const { OnboardingFeedIntro } = images;

interface IntroSlideProps {
  width: number;
}

export default function IntroSlide({ width }: IntroSlideProps) {
  const { colors } = useTheme();
  const smallDevice = isSmallDevice();

  const content = (
    <View style={styles.innerContainer}>
      <View style={styles.illustrationContainer}>
        <OnboardingFeedIntro width="100%" height="100%" />
      </View>

      <View style={styles.contentContainer}>
        <TextView
          variant="heading"
          align="center"
          style={[
            styles.title,
            {
              color: colors.primaryText,
              fontSize: fontScale(44),
              lineHeight: fontScale(50),
              letterSpacing: -0.5,
              fontWeight: '700',
            },
          ]}
        >
          The funniest feed on the internet
        </TextView>

        <TextView
          variant="subheading"
          align="center"
          style={{
            color: colors.secondaryText,
            fontSize: fontScale(24),
            lineHeight: fontScale(32),
            letterSpacing: -0.5,
            fontWeight: '500',
          }}
        >
          Built to bring more laughter into your day
        </TextView>
      </View>
    </View>
  );

  if (smallDevice) {
    return (
      <ScrollView
        style={{ width }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {content}
      </ScrollView>
    );
  }

  return (
    <View style={[styles.slide, { width }]}>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'space-between',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: verticalScale(20),
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'space-between',
    width: '100%',
  },
  illustrationContainer: {
    flex: 1.5,
    width: '100%',
    maxWidth: spacing(320),
    aspectRatio: 320 / 260,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: spacing(16),
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    paddingBottom: verticalScale(40),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing(-18),
    paddingHorizontal: spacing(16),
  },
  title: {
    marginBottom: spacing(12),
  },
});
