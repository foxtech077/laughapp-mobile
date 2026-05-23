import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';
import { spacing } from '../../utils/dimensions';
import TextView from '../../views/components/TextView';
import { images } from '../../constants/images';
import { routes } from '../routes';
import { HomeTabParamList } from '../types';

type TabRouteName = keyof HomeTabParamList;

const TAB_CONFIG: Record<
    TabRouteName,
    {
        label: string;
        ActiveIcon: React.ComponentType<{ width?: number; height?: number }>;
        InactiveIcon: React.ComponentType<{ width?: number; height?: number }>;
        inactiveWidth: number;
        inactiveHeight: number;
    }
> = {
    [routes.FOLLOWING_SCREEN]: {
        label: 'Following',
        ActiveIcon: images.FollowingActiveIcon,
        InactiveIcon: images.FollowingInactiveIcon,
        inactiveWidth: spacing(21),
        inactiveHeight: spacing(19),
    },
    [routes.TOP_COMEDIANS_SCREEN]: {
        label: 'Top',
        ActiveIcon: images.TopActiveIcon,
        InactiveIcon: images.TopInactiveIcon,
        inactiveWidth: spacing(26),
        inactiveHeight: spacing(22),
    },
    [routes.PROFILE_SCREEN]: {
        label: 'Profile',
        ActiveIcon: images.ProfileActiveIcon,
        InactiveIcon: images.ProfileInactiveIcon,
        inactiveWidth: spacing(26),
        inactiveHeight: spacing(26),
    },
};

export default function CustomTabBar({ state, navigation }: BottomTabBarProps) {
    const insets = useSafeAreaInsets();
    const { colors } = useTheme();

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: colors.white,
                    paddingBottom: insets.bottom,
                },
            ]}
        >
            {state.routes.map((route, index) => {
                const tabRoute = route.name as TabRouteName;
                const config = TAB_CONFIG[tabRoute];
                if (!config) {
                    return null;
                }

                const isFocused = state.index === index;
                const Icon = isFocused ? config.ActiveIcon : config.InactiveIcon;
                const iconWidth = isFocused ? spacing(38) : config.inactiveWidth;
                const iconHeight = isFocused ? spacing(38) : config.inactiveHeight;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                return (
                    <TouchableOpacity
                        key={route.key}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        onPress={onPress}
                        style={styles.tabItem}
                        activeOpacity={0.7}
                    >
                        <View style={styles.iconSlot}>
                            <Icon width={iconWidth} height={iconHeight} />
                        </View>
                        <TextView
                            size={13}
                            weight={isFocused ? '700' : '500'}
                            align="center"
                            style={{
                                color: isFocused ? colors.primaryText : colors.secondaryText,
                                marginTop: spacing(2),
                            }}
                        >
                            {config.label} 
                        </TextView>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderTopLeftRadius: spacing(20),
        borderTopRightRadius: spacing(20),
        paddingTop: spacing(8),
        borderTopWidth: 1,
        borderTopColor: "#C4C4C4",
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
    },
    iconSlot: {
        width: spacing(38),
        height: spacing(38),
        alignItems: 'center',
        justifyContent: 'center',
    },
});
