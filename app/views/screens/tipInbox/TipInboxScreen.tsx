import React, { useState, useMemo, useCallback } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BaseView from '../../hoc/BaseView';
import TextView from '../../components/TextView';
import { images } from '../../../constants/images';
import TipInboxStatsCard from './components/TipInboxStatsCard';
import TipInboxFilterTabs from './components/TipInboxFilterTabs';
import TipInboxListItem from './components/TipInboxListItem';
import TipInboxEmptyState from './components/TipInboxEmptyState';
import TipInboxSelectedState from './components/TipInboxSelectedState';
import { MOCK_TIPS } from './constants/mockData';
import { TipItem, TipStats, TipStatus, SortOptionType } from './types';
import TipInboxSortSheet from '../../bottomSheets/TipInboxSortSheet';
import { useTipInboxSort } from '../../../hooks/useTipInboxSort';
import {
  fontScale,
  moderateScale,
  spacing,
  verticalScale,
} from '../../../utils/dimensions';

const { SortButton } = images;

export default function TipInboxScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  // State definitions
  const [tips, setTips] = useState<TipItem[]>(MOCK_TIPS);
  const [selectedFilter, setSelectedFilter] = useState<'all' | TipStatus>(
    'all',
  );
  const [selectedTipIds, setSelectedTipIds] = useState<Set<string>>(new Set());
  const [appreciationText, setAppreciationText] = useState('');

  const {
    selectedSort,
    bottomSheetRef,
    openSortSheet,
    sortTips,
    handleSelectSort,
  } = useTipInboxSort(tips);

  const stats: TipStats = useMemo(() => {
    const totalCoins = tips.reduce((acc, curr) => acc + curr.coins, 0);
    const earnedCoinsStr = totalCoins.toLocaleString();
    const equivalentVal = (totalCoins * 0.0255).toFixed(2);
    const equivalentStr = `$${Number(equivalentVal).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

    return {
      earnedCoins: earnedCoinsStr,
      equivalent: equivalentStr,
      tippers: tips.length.toString(),
    };
  }, [tips]);

  const filteredTips = useMemo(() => {
    let result = [...tips];

    if (selectedFilter !== 'all') {
      result = result.filter(tip => tip.status === selectedFilter);
    }

    return sortTips(result, selectedSort);
  }, [tips, selectedFilter, selectedSort, sortTips]);

  const visibleUnrepliedTips = useMemo(() => {
    return filteredTips.filter(tip => tip.status === 'unreplied');
  }, [filteredTips]);

  const selectAllChecked = useMemo(() => {
    if (visibleUnrepliedTips.length === 0) {
      return false;
    }
    return visibleUnrepliedTips.every(tip => selectedTipIds.has(tip.id));
  }, [visibleUnrepliedTips, selectedTipIds]);

  const handleSortPress = useCallback(() => {
    openSortSheet();
  }, [openSortSheet]);

  const handleFilterChange = useCallback((newFilter: 'all' | TipStatus) => {
    setSelectedFilter(newFilter);
  }, []);

  const handleCheckboxPress = useCallback((id: string) => {
    setSelectedTipIds(prevSelected => {
      const nextSelected = new Set(prevSelected);
      if (nextSelected.has(id)) {
        nextSelected.delete(id);
      } else {
        nextSelected.add(id);
      }
      return nextSelected;
    });
  }, []);

  const handleSelectAllPress = useCallback(() => {
    setSelectedTipIds(prevSelected => {
      const nextSelected = new Set(prevSelected);
      const allSelected = visibleUnrepliedTips.every(tip =>
        nextSelected.has(tip.id),
      );

      if (allSelected) {
        visibleUnrepliedTips.forEach(tip => {
          nextSelected.delete(tip.id);
        });
      } else {
        visibleUnrepliedTips.forEach(tip => {
          nextSelected.add(tip.id);
        });
      }
      return nextSelected;
    });
  }, [visibleUnrepliedTips]);

  // Single list item press placeholder
  const handleItemPress = useCallback(
    (item: TipItem) => {
      if (item.status === 'unreplied') {
        Alert.alert(
          `Tip from ${item.name}`,
          `Would you like to reply or mark this tip as Replied?`,
          [
            {
              text: 'Mark as Replied',
              onPress: () => {
                setTips(prev =>
                  prev.map(t =>
                    t.id === item.id ? { ...t, status: 'replied' } : t,
                  ),
                );
                setSelectedTipIds(prev => {
                  const next = new Set(prev);
                  next.delete(item.id);
                  return next;
                });
              },
            },
            {
              text: 'Cancel',
              style: 'cancel',
            },
          ],
        );
      } else {
        Alert.alert('Tip Details', `You already replied to ${item.name}!`, [
          { text: 'OK' },
        ]);
      }
    },
    [setTips],
  );

  const handleSendAppreciation = () => {
    if (!appreciationText.trim()) return;

    Alert.alert(
      'Appreciation Sent',
      `Your appreciation message has been sent to the ${selectedTipIds.size} selected tipper(s)!`,
      [
        {
          text: 'Awesome',
          onPress: () => {
            // Mark all selected tips as replied and clear the selection
            setTips(prev =>
              prev.map(t =>
                selectedTipIds.has(t.id) ? { ...t, status: 'replied' } : t,
              ),
            );
            setSelectedTipIds(new Set());
            setAppreciationText('');
          },
        },
      ],
    );
  };

  // Render list item
  const renderItem = useCallback(
    ({ item }: { item: TipItem }) => (
      <TipInboxListItem
        item={item}
        checked={selectedTipIds.has(item.id)}
        onCheckboxPress={() => handleCheckboxPress(item.id)}
        onPress={() => handleItemPress(item)}
      />
    ),
    [selectedTipIds, handleCheckboxPress, handleItemPress],
  );

  const getEmptyStateDetails = () => {
    switch (selectedFilter) {
      case 'unreplied':
        return {
          title: 'All caught up!',
          description: 'You have replied to all of your tippers. Good job!',
        };
      case 'replied':
        return {
          title: 'No replied tips yet',
          description:
            "Tippers will show up here once you've sent them a reply.",
        };
      default:
        return {
          title: 'Your Tip Inbox is empty',
          description:
            'Keep creating awesome content to earn tips from your viewers!',
        };
    }
  };

  const emptyDetails = getEmptyStateDetails();

  const renderHeader = useCallback(
    () => (
      <View style={{ backgroundColor: colors.white }}>
        {/* Filter and selection actions row */}
        <TipInboxFilterTabs
          selectedFilter={selectedFilter}
          onFilterChange={handleFilterChange}
          selectAllChecked={selectAllChecked}
          onSelectAllPress={handleSelectAllPress}
          selectAllDisabled={visibleUnrepliedTips.length === 0}
        />

        {/* Stats horizontal overview card */}
        <TipInboxStatsCard stats={stats} />
      </View>
    ),
    [
      colors.white,
      selectedFilter,
      handleFilterChange,
      selectAllChecked,
      handleSelectAllPress,
      visibleUnrepliedTips.length,
      stats,
    ],
  );

  const renderFooter = useCallback(
    () => (
      <View
        style={{
          height:
            selectedTipIds.size > 0
              ? spacing(100)
              : insets.bottom + spacing(16),
        }}
      />
    ),
    [selectedTipIds.size, insets.bottom],
  );

  return (
    <BaseView
      showHeader={true}
      showBackButton={true}
      headerTitle="Tip inbox"
      titleAlign="left"
      headerRight={
        <TouchableOpacity
          onPress={handleSortPress}
          activeOpacity={0.8}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          style={[
            styles.sortButton,
            {
              borderColor: colors.white,
              backgroundColor: colors.gray100,
            },
          ]}
        >
          <View style={styles.sortButtonContent}>
            <SortButton
              stroke={colors.primaryText}
              width={spacing(14)}
              height={spacing(14)}
            />
            <TextView
              size={fontScale(15)}
              weight="700"
              style={[styles.sortText, { color: colors.primaryText }]}
            >
              Sort by
            </TextView>
            {selectedSort !== 'recency' && (
              <View
                style={[
                  styles.badgeContainer,
                  { backgroundColor: colors.buttonEnabled },
                ]}
              >
                <TextView
                  size={fontScale(11)}
                  weight="700"
                  style={{ color: colors.white }}
                >
                  1
                </TextView>
              </View>
            )}
          </View>
        </TouchableOpacity>
      }
      applyTopInset={true}
      applyBottomInset={false}
      style={[styles.container, { backgroundColor: colors.white }]}
    >
      <View style={{ flex: 1 }}>
        {/* Optimization-driven FlatList rendering */}
        <View style={styles.listWrapper}>
          <FlatList
            data={filteredTips}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            ListHeaderComponent={renderHeader}
            ListFooterComponent={renderFooter}
            keyboardShouldPersistTaps="handled"
            ListEmptyComponent={
              <TipInboxEmptyState
                title={emptyDetails.title}
                description={emptyDetails.description}
              />
            }
            removeClippedSubviews={true}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            windowSize={5}
          />
        </View>

        {selectedTipIds.size > 0 && (
          <TipInboxSelectedState
            appreciationText={appreciationText}
            setAppreciationText={setAppreciationText}
            handleSendAppreciation={handleSendAppreciation}
          />
        )}
      </View>

      {/* Reusable Sort Bottom Sheet component */}
      <TipInboxSortSheet
        sheetRef={bottomSheetRef}
        selectedOption={selectedSort}
        onSelectOption={handleSelectSort}
      />
    </BaseView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listWrapper: {
    flex: 1,
  },
  listContent: {},
  sortButton: {
    borderWidth: 1,
    borderRadius: moderateScale(8),
    paddingHorizontal: spacing(8),
    paddingVertical: spacing(4),
  },
  sortButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing(4),
  },
  sortText: {
    letterSpacing: -0.2,
  },
  badgeContainer: {
    width: moderateScale(18),
    height: moderateScale(18),
    borderRadius: moderateScale(9),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing(2),
  },
});
