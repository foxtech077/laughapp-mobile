import { memo, useCallback, useRef } from "react";
import { View, Pressable, StyleSheet } from "react-native";
import ReelInteractionComponent from "./ReelInteractionComponent";

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
                <ReelInteractionComponent />
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
});

export default ReelInteractionOverlay;