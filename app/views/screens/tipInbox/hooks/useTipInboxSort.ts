import { useState, useMemo, useRef, useCallback } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { TipItem, SortOptionType } from '../types';

export function useTipInboxSort(initialTips: TipItem[]) {
  const [selectedSort, setSelectedSort] = useState<SortOptionType>('recency');
  const bottomSheetRef = useRef<BottomSheet>(null);

  // Sorting method
  const sortTips = useCallback((data: TipItem[], sortOption: SortOptionType): TipItem[] => {
    const result = [...data];
    if (sortOption === 'amountHighToLow') {
      return result.sort((a, b) => b.coins - a.coins);
    }
    if (sortOption === 'amountLowToHigh') {
      return result.sort((a, b) => a.coins - b.coins);
    }
    return result;
  }, []);

  const openSortSheet = useCallback(() => {
    bottomSheetRef.current?.snapToIndex(0);
  }, []);

  const closeSortSheet = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  const handleSelectSort = useCallback((option: SortOptionType) => {
    setSelectedSort(option);
    closeSortSheet();
  }, [closeSortSheet]);

  return {
    selectedSort,
    setSelectedSort,
    bottomSheetRef,
    openSortSheet,
    closeSortSheet,
    sortTips,
    handleSelectSort,
  };
}
