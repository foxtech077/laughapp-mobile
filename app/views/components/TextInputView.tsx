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
  errorAlign?: 'left' | 'center' | 'right';
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  variant?: 'floating' | 'auth';
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
  errorAlign = 'left',
  rightIcon,
  leftIcon,
  value,
  onFocus,
  onBlur,
  style,
  variant = 'floating',
  ...rest
}: TextInputViewProps) {
  const { colors } = useTheme();
  const inputRef = useRef<TextInput>(null);
  const [isFocused, setIsFocused] = useState(false);

  const isActive = isFocused || Boolean(value);
  const isAuth = variant === 'auth';

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

  const borderColor = error ? colors.error : isFocused ? colors.primaryText : (isAuth ? colors.border : '#DADADA');

  const labelColor = error
    ? (isAuth ? colors.error : '#E53935')
    : isActive
      ? isFocused
        ? (isAuth ? colors.primaryText : '#000000')
        : (isAuth ? colors.secondaryText : '#888888')
      : (isAuth ? colors.placeholder : '#AAAAAA');

  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  return (
    <View style={[styles.wrapper, style, isAuth && { width: '100%' }]}>
      <TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
        <View style={[
          styles.container,
          { borderColor, backgroundColor: colors.cardBackground },
          isAuth ? styles.authContainer : { height: CONTAINER_HEIGHT }
        ]}>
          {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}

          <View style={[styles.innerArea, isAuth && styles.authInnerArea]}>
            {/* Floating label reused for both variants */}
            <Animated.Text
              style={[
                styles.label,
                {
                  top: animTop,
                  fontSize: animSize,
                  color: labelColor,
                },
                isAuth && { fontFamily: 'Inter', fontWeight: isActive ? '400' : '500',  letterSpacing: -0.5,
 }
              ]}
              numberOfLines={1}
            >
              {label}
            </Animated.Text>

            {/* Input sits at bottom half, below the floating label, or fully centers in auth mode */}
            <TextInput
              ref={inputRef}
              value={value}
              onFocus={handleFocus}
              onBlur={handleBlur}
              style={[
                styles.input,
                isAuth ? [styles.input, { color: colors.primaryText }] : { paddingTop: LABEL_TOP_ACTIVE + LABEL_SIZE_ACTIVE * 1.4, color: colors.primaryText }
              ]}
              placeholderTextColor={isAuth ? colors.placeholder : "transparent"}
              placeholder={isAuth && !isActive ? label : " "}
              {...rest}
            />
          </View>

          {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
        </View>
      </TouchableWithoutFeedback>

      {error ? (
  <View
    style={[
      styles.errorContainer,
       styles.errorContainerRight,
    ]}
  >
    <TextView
      style={[
        styles.errorText,
        isAuth && styles.authErrorText,
        {
          color: isAuth ? colors.error : '#E53935',
          textAlign: errorAlign,
        },
      ]}
    >
      {error}
    </TextView>
  </View>
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
    padding: 0,
    margin: 0,
  },
  leftIcon: {
    marginRight: spacing(8),
  },
  rightIcon: {
    marginLeft: spacing(8),
    marginTop: spacing(15)
  },
  errorText: {
    color: '#E53935',
    marginHorizontal: spacing(4),
  },
 errorContainer: {
  width: '100%',
},

errorContainerRight: {
  alignItems: 'flex-end',
},

errorContainerCenter: {
  alignItems: 'center',
},
  authContainer: {
    height: spacing(66),
    borderRadius: spacing(10),
    borderWidth: 1,
    paddingTop: spacing(8),
    paddingBottom: spacing(8),
    paddingHorizontal: spacing(16),

  },
  authInnerArea: {
    justifyContent: 'center',
    position: 'relative',
  },
  authErrorText: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 16,
    marginTop: 4,
    width: '100%',
  },
});

export default TextInputView;
