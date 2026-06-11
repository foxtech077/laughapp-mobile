import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Alert, Linking } from 'react-native';
import { useTheme } from '@react-navigation/native';
import TextView from '../../components/TextView';
import ButtonView from '../../components/ButtonView';
import {
  fontScale,
  moderateScale,
  spacing,
  verticalScale,
} from '../../../utils/dimensions';
import { images } from '../../../constants/images';
import LinearGradient from 'react-native-linear-gradient';
import BaseView from '../../hoc/BaseView';

const { WarningIcon, LinkExternalIcon, VerificationIcon, StripeIcon } = images;

export default function VerificationStatusScreen({ route }: any) {
  const { colors } = useTheme();
  const status = route?.params?.status || 'pending';
  const handleOpenStripe = async () => {
    const stripeUrl = 'https://dashboard.stripe.com';
    const supported = await Linking.canOpenURL(stripeUrl);

    if (supported) {
      await Linking.openURL(stripeUrl);
    } else {
      Alert.alert('Redirecting to Stripe', 'Opening Stripe verification page in browser...');
    }
  };

  const statusConfig = {
    pending: {
      badgeText: 'Pending',
      badgeBgColor: colors.yellow_800,
      badgeBorderColor: colors.yellow_500,
      badgeTextColor: colors.yellow_500,
      description: 'Your submitted information is currently under review. We will notify you once complete.',
      hasButton: true,
      buttonLabel: 'Check verification status in Stripe',
      showAlert: false,
    },
    completed: {
      badgeText: 'Completed',
      badgeBgColor: colors.verificationCompletedBg,
      badgeBorderColor: colors.verificationCompletedBorder,
      badgeTextColor: colors.verificationCompletedText,
      description: 'Your account has been approved for payouts. You can now start receiving your earnings.',
      hasButton: false,
      buttonLabel: '',
      showAlert: false,
    },
    failed: {
      badgeText: 'Failed',
      badgeBgColor: colors.background_red,
      badgeBorderColor: colors.red_600,
      badgeTextColor: colors.red_600,
      description: 'There is an issue with the submitted information. Please review and correct the details.',
      hasButton: true,
      buttonLabel: 'Verify again',
      showAlert: true,
    },
  };

  const config = statusConfig[status as 'pending' | 'completed' | 'failed'] || statusConfig.pending;

  return (
    <BaseView
      showHeader
      showBackButton
      headerTitle="Verification status"
      titleAlign="left"
      showNotification
      style={[styles.container, { backgroundColor: colors.white }]}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Alert Banner */}
        {config.showAlert && (
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
        )}

        {/* Verification Card */}
        <View style={[styles.cardContainer, { backgroundColor: colors.gray100, borderColor: colors.borderLight }]}>
          <View style={styles.cardHeader}>
            <LinearGradient
              colors={[
                colors.verificationGradientStart,
                colors.verificationGradientEnd,
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.iconCircle}
            >
              <VerificationIcon
                width={spacing(22)}
                height={spacing(26)}
                stroke={colors.primaryText}
              />
            </LinearGradient>

            <View style={styles.cardTitleSection}>
              <TextView size={fontScale(20)} weight="700" style={{ color: colors.primaryText }}>
                Verification status
              </TextView>
              <View style={[styles.statusBadge, { backgroundColor: config.badgeBgColor, borderColor: config.badgeBorderColor }]}>
                <TextView size={fontScale(13)} weight="600" style={{ color: config.badgeTextColor }}>
                  {config.badgeText}
                </TextView>
              </View>
            </View>
          </View>

          <View style={[styles.divider, { backgroundColor: colors.borderLight }]} />

          <TextView size={fontScale(15)} weight="500" style={[styles.cardDescription, { color: colors.primaryText, marginBottom: config.hasButton ? spacing(20) : 0 }]}>
            {config.description}
          </TextView>

          {config.hasButton && (
            <ButtonView
              label={config.buttonLabel}
              variant="normal"
              fillWidth
              onPress={handleOpenStripe}
              style={styles.stripeButton}
            />
          )}
        </View>

        {/* Status Support Section */}
        <View style={styles.supportSection}>
          <StripeIcon width={spacing(35)} height={spacing(35)} />
          <TextView size={fontScale(15)} weight="400" style={[styles.supportText, { color: colors.primaryText }]}>
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
  alertBanner: {
    flexDirection: 'row',
    borderWidth: 1,
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
    borderWidth: 1,
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
    borderRadius: moderateScale(30),
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
    borderRadius: moderateScale(20),
    paddingHorizontal: spacing(8),
  },
  divider: {
    height: 1,
    marginVertical: spacing(10),
  },
  cardDescription: {
    lineHeight: fontScale(20),
    marginBottom: spacing(20),
  },
  stripeButton: {
    paddingVertical: verticalScale(10),
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
