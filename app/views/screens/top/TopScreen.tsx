import { View, StyleSheet, FlatList } from 'react-native';
import BaseView from '../../components/BaseView';
import TextView from '../../components/TextView';
import { useTheme } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTimer } from '../../../hooks/useTimer';
import { images } from '../../../constants/images';
import { moderateScale, spacing } from '../../../utils/dimensions';
import ComedianRankCard, { ComedianRankItem } from './components/ComedianRankCard';

const { InfoIcon, ClockIcon, BellIcon, FilterIcon } = images;

const MOCK_COMEDIAN_RANKS: ComedianRankItem[] = [
  {
    id: '1',
    name: 'Sarah Jeeper',
    avatar: images.sandeep,
    supportedCount: 4819,
    trendDirection: 'up',
    trendValue: 3,
    score: 2540,
    rank: 1,
  },
  {
    id: '2',
    name: 'Mark Chen',
    avatar: images.sandeep,
    supportedCount: 3871,
    trendDirection: 'up',
    trendValue: 2,
    score: 2532,
    rank: 2,
  },
  {
    id: '3',
    name: 'Linta Rixon',
    avatar: images.sandeep,
    supportedCount: 3617,
    trendDirection: 'down',
    trendValue: 8,
    score: 2530,
    rank: 3,
  },
  {
    id: '4',
    name: 'David Geller',
    avatar: images.sandeep,
    supportedCount: 2910,
    trendDirection: 'up',
    trendValue: 3,
    score: 2527,
    rank: 4,
  },
  {
    id: '5',
    name: 'Nivin Pauly',
    avatar: images.sandeep,
    supportedCount: 2678,
    trendDirection: 'down',
    trendValue: 10,
    score: 2522,
    rank: 5,
  },
  {
    id: '6',
    name: 'Nivin Pauly',
    avatar: images.sandeep,
    supportedCount: 2678,
    trendDirection: 'down',
    trendValue: 10,
    score: 2522,
    rank: 6,
  },
  {
    id: '7',
    name: 'Nivin Pauly',
    avatar: images.sandeep,
    supportedCount: 2678,
    trendDirection: 'down',
    trendValue: 10,
    score: 2522,
    rank: 7,
  },
  {
    id: '8',
    name: 'Nivin Pauly',
    avatar: images.sandeep,
    supportedCount: 2678,
    trendDirection: 'down',
    trendValue: 10,
    score: 2522,
    rank: 8,
  },
  {
    id: '9',
    name: 'Nivin Pauly',
    avatar: images.sandeep,
    supportedCount: 2678,
    trendDirection: 'down',
    trendValue: 10,
    score: 2522,
    rank: 9,
  },
  {
    id: '10',
    name: 'Nivin Pauly',
    avatar: images.sandeep,
    supportedCount: 2678,
    trendDirection: 'down',
    trendValue: 10,
    score: 2522,
    rank: 10,
  },
];

function TopScreen() {
  const { colors } = useTheme();
  const { top } = useSafeAreaInsets();
  const { formatted, resetTimer } = useTimer(60 * 5, {
    autoStart: true,
    onComplete: () => {
      console.log('Timer completed');
    },
  });

  return (
    <BaseView applyTopInset={false}>
      <View
        style={[
          styles.topNotch,
          { backgroundColor: colors.primaryYellow, paddingTop: top },
        ]}
      >
        <View style={styles.topInfoContainer}>
          <View style={styles.topInfoContent}>
            <ClockIcon width={16} height={16} style={styles.clockIcon} />
            <TextView variant="info">Next drop in : </TextView>
            <TextView variant="info" weight={'800'}>
              {formatted}
            </TextView>
            <View
              style={[
                styles.infoIconWrapper,
                { backgroundColor: colors.statsGradientStart },
              ]}
            >
              <InfoIcon width={16} height={16} />
              <TextView variant="info" weight={'600'} color={colors.black}>
                Info
              </TextView>
            </View>
          </View>
          <BellIcon width={28} height={28} />
        </View>
        <View style={styles.topFilterContainer}>
          <View style={styles.topFilterContent}>
            <TextView variant='subtitle' weight={'700'}>
              Comedians
            </TextView>
            <TextView variant='subtitle' weight={'700'}>
              Clips
            </TextView>
            <TextView variant='subtitle' weight={'700'}>
              Gretest Hits
            </TextView>
          </View>
          <FilterIcon width={28} height={28} />
        </View>
      </View>
      <View style={[styles.topComediansContainer, { backgroundColor: colors.cardBackground }]}>
        <FlatList
          data={MOCK_COMEDIAN_RANKS}
          renderItem={({ item }) => <ComedianRankCard item={item} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.comediansListContent}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </BaseView>
  );
}

const styles = StyleSheet.create({
  topNotch: {
    gap: spacing(16),
  },
  topInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: spacing(16),
  },
  topFilterContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing(12),
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
  topComediansContainer: {
    flex: 1,
    borderTopLeftRadius: moderateScale(30),
    borderTopRightRadius: moderateScale(30),
    marginTop: -spacing(25),
    width: '100%',
    zIndex: 2,
    paddingHorizontal: spacing(16),
    paddingTop: spacing(20),
  },
  comediansListContent: {
    paddingBottom: spacing(24),
  },
});

export default TopScreen;
