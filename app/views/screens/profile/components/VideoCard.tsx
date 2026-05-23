import React from 'react';
import { View, Image, StyleSheet, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '@react-navigation/native';
import { fontScale, spacing } from '../../../../utils/dimensions';
import TextView from '../../../components/TextView';
import { images } from '../../../../constants/images';


const { LaughIcon1, tipIcon } = images;

export interface VideoData {
    id: string;
    image: string;
    laughs: string;
    coins: string;
    duration: string;
}

/**
 * Props for the VideoCard component.
 */
interface VideoCardProps {
    /** The video data object to render */
    item: VideoData;
    width: number;
    height: number;
    /** Custom border radii depending on grid position */
    borderRadii?: {
        borderTopLeftRadius?: number;
        borderTopRightRadius?: number;
        borderBottomLeftRadius?: number;
        borderBottomRightRadius?: number;
    };
    /** Optional custom styles for the container */
    style?: ViewStyle;
}

/**
 * Reusable video card component for rendering a thumbnail with a cinematic
 * gradient overlay and statistical badges (laughs, tips, duration).
 * 
 * Supports dynamic border radii to cleanly integrate into row-based layouts.
 *
 * @param item - The video data containing image URL and stats
 * @param width - The exact width of the card
 * @param height - The exact height of the card
 * @param borderRadii - Configurable border radiuses for grid placement
 * @param style - Additional container styles
 * @returns {JSX.Element} The rendered video card
 */
export default function VideoCard({
    item,
    width,
    height,
    borderRadii,
    style,
}: VideoCardProps) {
    const { colors } = useTheme();

    return (
        <View
            style={[
                styles.gridItem,
                {
                    width,
                    height,
                    backgroundColor: colors.videoPlaceholder,
                    ...borderRadii,
                },
                style,
            ]}
        >
            <Image
                source={{ uri: item.image }}
                style={StyleSheet.absoluteFill}
                resizeMode="cover"
            />

            <LinearGradient
                colors={[
                    colors.overlayLight,
                    colors.transparent,
                    colors.transparent,
                    colors.overlayDark,
                ]}
                locations={[0, 0.2527, 0.6589, 1]}
                style={StyleSheet.absoluteFill}
            />

            {/* Top Left laughs badge */}
            <View style={[styles.badgeTopLeft, { backgroundColor: colors.badgeOverlay }]}>
                <LaughIcon1 width={spacing(12)} height={spacing(12)} style={{ backgroundColor: colors.white, borderRadius: spacing(6) }} />
                <TextView style={[styles.badgeText, { color: colors.white }]}>{item.laughs}</TextView>
            </View>

            {/* Bottom Left tokens badge */}
            <View style={[styles.badgeBottomLeft, { backgroundColor: colors.badgeOverlay }]}>
                <Image source={images.tipIcon} style={{ width: spacing(14), height: spacing(14) }} />
                <TextView style={[styles.badgeTextBottom, { color: colors.white }]}>{item.coins}</TextView>
            </View>

            {/* Bottom Right duration badge */}
            <View style={styles.badgeBottomRight}>
                <TextView style={[styles.durationText, { color: colors.white }]}>{item.duration}</TextView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    gridItem: {
        overflow: 'hidden',
    },
    badgeTopLeft: {
        position: 'absolute',
        width: spacing(56),
        height: spacing(22),
        top: spacing(8),
        left: spacing(8),
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: spacing(6),
        paddingVertical: spacing(2),
        borderRadius: spacing(12),
        gap: spacing(4),
    },
    badgeBottomLeft: {
        position: 'absolute',
        bottom: spacing(8),
        left: spacing(8),
        width: spacing(58),
        height: spacing(22),
        paddingHorizontal: spacing(6),
        paddingVertical: spacing(2),
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: spacing(12),
        gap: spacing(4),
    },
    badgeBottomRight: {
        position: 'absolute',
        bottom: spacing(8),
        right: spacing(8),
    },
    badgeText: {
        fontSize: fontScale(11),
        fontWeight: '600',
        width: '100%'
    },
    badgeTextBottom: {
        fontSize: fontScale(11),
        fontWeight: '600',
    },
    durationText: {
        fontSize: fontScale(11),
        fontWeight: '600',
    },
});
