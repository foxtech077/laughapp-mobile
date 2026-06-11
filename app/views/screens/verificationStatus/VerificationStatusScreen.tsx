import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Alert, Linking } from 'react-native';
import { useTheme } from '@react-navigation/native';
import BaseView from '../../components/BaseView';
import TextView from '../../components/TextView';
import ButtonView from '../../components/ButtonView';
import {
  fontScale,
  moderateScale,
  spacing,
  verticalScale,
} from '../../../utils/dimensions';
import { images } from '../../../constants/images';

const { NotificationIcon, WarningIcon, LinkExternalIcon, VerificationIcon } = images;

const StripeIcon = () => (
  <View style={styles.stripeIconContainer}>
    <TextView size={fontScale(18)} weight="900" style={styles.stripeIconText}>
      S
    </TextView>
  </View>
);

export default function VerificationStatusScreen() {
  const { colors } = useTheme();

  const handleOpenStripe = async () => {
    const stripeUrl = 'https://dashboard.stripe.com';
    const supported = await Linking.canOpenURL(stripeUrl);

    if (supported) {
      await Linking.openURL(stripeUrl);
    } else {
      Alert.alert('Redirecting to Stripe', 'Opening Stripe verification page in browser...');
    }
  };

  return (
    <BaseView
      showHeader
      showBackButton
      headerTitle="Verification status"
      titleAlign="left"
      headerRight={
        <TouchableOpacity activeOpacity={0.7} style={styles.notificationContainer}>
          <NotificationIcon width={spacing(18)} height={spacing(21)} stroke={colors.primaryText} />
          <View style={[styles.notificationBadge, { backgroundColor: colors.unrepliedRed }]}>
            <TextView size={fontScale(10)} weight="700" style={{ color: colors.white }}>
              3
            </TextView>
          </View>
        </TouchableOpacity>
      }
      style={[styles.container, { backgroundColor: colors.white }]}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Alert Banner */}
        <TouchableOpacity
          activeOpacity={0.75}
          onPress={handleOpenStripe}
          style={[
            styles.alertBanner,
            {
              backgroundColor: colors.background_red,
              borderColor: colors.red_600,
            },
          ]}
        >
          <View style={styles.alertLeftIcon}>
            <WarningIcon width={spacing(25)} height={spacing(22)} stroke={colors.red_600} />
          </View>

          <View style={styles.alertCenter}>
            <TextView size={fontScale(20)} weight="700" style={{ color: colors.red_600 }}>
              Verification incomplete
            </TextView>
            <TextView size={fontScale(15)} weight="500" style={[styles.alertDescription, { color: colors.secondaryText }]}>
              To receive payments, please complete your business profile in <TextView weight="700" style={{ color: colors.primaryText }}>Stripe</TextView>.
            </TextView>
          </View>

          <View style={styles.alertRightIcon}>
            <LinkExternalIcon width={spacing(20)} height={spacing(20)} stroke={colors.red_600} />
          </View>
        </TouchableOpacity>

        {/* Verification Card */}
        <View style={[styles.cardContainer, { backgroundColor: colors.gray100 }]}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconCircle, { backgroundColor: colors.yellow_600 }]}>
              <VerificationIcon width={spacing(22)} height={spacing(26)} stroke={colors.primaryText} />
            </View>

            <View style={styles.cardTitleSection}>
              <TextView size={fontScale(18)} weight="700" style={{ color: colors.primaryText }}>
                Verification status
              </TextView>
              <View style={[styles.statusBadge, { backgroundColor: colors.yellow_800, borderColor: colors.yellow_700 }]}>
                <TextView size={fontScale(11)} weight="700" style={{ color: colors.yellow_700 }}>
                  Pending
                </TextView>
              </View>
            </View>
          </View>

          <View style={[styles.divider, { backgroundColor: colors.borderLight }]} />

          <TextView size={fontScale(14)} weight="500" style={[styles.cardDescription, { color: colors.secondaryText }]}>
            We are unable to proceed because the required information has not been submitted.
          </TextView>

          <ButtonView
            label="Check verification status in Stripe"
            variant="normal"
            fillWidth
            onPress={handleOpenStripe}
            style={styles.stripeButton}
          />
        </View>

        {/* Status Support Section */}
        <View style={styles.supportSection}>
          <StripeIcon />
          <TextView size={fontScale(13)} weight="500" style={[styles.supportText, { color: colors.secondaryText }]}>
            Verification is handled by <TextView weight="700" style={{ color: colors.primaryText }}>Stripe</TextView> to keep payouts safe and compliant.
          </TextView>
        </View>
      </ScrollView>
    </BaseView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing(16),
    paddingTop: spacing(12),
    paddingBottom: spacing(30),
  },
  notificationContainer: {
    position: 'relative',
    marginRight: spacing(4),
  },
  notificationBadge: {
    position: 'absolute',
    top: -spacing(4),
    right: -spacing(4),
    width: spacing(16),
    height: spacing(16),
    borderRadius: moderateScale(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertBanner: {
    flexDirection: 'row',
    borderWidth: 1.5,
    borderRadius: moderateScale(10),
    padding: spacing(14),
    marginBottom: spacing(16),
    alignItems: 'flex-start',
  },
  alertLeftIcon: {
    marginRight: spacing(10),
    marginTop: spacing(2),
  },
  alertCenter: {
    flex: 1,
    paddingRight: spacing(6),
  },
  alertDescription: {
    marginTop: spacing(4),
    lineHeight: fontScale(18),
  },
  alertRightIcon: {
    alignSelf: 'flex-start',
    marginTop: spacing(2),
  },
  cardContainer: {
    borderRadius: moderateScale(10),
    padding: spacing(16),
    marginBottom: spacing(20),
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: spacing(48),
    height: spacing(48),
    borderRadius: moderateScale(24),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing(12),
  },
  cardTitleSection: {
    flex: 1,
    justifyContent: 'center',
    gap: spacing(4),
  },
  statusBadge: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderRadius: moderateScale(10),
    paddingHorizontal: spacing(8),
    paddingVertical: spacing(2),
  },
  divider: {
    height: 1,
    marginVertical: spacing(16),
  },
  cardDescription: {
    lineHeight: fontScale(20),
    marginBottom: spacing(20),
  },
  stripeButton: {
    height: verticalScale(48),
    borderRadius: moderateScale(24),
  },
  supportSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing(4),
    gap: spacing(12),
  },
  stripeIconContainer: {
    width: spacing(32),
    height: spacing(32),
    backgroundColor: '#635BFF',
    borderRadius: moderateScale(6),
    justifyContent: 'center',
    alignItems: 'center',
  },
  stripeIconText: {
    color: '#FFFFFF',
    fontStyle: 'italic',
    transform: [{ skewX: '-10deg' }],
  },
  supportText: {
    flex: 1,
    lineHeight: fontScale(18),
  },
});
