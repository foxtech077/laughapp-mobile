import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { useTheme } from '@react-navigation/native';
import TextView from '../../../components/TextView';
import {
  fontScale,
  moderateScale,
  spacing,
  verticalScale,
} from '../../../../utils/dimensions';
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
      <View style={styles.innerView}>
        <View style={styles.firstColumn}>
          <TextView size={fontScale(22)} weight="800" style={styles.numberText}>
            {stats.earnedCoins}
          </TextView>
          <TextView
            size={fontScale(14)}
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
              style={styles.numberText}
            >
              {stats.equivalent}
            </TextView>
            <TextView
              size={fontScale(14)}
              weight="600"
              style={[styles.label, { color: colors.secondaryText }]}
            >
              Equivalent
            </TextView>
          </View>

          <View
            style={[styles.divider, { backgroundColor: colors.borderLight }]}
          />

          <View style={styles.statSection}>
            <TextView
              size={fontScale(22)}
              weight="800"
              style={styles.numberText}
            >
              {stats.tippers}
            </TextView>
            <TextView
              size={fontScale(14)}
              weight="600"
              style={[styles.label, { color: colors.secondaryText }]}
            >
              Tippers
            </TextView>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: spacing(4),
    marginBottom: spacing(12),
    marginHorizontal: spacing(16),
    borderRadius: moderateScale(8),
  },
  innerView: {
    marginVertical: verticalScale(14),
    marginHorizontal: spacing(12),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  firstColumn: {
    flex: 1,
    alignItems: 'flex-start',
  },
  statSection: {
    alignItems: 'flex-start',
  },
  centerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing(20),
  },
  numberText: {
    letterSpacing: -0.5,
    lineHeight: Platform.OS === 'ios' ? 0 : undefined,
  },
  label: {
    marginTop: spacing(3),
    letterSpacing: -0.5,
    lineHeight: Platform.OS === 'ios' ? 0 : undefined,
  },
  divider: {
    width: 1,
    height: verticalScale(28),
    marginHorizontal: spacing(10),
    alignItems: 'center',
  },
});
