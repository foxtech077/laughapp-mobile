import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import TextView from '../components/TextView';
import { fontScale, spacing, verticalScale } from '../../utils/dimensions';
import TipInboxSortOption from '../screens/tipInbox/components/TipInboxSortOption';
import { SortOptionType } from '../screens/tipInbox/types';
import BottomSheetBase from '../hoc/BottomSheetBase';

interface TipInboxSortSheetProps {
  sheetRef: React.RefObject<BottomSheetModal | null>;
  selectedOption: SortOptionType;
  onSelectOption: (option: SortOptionType) => void;
  onClose?: () => void;
}

export default function TipInboxSortSheet({
  sheetRef,
  selectedOption,
  onSelectOption,
  onClose,
}: TipInboxSortSheetProps) {
  const { colors } = useTheme();

  const snapPoints = React.useMemo(() => [verticalScale(240)], []);

  return (
    <BottomSheetBase
      sheetRef={sheetRef}
      snapPoints={snapPoints}
      onClose={onClose}
      contentStyle={styles.sheetContent}
    >
      <View style={styles.header}>
        <TextView
          size={fontScale(22)}
          weight="800"
          style={[styles.headerTitle, { color: colors.primaryText }]}
        >
          Sort by
        </TextView>
      </View>

      <TipInboxSortOption
        label="Recency"
        selected={selectedOption === 'recency'}
        onPress={() => onSelectOption('recency')}
      />
      <TipInboxSortOption
        label="Amount - High to Low"
        selected={selectedOption === 'amountHighToLow'}
        onPress={() => onSelectOption('amountHighToLow')}
      />
      <TipInboxSortOption
        label="Amount - Low to High"
        selected={selectedOption === 'amountLowToHigh'}
        onPress={() => onSelectOption('amountLowToHigh')}
      />
    </BottomSheetBase>
  );
}

const styles = StyleSheet.create({
  sheetContent: {
    paddingTop: spacing(18),
  },
  header: {
    paddingHorizontal: spacing(24),
    marginBottom: spacing(3),
  },
  headerTitle: {
    fontFamily: 'Inter',
    letterSpacing: -0.5,
    lineHeight: fontScale(28),
  },
});
