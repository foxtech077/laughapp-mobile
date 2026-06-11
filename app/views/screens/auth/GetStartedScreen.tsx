import { View, StyleSheet, Image, Dimensions, Animated, Easing } from "react-native";
import { useEffect, useRef } from "react";
import { scale, spacing } from "../../../utils/dimensions";
import BaseView from "../../hoc/BaseView";
import ButtonView from "../../components/ButtonView";
import TextView from "../../components/TextView";
import { useTheme } from "@react-navigation/native";
import { images } from "../../../constants/images";
import { routes } from "../../../navigator/routes";

function GetStartedScreen({navigation}: any) {
    const { colors } = useTheme();
    const rotation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.timing(rotation, {
                toValue: 1,
                duration: 3000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();
    }, []);

    const rotate = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <BaseView style={styles.container} gradientBackground gradientColors={colors.primaryGradient} gradientLocations={[0, 0.5, 1]} gradientStart={{ x: 0, y: 0 }} gradientEnd={{ x: 1, y: 1 }} applyBottomInset={true}>
            <View style={styles.content}>
                <Image source={images.logo} style={styles.logo} resizeMode="contain" />
                <Animated.Image source={images.logoBgRotation} style={[styles.logoBgRotation, { transform: [{ rotate }] }]} resizeMode="contain" />
            </View>

            <View style={styles.footer}>
                <TextView variant="title" align="center">
                    Swap
                </TextView>
                <TextView variant="title" align="center" style={[styles.subtitle]}>
                    doomscrolling for joy
                </TextView>
                <TextView variant="subtitle" align="center" style={[styles.subtitle]} color={colors.subtitle}>
                    Explore funny videos from rising and top comedians.
                </TextView>
                <ButtonView
                    label="Continue"
                    fillWidth
                    style={styles.continueButton}
                    onPress={() => navigation.navigate(routes.LOGIN_SCREEN)}
                />
            </View>
        </BaseView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: spacing(24),
        justifyContent: 'center',
    },
    title: {
        marginBottom: spacing(12),
    },
    subtitle: {
        marginBottom: spacing(24),
    },
    footer: {
        paddingHorizontal: spacing(24),
        paddingBottom: spacing(16),
        alignSelf: 'flex-end'
    },
    continueButton: {
        // Additional styling if needed
    },
    logo: {
        width: '100%',
        height: scale(150),
        zIndex:2,
    },
    logoBgRotation: {
        width: Dimensions.get('window').width,
        height: scale(380),
        position: 'absolute',
        zIndex: 1,
        top: scale(20),
    },
});

export default GetStartedScreen;