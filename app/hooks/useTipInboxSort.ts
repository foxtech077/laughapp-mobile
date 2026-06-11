import { useState, useMemo, useRef, useCallback } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { TipItem, SortOptionType } from '../views/screens/tipInbox/types';

export function useTipInboxSort(initialTips: TipItem[]) {
  const [selectedSort, setSelectedSort] = useState<SortOptionType>('recency');
  const bottomSheetRef = useRef<BottomSheetModal>(null);

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
    bottomSheetRef.current?.present();
  }, []);

  const closeSortSheet = useCallback(() => {
    bottomSheetRef.current?.dismiss();
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
