import React from 'react';
import { View, StyleSheet, Image, ViewStyle } from 'react-native';
import { useTheme } from '@react-navigation/native';
import TextView from './TextView';
import ButtonView from './ButtonView';
import { spacing } from '../../utils/dimensions';

export interface FollowingUserData {
  id: string;
  fullName: string;
  username: string;
  avatar: string;
  isFollowing: boolean;
}

interface FollowingUserCardProps {
  /** The user data to render */
  user: FollowingUserData;
  /** Callback fired when the follow button is pressed */
  onToggleFollow: (id: string) => void;
  /** Optional custom styles for the card container */
  style?: ViewStyle;
}

/**
 * Reusable card component for displaying a user in the Following/Followers list.
 * Includes user avatar, name, username, and a follow action button.
 *
 * @param user - The user data object
 * @param onToggleFollow - Callback for follow button tap
 * @param style - Additional container styles
 * @returns {JSX.Element} The rendered user card
 */
export default function FollowingUserCard({
  user,
  onToggleFollow,
  style,
}: FollowingUserCardProps) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { borderBottomColor: colors.border }, style]}>
      <View style={styles.leftContent}>
        <Image
          source={{ uri: user.avatar }}
          style={[styles.avatar, { backgroundColor: colors.videoPlaceholder }]}
          resizeMode="cover"
          fadeDuration={200}
        />
        <View style={styles.textContainer}>
          <TextView size={15} weight="700" style={{ color: colors.primaryText }}>
            {user.fullName}
          </TextView>
          <TextView size={13} weight="500" style={{ color: colors.secondaryText, marginTop: spacing(2) }}>
            {user.username}
          </TextView>
        </View>
      </View>

      <ButtonView
        label={user.isFollowing ? 'Following' : 'Follow'}
        variant={user.isFollowing ? 'secondary' : 'normal'}
        onPress={() => onToggleFollow(user.id)}
        style={styles.actionButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing(16),
    borderBottomWidth: 1,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: spacing(52),
    height: spacing(52),
    borderRadius: spacing(26),
  },
  textContainer: {
    marginLeft: spacing(12),
    flex: 1,
    justifyContent: 'center',
  },
  actionButton: {
    paddingVertical: spacing(8),
    paddingHorizontal: spacing(16),
    minWidth: spacing(90),
  },
});
