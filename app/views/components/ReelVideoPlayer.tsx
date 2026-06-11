import { memo, useCallback, useEffect, useRef, useState } from "react";
import { Platform, Pressable, StyleSheet, View } from "react-native";
import Video from "react-native-video";
import ReelInteractionOverlay from "./ReelInteractionOverlay";

type ReelVideoPlayerProps = {
    item: string;
    width: number;
    height: number;
    isActive: boolean;
    onTipPress?: () => void;
};

const ReelVideoPlayer = memo(({ item, width, height, isActive, onTipPress }: ReelVideoPlayerProps) => {
    const [isManuallyPaused, setIsManuallyPaused] = useState(false);
    const [playbackRate, setPlaybackRate] = useState(1);
    const isPaused = !isActive || isManuallyPaused;

    useEffect(() => {
        if (!isActive) {
            setIsManuallyPaused(false);
            setPlaybackRate(1);
        }
    }, [isActive]);

    const handleTogglePlayback = useCallback(() => {
        if (!isActive) {
            return;
        }
        setIsManuallyPaused((prev) => !prev);
    }, [isActive]);

    const handleRightLongPressStart = useCallback(() => {
        if (!isActive) {
            return;
        }
        setPlaybackRate(2);
    }, [isActive]);

    const handleRightLongPressEnd = useCallback(() => {
        setPlaybackRate(1);
    }, []);

    return (
        <View style={[styles.container, { width, height }]}>
            <Video
                source={{ uri: item }}
                style={styles.video}
                resizeMode="cover"
                repeat
                controls={false}
                paused={isPaused}
                muted={!isActive}
                rate={playbackRate}
                playInBackground={false}
                playWhenInactive={false}
                useTextureView={Platform.OS === 'android'}
            />
            <ReelInteractionOverlay
                isActive={isActive}
                onTogglePlayback={handleTogglePlayback}
                onRightLongPressStart={handleRightLongPressStart}
                onRightLongPressEnd={handleRightLongPressEnd}
                onTipPress={onTipPress}
            />
        </View>
    );
});

export default ReelVideoPlayer;

const styles = StyleSheet.create({
    container: {
        overflow: "hidden",
        backgroundColor: "black",
    },
    video: {
        width: "100%",
        height: "100%",
    },
});