import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Platform,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { fontScale, moderateScale, spacing, verticalScale } from '../../../../utils/dimensions';
import { images } from '../../../../constants/images';
import VoiceMessageRecorder from './VoiceMessageRecorder';
import { useKeyboardHeight } from '../../../../hooks/useKeyboardHeight';

const { Microphone, SendIcon } = images;

interface TipInboxSelectedStateProps {
  appreciationText: string;
  setAppreciationText: (text: string) => void;
  handleSendAppreciation: () => void;
}

export default function TipInboxSelectedState({
  appreciationText,
  setAppreciationText,
  handleSendAppreciation,
}: TipInboxSelectedStateProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const [isFocused, setIsFocused] = useState(false);
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const keyboardHeight = useKeyboardHeight();

  const isKeyboardOpen = keyboardHeight > 0;
  const bottomOffset = Platform.OS === 'ios' ? keyboardHeight : 0;

  const paddingBottom = isKeyboardOpen
    ? spacing(16)
    : insets.bottom > 0
      ? insets.bottom
      : spacing(16);

  if (isRecordingVoice) {
    return (
      <View
        style={[
          styles.absoluteContainer,
          { bottom: bottomOffset },
        ]}
      >
        <VoiceMessageRecorder onTrashPress={() => setIsRecordingVoice(false)} />
      </View>
    );
  }

  return (
    <View
      style={[
        styles.absoluteContainer,
        { bottom: bottomOffset },
      ]}
    >
      <View
        style={[
          styles.bottomInputBar,
          {
            borderTopColor: colors.tipDivider,
            backgroundColor: colors.white,
            paddingBottom,
            shadowColor: colors.cardShadow,
          },
        ]}
      >
        <View
          style={[
            styles.inputContainer,
            {
              backgroundColor: colors.gray100,
              borderWidth: 1,
              borderColor: isFocused
                ? colors.cardSelectedBorder
                : colors.inputBorder,
            },
          ]}
        >
          <TextInput
            style={[styles.input, { color: colors.secondaryText }]}
            placeholder="Type your appreciation message..."
            placeholderTextColor={colors.secondaryText}
            value={appreciationText}
            onChangeText={setAppreciationText}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={
            appreciationText.trim()
              ? handleSendAppreciation
              : () => {
                Keyboard.dismiss();
                setIsRecordingVoice(true);
              }
          }
          style={[styles.micButton, { backgroundColor: colors.filterTabSelected }]}
        >
          {appreciationText.trim() ? (
            <SendIcon
              stroke={colors.white}
              width={spacing(18)}
              height={spacing(18)}
            />
          ) : (
            <Microphone
              stroke={colors.white}
              width={spacing(24)}
              height={spacing(24)}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  absoluteContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    elevation: 12,
  },
  bottomInputBar: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: spacing(17),
    paddingHorizontal: spacing(16),
    borderTopWidth: 1,
    shadowOffset: {
      width: 0,
      height: -8,
    },
    shadowOpacity: 0.12,
    shadowRadius: 25,
  },
  inputContainer: {
    flex: 1,
    height: verticalScale(45),
    borderRadius: moderateScale(10),
    paddingHorizontal: spacing(16),
    justifyContent: 'center',
    marginRight: spacing(12),
  },
  input: {
    fontSize: fontScale(15),
    fontWeight: '500',
    padding: 0,
    margin: 0,
  },
  micButton: {
    width: moderateScale(60),
    height: moderateScale(45),
    borderRadius: moderateScale(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
});