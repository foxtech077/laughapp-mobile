import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useTheme, useNavigation } from '@react-navigation/native';
import { routes } from '../../../navigator/routes';
import TextView from '../../components/TextView';
import ButtonView from '../../components/ButtonView';
import { ChevronRight } from 'lucide-react-native'
import {
  fontScale,
  moderateScale,
  spacing,
  verticalScale,
} from '../../../utils/dimensions';
import { images } from '../../../constants/images';
import Svg, { Circle, Path } from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import BaseView from '../../hoc/BaseView';

const { WarningIcon } = images;

interface PayoutItem {
  id: string;
  amount: string;
  date: string;
  status: 'paid' | 'pending' | 'failed';
}

const MOCK_PAYOUTS: PayoutItem[] = [
  { id: '1', amount: '$1,346.41', date: 'Jan 23, 2026', status: 'paid' },
  { id: '2', amount: '$1,486.92', date: 'Jan 22, 2026', status: 'failed' },
  { id: '3', amount: '$612.48', date: 'Jan 20, 2026', status: 'pending' },
  { id: '4', amount: '$2,912.27', date: 'Jan 18, 2026', status: 'paid' },
  { id: '5', amount: '$1,123.27', date: 'Jan 16, 2026', status: 'pending' },
  { id: '6', amount: '$1,123.27', date: 'Jan 16, 2026', status: 'paid' },
  { id: '7', amount: '$391.02', date: 'Jan 14, 2026', status: 'paid' },
  { id: '8', amount: '$982.72', date: 'Jan 10, 2026', status: 'paid' },
  { id: '9', amount: '$827.01', date: 'Jan 09, 2026', status: 'failed' },
];

export default function PayoutHistoryScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const handleStripePress = () => {
    Alert.alert('Stripe Redirect', 'Opening Stripe payout dashboard...');
  };

  const getStatusConfig = (status: PayoutItem['status']) => {
    switch (status) {
      case 'paid':
        return {
          text: 'Paid',
          color: colors.green_600,
          backgroundColor: colors.verificationCompletedBg,
        };
      case 'pending':
        return {
          text: 'Pending',
          color: colors.yellow_500,
          backgroundColor: colors.yellow_800,
        };
      case 'failed':
      default:
        return {
          text: 'Failed',
          color: colors.red_600,
          backgroundColor: colors.background_red,
        };
    }
  };

  const renderItem = ({ item }: { item: PayoutItem }) => {
    const config = getStatusConfig(item.status);
    return (
      <View style={styles.rowItem}>
        <View style={styles.rowLeft}>
          <TextView size={fontScale(18)} weight="700" style={{ color: colors.primaryText }}>
            {item.amount}
          </TextView>
          <TextView size={fontScale(15)} weight="500" style={[styles.dateText, { color: colors.secondaryText }]}>
            {item.date}
          </TextView>
        </View>

        <View style={styles.rowRight}>
          <View style={[styles.statusBadge, { borderColor: config.color, backgroundColor: config.backgroundColor }]}>
            <TextView size={fontScale(12)} weight="600" style={{ color: config.color }}>
              {config.text}
            </TextView>
          </View>
          <ChevronRight size={spacing(18)} />
        </View>
      </View>
    );
  };

  return (
    <BaseView
      showHeader
      showBackButton
      headerTitle="Payout history"
      titleAlign="left"
      showNotification
      style={[styles.container, { backgroundColor: colors.white }]}
      applyBottomInset
    >
      <View style={styles.content}>
        {/* Verification Warning Banner */}
        <TouchableOpacity
          activeOpacity={0.75}
          onPress={() => navigation.navigate(routes.VERIFICATION_STATUS_SCREEN as never)}
          style={[
            styles.verificationWarningBanner,
            {
              backgroundColor: colors.background_red,
              borderColor: colors.red_700,
            },
          ]}
        >
          <View style={styles.warningBannerIcon}>
            <WarningIcon width={spacing(18)} height={spacing(18)} stroke={colors.red_600} />
          </View>
          <TextView size={fontScale(13)} weight="600" style={{ color: colors.red_600, flex: 1 }}>
            Verification incomplete. Please complete your profile.
          </TextView>
          <ChevronRight size={spacing(18)} stroke={colors.red_600} />
        </TouchableOpacity>

        {/* Summary Card */}
        <View style={[styles.cardContainer]}>
          <LinearGradient
            colors={[colors.tipInboxGradientStart, colors.tipInboxGradientEnd]}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
          {/* <CardPattern /> */}
          <View style={styles.cardContent}>
            <TextView size={fontScale(16)} weight="500" style={{ color: colors.primaryText }}>
              Total payout to date
            </TextView>
            <TextView size={fontScale(32)} weight="800" style={[styles.amountText, { color: colors.primaryText }]}>
              $3,571.24
            </TextView>
            <ButtonView
              label="View all on Stripe"
              fillWidth
              onPress={handleStripePress}
              style={styles.stripeButton}
            />
          </View>
        </View>

        {/* FlatList */}
        <FlatList
          data={MOCK_PAYOUTS}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View style={[styles.separator, { backgroundColor: colors.borderLight }]} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </BaseView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing(16),
  },
  cardContainer: {
    borderRadius: moderateScale(8),
    overflow: 'hidden',
    marginTop: spacing(8),
    marginBottom: spacing(16),
    position: 'relative',
  },
  cardContent: {
    padding: spacing(16),
    zIndex: 1,
  },
  amountText: {
    marginTop: spacing(6),
    marginBottom: spacing(10),
    lineHeight: spacing(38)
  },
  stripeButton: {
    paddingVertical: verticalScale(10),
  },
  patternContainer: {
    ...StyleSheet.absoluteFill,
  },
  patternSvg: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  listContent: {
    paddingHorizontal: spacing(10),
    paddingBottom: spacing(30),
  },
  rowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing(14),
  },
  rowLeft: {
    flex: 1,
  },
  dateText: {
    marginTop: spacing(4),
    fontSize: fontScale(15),
    fontWeight: '500',


  },
  rowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing(5),
  },
  statusBadge: {
    paddingHorizontal: spacing(6),
    borderRadius: moderateScale(20),
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    height: 1,
    marginHorizontal: spacing(-10)
  },
  verificationWarningBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: moderateScale(8),
    paddingHorizontal: spacing(12),
    paddingVertical: spacing(10),
    marginTop: spacing(8),
    marginBottom: spacing(8),
  },
  warningBannerIcon: {
    marginRight: spacing(8),
  },
});
