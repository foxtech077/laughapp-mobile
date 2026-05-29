import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import TextView from '../../../components/TextView';
import { fontScale, moderateScale, spacing } from '../../../../utils/dimensions';
import TipInboxCheckbox from './TipInboxCheckbox';
import { TipStatus } from '../types';

interface TipInboxFilterTabsProps {
  selectedFilter: 'all' | TipStatus;
  onFilterChange: (filter: 'all' | TipStatus) => void;
  selectAllChecked: boolean;
  onSelectAllPress: () => void;
  selectAllDisabled?: boolean;
}

export default function TipInboxFilterTabs({
  selectedFilter,
  onFilterChange,
  selectAllChecked,
  onSelectAllPress,
  selectAllDisabled = false,
}: TipInboxFilterTabsProps) {
  const { colors } = useTheme();

  const filters: { key: 'all' | TipStatus; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'unreplied', label: 'Unreplied' },
    { key: 'replied', label: 'Replied' },
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onSelectAllPress}
        disabled={selectAllDisabled}
        style={[styles.selectAllContainer, selectAllDisabled && styles.disabledSelectAll]}
      >
        <View style={styles.checkboxWrapper}>
          <TipInboxCheckbox
            checked={selectAllChecked}
            onPress={onSelectAllPress}
            disabled={selectAllDisabled}
          />
        </View>
        <TextView
          size={fontScale(17)}
          weight="700"
          style={{ color: colors.primaryText }}
        >
          Select All
        </TextView>
      </TouchableOpacity>

      <View style={styles.pillsContainer}>
        {filters.map((filter) => {
          const isSelected = selectedFilter === filter.key;
          return (
            <TouchableOpacity
              key={filter.key}
              activeOpacity={0.8}
              onPress={() => onFilterChange(filter.key)}
              style={[
                styles.pill,
                {
                  backgroundColor: isSelected
                    ? colors.filterTabSelected
                    : colors.white,
                  borderColor: isSelected
                    ? colors.filterTabSelected
                    : colors.filterTabBorder,
                },
              ]}
            >
              <TextView
                size={fontScale(15)}
                weight="700"
                style={{
                  color: isSelected
                    ? colors.white
                    : colors.secondaryText,
                }}
              >
                {filter.label}
              </TextView>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing(16),
    paddingVertical: spacing(4),
  },
  selectAllContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxWrapper: {
    marginRight: spacing(8),
  },
  disabledSelectAll: {
    opacity: 0.5,
  },
  pillsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing(6),
  },
  pill: {
    borderWidth: 1,
    borderRadius: moderateScale(20),
    paddingHorizontal: spacing(12),
    paddingVertical: spacing(4),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
