import React, { useCallback } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomSheetModal, BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import { moderateScale, spacing } from '../../utils/dimensions';

interface BottomSheetBaseProps {
  sheetRef: React.RefObject<BottomSheetModal | null>;
  snapPoints: (string | number)[];
  onClose?: () => void;
  children: React.ReactNode;
  contentStyle?: StyleProp<ViewStyle>;
  scrollable?: boolean;
  stackBehavior?: 'push' | 'switch' | 'replace';
}

export default function BottomSheetBase({
  sheetRef,
  snapPoints,
  onClose,
  children,
  contentStyle,
  scrollable = false,
  stackBehavior,
}: BottomSheetBaseProps) {
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
    <BottomSheetModal
      ref={sheetRef}
      snapPoints={snapPoints}
      stackBehavior={stackBehavior}
      enablePanDownToClose={true}
      enableDynamicSizing={false}
      backdropComponent={renderBackdrop}
      onDismiss={onClose}
      handleIndicatorStyle={{
        backgroundColor: colors.borderLight,
        width: spacing(40),
        height: spacing(4),
      }}
      backgroundStyle={{
        borderTopLeftRadius: moderateScale(28),
        borderTopRightRadius: moderateScale(28),
        backgroundColor: colors.white,
      }}
    >
      {scrollable ? (
        <View
          style={[
            { flex: 1, paddingBottom: insets.bottom > 0 ? insets.bottom : spacing(20) },
            contentStyle,
          ]}
        >
          {children}
        </View>
      ) : (
        <BottomSheetView
          style={[
            { flex: 1, paddingBottom: insets.bottom > 0 ? insets.bottom : spacing(20) },
            contentStyle,
          ]}
        >
          {children}
        </BottomSheetView>
      )}
    </BottomSheetModal>
  );
}
