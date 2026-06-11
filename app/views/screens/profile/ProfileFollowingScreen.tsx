import React, { useState } from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import BaseView from '../../hoc/BaseView';
import ProfileFollowingUserCard, { ProfileFollowingUserData } from './components/ProfileFollowingUserCard';
import { spacing } from '../../../utils/dimensions';

// Generating mock users for the Following List using pravatar.cc
const INITIAL_MOCK_USERS: ProfileFollowingUserData[] = [
  { id: '1', fullName: 'Emily Clark', username: '@emily.clark96', avatar: 'https://i.pravatar.cc/150?u=1', isFollowing: true },
  { id: '2', fullName: 'Marco Chen', username: '@marcoc', avatar: 'https://i.pravatar.cc/150?u=2', isFollowing: true },
  { id: '3', fullName: 'Ahmed Khan', username: '@ahmedk', avatar: 'https://i.pravatar.cc/150?u=3', isFollowing: true },
  { id: '4', fullName: 'Sandeep Das', username: '@sandeep.das', avatar: 'https://i.pravatar.cc/150?u=4', isFollowing: false },
  { id: '5', fullName: 'Sophia Dubois', username: '@sophied', avatar: 'https://i.pravatar.cc/150?u=5', isFollowing: true },
  { id: '6', fullName: 'Amal Chira', username: '@amalchii', avatar: 'https://i.pravatar.cc/150?u=6', isFollowing: false },
  { id: '7', fullName: 'Amala Chira', username: '@amalchii', avatar: 'https://i.pravatar.cc/150?u=7', isFollowing: true },
  { id: '8', fullName: 'Emily Clark', username: '@emily.clark96', avatar: 'https://i.pravatar.cc/150?u=11', isFollowing: true },
  { id: '9', fullName: 'Marco Chen', username: '@marcoc', avatar: 'https://i.pravatar.cc/150?u=12', isFollowing: true },
  { id: '10', fullName: 'Ahmed Khan', username: '@ahmedk', avatar: 'https://i.pravatar.cc/150?u=13', isFollowing: true },
];

/**
 * ProfileFollowingScreen displays the list of users that the current profile follows.
 * Stacked onto the Profile Screen when "Following" is tapped.
 *
 * @returns {JSX.Element} The rendered Profile Following Screen
 */
function ProfileFollowingScreen() {
  const { colors } = useTheme();
  const [users, setUsers] = useState<ProfileFollowingUserData[]>(INITIAL_MOCK_USERS);

  const handleToggleFollow = (id: string) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, isFollowing: !user.isFollowing } : user
      )
    );
  };

  return (
    <BaseView
      showHeader
      showBackButton
      titleAlign="left"
      headerTitle={`Following (${users.length + 347})`}
      style={[styles.container, { backgroundColor: colors.white }]}
    >
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <ProfileFollowingUserCard 
            user={item} 
            onToggleFollow={handleToggleFollow} 
            hideDivider={index === users.length - 1}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </BaseView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: spacing(24),
    paddingBottom: spacing(40),
  },
});

export default ProfileFollowingScreen;
