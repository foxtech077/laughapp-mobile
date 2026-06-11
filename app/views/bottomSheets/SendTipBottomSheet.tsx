import React from 'react';
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import BottomSheetBase from '../hoc/BottomSheetBase';
import TextView from "../components/TextView";
import { Image, Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';
import { fontScale, moderateScale, scale, spacing, verticalScale } from '../../utils/dimensions';
import { Check, Send, Users, X } from 'lucide-react-native';
import { images } from '../../constants/images';
import { useTheme } from '@react-navigation/native';
import TextInputView from '../components/TextInputView';
import ButtonView from '../components/ButtonView';

interface SendTipBottomSheetProps {
  sheetRef: React.RefObject<BottomSheetModal | null>;
  buyCoinsSheetRef?: React.RefObject<BottomSheetModal | null>;
  onClose?: () => void;
  snapPoints?: (string | number)[];
}

const TIPS = [
  { id: '1', amount: 100, label: '100', isTop: false },
  { id: '2', amount: 250, label: '250', isTop: true },
  { id: '3', amount: 350, label: '350', isTop: false },
  { id: '4', amount: 500, label: '500', isTop: false },
];

const SendTipBottomSheet = ({ sheetRef, buyCoinsSheetRef, onClose, snapPoints = ['60%'] }: SendTipBottomSheetProps) => {
  const { colors } = useTheme();

  const [selectedTip, setSelectedTip] = React.useState<string | null>('250');
  const [bigTip, setBigTip] = React.useState<string>('');

  return (
    <BottomSheetBase
      sheetRef={sheetRef}
      snapPoints={snapPoints}
      onClose={onClose}
      contentStyle={styles.tipLaughContainer}
    >
      <View style={styles.tipHeaderContainer}>
        <TextView size={22} weight="800">
          Send custom tip
        </TextView>
        <X size={fontScale(22)} onPress={() => sheetRef.current?.close()} />
      </View>
      <View style={styles.tipCoinsContainer}>
        {TIPS.map(tip => (
          <Pressable
            key={tip.id}
            style={[styles.tipView, { backgroundColor: selectedTip === tip.amount.toString() ? colors.yellow_600 : colors.white, borderColor: selectedTip === tip.amount.toString() ? colors.yellow_500 : colors.white }]}
            onPress={() => setSelectedTip(tip.amount.toString())}
          >
            <Image
              source={images.tipCoin2}
              style={styles.tipIcon}
            />
            <TextView size={14} weight="700">
              {tip.label}
            </TextView>
            {
              tip.isTop && (
                <View style={[styles.topPickBadge, { backgroundColor: colors.statsGradientStart }]}>
                  <TextView size={12} weight="800">
                    Top Pick
                  </TextView>
                </View>
              )
            }
            {
              selectedTip === tip.amount.toString() && (
                <View style={[styles.tick, { backgroundColor: colors.green_600 }]}>
                  <Check size={fontScale(14)} color={colors.white} />
                </View>
              )
            }
          </Pressable>
        ))}
      </View>
      <TextView size={14} weight="500" color={colors.secondaryText}>
        Or go big amount, if you’re feeling extra generous!
      </TextView>
      <View style={styles.bigTipContainer}>
        <TextInputView
          label="Enter amount"
          value={bigTip}
          onChangeText={setBigTip}
          keyboardType="numeric"
          style={{ flex: 1 }}
        />
        <TouchableOpacity
          style={styles.send}
          activeOpacity={0.75}
          onPress={() => {
          }}
        >
          <Send size={fontScale(24)} color={colors.white} />
        </TouchableOpacity>
      </View>
      <View style={[styles.tipInfo, { backgroundColor: colors.gray100 }]}>
        <Users size={fontScale(16)} color={colors.secondaryText} />
        <TextView size={16} weight="700" color={colors.secondaryText}>
          <TextView size={16} weight="800" color={colors.black}>
            1233
          </TextView>
          {" "}people tipped today
        </TextView>
      </View>
      <View style={[styles.footer, {borderTopColor: colors.border}]}>
        <TextView size={16} weight="700" color={colors.secondaryText}>
          You got{' '}
          <TextView size={16} weight="800" color={colors.black}>
            1233
          </TextView>
          {" "}coins
        </TextView>
        <ButtonView
          label="Buy more"
          labelStyle={{ color: colors.black }}
          style={{ backgroundColor: colors.statsGradientStart }}
          onPress={() => {
            buyCoinsSheetRef?.current?.present();
          }}
        />
      </View>
    </BottomSheetBase>
  )
};

const styles = StyleSheet.create({
  tipLaughContainer: {
    paddingHorizontal: spacing(22),
    paddingVertical: spacing(12),
  },
  tipView: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing(8),
    paddingBottom: spacing(12),
    paddingTop: spacing(24),
    borderRadius: moderateScale(20),
    borderWidth: 1,
  },
  tipIcon: {
    width: scale(62),
    height: verticalScale(62),
    marginBottom: spacing(4),
  },
  tipHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tipCoinsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: spacing(16),
  },
  topPickBadge: {
    position: 'absolute',
    top: spacing(12),
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
  }
});

export default SendTipBottomSheet;