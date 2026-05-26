import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { ExtendedTheme, useTheme } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TextView from '../../../components/TextView';
import { useTimer } from '../../../../hooks/useTimer';
import { images } from '../../../../constants/images';
import { fontScale, moderateScale, spacing } from '../../../../utils/dimensions';

const { InfoIcon, ClockIcon, BellIcon, FilterIcon } = images;

export type TopTab = 'comedians' | 'clips' | 'greatestHits';

const TOP_TABS: { id: TopTab; label: string }[] = [
  { id: 'comedians', label: 'Comedians' },
  { id: 'clips', label: 'Clips' },
  { id: 'greatestHits', label: 'Greatest Hits' },
];

const INDICATOR_WIDTH_RATIO = 0.65;
const TAB_ANIM_DURATION = 200;

interface TopTabBarProps {
  selectedTab: TopTab;
  onTabPress: (tab: TopTab) => void;
}

interface AnimatedTabListProps {
  selectedTab: TopTab;
  onTabPress: (tab: TopTab) => void;
};

const renderColor = (selectedTab: TopTab, colors: ExtendedTheme['colors']) => {
  if (selectedTab === 'comedians') {
    return colors.black;
  }
  return colors.white;
}

function AnimatedTabList({ selectedTab, onTabPress }: AnimatedTabListProps) {
  const { colors } = useTheme();
  const tabLayouts = useRef<Partial<Record<TopTab, { x: number; width: number }>>>({});
  const indicatorLeft = useRef(new Animated.Value(0)).current;
  const indicatorWidth = useRef(new Animated.Value(0)).current;
  const [isIndicatorReady, setIsIndicatorReady] = useState(false);

  const tabAnims = useRef(
    Object.fromEntries(
      TOP_TABS.map(tab => [
        tab.id,
        new Animated.Value(tab.id === selectedTab ? 1 : 0),
      ]),
    ) as Record<TopTab, Animated.Value>,
  ).current;

  const animateIndicator = useCallback(
    (tab: TopTab) => {
      const layout = tabLayouts.current[tab];
      if (!layout) {
        return;
      }

      const width = layout.width * INDICATOR_WIDTH_RATIO;
      const left = layout.x + (layout.width - width) / 2;

      Animated.parallel([
        Animated.spring(indicatorLeft, {
          toValue: left,
          useNativeDriver: false,
          tension: 180,
          friction: 20,
        }),
        Animated.spring(indicatorWidth, {
          toValue: width,
          useNativeDriver: false,
          tension: 180,
          friction: 20,
        }),
      ]).start();
    },
    [indicatorLeft, indicatorWidth],
  );

  const setIndicatorPosition = useCallback(
    (tab: TopTab) => {
      const layout = tabLayouts.current[tab];
      if (!layout) {
        return;
      }

      const width = layout.width * INDICATOR_WIDTH_RATIO;
      const left = layout.x + (layout.width - width) / 2;

      indicatorLeft.setValue(left);
      indicatorWidth.setValue(width);
      setIsIndicatorReady(true);
    },
    [indicatorLeft, indicatorWidth],
  );

  const handleTabLayout = (tab: TopTab, x: number, width: number) => {
    tabLayouts.current[tab] = { x, width };

    if (tab === selectedTab && !isIndicatorReady) {
      setIndicatorPosition(tab);
    }
  };

  useEffect(() => {
    if (isIndicatorReady) {
      animateIndicator(selectedTab);
    }
  }, [selectedTab, isIndicatorReady, animateIndicator]);

  useEffect(() => {
    TOP_TABS.forEach(tab => {
      Animated.timing(tabAnims[tab.id], {
        toValue: selectedTab === tab.id ? 1 : 0,
        duration: TAB_ANIM_DURATION,
        useNativeDriver: false,
      }).start();
    });
  }, [selectedTab, tabAnims]);

  return (
    <View style={styles.tabListContainer}>
      {TOP_TABS.map(tab => {
        const isSelected = selectedTab === tab.id;

        return (
          <TouchableOpacity
            key={tab.id}
            onPress={() => onTabPress(tab.id)}
            style={styles.tabItem}
            activeOpacity={0.7}
            onLayout={event => {
              const { x, width } = event.nativeEvent.layout;
              handleTabLayout(tab.id, x, width);
            }}
          >
            <Animated.Text
              style={[
                styles.tabLabel,
                {
                  color: tabAnims[tab.id].interpolate({
                    inputRange: [0, 1],
                    outputRange: [selectedTab === 'comedians' ? colors.subtitle : colors.border, selectedTab === 'comedians' ? colors.black : colors.white],
                  }),
                  fontWeight: isSelected ? '700' : '500',
                },
              ]}
            >
              {tab.label}
            </Animated.Text>
          </TouchableOpacity>
        );
      })}

      {isIndicatorReady && (
        <Animated.View
          style={[
            styles.tabIndicator,
            {
              backgroundColor: renderColor(selectedTab, colors) as any,
              left: indicatorLeft,
              width: indicatorWidth,
            },
          ]}
        />
      )}
    </View>
  );
}

