import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '@react-navigation/native';

import LinearGradient from 'react-native-linear-gradient';
import IconCircle from './IconCircle';
import { spacing } from '../../../../utils/dimensions';
import TextView from '../../../components/TextView';
import ButtonView from '../../../components/ButtonView';

/**
 * Props for the EmptyState component.
 */
interface EmptyStateProps {
    /** The main title describing the empty state */
    title: string;
    /** Detailed description of the empty state */
    description: string;
    /** The SVG icon to render inside the circular badge */
    icon: ReactNode;
    /** Optional icon background gradient colors */
    iconGradientColors?: string[];
    /** Label for the call to action button */
    buttonLabel?: string;
    /** Callback when the call to action button is pressed */
    onButtonPress?: () => void;
    /** Optional custom styles for the container */
    style?: ViewStyle;
}

/**
 * Reusable empty state component with an icon, title, description, and an optional CTA button.
 * Used when lists or screens have no data to display.
 *
 * @param title - The title of the empty state
 * @param description - The description of the empty state
 * @param icon - The SVG icon to display
 * @param iconGradientColors - Optional gradient background for the icon circle
 * @param buttonLabel - The text for the CTA button
 * @param onButtonPress - The action to perform when the button is clicked
 * @param style - Additional container styles
 * @returns {JSX.Element} The rendered empty state
 */
export default function EmptyState({
    title,
    description,
    icon,
    iconGradientColors,
    buttonLabel,
    onButtonPress,
    style,
}: EmptyStateProps) {
    const { colors } = useTheme();

    return (
        <View
            style={[
                styles.container,
                { backgroundColor: colors.emptyStateBackground, borderColor: colors.border },
                style,
            ]}
        >
            {iconGradientColors ? (
                <LinearGradient
                    colors={iconGradientColors}
                    start={{ x: 0.34, y: 0 }}
                    end={{ x: 1.49, y: 1 }}
                    style={styles.iconCircle}
                >
                    {icon}
                </LinearGradient>
            ) : (
                <IconCircle size={spacing(52)} style={styles.iconCircle}>
                    {icon}
                </IconCircle>
            )}

            <TextView
                size={24}
                weight="800"
                align="center"
                style={[
                    styles.title,
                    { color: colors.primaryText, lineHeight: spacing(30), includeFontPadding: false },
                ]}
            >
                {title}
            </TextView>
            <TextView
                size={17}
                weight="500"
                align="center"
                style={[
                    styles.description,
                    { color: colors.secondaryText, lineHeight: spacing(22) },
                ]}
            >
                {description}
            </TextView>

            {buttonLabel && onButtonPress && (
                <ButtonView
                    label={buttonLabel}
                    variant="normal"
                    onPress={onButtonPress}
                    style={styles.button}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: spacing(36),
        paddingHorizontal: spacing(20),
        borderRadius: spacing(10),
        borderWidth: 1.2,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: spacing(4),
    },
    iconCircle: {
        width: spacing(52),
        height: spacing(52),
        borderRadius: spacing(26),
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: spacing(16),
    },
    title: {
        marginBottom: spacing(10),
    },
    description: {
        paddingHorizontal: spacing(16),
        marginBottom: spacing(24),
    },
    button: {
        borderRadius: spacing(30),
        paddingVertical: spacing(12),
        paddingHorizontal: spacing(30),
        alignSelf: 'center',
    },
});
