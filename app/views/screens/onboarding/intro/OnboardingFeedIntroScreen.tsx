import React, { useRef, useState, useCallback } from 'react';
import { StyleSheet, FlatList, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { useTheme, useNavigation } from '@react-navigation/native';
import { getScreenWidth } from '../../../../utils/dimensions';
import { routes } from '../../../../navigator/routes';
import BaseView from '../../../components/BaseView';

// Components
import OnboardingHeader from './components/OnboardingHeader';
import OnboardingFooter from './components/OnboardingFooter';

// Slides
import IntroSlide from '../components/slides/IntroSlide';
import FeaturesSlide from '../components/slides/FeaturesSlide';
import SupporterSlide from '../components/slides/SupporterSlide';
import CoinSlide from '../components/slides/CoinSlide';

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

/**
 * OnboardingFeedIntroScreen
 *
 * The main container wizard managing the horizontal swiping pager, paging dots indices,
 * navigation events, and the global safe-area Header/Footer layouts. Integrates modular encapsulated slides.
 */
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

  /**
   * Renders the corresponding onboarding step inside the pager.
   */
  const renderItem = ({ item }: { item: Slide }) => {
    const width = getScreenWidth();

    switch (item.type) {
      case 'intro':
        return <IntroSlide width={width} />;
      case 'features':
        return <FeaturesSlide width={width} />;
      case 'supporter':
        return <SupporterSlide width={width} />;
      case 'coin':
        return (
          <CoinSlide
            width={width}
            onGetCoins={handleFinishOnboarding}
            onSkip={handleFinishOnboarding}
          />
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
});
