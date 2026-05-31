import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { fontScale, moderateScale, spacing, verticalScale } from '../../../../utils/dimensions';
import { images } from '../../../../constants/images';
import TextView from '../../../components/TextView';

const { TrashIcon } = images;

interface VoiceMessageRecorderProps {
  onTrashPress: () => void;
}

export default function VoiceMessageRecorder({ onTrashPress }: VoiceMessageRecorderProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const WAVEFORM_BARS = [
    4, 8, 12, 6, 14, 20, 24, 12, 18, 22, 16, 8, 14, 20, 18, 12, 24, 20, 16, 10, 8, 14, 12, 6, 8
  ];

  return (
    <View
      style={[
        styles.bottomInputBar,
        {
          borderTopColor: colors.tipDivider,
          backgroundColor: colors.white,
          paddingBottom: insets.bottom > 0 ? insets.bottom : spacing(16),
          shadowColor: colors.cardShadow,
        },
      ]}
    >
      <View
        style={[
          styles.recorderContainer,
          {
            backgroundColor: colors.gray100,
            borderColor: colors.cardSelectedBorder,
          },
        ]}
      >
        {/* Left Side: Trash Icon Button */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onTrashPress}
          style={[styles.trashCircle, { backgroundColor: colors.primaryText }]}
        >
          <TrashIcon
            stroke={colors.white}
            width={spacing(16)}
            height={spacing(16)}
          />
        </TouchableOpacity>

        {/* Center: Waveform Visualization */}
        <View style={styles.waveformContainer}>
          {WAVEFORM_BARS.map((height, index) => (
            <View
              key={index}
              style={[
                styles.waveformBar,
                {
                  height: verticalScale(height),
                  backgroundColor: colors.primaryText,
                },
              ]}
            />
          ))}
        </View>

        {/* Right Side: Recording Duration (Mock value) */}
        <TextView
          size={fontScale(15)}
          weight="700"
          style={[styles.durationText, { color: colors.primaryText }]}
        >
          0:25
        </TextView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomInputBar: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: spacing(22),
    paddingHorizontal: spacing(16),
    borderTopWidth: 1,
    shadowOffset: {
      width: 0,
      height: -8,
    },
    shadowOpacity: 0.12,
    shadowRadius: 25,
    elevation: 12,
  },
  recorderContainer: {
    flex: 1,
    height: verticalScale(48),
    borderRadius: moderateScale(10),
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing(12),
  },
  trashCircle: {
    width: moderateScale(34),
    height: moderateScale(34),
    borderRadius: moderateScale(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  waveformContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginLeft: spacing(8),
    marginRight: spacing(4),
  },
  waveformBar: {
    width: spacing(2.5),
    borderRadius: spacing(1.5),
    marginHorizontal: spacing(2),
  },
  durationText: {
    marginRight: spacing(4),
  },
});
