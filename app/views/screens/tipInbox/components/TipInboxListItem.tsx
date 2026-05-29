import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import TextView from '../../../components/TextView';
import { fontScale, moderateScale, spacing } from '../../../../utils/dimensions';
import { TipItem } from '../types';
import TipInboxCheckbox from './TipInboxCheckbox';
import TipInboxStatusBadge from './TipInboxStatusBadge';
import { images } from '../../../../constants/images';
import LinearGradient from 'react-native-linear-gradient';
const { SupporterIcon } = images;

interface TipInboxListItemProps {
  item: TipItem;
  checked: boolean;
  onCheckboxPress: () => void;
  onPress: () => void;
}

export default function TipInboxListItem({
  item,
  checked,
  onCheckboxPress,
  onPress,
}: TipInboxListItemProps) {
  const { colors } = useTheme();
  const isUnreplied = item.status === 'unreplied';

  return (
    <View style={{ backgroundColor: colors.white }}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPress}
        style={styles.rowContainer}
      >
        <View style={styles.leftWrapper}>
          {/* Conditional checkbox - only rendered for unreplied tippers */}
          {isUnreplied ? (
            <View style={styles.checkboxWrapper}>
              <TipInboxCheckbox
                checked={checked}
                onPress={onCheckboxPress}
              />
            </View>
          ) : (
            <View style={styles.checkboxPlaceholder} />
          )}

          {/* Avatar container with optional gold coin overlay badge */}
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: item.avatar }}
              style={[styles.avatar, { backgroundColor: colors.videoPlaceholder }]}
              resizeMode="cover"
            />
            {item.hasCoinBadge && (
              <LinearGradient
                colors={[colors.supporterGradientStart, colors.supporterGradientEnd]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[styles.coinBadgeContainer, { borderColor: colors.white }]}
              >
                <SupporterIcon
                  width={spacing(15)}
                  height={spacing(15)}
                />
              </LinearGradient>
            )}
          </View>

          {/* User Details */}
          <View style={styles.textDetails}>
            <TextView
              size={fontScale(18)}
              weight="700"
              style={{ color: colors.primaryText }}
              numberOfLines={1}
            >
              {item.name}
            </TextView>
            <TextView
              size={fontScale(15)}
              weight="600"
              style={{ color: colors.placeholder, marginTop: spacing(2) }}
              numberOfLines={1}
            >
              {item.username}
            </TextView>
          </View>
        </View>

        {/* Right Column: Coins + Status Badge */}
        <View style={styles.rightWrapper}>
          <TextView
            size={fontScale(18)}
            weight="700"
            style={[styles.coinsText, { color: colors.primaryText }]}
          >
            {`${item.coins} Coins`}
          </TextView>
          <View style={styles.badgeWrapper}>
            <TipInboxStatusBadge status={item.status} />
          </View>
        </View>
      </TouchableOpacity>
      <View style={[styles.separator, { backgroundColor: colors.tipDivider }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing(8),
    paddingHorizontal: spacing(16),
  },
  leftWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  checkboxWrapper: {
    marginRight: spacing(8),
  },
  checkboxPlaceholder: {
    width: moderateScale(22) + spacing(8),
  },
  avatarContainer: {
    position: 'relative',
    marginRight: spacing(12),
  },
  avatar: {
    width: moderateScale(44),
    height: moderateScale(44),
    borderRadius: moderateScale(22),
  },
  coinBadgeContainer: {
    position: 'absolute',
    bottom: -spacing(2),
    right: -spacing(2),

    width: moderateScale(22),
    height: moderateScale(22),

    borderRadius: moderateScale(20),

    justifyContent: 'center',
    alignItems: 'center',

    borderWidth: moderateScale(2),

    padding: spacing(6),
  },
  textDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  rightWrapper: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginLeft: spacing(12),
  },
  coinsText: {
    marginBottom: spacing(4),
  },
  badgeWrapper: {
    alignSelf: 'flex-end',
  },
  separator: {
    height: 1,
    marginHorizontal: spacing(16),
  },
});
