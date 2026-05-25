import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '@react-navigation/native';
import TextView from '../../../components/TextView';
import { spacing, fontScale, moderateScale, verticalScale } from '../../../../utils/dimensions';

/**
 * Props for the StatsCard component.
 */
interface StatsCardProps {
    /** The value string to display (e.g. "1,626" or "452K") */
    value: string;
    /** The title/label of the stat (e.g. "Past 30 days") */
    title: string;
    /** The icon component to display in the circle */
    icon: ReactNode;
    /** Gradient colors for the card background */
    colors: string[];
    /** Optional custom styles for the card container */
    style?: ViewStyle;
}

/**
 * Reusable stats card component with a gradient background and a circular icon.
 * Used for displaying high-level user statistics.
 *
 * @param value - The primary statistic value
 * @param title - The label describing the statistic
 * @param icon - The SVG icon to render inside the circular badge
 * @param colors - The gradient colors for the background
 * @param style - Additional container styles
 * @returns {JSX.Element} The rendered statistics card
 */
export default function StatsCard({
    value,
    title,
    icon,
    colors,
    style,
}: StatsCardProps) {
    const { colors: themeColors } = useTheme();

    return (
        <LinearGradient
            colors={colors}
            start={{ x: 0.34, y: 0 }}
            end={{ x: 1.49, y: 1 }}
            style={[styles.cardContainer, style]}
        >
            <View style={styles.cardContent}>
                <View style={[styles.iconCircle, { backgroundColor: themeColors.white }]}>
                    {icon}
                </View>
                <View style={styles.textContent}>
                    <TextView size={fontScale(18)} weight="800" numberOfLines={1} ellipsizeMode="tail" style={{ color: themeColors.primaryText }}>
                        {value}
                    </TextView>
                    <TextView size={fontScale(13)} weight="600" numberOfLines={1} ellipsizeMode="tail" style={{ color: themeColors.secondaryText, marginTop: spacing(1) }}>
                        {title}
                    </TextView>
                </View>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        minHeight: verticalScale(48),
        borderRadius: moderateScale(30),
        overflow: 'hidden',
    },
    cardContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: spacing(4),
        gap: spacing(4),
    },
    iconCircle: {
        width: spacing(40),
        height: spacing(40),
        borderRadius: moderateScale(20),
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContent: {
        flex: 1,
        justifyContent: 'center',
    },
});
