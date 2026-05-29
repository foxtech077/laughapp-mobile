import React from 'react';
import { View, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '@react-navigation/native';
import TextView from '../../../components/TextView';
import { images } from '../../../../constants/images';
import { moderateScale, spacing } from '../../../../utils/dimensions';

const { TrendUpIcon, TrendDownIcon, SupporterIcon } = images;

const TREND_UP_COLOR = '#16A34A';
const TREND_DOWN_COLOR = '#DC2626';

const RANK_GRADIENTS: Record<number, [string, string]> = {
  1: ['#FFD837', '#FFC3A0'],
  2: ['#FFDCC7', '#FFE98C'],
  3: ['#FFEEE5', '#FFF3C0'],
};

export type ComedianRankTrend = 'up' | 'down';

export interface ComedianRankItem {
  id: string;
  name: string;
  avatar: ImageSourcePropType;
  supportedCount: number;
  trendDirection: ComedianRankTrend;
  trendValue: number;
  score: number;
  rank: number;
}

interface ComedianRankCardProps {
  item: ComedianRankItem;
}

function ComedianRankCard({ item }: ComedianRankCardProps) {
  const { colors } = useTheme();
  const isTopThree = item.rank <= 3;
  const gradientColors = RANK_GRADIENTS[item.rank];
  const trendColor = item.trendDirection === 'up' ? TREND_UP_COLOR : TREND_DOWN_COLOR;
  const TrendIcon = item.trendDirection === 'up' ? TrendUpIcon : TrendDownIcon;

  const cardContent = (
    <View style={styles.cardInner}>
      <Image
        source={item.avatar}
        style={[styles.avatar, { backgroundColor: colors.videoPlaceholder }]}
        resizeMode="cover"
      />

      <View style={styles.detailsSection}>
        <TextView size={17} weight="700" style={{ color: colors.black }} numberOfLines={1}>
          {item.name}
        </TextView>

        <View style={styles.statsRow}>
          <View style={styles.statGroup}>
            <SupporterIcon width={spacing(18)} height={spacing(18)} />
            <TextView size={14} weight="700" style={{ color: colors.black }}>
              {'\u00B7'} {item.supportedCount}
            </TextView>
          </View>

          <View style={[styles.statDivider, { backgroundColor: colors.border }]} />

          <View style={styles.statGroup}>
            <TrendIcon width={spacing(14)} height={spacing(14)} />
            <TextView size={14} weight="700" style={{ color: trendColor }}>
              {'\u00B7'} {item.trendValue}
            </TextView>
          </View>
        </View>
      </View>

      <View style={styles.scoreSection}>
        <TextView size={13} weight="400" style={{ color: colors.subtitle }}>
          Score
        </TextView>
        <TextView size={18} weight="700" style={{ color: colors.black }}>
          {item.score}
        </TextView>
      </View>

      <View
        style={[
          styles.rankBox,
          { backgroundColor: colors.white, borderColor: colors.cardBorder },
        ]}
      >
        <TextView size={13} weight="400" style={{ color: colors.subtitle }}>
          Rank
        </TextView>
        <TextView size={18} weight="700" style={{ color: colors.black }}>
          #{item.rank}
        </TextView>
      </View>
    </View>
  );

  if (isTopThree && gradientColors) {
    return (
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.cardContainer}
      >
        {cardContent}
      </LinearGradient>
    );
  }

  return (
    <View
      style={[
        styles.cardContainer,
        { backgroundColor: colors.white },
        styles.cardBordered,
      ]}
    >
      {cardContent}
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: moderateScale(16),
    marginBottom: spacing(4),
    overflow: 'hidden',
  },
  cardBordered: {
    // borderWidth: 1,
  },
  cardInner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing(12),
    paddingHorizontal: spacing(12),
    gap: spacing(10),
  },
  avatar: {
    width: spacing(54),
    height: spacing(54),
    borderRadius: spacing(24),
  },
  detailsSection: {
    flex: 1,
    justifyContent: 'center',
    gap: spacing(4),
    minWidth: 0,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing(8),
  },
  statGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing(4),
  },
  statDivider: {
    width: 1,
    height: spacing(12),
  },
  scoreSection: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    minWidth: spacing(44),
  },
  rankBox: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: moderateScale(12),
    height: spacing(64),
    width: spacing(64),
    gap: spacing(2),
    paddingHorizontal: spacing(8),
  },
});

export default ComedianRankCard;
