import { View, StyleSheet, TouchableOpacity } from "react-native";
import BaseView from "../../components/BaseView";
import TextView from "../../components/TextView";
import ButtonView from "../../components/ButtonView";
import { spacing, fontScale } from "../../../utils/dimensions";
import { useState } from "react";
import TextInputView from "../../components/TextInputView";

function LoginScreen() {
    const [phoneNumber, setPhoneNumber] = useState('');

    return (
        <BaseView style={styles.container} gradientBackground gradientColors={['#f8dc6a', '#fceac3', '#fdd3b1']} gradientLocations={[0, 0.5, 1]} gradientStart={{ x: 1, y: 0 }} gradientEnd={{ x: 0, y: 1 }}>
            <TextView variant="title" style={styles.appName}>LaughApp</TextView>
            <TextView variant="title">Verify your phone number</TextView>
            <TextView variant="description" style={styles.subtitle} align="center">
                We will send you a verification code to your mobile number.
            </TextView>

            <View style={styles.phoneRow}>
                {/* Country code button */}
                <TouchableOpacity
                    style={styles.flagButton}
                    onPress={() => {}}
                    activeOpacity={0.75}
                >
                </TouchableOpacity>

                <TextInputView
                    label="Phone number"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    keyboardType="phone-pad"
                    style={styles.phoneInput}
                />
            </View>

            <ButtonView
                disabled={!phoneNumber}
                label="Send Code"
                onPress={() => { }}
                fillWidth
            />
        </BaseView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: spacing(24),
    },
    appName: {
        marginBottom: spacing(8),
    },
    subtitle: {
        marginTop: spacing(8),
        marginBottom: spacing(24),
    },
    phoneRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing(12),
        marginBottom: spacing(24),
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
        width: spacing(80),
    },
    chevron: {
        fontSize: fontScale(14),
        color: '#555555',
        marginTop: -spacing(2),
    },
    phoneInput: {
        flex: 1,
        // width: '100%',
    },
});

export default LoginScreen;
