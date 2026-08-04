import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  ViewProps,
  StatusBar,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@react-navigation/native';
import { fontScale, spacing, moderateScale } from '../../utils/dimensions';
import TextView from '../components/TextView';
import LinearGradient from 'react-native-linear-gradient';
import BackArrow from '../../../assets/images/icons/arrow-left.svg';
import NotificationIcon from '../../../assets/images/icons/notification.svg';

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
  dismissKeyboardOnTap?: boolean;
  titleAlign?: 'left' | 'center' | 'right';
  showNotification?: boolean;
  onNotificationPress?: () => void;
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
  dismissKeyboardOnTap = false,
  titleAlign,
  showNotification = false,
  onNotificationPress,
  ...rest
}: BaseViewProps) {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { colors } = useTheme();

  const notificationCount = 3;

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <LinearGradient
      style={styles.container}
      colors={
        gradientBackground
          ? gradientColors
          : [colors.background, colors.background]
      }
      locations={gradientLocations}
      start={gradientStart}
      end={gradientEnd}
    >
      <View
        style={[
          styles.container,
          applyTopInset && { paddingTop: insets.top },
          applyBottomInset && {
            paddingBottom:
              insets.bottom + (Platform.OS === 'android' ? spacing(10) : 0),
          },
          style,
        ]}
        onStartShouldSetResponder={() => {
          if (dismissKeyboardOnTap) Keyboard.dismiss();
          return false;
        }}
        {...rest}
      >
        <StatusBar
          barStyle={
            colors.background === '#FFFFFF' ? 'dark-content' : 'light-content'
          }
          backgroundColor={colors.background}
        />

        {showHeader && (
          <View style={[styles.header]}>
            {showBackButton && (
              <View style={styles.headerLeft}>
                <TouchableOpacity
                  style={styles.backButton}
                  onPress={handleBack}
                  hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                >
                  <BackArrow
                    width={24}
                    height={24}
                    stroke={colors.primaryText}
                  />
                </TouchableOpacity>
              </View>
            )}

            <View style={styles.headerCenter}>
              {headerTitle ? (
                <TextView
                  size={fontScale(20)}
                  weight="800"
                  align={titleAlign || 'center'}
                  numberOfLines={1}
                >
                  {headerTitle}
                </TextView>
              ) : null}
            </View>

            <View style={styles.headerRight}>
              {headerRight ??
                (showNotification ? (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.notificationContainer}
                    onPress={onNotificationPress}
                  >
                    <NotificationIcon
                      width={spacing(20)}
                      height={spacing(20)}
                      stroke={colors.primaryText}
                      strokeWidth={0}
                    />
                    {notificationCount !== undefined &&
                      notificationCount > 0 ? (
                      <View
                        style={[
                          styles.notificationBadge,
                          {
                            backgroundColor:
                              colors.unrepliedRed || colors.error || 'red',
                          },
                        ]}
                      >
                        <TextView
                          size={fontScale(10)}
                          weight="600"
                          style={{
                            color: colors.white,

                            marginTop: Platform.OS === 'ios' ? spacing(-3) : spacing(-1.5),
                          }}
                        >
                          {notificationCount}
                        </TextView>
                      </View>
                    ) : null}
                  </TouchableOpacity>
                ) : null)}
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
    minHeight: spacing(56),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing(16),
    paddingVertical: spacing(8),
    // backgroundColor: 'red'
  },
  headerLeft: {
    minWidth: spacing(40),
    alignItems: 'flex-start',
  },
  headerCenter: {
    flex: 1,
    justifyContent: 'center',
  },
  headerRight: {
    minWidth: spacing(40),
    alignItems: 'flex-end',
  },
  backButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationContainer: {
    position: 'relative',
    marginRight: spacing(4),
  },
  notificationBadge: {
    position: 'absolute',
    top: -spacing(6),
    right: -spacing(6),
    width: spacing(17),
    height: spacing(17),
    borderRadius: moderateScale(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BaseView;
