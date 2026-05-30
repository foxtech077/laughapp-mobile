import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import TextView from '../../../components/TextView';
import { fontScale, moderateScale, spacing } from '../../../../utils/dimensions';
import TipInboxSortOption from './TipInboxSortOption';
import { SortOptionType } from '../types';

interface TipInboxSortSheetProps {
  sheetRef: React.RefObject<BottomSheet | null>;
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
  const insets = useSafeAreaInsets();

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior="close"
        opacity={0.4}
      />
    ),
    []
  );

  return (
    <BottomSheet
      ref={sheetRef}
      index={-1}
      enablePanDownToClose={true}
      enableDynamicSizing={true}
      backdropComponent={renderBackdrop}
      handleComponent={null}
      onChange={(index) => {
        if (index === -1 && onClose) {
          onClose();
        }
      }}
      backgroundStyle={{
        borderTopLeftRadius: moderateScale(28),
        borderTopRightRadius: moderateScale(28),
        backgroundColor: colors.white,
      }}
    >
      <BottomSheetView
        style={[
          styles.sheetContent,
          {
            paddingBottom: insets.bottom > 0 ? insets.bottom : spacing(20),
          },
        ]}
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
      </BottomSheetView>
    </BottomSheet>
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
