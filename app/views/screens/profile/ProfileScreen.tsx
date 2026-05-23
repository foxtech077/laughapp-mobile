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
import { useTheme } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { spacing, fontScale } from '../../../utils/dimensions';
import BaseView from '../../components/BaseView';
import TextView from '../../components/TextView';
import ButtonView from '../../components/ButtonView';
import { images } from '../../../constants/images';

const { LaughIcon1, SupporterIcon, TipIcon, LocationIconSvg, RepostIconSvg } = images;



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

function ProfileScreen() {
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
            colors={['#FFE372', '#FEC091']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.avatarGradientContainer}
          >
            <View style={styles.avatarWhiteRing}>
              <View style={styles.avatarGrayCircle}>
                <Image source={images.sandeep} style={styles.avatarImage} />
              </View>
            </View>
          </LinearGradient>

          {isOldUser && (
            <LinearGradient
              colors={['#FFE372', '#FEC091']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.supporterBadge}
            >
              <SupporterIcon width={spacing(16)} height={spacing(16)} />
              <TextView
                size={14}
                weight="700"
                style={styles.supporterText}
              >
                Supporter
              </TextView>
            </LinearGradient>
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
            <LinearGradient
              key={stat.id}
              colors={['#FFD837', '#FFC3A0']}
              start={{ x: 0.34, y: 0 }}
              end={{ x: 1.49, y: 1 }}
              style={styles.statsCard}
            >
              <View style={styles.statsIconCircle}>
                <LaughIcon1 width={spacing(24)} height={spacing(24)} />
              </View>
              <View style={styles.statsCardContent}>
                <TextView size={18} weight="800" style={{ color: colors.primaryText }}>
                  {stat.value}
                </TextView>
                <TextView size={13} weight="600" style={{ color: colors.secondaryText, marginTop: spacing(1) }}>
                  {stat.title}
                </TextView>
              </View>
            </LinearGradient>
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

  // Empty State layout (ListEmptyComponent)
  const EmptyState = () => (
    <View style={[styles.emptyContainer, { backgroundColor: '#F9F9F9', borderColor: colors.border }]}>
      <LinearGradient colors={['#FFD837', '#FFC3A0']}
        start={{ x: 0.34, y: 0 }}
        end={{ x: 1.49, y: 1 }} style={styles.emptyIconCircle}>
        <RepostIconSvg width={spacing(28)} height={spacing(28)} />
      </LinearGradient>
      <TextView size={24} weight="800" align="center" style={{ color: colors.primaryText, marginBottom: spacing(10), lineHeight: spacing(30), includeFontPadding: false }}>
        Nothing reposted yet
      </TextView>
      <TextView
        size={17}
        weight="500"
        align="center"
        style={{ color: colors.secondaryText, lineHeight: spacing(22), paddingHorizontal: spacing(16), marginBottom: spacing(24) }}
      >
        Repost funny videos to support comedians and spread the joy.
      </TextView>
      <ButtonView
        label="Watch Videos"
        variant="normal"
        onPress={() => setIsOldUser(true)}
        style={styles.watchVideosButton}
      />
    </View>
  );

  // Video Grid Card renderer
  const renderVideoItem = ({ item, index }: { item: typeof MOCK_VIDEOS[0], index: number }) => {
    const isLeft = index % 3 === 0;
    const isRight = index % 3 === 2;

    const isTopRow = index < 3;
    const isBottomRow = index >= MOCK_VIDEOS.length - 3;
    return (
      <View
        style={[
          styles.gridItem,
          {
            width: ITEM_WIDTH,
            height: ITEM_HEIGHT,
            borderTopLeftRadius: isLeft && isTopRow ? spacing(10) : 0,
            borderTopRightRadius: isRight && isTopRow ? spacing(10) : 0,

            borderBottomLeftRadius: isLeft && isBottomRow ? spacing(10) : 0,
            borderBottomRightRadius: isRight && isBottomRow ? spacing(10) : 0,
          },
        ]}
      >
        <Image source={{ uri: item.image }} style={StyleSheet.absoluteFill} resizeMode="cover" />

        <LinearGradient
          colors={['rgba(0, 0, 0, 0.4)', 'rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.7)']}
          locations={[0, 0.2527, 0.6589, 1]}
          style={StyleSheet.absoluteFill}
        />

        {/* Top Left laughs badge */}
        <View style={styles.badgeTopLeft}>
          <LaughIcon1 width={spacing(12)} height={spacing(12)} />
          <TextView style={styles.badgeText}>{item.laughs}</TextView>
        </View>

        {/* Bottom Left tokens badge */}
        <View style={styles.badgeBottomLeft}>
          <TipIcon width={spacing(14)} height={spacing(14)} />
          <TextView style={styles.badgeTextBottom}>{item.coins}</TextView>
        </View>

        {/* Bottom Right duration badge */}
        <View style={styles.badgeBottomRight}>
          <TextView style={styles.durationText}>{item.duration}</TextView>
        </View>
      </View>
    );
  };

  return (
    <BaseView
      showHeader
      showBackButton
      headerTitle="Profile"
      titleAlign="left"
      headerRight={<View />}
      style={[styles.container, { backgroundColor: '#FFFFFF' }]}
    >
      <FlatList
        data={isOldUser ? MOCK_VIDEOS : []}
        renderItem={renderVideoItem}
        keyExtractor={(item) => item.id}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: 'space-around',
          marginBottom: spacing(2),
        }} ListHeaderComponent={<ProfileHeader />}
        ListEmptyComponent={<EmptyState />}
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
    paddingTop: spacing(10),
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
    width: spacing(106),
    height: spacing(106),
    borderRadius: spacing(53),
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarWhiteRing: {
    width: spacing(98),
    height: spacing(98),
    borderRadius: spacing(49),
    backgroundColor: '#FFFFFF',
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
    position: 'absolute',
    bottom: -spacing(6),
    width: spacing(113.3),
    height: spacing(29),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing(3),
    paddingTop: spacing(5),
    paddingBottom: spacing(5),
    paddingLeft: spacing(9),
    paddingRight: spacing(9),
    borderRadius: spacing(20),
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
  statsCard: {
    width: spacing(155),
    height: spacing(48),
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing(4),
    borderRadius: spacing(30),
    marginHorizontal: spacing(2),
    gap: spacing(4),
  },
  statsIconCircle: {
    width: spacing(40),
    height: spacing(40),
    borderRadius: spacing(20),
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsCardContent: {
    flex: 1,
    justifyContent: 'center',
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
  emptyContainer: {
    paddingVertical: spacing(36),
    paddingHorizontal: spacing(20),
    borderRadius: spacing(10),
    borderWidth: 1.2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing(4),
  },
  emptyIconCircle: {
    width: spacing(52),
    height: spacing(52),
    borderRadius: spacing(26),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing(16),
  },
  watchVideosButton: {
    borderRadius: spacing(30),
    paddingVertical: spacing(12),
    paddingHorizontal: spacing(30),
    alignSelf: 'center',
  },
  gridItem: {
    overflow: 'hidden',
    backgroundColor: '#EEEEEE',

  },
  badgeTopLeft: {
    position: 'absolute',
    width: spacing(56),
    height: spacing(22),
    top: spacing(8),
    left: spacing(8),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0000005C',
    paddingHorizontal: spacing(6),
    paddingVertical: spacing(2),
    borderRadius: spacing(12),
    gap: spacing(4),
  },
  badgeBottomLeft: {
    position: 'absolute',
    bottom: spacing(8),
    left: spacing(8),
    width: spacing(58),
    height: spacing(22),
    paddingHorizontal: spacing(6),
    paddingVertical: spacing(2),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: spacing(12),
    backgroundColor: '#0000005C',
    gap: spacing(4),
  },
  badgeBottomRight: {
    position: 'absolute',
    bottom: spacing(8),
    right: spacing(8),
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: fontScale(11),
    fontWeight: '600',
  },
  badgeTextBottom: {
    color: '#FFFFFF',
    fontSize: fontScale(11),
    fontWeight: '600',
  },
  durationText: {
    color: '#FFFFFF',
    fontSize: fontScale(11),
    fontWeight: '600',
  },
  footerSpacing: {
    height: spacing(34),
  },
});

export default ProfileScreen;
