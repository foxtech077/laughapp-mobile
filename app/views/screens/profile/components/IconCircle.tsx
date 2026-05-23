import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

/**
 * Props for the IconCircle component.
 */
interface IconCircleProps {
    /** The icon or elements to render inside the circle */
    children: ReactNode;
    /** Size of the circle (width and height) */
    size?: number;
    /** Background color of the circle */
    backgroundColor?: string;
    /** Optional custom styles to apply to the container */
    style?: ViewStyle;
}

/**
 * Reusable wrapper component for rendering icons inside perfect circles.
 * Allows customization of size and background color.
 *
 * @param children - The icon component to display
 * @param size - Diameter of the circle (default: 40)
 * @param backgroundColor - Background color of the circle (default: transparent)
 * @param style - Additional container styles
 * @returns {JSX.Element} The rendered icon circle component
 */
export default function IconCircle({
    children,
    size = 40,
    backgroundColor = 'transparent',
    style,
}: IconCircleProps) {
    return (
        <View
            style={[
                styles.container,
                {
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                    backgroundColor,
                },
                style,
            ]}
        >
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});
