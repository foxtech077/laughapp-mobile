import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert,
} from 'react-native';
import { useTheme, ThemeProvider } from '@react-navigation/native';
import { CustomLightTheme } from '../../../constants/colors';
import LinearGradient from 'react-native-linear-gradient';
import { spacing, fontScale } from '../../../utils/dimensions';
import BaseView from '../../components/BaseView';
import TextView from '../../components/TextView';
import ButtonView from '../../components/ButtonView';

import { images } from '../../../constants/images';
import GradientBadge from './components/GradientBadge';
import StatsCard from './components/StatsCard';
import VideoCard from './components/VideoCard';
import EmptyState from './components/EmptyState';

const { LaughIcon1, SupporterIcon, LocationIconSvg, RepostIconSvg } = images;



// High-quality performance images representing comedy grid items
const MOCK_VIDEOS = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd6a?q=80&w=300&auto=format&fit=crop',
    laughs: '1.2 K',
    coins: '1.3 M',
    duration: '0:58',
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1585699324551-f6c309eed262?q=80&w=300&auto=format&fit=crop',
    laughs: '2.6 K',
    coins: '0.8 M',
    duration: '1:09',
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?q=80&w=300&auto=format&fit=crop',
    laughs: '5.9 K',
    coins: '3.2 M',
    duration: '0:42',
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=300&auto=format&fit=crop',
    laughs: '8.5 K',
    coins: '1.5 M',
    duration: '1:01',
  },
  {
    id: '5',
    image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=300&auto=format&fit=crop',
    laughs: '8.1 K',
    coins: '2.1 M',
    duration: '0:30',
  },
  {
    id: '6',
    image: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?q=80&w=300&auto=format&fit=crop',
    laughs: '5.2 K',
    coins: '1.0 M',
    duration: '0:45',
  },
  {
    id: '7',
    image: 'https://images.unsplash.com/photo-1481110194439-edc5e42af52e?q=80&w=300&auto=format&fit=crop',
    laughs: '3.1 K',
    coins: '0.9 M',
    duration: '1:20',
  },
  {
    id: '8',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=300&auto=format&fit=crop',
    laughs: '1.9 K',
    coins: '0.4 M',
    duration: '0:55',
  },
  {
    id: '9',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=300&auto=format&fit=crop',
    laughs: '4.5 K',
    coins: '2.5 M',
    duration: '0:37',
  },
];

// Dynamically compute grid items sizing based on viewport width
const screenWidth = Dimensions.get('window').width;
const gridPadding = spacing(16);
const columnGap = spacing(8);
const numColumns = 3;
const ITEM_WIDTH = (screenWidth - (gridPadding * 2) - (columnGap * (numColumns - 1))) / numColumns;
const ITEM_HEIGHT = ITEM_WIDTH * (178 / 131);

/**
 * Profile screen content wrapped inside a strict Light Theme Provider.
 */
