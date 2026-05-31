import React from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  StyleSheet,
  ScrollViewProps,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';
import { spacing } from '../../utils/dimensions';

interface KeyboardAwareScrollViewProps extends ScrollViewProps {
  children: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  keyboardVerticalOffset?: number;
  enableScroll?: boolean;
}

function KeyboardAwareScrollView({
  children,
  style,
  containerStyle,
  keyboardVerticalOffset,
  keyboardShouldPersistTaps = 'handled',
  showsVerticalScrollIndicator = false,
  enableScroll = true,
  ...rest
}: KeyboardAwareScrollViewProps) {
  const content = enableScroll ? (
    <ScrollView
      style={[styles.scrollView, style]}
      keyboardShouldPersistTaps={keyboardShouldPersistTaps}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      {...rest}
    >
      {children}
    </ScrollView>
  ) : (
    children
  );


  if (Platform.OS === 'android') {
    return (
      <View style={[styles.container, containerStyle]}>
        {content}
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={keyboardVerticalOffset ?? spacing(60)}
      style={[styles.container, containerStyle]}
    >
      {content}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
});

export default KeyboardAwareScrollView;
