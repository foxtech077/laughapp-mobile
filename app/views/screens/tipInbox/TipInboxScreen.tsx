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
import BaseView from '../../components/BaseView';
import TipInboxHeader from './components/TipInboxHeader';
import TipInboxStatsCard from './components/TipInboxStatsCard';
import TipInboxFilterTabs from './components/TipInboxFilterTabs';
import TipInboxListItem from './components/TipInboxListItem';
import TipInboxEmptyState from './components/TipInboxEmptyState';
import TipInboxSelectedState from './components/TipInboxSelectedState';
import { MOCK_TIPS } from './constants/mockData';
import { TipItem, TipStats, TipStatus, SortOptionType } from './types';
import TipInboxSortSheet from './components/TipInboxSortSheet';
import { useTipInboxSort } from './hooks/useTipInboxSort';
import { fontScale, moderateScale, spacing, verticalScale } from '../../../utils/dimensions';

export default function TipInboxScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  // State definitions
  const [tips, setTips] = useState<TipItem[]>(MOCK_TIPS);
  const [selectedFilter, setSelectedFilter] = useState<'all' | TipStatus>('all');
  const [selectedTipIds, setSelectedTipIds] = useState<Set<string>>(new Set());
  const [appreciationText, setAppreciationText] = useState('');

  const {
    selectedSort,
    bottomSheetRef,
    openSortSheet,
    sortTips,
    handleSelectSort,
  } = useTipInboxSort(tips);

  // Statistics calculation based on live mock data
  const stats: TipStats = useMemo(() => {
    const totalCoins = tips.reduce((acc, curr) => acc + curr.coins, 0);
    // Format total coins with commas (e.g. 4,720)
    const earnedCoinsStr = totalCoins.toLocaleString();
    // Equivalent is $0.025 per coin
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

  // Filtering and sorting logic
  const filteredTips = useMemo(() => {
    let result = [...tips];

    // Filter
    if (selectedFilter !== 'all') {
      result = result.filter((tip) => tip.status === selectedFilter);
    }

    // Sort
    return sortTips(result, selectedSort);
  }, [tips, selectedFilter, selectedSort, sortTips]);

  // List of visible unreplied tips (for checkable selections)
  const visibleUnrepliedTips = useMemo(() => {
    return filteredTips.filter((tip) => tip.status === 'unreplied');
  }, [filteredTips]);

  // Check if "Select All" should be checked
  const selectAllChecked = useMemo(() => {
    if (visibleUnrepliedTips.length === 0) {
      return false;
    }
    return visibleUnrepliedTips.every((tip) => selectedTipIds.has(tip.id));
  }, [visibleUnrepliedTips, selectedTipIds]);

  // Handle Sort button press
  const handleSortPress = useCallback(() => {
    openSortSheet();
  }, [openSortSheet]);

  // Filter change
  const handleFilterChange = useCallback((newFilter: 'all' | TipStatus) => {
    setSelectedFilter(newFilter);
  }, []);

  // Individual checkbox press
  const handleCheckboxPress = useCallback((id: string) => {
    setSelectedTipIds((prevSelected) => {
      const nextSelected = new Set(prevSelected);
      if (nextSelected.has(id)) {
        nextSelected.delete(id);
      } else {
        nextSelected.add(id);
      }
      return nextSelected;
    });
  }, []);

  // Select all press
  const handleSelectAllPress = useCallback(() => {
    setSelectedTipIds((prevSelected) => {
      const nextSelected = new Set(prevSelected);
      const allSelected = visibleUnrepliedTips.every((tip) => nextSelected.has(tip.id));

      if (allSelected) {
        // Deselect all visible unreplied tips
        visibleUnrepliedTips.forEach((tip) => {
          nextSelected.delete(tip.id);
        });
      } else {
        // Select all visible unreplied tips
        visibleUnrepliedTips.forEach((tip) => {
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
                setTips((prev) =>
                  prev.map((t) => (t.id === item.id ? { ...t, status: 'replied' } : t))
                );
                // Clear selection if it was selected
                setSelectedTipIds((prev) => {
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
          ]
        );
      } else {
        Alert.alert('Tip Details', `You already replied to ${item.name}!`, [{ text: 'OK' }]);
      }
    },
    [setTips]
  );

  // Send Bulk Appreciation Message
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
            setTips((prev) =>
              prev.map((t) => (selectedTipIds.has(t.id) ? { ...t, status: 'replied' } : t))
            );
            setSelectedTipIds(new Set());
            setAppreciationText('');
          },
        },
      ]
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
    [selectedTipIds, handleCheckboxPress, handleItemPress]
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
          description: "Tippers will show up here once you've sent them a reply.",
        };
      default:
        return {
          title: 'Your Tip Inbox is empty',
          description: 'Keep creating awesome content to earn tips from your viewers!',
        };
    }
  };

  const emptyDetails = getEmptyStateDetails();

  return (
    <BaseView
      showHeader={false}
      applyTopInset={true}
      applyBottomInset={false}
      style={[styles.container, { backgroundColor: colors.white }]}
    >
      {/* Premium custom top header */}
      <TipInboxHeader
        onSortPress={handleSortPress}
        hasActiveSort={selectedSort !== 'recency'}
      />

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

      {/* Optimization-driven FlatList rendering */}
      <View style={styles.listWrapper}>
        <FlatList
          data={filteredTips}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.listContent,
            {
              paddingBottom: selectedTipIds.size > 0 ? spacing(90) : insets.bottom + spacing(16),
            },
          ]}
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

      {/* Slide-up appreciation text bottom input bar (shown only in selected state) */}
      {selectedTipIds.size > 0 && (
        <TipInboxSelectedState
          appreciationText={appreciationText}
          setAppreciationText={setAppreciationText}
          handleSendAppreciation={handleSendAppreciation}
        />
      )}

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
  listContent: {
    paddingBottom: spacing(32),
  },
});
