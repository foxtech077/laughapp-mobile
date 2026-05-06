import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ViewProps,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@react-navigation/native';
import { spacing, fontScale } from '../../utils/dimensions';
import TextView from './TextView';
import LinearGradient from 'react-native-linear-gradient';

interface BaseViewProps extends ViewProps {
  children?: React.ReactNode;
  showHeader?: boolean;
  showBackButton?: boolean;
  headerTitle?: string;
  headerRight?: React.ReactNode;
  applyTopInset?: boolean;
  gradientBackground?: boolean;
  applyBottomInset?: boolean;
  gradientColors?: string[];
  gradientLocations?: number[];
  gradientStart?: { x: number; y: number };
  gradientEnd?: { x: number; y: number };
}

function BaseView({
  children,
  showHeader = false,
  showBackButton = false,
  headerTitle,
  headerRight,
  applyTopInset = true,
  applyBottomInset = false,
  style,
  gradientBackground = false,
  gradientColors = ['red', 'blue'],
  gradientLocations = [0, 1],
  gradientStart = { x: 0, y: 0 },
  gradientEnd = { x: 1, y: 1 },
  ...rest
}: BaseViewProps) {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { colors } = useTheme();

  return (
    <LinearGradient style={styles.container} colors={gradientBackground ? gradientColors : [colors.background, colors.background]} locations={gradientLocations} start={gradientStart} end={gradientEnd}>
      <View
      style={[
        styles.container,
        applyTopInset && { paddingTop: insets.top },
        applyBottomInset && { paddingBottom: insets.bottom },
        style,
      ]}
      {...rest}
    >
      <StatusBar
        barStyle={colors.background === '#FFFFFF' ? 'dark-content' : 'light-content'}
        backgroundColor={colors.background}
      />

      {showHeader && (
        <View style={[styles.header, { borderBottomColor: colors.border }]}>
          <View style={styles.headerLeft}>
            {showBackButton && navigation.canGoBack() && (
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <TextView variant="title" style={{ color: colors.primary }}>
                  ←
                </TextView>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.headerCenter}>
            {headerTitle ? (
              <TextView variant="subtitle" numberOfLines={1}>
                {headerTitle}
              </TextView>
            ) : null}
          </View>

          <View style={styles.headerRight}>
            {headerRight ?? null}
          </View>
        </View>
      )}

      {children}
    </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: spacing(56),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing(16),
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  headerLeft: {
    width: spacing(40),
    alignItems: 'flex-start',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerRight: {
    width: spacing(40),
    alignItems: 'flex-end',
  },
  backButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BaseView;
