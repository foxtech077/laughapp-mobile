import { View, Image, StyleSheet, Pressable } from "react-native";
import { images } from "../../constants/images";
import GlassCard from "./GlassCard";
import TextView from "./TextView";
import { spacing, moderateScale, verticalScale } from "../../utils/dimensions";

interface ReelInteractionComponentProps {
    onTipPress?: () => void;
}

const ReelInteractionComponent = ({ onTipPress }: ReelInteractionComponentProps) => {
    return (
        <>
            <View style={styles.tipLaughContainer}>
                <Pressable onPress={onTipPress}>
                    <GlassCard style={styles.tipView} interactive={true} effect={"clear"}>
                        <Image
                            source={images.tipCoin2}
                            style={styles.tipIcon}
                        />
                        <TextView color={'white'} style={styles.overlayTextShadow} size={14} weight={"600"}>1.67 M</TextView>
                    </GlassCard>
                </Pressable>

                <GlassCard style={styles.tipView} interactive={true} effect={"clear"}>
                    <Image
                        source={images.laughIcon1}
                        style={styles.tipIcon}
                    />
                    <TextView color={'white'} style={styles.overlayTextShadow} size={14} weight={"600"}>1.3K</TextView>
                </GlassCard>
                <TextView color={'white'} size={32} weight="600" style={styles.overlayTextShadow}>...</TextView>
                <TextView color={'white'} size={14} weight="600" style={styles.overlayTextShadow}>
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
                        <TextView color={'white'} size={18} weight="700" style={styles.overlayTextShadow}>
                            Laughing Lucy
                        </TextView>
                        <GlassCard style={styles.followButton} interactive={true} effect={"clear"}>
                            <TextView color={'white'} size={14} weight="700" style={styles.overlayTextShadow}>
                                Following
                            </TextView>
                        </GlassCard>
                    </View>
                    <TextView color={'white'} size={14} weight="400" numberOfLines={1} ellipsizeMode="tail" style={[styles.overlayTextShadow, { width: '50%' }]}>
                        My first stand-up gig nervous but funny !
                    </TextView>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    overlayTextShadow: {
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 4,
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
        alignItems: "flex-end",
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

export default ReelInteractionComponent;