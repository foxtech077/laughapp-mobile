import { memo, useCallback, useRef } from "react";
import { View, Pressable, StyleSheet, Image } from "react-native";
import TextView from "./TextView";
import { LiquidGlassView } from "@callstack/liquid-glass";
import { moderateScale, spacing, verticalScale } from "../../utils/dimensions";
import { images } from "../../constants/images";
import GlassCard from "./GlassCard";

type ReelInteractionOverlayProps = {
    isActive: boolean;
    onTogglePlayback: () => void;
    onRightLongPressStart: () => void;
    onRightLongPressEnd: () => void;
};

const ReelInteractionOverlay = memo(
    ({ isActive, onTogglePlayback, onRightLongPressStart, onRightLongPressEnd }: ReelInteractionOverlayProps) => {
        const longPressHandledRef = useRef(false);

        const handlePress = useCallback(() => {
            if (longPressHandledRef.current) {
                longPressHandledRef.current = false;
                return;
            }
            onTogglePlayback();
        }, [onTogglePlayback]);

        const handleRightLongPress = useCallback(() => {
            longPressHandledRef.current = true;
            onRightLongPressStart();
        }, [onRightLongPressStart]);

        const handleRightPressOut = useCallback(() => {
            onRightLongPressEnd();
        }, [onRightLongPressEnd]);

        if (!isActive) {
            return null;
        }

        return (
            <View style={styles.overlay}>
                <Pressable style={styles.leftZone} onPress={handlePress} />
                <Pressable
                    style={styles.rightZone}
                    onPress={handlePress}
                    onLongPress={handleRightLongPress}
                    onPressOut={handleRightPressOut}
                    delayLongPress={220}
                />
                <View style={styles.tipLaughContainer}>
                    <GlassCard style={styles.tipView} interactive={true} effect={"clear"}>
                        <Image
                            source={images.tipCoin2}
                            style={styles.tipIcon}
                        />
                        <TextView color={'white'}>1.67 M</TextView>
                    </GlassCard>
                    <GlassCard style={styles.tipView} interactive={true} effect={"clear"}>
                        <Image
                            source={images.laughIcon1}
                            style={styles.tipIcon}
                        />
                        <TextView color={'white'}>1.3K</TextView>
                    </GlassCard>
                    <TextView color={'white'} size={32} weight="600">...</TextView>
                    <TextView color={'white'} size={14} weight="600">
                        More
                    </TextView>
                </View>
                <View style={styles.profileInfoContainer}>
                    <View style={styles.avatarContainer}>
                        <Image
                            source={{ uri: 'https://i.pravatar.cc/150?u=1' }}
                            style={[styles.avatar]}
                            resizeMode="cover"
                            fadeDuration={200}
                        />
                    </View>
                    <View style={styles.profileInforContainer}>
                        <View style={styles.profileNameFollowContainer}>
                            <TextView color={'white'} size={18} weight="700">
                                Laughing Lucy
                            </TextView>
                            <GlassCard style={styles.followButton} interactive={true} effect={"clear"}>
                                <TextView color={'white'} size={14} weight="700">
                                    Following
                                </TextView>
                            </GlassCard>
                        </View>
                        <TextView color={'white'} size={14} weight="400" numberOfLines={1} ellipsizeMode="tail" style={{ width: '50%' }}>
                            My first stand-up gig nervous but funny !
                        </TextView>
                    </View>
                </View>
            </View>
        );
    }
);

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFill,
        flexDirection: "row",
    },
    leftZone: {
        flex: 1,
    },
    rightZone: {
        flex: 1,
    },
    tipView: {
        paddingHorizontal: spacing(10),
        paddingVertical: spacing(14),
        borderRadius: moderateScale(40),
        alignItems: "center",
        justifyContent: "center",
        gap: spacing(10),
    },
    tipIcon: {
        width: 56,
        height: 56,
    },
    tipLaughContainer: {
        position: "absolute",
        right: spacing(16),
        bottom: "30%",
        gap: spacing(16),
        alignItems: "center",
        justifyContent: "center",
    },
    profileInfoContainer: {
        bottom: spacing(40),
        left: spacing(16),
        position: "absolute",
        flexDirection: "row",
        gap: spacing(8),
        width: "80%",
        overflow: "hidden",
    },
    avatarContainer: {

    },
    profileInforContainer: {
        backgroundColor: "transparent",
    },
    profileNameFollowContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing(8),
    },
    followButton: {
        paddingHorizontal: spacing(8),
        paddingVertical: spacing(4),
        borderRadius: moderateScale(6),
        alignItems: "center",
        justifyContent: "center",
    },
    avatar: {
        width: spacing(46),
        height: verticalScale(46),
        borderRadius: spacing(30),
    },
});

export default ReelInteractionOverlay;