import React from 'react';
import { BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import BottomSheetBase from '../hoc/BottomSheetBase';
import TextView from "../components/TextView";
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { fontScale, moderateScale, scale, spacing, verticalScale } from '../../utils/dimensions';
import { X } from 'lucide-react-native';
import { images } from '../../constants/images';
import { useTheme } from '@react-navigation/native';
import ButtonView from '../components/ButtonView';

interface BuyCoinsBottomSheetProps {
  sheetRef: React.RefObject<BottomSheetModal | null>;
  onClose?: () => void;
  snapPoints?: (string | number)[];
}

const COINS = [
  { id: '1', amount: '$8.999', label: '500 Coins', isBestSeller: false },
  { id: '2', amount: '$14.99', label: '1,500 Coins', isBestSeller: true },
  { id: '3', amount: '$20.99', label: '3,000 Coins', isBestSeller: false },
];

const BuyCoinsBottomSheet = ({ sheetRef, onClose, snapPoints = ['90%'] }: BuyCoinsBottomSheetProps) => {
  const { colors } = useTheme();

  const [selectedCoins, setSelectedCoins] = React.useState<string | null>('$14.99');

  return (
    <BottomSheetBase
      sheetRef={sheetRef}
      snapPoints={snapPoints}
      onClose={onClose}
      scrollable
      stackBehavior="push"
      contentStyle={[styles.tipLaughContainer, styles.tipLaughScrollable]}
    >
      <View style={styles.tipHeaderContainer}>
        <TextView size={22} weight="800">
          Buy coins
        </TextView>
        <X size={fontScale(22)} onPress={() => sheetRef.current?.close()} />
      </View>
      <View style={styles.coinHeader}>
        <TextView size={16} weight="700" color={colors.secondaryText} align="center">
          Coin balance:{' '}
          <TextView size={16} weight="800" color={colors.black}>
            1233
          </TextView>
        </TextView>
      <TextView size={14} weight="500" color={colors.secondaryText} align="center">
        Top up your balance & unlock new possibilities!
      </TextView>
            </View>

      <BottomSheetScrollView style={styles.tipCoinsContainer} contentContainerStyle={styles.coinScrollContent} showsVerticalScrollIndicator={false}>
        {COINS.map(coin => (
          <Pressable
            key={coin.id}
            style={[styles.tipView, { backgroundColor: selectedCoins === coin.amount.toString() ? colors.yellow_600 : colors.white, borderColor: selectedCoins === coin.amount.toString() ? colors.yellow_500 : colors.border }]}
            onPress={() => setSelectedCoins(coin.amount.toString())}
          >
            <Image
              source={images.tipCoin2}
              style={styles.tipIcon}
            />
            <TextView size={22} weight="800">
              {coin.label}
            </TextView>
            <TextView size={18} weight="500">
              {coin.amount}
            </TextView>
            <ButtonView
              label="Buy Now"
              fillWidth
            />
            {
              coin.isBestSeller && (
                <View style={[styles.topPickBadge, { backgroundColor: colors.statsGradientStart }]}>
                  <TextView size={12} weight="800">
                    Best Seller
                  </TextView>
                </View>
              )
            }
          </Pressable>
        ))}
      </BottomSheetScrollView>
    </BottomSheetBase>
  )
};

const styles = StyleSheet.create({
  tipLaughContainer: {
    paddingHorizontal: spacing(22),
    paddingVertical: spacing(12),
  },
  tipLaughScrollable: {
    flex: 1,
  },
  tipView: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing(8),
    paddingBottom: spacing(12),
    paddingTop: spacing(24),
    borderRadius: moderateScale(20),
    borderWidth: 1,
    width: "100%",
    gap: spacing(8),
  },
  tipIcon: {
    width: scale(74),
    height: verticalScale(74),
    marginBottom: spacing(4),
  },
  tipHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tipCoinsContainer: {
    flex: 1,
    paddingVertical: spacing(16),
  },
  coinScrollContent: {
    alignItems: 'center',
    gap: spacing(14),
    paddingBottom: spacing(32),
  },
  topPickBadge: {
    position: 'absolute',
    top: spacing(12),
    right: spacing(12),
    paddingHorizontal: spacing(6),
    paddingVertical: spacing(2),
    borderRadius: moderateScale(12),
  },
  tick: {
    position: 'absolute',
    bottom: spacing(32),
    right: spacing(6),
    width: scale(20),
    height: verticalScale(20),
    borderRadius: moderateScale(10),
    borderWidth: 2,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigTipContainer: {
    marginTop: spacing(16),
    flexDirection: 'row',
    gap: spacing(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  send: {
    borderRadius: moderateScale(30),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    paddingVertical: spacing(16),
    paddingHorizontal: spacing(24),
  },
  tipInfo: {
    marginTop: spacing(16),
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing(8),
    justifyContent: 'center',
    flex: 1,
    borderRadius: moderateScale(8),
    paddingVertical: spacing(6),
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing(24),
    paddingTop: spacing(16),
    borderTopWidth: 1,
  },
  coinHeader: {
    marginTop: spacing(16),
    marginBottom: spacing(12),
    gap: spacing(4),
  },
});

export default BuyCoinsBottomSheet;