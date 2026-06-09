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
        <OnboardingFeedIntro width={moderateScale(250)} height={verticalScale(285)} />
      </View>

      <View style={styles.contentContainer}>
        <TextView
          variant="heading"
          align="center"
          style={[
            styles.title,
            {
              color: colors.primaryText,
              fontSize: fontScale(40),
              lineHeight: fontScale(48),
              letterSpacing: -0.5,
              fontWeight: '700',
            },
          ]}
        >
          {"The funniest feed on the internet"}
        </TextView>

        <TextView
          variant="subheading"
          align="center"
          style={{
            color: colors.secondaryText,
            fontSize: fontScale(22),
            lineHeight: fontScale(28),
            letterSpacing: -0.5,
            fontWeight: '500',
          }}
        >
          {"Built to bring more laughter into your day"}
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing(16),
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing(16),
    paddingBottom: verticalScale(20),
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  illustrationContainer: {
    width: '100%',
    maxWidth: spacing(328),
    height: verticalScale(285),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: verticalScale(24),
  },
  contentContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing(16),
    marginBottom: verticalScale(40),
  },
  title: {
    marginBottom: spacing(12),
  },
});
