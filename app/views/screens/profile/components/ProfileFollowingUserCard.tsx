import React from 'react';
import { View, StyleSheet, Image, ViewStyle, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import TextView from '../../../components/TextView';
import { fontScale, moderateScale, spacing, verticalScale } from '../../../../utils/dimensions';

export interface ProfileFollowingUserData {
  id: string;
  fullName: string;
  username: string;
  avatar: string;
  isFollowing: boolean;
}

interface ProfileFollowingUserCardProps {
  /** The user data to render */
  user: ProfileFollowingUserData;
  /** Callback fired when the follow button is pressed */
  onToggleFollow: (id: string) => void;
  /** Optional custom styles for the card container */
  style?: ViewStyle;
  /** Whether to hide the bottom divider (useful for the last item) */
  hideDivider?: boolean;
}

/**
 * Reusable card component for displaying a user in the Profile Following list.
 * Includes user avatar, name, username, and a follow action button.
 *
 * @param user - The user data object
 * @param onToggleFollow - Callback for follow button tap
 * @param style - Additional container styles
 * @returns {JSX.Element} The rendered user card
 */
export default function ProfileFollowingUserCard({
  user,
  onToggleFollow,
  style,
  hideDivider = false,
}: ProfileFollowingUserCardProps) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { borderBottomColor: colors.borderLight, borderBottomWidth: hideDivider ? 0 : 1 }, style]}>
      <View style={styles.leftContent}>
        <Image
          source={{ uri: user.avatar }}
          style={[styles.avatar, { backgroundColor: colors.videoPlaceholder }]}
          resizeMode="cover"
          fadeDuration={200}
        />
        <View style={styles.textContainer}>
          <TextView size={fontScale(18)} weight="700" style={{ color: colors.primaryText }}>
            {user.fullName}
          </TextView>
          <TextView size={fontScale(15)} weight="600" style={{ color: colors.placeholder, marginTop: spacing(4) }}>
            {user.username}
          </TextView>
        </View>
      </View>

      <TouchableOpacity
        style={[
          styles.actionButton,
          { backgroundColor: user.isFollowing ? colors.gray100 : colors.buttonEnabled }
        ]}
        activeOpacity={0.8}
        onPress={() => onToggleFollow(user.id)}
      >
        <TextView
          style={[
            styles.actionButtonText,
            { color: user.isFollowing ? colors.primaryText : colors.white }
          ]}
        >
          {user.isFollowing ? 'Following' : 'Follow'}
        </TextView>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing(7),
    borderBottomWidth: 1,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: spacing(60),
    height: spacing(60),
    borderRadius: spacing(30),
  },
  textContainer: {
    marginLeft: spacing(12),
    flex: 1,
    justifyContent: 'center',
  },
  actionButton: {
    width: spacing(90),
    height: verticalScale(31),
    borderRadius: moderateScale(6),
    paddingTop: spacing(6),
    paddingBottom: spacing(6),
    paddingLeft: spacing(10),
    paddingRight: spacing(10),
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  actionButtonText: {
    fontWeight: '600',
    fontSize: fontScale(16),
    letterSpacing: -0.5,
  },
});