function TopTabBar({ selectedTab, onTabPress }: TopTabBarProps) {
  const { colors } = useTheme();
  const { top } = useSafeAreaInsets();
  const { formatted } = useTimer(60 * 5, {
    autoStart: true,
    onComplete: () => {
      console.log('Timer completed');
    },
  });

  return (
    <View
      style={[
        selectedTab === 'comedians' ? styles.topNotch : styles.topNotchTransparent,
        { paddingTop: top, backgroundColor: selectedTab === 'comedians' ? colors.primaryYellow : 'transparent' },
      ]}
    >
      <View style={styles.topInfoContainer}>
        <View style={styles.topInfoContent}>
          <ClockIcon
            width={16}
            height={16}
            color={renderColor(selectedTab, colors) as any}
            style={styles.clockIcon}
          />
          <TextView variant="info" color={renderColor(selectedTab, colors) as any}>Next drop in : </TextView>
          <TextView variant="info" weight={'800'} color={renderColor(selectedTab, colors) as any}>
            {formatted}
          </TextView>
          {selectedTab === 'comedians' && <View
            style={[
              styles.infoIconWrapper,
              { backgroundColor: colors.statsGradientStart },
            ]}
          >
            <InfoIcon width={16} height={16} color={colors.black} />
            <TextView variant="info" weight={'600'} color={renderColor(selectedTab, colors) as any}>
              Info
            </TextView>
          </View>}
        </View>
        <BellIcon width={28} height={28} color={renderColor(selectedTab, colors) as any} />
      </View>
      <View style={styles.topFilterContainer}>
        <AnimatedTabList selectedTab={selectedTab} onTabPress={onTabPress} />
        <FilterIcon width={28} height={28} color={renderColor(selectedTab, colors) as any} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topNotch: {
    gap: spacing(16),
  },
  topNotchTransparent: {
    gap: spacing(16),
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  topInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: spacing(16),
  },
  topInfoContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clockIcon: {
    marginRight: spacing(4),
  },
  infoIconWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: spacing(8),
    gap: spacing(4),
    padding: spacing(4),
    borderRadius: moderateScale(30),
  },
  topFilterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing(16),
    paddingBottom: spacing(40),
  },
  tabListContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing(12),
    position: 'relative',
    paddingBottom: spacing(7),
  },
  tabItem: {
    alignItems: 'center',
    paddingBottom: spacing(4),
  },
  tabLabel: {
    fontSize: fontScale(18),
    letterSpacing: -0.5,
    lineHeight: fontScale(26),
  },
  tabIndicator: {
    position: 'absolute',
    bottom: 0,
    height: moderateScale(3),
    borderRadius: moderateScale(2),
  },
});

export default TopTabBar;
