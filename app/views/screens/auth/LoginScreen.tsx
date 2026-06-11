import { View, StyleSheet, Image, FlatList, TouchableOpacity } from "react-native";
import { useEffect, useMemo, useState } from "react";
import BaseView from "../../hoc/BaseView";
import TextView from "../../components/TextView";
import ButtonView from "../../components/ButtonView";
import TextInputView from "../../components/TextInputView";
import { spacing, fontScale, scale, verticalScale } from "../../../utils/dimensions";
import { images } from "../../../constants/images";
import { useTheme } from "@react-navigation/native";
import CountryFlag from "react-native-country-flag";
import { getAllCountries, Country, FlagType } from "react-native-country-picker-modal";
import { isValidPhoneNumber, getCountryByCca2 } from 'rn-international-phone-number';
import { useFormik } from "formik";
import * as Yup from "yup";
import { routes } from "../../../navigator/routes";

const getCountryName = (country: Country): string => {
    if (typeof country.name === 'string') return country.name;
    return (country.name as any)['common'] ?? country.cca2;
};

function LoginScreen({navigation}: any) {
    const { colors } = useTheme();
    const [countries, setCountries] = useState<Country[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        getAllCountries(FlagType.EMOJI, 'common').then((data: Country[]) => {
            setCountries(data);
            const malaysia = data.find((c: Country) => c.cca2 === 'MY') ?? data[0];
            if (malaysia) setSelectedCountry(malaysia);
        });
    }, []);

    const callingCode = selectedCountry?.callingCode?.[0] ?? '';

    const validationSchema = useMemo(() =>
        Yup.object({
            phoneNumber: Yup.string()
                .required('Phone number is required')
                .matches(/^\d+$/, 'Phone number must contain only digits')
                .test('is-valid-phone', 'Invalid phone number for selected country', (value) => {
                    if (!value || !selectedCountry) return false;
                    const rnCountry = getCountryByCca2(selectedCountry.cca2);
                    if (!rnCountry) return true;
                    return isValidPhoneNumber(value, rnCountry);
                }),
        }),
        [selectedCountry, callingCode]
    );

    const formik = useFormik({
        initialValues: {
            phoneNumber: '',
        },
        validationSchema,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (values) => {
            const fullNumber = `+${callingCode}${values.phoneNumber}`.replace(/\s/g, '');
            console.log('Full number:', fullNumber);
            navigation.navigate(routes.OTP_VERIFICATION_SCREEN, { phoneNumber: fullNumber });
        },
    });

    useEffect(() => {
        if (formik.values.phoneNumber) {
            formik.validateForm();
        }
    }, [validationSchema]);

    const handleSelectCountry = (country: Country) => {
        setSelectedCountry(country);
        setShowDropdown(false);
        formik.resetForm();
    };

    const isButtonDisabled =
        !formik.values.phoneNumber ||
        Object.keys(formik.errors).length > 0 ||
        formik.isSubmitting;

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
            <View style={[styles.topSection, showDropdown && styles.topSectionExpanded]}>
                <Image source={images.logo} style={styles.logo} resizeMode="contain" />
                <View style={showDropdown && styles.contentExpanded}>
                    <TextView variant="heading" align="center">
                        Verify your phone number
                    </TextView>
                    <TextView
                        variant="subtitle"
                        style={styles.subtitle}
                        align="center"
                        color={colors.subtitle}
                    >
                        We will send you a verification code to your mobile number.
                    </TextView>

                    <View style={styles.phoneRow}>
                        <TouchableOpacity
                            style={[styles.flagButton, showDropdown && styles.flagButtonActive]}
                            onPress={() => setShowDropdown(v => !v)}
                            activeOpacity={0.75}
                        >
                            {selectedCountry && (
                                <CountryFlag isoCode={selectedCountry.cca2} size={26} />
                            )}
                        </TouchableOpacity>

                        <TextInputView
                            label="Phone number"
                            value={formik.values.phoneNumber}
                            onChangeText={(text) => {
                                const digits = text.replace(/\D/g, '');
                                formik.setFieldValue('phoneNumber', digits);
                            }}
                            onBlur={() => formik.setFieldTouched('phoneNumber', true)}
                            keyboardType="phone-pad"
                            style={styles.phoneInput}
                            textContentType="telephoneNumber"
                            error={
                                formik.touched.phoneNumber
                                    ? formik.errors.phoneNumber
                                    : undefined
                            }
                        />
                    </View>

                    {showDropdown && (
                        <View style={styles.dropdown}>
                            <FlatList
                                data={countries}
                                keyExtractor={(item) => item.cca2}
                                showsVerticalScrollIndicator
                                bounces={false}
                                ItemSeparatorComponent={() => <View style={styles.separator} />}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={styles.countryItem}
                                        onPress={() => handleSelectCountry(item)}
                                        activeOpacity={0.6}
                                    >
                                        <CountryFlag isoCode={item.cca2} size={30} style={styles.countryFlag} />
                                        <TextView style={styles.countryName} numberOfLines={1}>
                                            {getCountryName(item)}
                                        </TextView>
                                        <TextView style={styles.countryCallingCode}>
                                            +{item.callingCode[0]}
                                        </TextView>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                    )}
                </View>
            </View>

            <ButtonView
                disabled={isButtonDisabled}
                label="Send Code"
                onPress={() => formik.handleSubmit()}
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
    subtitle: {
        marginTop: spacing(8),
        marginBottom: spacing(24),
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
    }
});

export default LoginScreen;
