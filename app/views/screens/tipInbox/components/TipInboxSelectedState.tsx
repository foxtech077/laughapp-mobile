import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { fontScale, moderateScale, spacing, verticalScale } from '../../../../utils/dimensions';
import { images } from '../../../../constants/images';
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

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? spacing(60) : 0}
      style={styles.absoluteContainer}
    >
      <View
        style={[
          styles.bottomInputBar,
          {
            borderTopColor: colors.tipDivider,
            backgroundColor: colors.white,
            paddingBottom: insets.bottom > 0 ? insets.bottom : spacing(16),
          },
        ]}
      >
        <View
          style={[
            styles.inputContainer,
            {
              backgroundColor: colors.gray100,
              borderWidth: 1, borderColor: isFocused
                ? '#231F20'
                : colors.inputBorder || '#DADADA',
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
                Alert.alert(
                  'Microphone Pressed',
                  'Voice speech-to-text simulation active. Type to appreciation send.'
                );
              }
          }
          style={[styles.micButton, { backgroundColor: colors.filterTabSelected }]}
        >
          {appreciationText.trim() ? (
            <SendIcon
              fill={colors.white}
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
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  absoluteContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  bottomInputBar: {
    flexDirection: 'row',
    alignItems: 'center',

    paddingTop: spacing(20),
    paddingHorizontal: spacing(16),

    borderTopWidth: 1,

    shadowColor: '#0D0D0D',
    shadowOffset: {
      width: 0,
      height: -8,
    },
    shadowOpacity: 0.12,
    shadowRadius: 25,

    elevation: 12,
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