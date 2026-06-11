import { View, StyleSheet, Image } from "react-native";
import BaseView from "../../hoc/BaseView";
import TextView from "../../components/TextView";
import ButtonView from "../../components/ButtonView";
import { spacing, fontScale, scale, verticalScale } from "../../../utils/dimensions";
import { images } from "../../../constants/images";
import { useTheme } from "@react-navigation/native";
import { routes } from "../../../navigator/routes";
import { maskMobileNumber } from "../../../utils/helper";
import OTPInputView from "../../components/OtpInputView";
import { useTimer } from "../../../hooks/useTimer";
import { MMKV_KEYS, Storage } from "../../../utils/mmkvStorage";
import { useAuthStore } from "../../../store/useAuthStore";

function OtpVerificationScreen({ navigation, route }: any) {
    const { colors } = useTheme();
      const { setIsLoggedIn } = useAuthStore();
    
    const { phoneNumber } = route.params;
    const { formatted, resetTimer } = useTimer(60, {
        autoStart: true,
        onComplete: () => {
            console.log("Timer completed");
        },
    });

    const onContinue = () => {
        Storage.set(MMKV_KEYS.AUTH_LOGGED_IN, true);
        setIsLoggedIn(true);
    }

    return (
        <BaseView
            style={styles.container}
            gradientBackground
            gradientColors={['#f8dc6a', '#fceac3', '#fdd3b1']}
            gradientLocations={[0, 0.5, 1]}
            gradientStart={{ x: 1, y: 0 }}
            gradientEnd={{ x: 0, y: 1 }}
            applyBottomInset={true}
            dismissKeyboardOnTap
        >
            <View style={[styles.topSection, styles.topSectionExpanded]}>
                <Image source={images.logo} style={styles.logo} resizeMode="contain" />
                <View style={styles.contentExpanded}>
                    <TextView variant="heading" align="center">
                        We just sent you a code
                    </TextView>
                    <TextView
                        variant="subtitle"
                        style={styles.subtitle}
                        align="center"
                        color={colors.subtitle}
                    >
                        Enter the security code we sent to
                    </TextView>
                    <View style={styles.phoneRow2}>
                        <TextView
                            variant="subtitle"
                            style={styles.subtitle2}
                            align="center"
                            color={colors.black}
                        >
                            {maskMobileNumber(phoneNumber)}
                        </TextView>
                        <TextView
                            variant="subtitle"
                            style={[styles.subtitle2, { textDecorationLine: 'underline' }]}
                            align="center"
                            color={colors.black}
                            onPress={() => navigation.navigate(routes.LOGIN_SCREEN)}
                        >
                            Change
                        </TextView>
                    </View>
                    <View>
                        <OTPInputView
                            length={6}
                            autoFocus
                            onOTPComplete={(otp) => console.log('Entered OTP:', otp)}
                            containerStyle={styles.otpContainer}
                        />
                        <View style={styles.phoneRow3}>
                            <TextView
                            variant="subtitle"
                            style={styles.timerText}
                            color={colors.black}
                        >
                            Code expires in {formatted}
                        </TextView>
                        <TextView
                            variant="subtitle"
                            style={styles.resendText}
                            color={colors.black}
                            onPress={() => resetTimer(true)}
                        >
                            Resend
                        </TextView>
                        </View>
                    </View>
                </View>
            </View>

            <ButtonView
                label="Continue"
                onPress={onContinue}
                fillWidth
                style={styles.continueButton}
            />
        </BaseView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: spacing(24),
    },
    topSection: {
        width: '100%',
    },
    topSectionExpanded: {
        flex: 1,
    },
    contentExpanded: {
        flex: 1,
    },
    subtitle2: {
        marginBottom: spacing(24),
    },
    subtitle: {
        marginTop: spacing(8),
    },
    phoneRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: spacing(12),
        marginBottom: spacing(4),
    },
    flagButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: spacing(60),
        paddingHorizontal: spacing(12),
        borderWidth: 1.5,
        borderRadius: spacing(12),
        borderColor: '#DADADA',
        backgroundColor: '#FFFFFF',
        gap: spacing(6),
    },
    flagButtonActive: {
        borderColor: '#231F20',
    },
    chevron: {
        fontSize: fontScale(13),
        color: '#555555',
    },
    phoneInput: {
        flex: 1,
    },
    callingCode: {
        fontSize: fontScale(15),
        fontWeight: '600',
        color: '#000000',
    },
    dropdown: {
        flex: 1,
        marginTop: spacing(8),
        marginBottom: spacing(16),
        backgroundColor: '#FFFFFF',
        borderRadius: spacing(16),
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 4,
    },
    countryItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: spacing(16),
        paddingVertical: spacing(14),
    },
    countryFlag: {
        borderRadius: 4,
        overflow: 'hidden',
    },
    countryName: {
        flex: 1,
        marginLeft: spacing(14),
        fontSize: fontScale(16),
        fontWeight: '500',
        color: '#1A1A1A',
    },
    countryCallingCode: {
        fontSize: fontScale(16),
        fontWeight: '500',
        color: '#1A1A1A',
    },
    separator: {
        height: 1,
        backgroundColor: '#EEEEEE',
        marginHorizontal: spacing(16),
    },
    logo: {
        width: '100%',
        height: scale(116),
        zIndex: 2,
        marginTop: spacing(40),
        marginBottom: verticalScale(60),
    },
    continueButton: {
        marginBottom: spacing(8),
    },
    phoneRow2: {
        flexDirection: 'row',
        alignSelf: 'center',
        gap: spacing(4),
    },
    phoneRow3: {
        flexDirection: 'row',
        gap: spacing(4),
    },
    otpContainer: {
        marginTop: spacing(16),
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    timerText: {
        marginTop: spacing(4),
    },
    resendText: {
        marginTop: spacing(4),
        textDecorationLine: 'underline',
    },
});

export default OtpVerificationScreen;
