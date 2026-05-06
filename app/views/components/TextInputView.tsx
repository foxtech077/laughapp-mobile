import React, { useRef, useState, useEffect } from 'react';
import {
  Animated,
  TextInput,
  TextInputProps,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { spacing, fontScale } from '../../utils/dimensions';
import TextView from './TextView';

interface TextInputViewProps extends TextInputProps {
  label: string;
  error?: string;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
}

const CONTAINER_HEIGHT = spacing(60);
const H_PADDING = spacing(16);

// Active = label floated to top
const LABEL_TOP_ACTIVE = spacing(8);
const LABEL_SIZE_ACTIVE = fontScale(12);

// Inactive = label centered in container
const LABEL_TOP_INACTIVE = (CONTAINER_HEIGHT - fontScale(15) * 1.3) / 2;
const LABEL_SIZE_INACTIVE = fontScale(15);

const DURATION = 150;

function TextInputView({
  label,
  error,
  rightIcon,
  leftIcon,
  value,
  onFocus,
  onBlur,
  style,
  ...rest
}: TextInputViewProps) {
  const { colors } = useTheme();
  const inputRef = useRef<TextInput>(null);
  const [isFocused, setIsFocused] = useState(false);

  const isActive = isFocused || Boolean(value);

  const animTop = useRef(new Animated.Value(isActive ? LABEL_TOP_ACTIVE : LABEL_TOP_INACTIVE)).current;
  const animSize = useRef(new Animated.Value(isActive ? LABEL_SIZE_ACTIVE : LABEL_SIZE_INACTIVE)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(animTop, {
        toValue: isActive ? LABEL_TOP_ACTIVE : LABEL_TOP_INACTIVE,
        duration: DURATION,
        useNativeDriver: false,
      }),
      Animated.timing(animSize, {
        toValue: isActive ? LABEL_SIZE_ACTIVE : LABEL_SIZE_INACTIVE,
        duration: DURATION,
        useNativeDriver: false,
      }),
    ]).start();
  }, [isActive]);

  const borderColor = error ? '#E53935' : isFocused ? '#000000' : '#DADADA';

  const labelColor = error
    ? '#E53935'
    : isActive
    ? isFocused
      ? '#000000'
      : '#888888'
    : '#AAAAAA';

  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  return (
    <View style={[styles.wrapper, style]}>
      <TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
        <View style={[styles.container, { borderColor, height: CONTAINER_HEIGHT }]}>
          {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}

          <View style={styles.innerArea}>
            {/* Floating label */}
            <Animated.Text
              style={[
                styles.label,
                {
                  top: animTop,
                  fontSize: animSize,
                  color: labelColor,
                },
              ]}
              numberOfLines={1}
            >
              {label}
            </Animated.Text>

            {/* Input sits at bottom half, below the floating label */}
            <TextInput
              ref={inputRef}
              value={value}
              onFocus={handleFocus}
              onBlur={handleBlur}
              style={[styles.input, { paddingTop: LABEL_TOP_ACTIVE + LABEL_SIZE_ACTIVE * 1.4 }]}
              placeholderTextColor="transparent"
              placeholder=" "
              {...rest}
            />
          </View>

          {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
        </View>
      </TouchableWithoutFeedback>

      {error ? (
        <TextView variant="caption" style={styles.errorText}>
          {error}
        </TextView>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: spacing(4),
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: spacing(12),
    paddingHorizontal: H_PADDING,
    backgroundColor: '#FFFFFF',
  },
  innerArea: {
    flex: 1,
    position: 'relative',
    height: '100%',
  },
  label: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
  input: {
    position: 'absolute',
    bottom: spacing(8),
    left: 0,
    right: 0,
    fontSize: fontScale(15),
    fontWeight: '600',
    color: '#000000',
    padding: 0,
    margin: 0,
  },
  leftIcon: {
    marginRight: spacing(8),
  },
  rightIcon: {
    marginLeft: spacing(8),
  },
  errorText: {
    color: '#E53935',
    marginLeft: spacing(4),
  },
});

export default TextInputView;
