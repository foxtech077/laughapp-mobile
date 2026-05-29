import React, { useState, useMemo, useCallback } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import Svg, { Path } from 'react-native-svg';
import BaseView from '../../components/BaseView';
import TipInboxHeader from './components/TipInboxHeader';
import TipInboxStatsCard from './components/TipInboxStatsCard';
import TipInboxFilterTabs from './components/TipInboxFilterTabs';
import TipInboxListItem from './components/TipInboxListItem';
import TipInboxEmptyState from './components/TipInboxEmptyState';
import { MOCK_TIPS } from './constants/mockData';
import { TipItem, TipStats, TipStatus } from './types';
import { fontScale, moderateScale, spacing, verticalScale } from '../../../utils/dimensions';

export default function TipInboxScreen() {
  const { colors } = useTheme();

  // State definitions
  const [tips, setTips] = useState<TipItem[]>(MOCK_TIPS);
  const [selectedFilter, setSelectedFilter] = useState<'all' | TipStatus>('all');
  const [selectedTipIds, setSelectedTipIds] = useState<Set<string>>(new Set());
  const [appreciationText, setAppreciationText] = useState('');

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

  // Filtering logic
  const filteredTips = useMemo(() => {
    if (selectedFilter === 'all') {
      return tips;
    }
    return tips.filter((tip) => tip.status === selectedFilter);
  }, [tips, selectedFilter]);

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
    Alert.alert(
      'Sort Tips',
      'In a production environment, this will trigger a beautiful bottom-sheet modal allowing the user to sort their tips by Date, Coin Amount, or Status.',
      [{ text: 'Cool', style: 'default' }]
    );
  }, []);

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
      applyBottomInset={true}
      style={[styles.container, { backgroundColor: colors.white }]}
    >
      {/* Premium custom top header */}
      <TipInboxHeader onSortPress={handleSortPress} />

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
          contentContainerStyle={styles.listContent}
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

      {/* Slide-up appreciation text bottom input bar (shown when items are selected) */}
      {selectedTipIds.size > 0 && (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? spacing(60) : 0}
        >
          <View style={[styles.bottomInputBar, { borderTopColor: colors.tipDivider, backgroundColor: colors.white }]}>
            <View style={[styles.inputContainer, { backgroundColor: colors.gray100 }]}>
              <TextInput
                style={[styles.input, { color: colors.primaryText }]}
                placeholder="Type your appreciation message..."
                placeholderTextColor={colors.secondaryText}
                value={appreciationText}
                onChangeText={setAppreciationText}
              />
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={appreciationText.trim() ? handleSendAppreciation : () => {
                Alert.alert('Microphone Pressed', 'Voice speech-to-text simulation active. Type to appreciation send.');
              }}
              style={[styles.micButton, { backgroundColor: colors.filterTabSelected }]}
            >
              {appreciationText.trim() ? (
                <SendIcon fill={colors.white} />
              ) : (
                <MicIcon stroke={colors.white} />
              )}
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      )}
    </BaseView>
  );
}

// Inline SVGs for pure theme integration and compilation safety
function MicIcon({ stroke }: { stroke: string }) {
  return (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 2a3 3 0 00-3 3v7a3 3 0 006 0V5a3 3 0 00-3-3z"
        fill={stroke}
      />
      <Path
        d="M19 10v1a7 7 0 01-14 0v-1M12 18v4M8 22h8"
        stroke={stroke}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function SendIcon({ fill }: { fill: string }) {
  return (
    <Svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <Path
        d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"
        stroke={fill}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
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
  bottomInputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing(16),
    paddingTop: spacing(8),
    paddingBottom: spacing(16),
    borderTopWidth: 1,
  },
  inputContainer: {
    flex: 1,
    height: verticalScale(40),
    borderRadius: moderateScale(8),
    paddingHorizontal: spacing(16),
    justifyContent: 'center',
    marginRight: spacing(12),
  },
  input: {
    fontSize: fontScale(14),
    padding: 0,
    margin: 0,
  },
  micButton: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
