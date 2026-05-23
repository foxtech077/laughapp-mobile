import React, { ReactNode } from 'react';
import { ViewStyle, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

/**
 * Props for the GradientBadge component.
 */
interface GradientBadgeProps {
    /** The content to display inside the badge (text, icons, etc.) */
    children: ReactNode;
    /** Array of colors for the gradient */
    colors: string[];
    /** Start coordinate for the gradient (e.g. {x: 0, y: 0}) */
    start?: { x: number; y: number };
    /** End coordinate for the gradient (e.g. {x: 1, y: 1}) */
    end?: { x: number; y: number };
    /** Optional custom styles to apply to the badge container */
    style?: ViewStyle;
}

/**
 * Highly reusable pill-shaped badge component with a gradient background.
 * Commonly used for highlight tags or status indicators.
 *
 * @param children - The content inside the badge
 * @param colors - Array of gradient colors
 * @param start - Gradient start coordinates
 * @param end - Gradient end coordinates
 * @param style - Additional container styles
 * @returns {JSX.Element} The rendered gradient badge component
 */
export default function GradientBadge({
    children,
    colors,
    start = { x: 0, y: 0 },
    end = { x: 1, y: 1 },
    style,
}: GradientBadgeProps) {
    return (
        <LinearGradient
            colors={colors}
            start={start}
            end={end}
            style={[styles.badgeContainer, style]}
        >
            {children}
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    badgeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 9999, // Pill shape
    },
});
