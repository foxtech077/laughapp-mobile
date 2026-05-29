import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import TextView from '../../../components/TextView';
import { fontScale, horizontalScale, moderateScale, spacing, verticalScale } from '../../../../utils/dimensions';
import { TipStats } from '../types';
import LinearGradient from 'react-native-linear-gradient';


interface TipInboxStatsCardProps {
  stats: TipStats;
}

export default function TipInboxStatsCard({ stats }: TipInboxStatsCardProps) {
  const { colors } = useTheme();

  return (
    <LinearGradient
      colors={[colors.tipInboxGradientStart, colors.tipInboxGradientEnd]}
      start={{ x: 0.15, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={[styles.statSection, { flex: 1 }]}>
        <TextView
          size={fontScale(22)}
          weight="800"
          style={{ color: colors.primaryText }}
        >
          {stats.earnedCoins}
        </TextView>
        <TextView
          size={fontScale(15)}
          weight="600"
          style={[styles.label, { color: colors.secondaryText }]}
        >
          Earned coins
        </TextView>
      </View>
      <View style={styles.centerSection}>
        <View style={styles.statSection}>
          <TextView
            size={fontScale(22)}
            weight="800"
            style={{ color: colors.primaryText }}
          >
            {stats.equivalent}
          </TextView>
          <TextView
            size={fontScale(15)}
            weight="600"
            style={[styles.label, { color: colors.secondaryText }]}
          >
            Equivalent
          </TextView>
        </View>

        <View style={[styles.divider, { backgroundColor: colors.borderLight }]} />

        <View style={[styles.statSection, styles.lastStatSection]}>
          <TextView
            size={fontScale(22)}
            weight="800"
            style={{ color: colors.primaryText }}
          >
            {stats.tippers}
          </TextView>
          <TextView
            size={fontScale(15)}
            weight="600"
            style={[styles.label, { color: colors.secondaryText }]}
          >
            Tippers
          </TextView>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: spacing(16),
    marginTop: spacing(4),
    marginBottom: spacing(12),
    paddingVertical: verticalScale(12),
    paddingHorizontal: spacing(16),
    borderRadius: moderateScale(8),
  },
  statSection: {
    alignItems: 'flex-start',
  },
  centerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing(20)
  },

  lastStatSection: {
    alignItems: 'flex-end',
  },
  label: {
    marginTop: spacing(4),
  },
  divider: {
    width: 1,
    height: verticalScale(28),
    marginHorizontal: spacing(10),
    alignItems: 'center',
  },
});