function ProfileScreenContent() {
  const { colors } = useTheme();
  const [isOldUser, setIsOldUser] = useState(false);

  const statsData = [
    {
      id: '30days',
      title: 'Past 30 days',
      value: isOldUser ? '1,626' : '0',
    },
    {
      id: 'joining',
      title: 'Since joining',
      value: isOldUser ? '452K' : '0',
    },
  ];



  // Profile Header content (ListHeaderComponent)
  const ProfileHeader = () => (
    <View style={styles.headerContainer}>
      {/* Avatar and Supporter Badge */}
      <View style={styles.avatarSection}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setIsOldUser(!isOldUser)}
          style={styles.avatarWrapper}
        >
          <LinearGradient
            colors={[colors.supporterGradientStart, colors.supporterGradientEnd]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.avatarGradientContainer}
          >
            <View style={[styles.avatarWhiteRing, { backgroundColor: colors.white }]}>
              <View style={[styles.avatarGrayCircle, { backgroundColor: colors.avatarInnerCircle }]}>
                <Image source={images.sandeep} style={styles.avatarImage} />
              </View>
            </View>
          </LinearGradient>

          {isOldUser && (
            <GradientBadge
              colors={[colors.supporterGradientStart, colors.supporterGradientEnd]}
              style={styles.supporterBadge}
              contentStyle={styles.supporterBadgeContent}
            >
              <SupporterIcon width={spacing(16)} height={spacing(16)} />
              <TextView
                size={14}
                weight="700"
                style={{ color: colors.supporterText, fontFamily: 'Inter', letterSpacing: -0.5 }}
              >
                Supporter
              </TextView>
            </GradientBadge>
          )}
        </TouchableOpacity>
      </View>

      {/* Profile Details */}
      <View style={styles.infoSection}>
        <View style={styles.nameRow}>
          <TextView size={20} weight="700" align="center" style={{ color: colors.primaryText }}>
            Sandeep Das
          </TextView>
          {isOldUser && (
            <TextView size={18} weight="600" style={{ color: colors.placeholder, marginLeft: spacing(6), alignSelf: 'center' }}>
              he/his
            </TextView>
          )}
        </View>
        <TextView size={fontScale(15)} weight="700" align="center" style={{ color: colors.secondaryText, marginTop: spacing(4) }}>
          @sandeep.das01
        </TextView>
      </View>

      {/* Bio / Location */}
      {isOldUser && (
        <View style={styles.bioSection}>
          <TextView size={14} weight="500" align="center" style={{ color: colors.primaryText, lineHeight: spacing(20) }}>
            Bringing the laughs one short video!! 😹
          </TextView>
          <View style={styles.locationContainer}>
            <LocationIconSvg width={spacing(14)} height={spacing(14)} />
            <TextView size={13} weight="600" style={{ color: colors.secondaryText, marginLeft: spacing(4) }}>
              New york, USA
            </TextView>
          </View>
        </View>
      )}

      {/* Shared Laughs Section */}
      <View style={styles.sharedLaughsSection}>
        <TextView
          size={fontScale(15)}
          weight="700"
          align="center"
          style={{ color: colors.secondaryText, letterSpacing: 0.5, marginBottom: spacing(8) }}
        >
          Shared laughs
        </TextView>

        <View style={styles.statsCardsRow}>
          {statsData.map((stat) => (
            <StatsCard
              key={stat.id}
              value={stat.value}
              title={stat.title}
              icon={<LaughIcon1 width={spacing(24)} height={spacing(24)} />}
              colors={[colors.statsGradientStart, colors.statsGradientEnd]}
            />
          ))}
        </View>
      </View>

      {/* Following Stats */}
      <View style={styles.followingSection}>
        <TextView size={22} weight="800" align="center" style={{ color: colors.primaryText }}>
          {isOldUser ? '739' : '0'}
        </TextView>
        <TextView size={14} weight="500" align="center" style={{ color: colors.secondaryText, marginTop: spacing(2) }}>
          Following
        </TextView>
      </View>

      {/* Section Title */}
      <View style={styles.sectionTitleRow}>
        <TextView size={20} weight="700" style={{ color: colors.primaryText }}>
          Reposted Videos ({isOldUser ? MOCK_VIDEOS.length : 0})
        </TextView>
        {!isOldUser && (
          <TouchableOpacity onPress={() => setIsOldUser(true)} activeOpacity={0.7}>
            <TextView size={16} weight="700" style={{ color: colors.placeholder }}>
              Watch Videos
            </TextView>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
  return (
    <BaseView
      showHeader
      // showBackButton
      headerTitle="Profile"
      titleAlign="left"
      headerRight={<View />}
      style={[styles.container, { backgroundColor: colors.white }]}
    >
      <FlatList
        data={isOldUser ? MOCK_VIDEOS : []}
        renderItem={({ item, index }) => {
          const isLeft = index % 3 === 0;
          const isRight = index % 3 === 2;
          const isTopRow = index < 3;
          const isBottomRow = index >= MOCK_VIDEOS.length - 3;

          return (
            <VideoCard
              item={item}
              width={ITEM_WIDTH}
              height={ITEM_HEIGHT}
              borderRadii={{
                borderTopLeftRadius: isLeft && isTopRow ? spacing(10) : 0,
                borderTopRightRadius: isRight && isTopRow ? spacing(10) : 0,
                borderBottomLeftRadius: isLeft && isBottomRow ? spacing(10) : 0,
                borderBottomRightRadius: isRight && isBottomRow ? spacing(10) : 0,
              }}
            />
          );
        }}
        keyExtractor={(item) => item.id}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: 'space-around',
          marginBottom: spacing(2),
        }}
        ListHeaderComponent={<ProfileHeader />}
        ListEmptyComponent={
          <EmptyState
            title="Nothing reposted yet"
            description="Repost funny videos to support comedians and spread the joy."
            icon={<RepostIconSvg width={spacing(28)} height={spacing(28)} />}
            iconGradientColors={[colors.statsGradientStart, colors.statsGradientEnd]}
            buttonLabel="Watch Videos"
            onButtonPress={() => setIsOldUser(true)}
          />
        }
        ListFooterComponent={<View style={styles.footerSpacing} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
        removeClippedSubviews={true}
        maxToRenderPerBatch={9}
        windowSize={5}
      />
    </BaseView>
  );
}

/**
 * Profile screen showing reposted videos,
 * supporter stats, and user information.
 *
 * @returns {JSX.Element} The rendered Profile Screen
 */
export default function ProfileScreen() {
  return (
    <ProfileScreenContent />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatListContent: {
    paddingHorizontal: spacing(20),
    paddingBottom: spacing(16),
  },

  headerContainer: {
    alignItems: 'center',
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: spacing(8),
  },
  avatarWrapper: {
    position: 'relative',
    alignItems: 'center',
  },
  avatarGradientContainer: {
    width: spacing(102),
    height: spacing(102),
    borderRadius: spacing(53),
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarWhiteRing: {
    width: spacing(96),
    height: spacing(96),
    borderRadius: spacing(49),
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarGrayCircle: {
    width: spacing(90),
    height: spacing(90),
    borderRadius: spacing(45),
    backgroundColor: '#C4C4C4',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  avatarImage: {
    width: spacing(90),
    height: spacing(90),
    borderRadius: spacing(45),
  },
  supporterBadge: {
    marginTop: -spacing(23),
    width: spacing(113.3),
    borderRadius: spacing(20),
  },
  supporterBadgeContent: {
    gap: spacing(3),
    paddingVertical: spacing(5),
    paddingHorizontal: spacing(9),
  },
  supporterText: {
    color: '#2B1E12',
    fontFamily: 'Inter',
    letterSpacing: -0.5,
  },
  hintText: {
    marginTop: spacing(10),
  },
  infoSection: {
    alignItems: 'center',
    marginBottom: spacing(14),
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

  },
  bioSection: {
    alignItems: 'center',
    paddingHorizontal: spacing(16),
    marginBottom: spacing(16),
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing(6),
  },
  sharedLaughsSection: {
    width: '100%',
    marginBottom: spacing(18),
  },
  statsCardsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  followingSection: {
    alignItems: 'center',
    marginBottom: spacing(22),
  },
  sectionTitleRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing(10),
  },
  footerSpacing: {
    height: spacing(34),
  },
});
