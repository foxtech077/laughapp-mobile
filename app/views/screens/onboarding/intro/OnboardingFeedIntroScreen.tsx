import React, { useRef, useState, useCallback } from 'react';
import { View, StyleSheet, FlatList, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { useTheme, useNavigation } from '@react-navigation/native';
import { spacing, getScreenWidth, moderateScale, verticalScale } from '../../../../utils/dimensions';
import { routes } from '../../../../navigator/routes';
import BaseView from '../../../components/BaseView';
import TextView from '../../../components/TextView';
import OnboardingHeader from './components/OnboardingHeader';
import OnboardingFooter from './components/OnboardingFooter';
import OnboardingFeatureItem from './components/OnboardingFeatureItem';
import OnboardingPrimaryButton from './components/OnboardingPrimaryButton';
import OnboardingSecondaryButton from './components/OnboardingSecondaryButton';
import { images } from '../../../../constants/images';

const { OnboardingFeedIntro, OnboardingCoin, LaughIcon1, SupporterIcon, OnboardingWatch, SupporterHelp, SupporterPremium, SupporterLaughs } = images;
interface Slide {
  id: string;
  type: 'intro' | 'features' | 'supporter' | 'coin';
}

const SLIDES: Slide[] = [
  { id: '1', type: 'intro' },
  { id: '2', type: 'features' },
  { id: '3', type: 'supporter' },
  { id: '4', type: 'coin' },
];

export default function OnboardingFeedIntroScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const flatListRef = useRef<FlatList<Slide>>(null);

  const handleSkip = useCallback(() => {
    navigation.replace(routes.HOME_TABS);
  }, [navigation]);

  const handleFinishOnboarding = useCallback(() => {
    navigation.navigate(routes.ONBOARDING_CHOOSE_ROLE_SCREEN);
  }, [navigation]);

  const handleNextPress = useCallback(() => {
    if (activeIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: activeIndex + 1,
        animated: true,
      });
    }
  }, [activeIndex]);

  const handleBackPress = useCallback(() => {
    if (activeIndex > 0) {
      flatListRef.current?.scrollToIndex({
        index: activeIndex - 1,
        animated: true,
      });
    }
  }, [activeIndex]);

  const onScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const width = getScreenWidth();
    const index = Math.round(contentOffsetX / width);
    if (index !== activeIndex && index >= 0 && index < SLIDES.length) {
      setActiveIndex(index);
    }
  }, [activeIndex]);


  const renderItem = ({ item }: { item: Slide }) => {
    const width = getScreenWidth();

    switch (item.type) {
      case 'intro':
        return (
          <View style={[styles.slide, { width }]}>
            <View style={styles.illustrationContainer}>
              <OnboardingFeedIntro width="100%" height="100%" />
            </View>

            <View style={styles.contentContainer}>
              <TextView
                variant="heading"
                align="center"
                size={30}
                weight="800"
                style={[styles.title, { color: colors.primaryText }]}
              >
                The funniest feed on the internet
              </TextView>

              <TextView
                variant="subheading"
                align="center"
                size={16}
                weight="500"
                style={{ color: colors.secondaryText, lineHeight: spacing(22) }}
              >
                Built to bring more laughter into your day
              </TextView>
            </View>
          </View>
        );

      case 'features':
        return (
          <View style={[styles.slide, { width }]}>
            <View style={styles.featuresHeader}>
              <TextView
                variant="heading"
                size={28}
                weight="800"
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
                Icon={LaughIcon1}
                title="Laugh"
                description="React when it hits"
              />
              <OnboardingFeatureItem
                Icon={SupporterIcon}
                title="Support"
                description="Back the comedians you love"
              />
            </View>
          </View>
        );

      case 'supporter':
        return (
          <View style={[styles.slide, { width }]}>
            <View style={styles.featuresHeader}>
              <TextView
                variant="heading"
                size={28}
                weight="800"
                style={[styles.featuresTitle, { color: colors.primaryText }]}
              >
                Become a supporter:
              </TextView>
            </View>

            <View style={styles.featuresList}>
              <OnboardingFeatureItem
                Icon={SupporterHelp}
                title="Help comedians to win"
              />
              <OnboardingFeatureItem
                Icon={SupporterPremium}
                title="Get premium features"
              />
              <OnboardingFeatureItem
                Icon={SupporterLaughs}
                title="Bring more laughs into the world"
              />
            </View>
          </View>
        );

      case 'coin':
        return (
          <View style={[styles.slide, { width, paddingBottom: spacing(24) }]}>
            {/* Centered Coin Icon */}
            <View style={styles.coinIllustrationContainer}>
              <OnboardingCoin width={moderateScale(120)} height={moderateScale(120)} />
            </View>

            {/* Typography Content */}
            <View style={styles.coinTextContainer}>
              <TextView
                variant="heading"
                align="center"
                size={28}
                weight="800"
                style={[styles.coinTitle, { color: colors.primaryText }]}
              >
                Back your first comedian
              </TextView>

              <TextView
                variant="subheading"
                align="center"
                size={16}
                weight="500"
                style={{ color: colors.secondaryText, lineHeight: spacing(22) }}
              >
                Get coins to support the sets you love. Keep the laughs going
              </TextView>
            </View>

            {/* Action Buttons */}
            <View style={styles.buttonContainer}>
              <OnboardingPrimaryButton
                label="Get coins"
                onPress={handleFinishOnboarding}
              />
              <View style={{ height: spacing(12) }} />
              <OnboardingSecondaryButton
                label="Skip for now"
                onPress={handleFinishOnboarding}
              />
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <BaseView
      style={[styles.container, { backgroundColor: colors.white }]}
      showHeader={false}
      applyTopInset={true}
      applyBottomInset={true}
    >
      {/* Top Header - Skip Button toggles hidden on screen 4 */}
      <OnboardingHeader onSkip={handleSkip} showSkip={activeIndex < 3} />

      {/* Swipeable Pager Layout */}
      <FlatList
        ref={flatListRef}
        data={SLIDES}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        style={styles.flatList}
      />

      {/* Footer Navigation - Hidden on screen 4 */}
      {activeIndex < 3 ? (
        <OnboardingFooter
          activeIndex={activeIndex}
          onNext={handleNextPress}
          onBack={activeIndex > 0 ? handleBackPress : undefined}
        />
      ) : null}
    </BaseView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatList: {
    flex: 1,
  },
  slide: {
    flex: 1,
    justifyContent: 'space-between',
  },
  illustrationContainer: {
    flex: 1.5,
    width: '100%',
    maxWidth: spacing(320),
    aspectRatio: 320 / 260,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing(32),
  },
  title: {
    marginBottom: spacing(12),
    lineHeight: spacing(36),
  },
  featuresHeader: {
    width: '100%',
    paddingHorizontal: spacing(32),
    paddingTop: spacing(20),
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
  coinIllustrationContainer: {
    flex: 1.2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing(30),
  },
  coinTextContainer: {
    flex: 1,
    paddingHorizontal: spacing(32),
    justifyContent: 'center',
    alignItems: 'center',
  },
  coinTitle: {
    marginBottom: spacing(12),
    lineHeight: spacing(34),
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: spacing(32),
    marginTop: spacing(20),
  },
});
