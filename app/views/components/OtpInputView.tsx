import { useRef, useState } from "react";
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputKeyPressEventData,
  View,
  ViewStyle,
} from "react-native";
import { useTheme } from '@react-navigation/native';
import { moderateScale, spacing } from "../../utils/dimensions";

interface OTPInputProps {
  length?: number;
  onOTPComplete?: (otp: string) => void;
  onOTPChange?: (otp: string) => void;
  containerStyle?: ViewStyle;

  size?: number;
  width?: number;
  height?: number;
  spacing?: number;
  autoFocus?: boolean;
  disabled?: boolean;
}

const OTPInputView = ({
  length = 6,
  onOTPComplete,
  onOTPChange,
  containerStyle,
  size,
  width,
  height,
  spacing: spacingProp,
  autoFocus = true,
  disabled = false,
}: OTPInputProps) => {
  const {colors} = useTheme();
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const clearLastFilledDigit = () => {
    const newOtp = [...otp];
    let lastFilledIndex = -1;

    for (let i = newOtp.length - 1; i >= 0; i -= 1) {
      if (newOtp[i]) {
        lastFilledIndex = i;
        break;
      }
    }

    if (lastFilledIndex === -1) {
      return newOtp;
    }

    newOtp[lastFilledIndex] = "";
    setOtp(newOtp);
    onOTPChange?.(newOtp.join(""));
    inputRefs.current[lastFilledIndex]?.focus();

    return newOtp;
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number,
  ) => {
    if (e.nativeEvent.key === "Backspace") {
      clearLastFilledDigit();
    }
  };

  const handleChange = (text: string, index: number) => {
    const cleaned = text.replace(/[^0-9]/g, "");

    if (!cleaned) return;

    const newOtp = [...otp];

    if (cleaned.length > 1) {
      const pastedDigits = cleaned.slice(0, length - index).split("");
      pastedDigits.forEach((digit, i) => {
        if (index + i < length) {
          newOtp[index + i] = digit;
        }
      });
      setOtp(newOtp);
      const nextIndex = Math.min(index + pastedDigits.length, length - 1);
      inputRefs.current[nextIndex]?.focus();
    } else {
      newOtp[index] = cleaned[cleaned.length - 1];
      setOtp(newOtp);
      if (index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }

    const otpString = newOtp.join("");
    onOTPChange?.(otpString);
    if (otpString.length === length && !newOtp.includes("")) {
      onOTPComplete?.(otpString);
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {Array(length)
        .fill(0)
        .map((_, index) => (
          <TextInput
            key={index}
            ref={(ref) => {
              inputRefs.current[index] = ref;
            }}
            style={[
              styles.input,
              {
                width: size ?? width ?? styles.input.width,
                height: size ?? height ?? styles.input.height,
                marginHorizontal:
                  typeof spacingProp === "number"
                    ? spacingProp / 2
                    : styles.input.marginHorizontal,
              },
              {
                borderColor: colors.text,
                backgroundColor: colors.background,
                color: colors.text,
              },
            ]}
            value={otp[index]}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            keyboardType="number-pad"
            maxLength={length}
            autoFocus={autoFocus && index === 0}
            editable={!disabled}
            selectTextOnFocus
            textAlign="center"
          />
        ))}
    </View>
  );
};

export default OTPInputView;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    width: moderateScale(48),
    height: moderateScale(52),
    marginHorizontal: spacing(6),
    borderWidth: 1,
    borderRadius: spacing(8),
    fontSize: moderateScale(20),
    fontWeight: "600",
  },
});
