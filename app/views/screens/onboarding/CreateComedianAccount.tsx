import React from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextInputView from '../../components/TextInputView';
import ButtonView from '../../components/ButtonView';
import BaseView from '../../hoc/BaseView';
import TextView from '../../components/TextView';
import { fontScale, spacing } from '../../../utils/dimensions';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../../navigator/types';
import { routes } from '../../../navigator/routes';

const validationSchema = Yup.object({
    firstName: Yup.string()
        .required('First name is required')
        .matches(/^[a-zA-Z\s'-]+$/, 'Enter a valid first name'),
    lastName: Yup.string()
        .required('Last name is required')
        .matches(/^[a-zA-Z\s'-]+$/, 'Enter a valid last name'),
    email: Yup.string()
        .required('Email is required')
        .email('Enter a valid email address'),
    instagramHandle: Yup.string()
        .required('Instagram handle is required')
        .matches(/^[a-zA-Z0-9._]+$/, 'Only letters, numbers, periods and underscores allowed')
        .max(30, 'Instagram handle must be 30 characters or less'),
});

function CreateComedianAccount({ navigation }: { navigation: NativeStackNavigationProp<HomeStackParamList> }) {
    const { colors } = useTheme();

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            instagramHandle: '',
        },
        validationSchema,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (values) => {
            console.log('Submit:', values);
            navigation.replace(routes.HOME_TABS);
        },
    });

    const isSubmitEnabled =
        formik.dirty &&
        Object.keys(formik.errors).length === 0 &&
        !formik.isSubmitting;

    return (
        <BaseView
            style={styles.container}
            gradientBackground
            gradientColors={colors.primaryGradient}
            gradientLocations={[0, 0.5, 1]}
            gradientStart={{ x: 0, y: 0.5 }}
            gradientEnd={{ x: 1, y: 0.5 }}
            applyBottomInset={true}
            showBackButton
            showHeader
            dismissKeyboardOnTap
        >
            <KeyboardAvoidingView
                style={styles.keyboardAvoid}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.headerTextContainer}>
                        <TextView variant="heading" style={[styles.title, { color: colors.primaryText }]}>
                            Request a comedian account
                        </TextView>
                        <TextView variant="subheading" style={{ color: colors.secondaryText }}>
                            We manually review comedian accounts to maintain quality.
                        </TextView>
                    </View>

                    <View style={styles.inputsContainer}>
                        <TextInputView
                            label="First name"
                            value={formik.values.firstName}
                            onChangeText={formik.handleChange('firstName')}
                            onBlur={formik.handleBlur('firstName')}
                            autoCapitalize="words"
                            error={formik.touched.firstName ? formik.errors.firstName : undefined}
                        />
                        <TextInputView
                            label="Last name"
                            value={formik.values.lastName}
                            onChangeText={formik.handleChange('lastName')}
                            onBlur={formik.handleBlur('lastName')}
                            autoCapitalize="words"
                            error={formik.touched.lastName ? formik.errors.lastName : undefined}
                        />
                        <TextInputView
                            label="Email address"
                            value={formik.values.email}
                            onChangeText={formik.handleChange('email')}
                            onBlur={formik.handleBlur('email')}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            error={formik.touched.email ? formik.errors.email : undefined}
                        />
                        <TextInputView
                            label="Instagram handle"
                            value={formik.values.instagramHandle}
                            onChangeText={formik.handleChange('instagramHandle')}
                            onBlur={formik.handleBlur('instagramHandle')}
                            autoCapitalize="none"
                            autoCorrect={false}
                            error={formik.touched.instagramHandle ? formik.errors.instagramHandle : undefined}
                        />
                    </View>
                    <View style={[styles.descpContainer, { backgroundColor: colors.cardBackground }]}>
                        <TextView variant="heading" size={fontScale(20)} style={[styles.title, { color: colors.primaryText }]}>
                            Requirements :
                        </TextView>
                        <TextView size={fontScale(16)} variant="subheading" style={{ color: colors.secondaryText }}>
                            1. At least 30 videos performing in front of a live audience
                        </TextView>
                        <TextView size={fontScale(16)} variant="subheading" style={{ color: colors.secondaryText }}>
                            2. Content aligned with our community standards
                        </TextView>
                        <View style={[styles.descFooterContainer, { backgroundColor: colors.yellow_600, borderColor: colors.yellow_700 }]}>
                            <TextView size={fontScale(15)} variant="subheading" style={{ color: colors.black }}>
                                Applications reviewed within 3-5 working days
                            </TextView>
                        </View>
                    </View>
                </ScrollView>

                <View style={styles.footer}>
                    <ButtonView
                        label="Submit Request"
                        variant="auth"
                        fillWidth
                        disabled={!isSubmitEnabled}
                        onPress={() => formik.handleSubmit()}
                    />
                </View>
            </KeyboardAvoidingView>
        </BaseView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    keyboardAvoid: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: spacing(24),
        paddingTop: spacing(24),
    },
    headerTextContainer: {
        marginBottom: spacing(24),
    },
    title: {
        marginBottom: spacing(12),
    },
    inputsContainer: {
        gap: spacing(16),
    },
    footer: {
        paddingHorizontal: spacing(24),
        paddingBottom: spacing(16),
    },
    descpContainer: {
        padding: spacing(16),
        borderRadius: 10,
        marginVertical: spacing(24),
        gap: 2
    },
    descFooterContainer: {
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: spacing(10),
        marginTop: spacing(16),
    }
});

export default CreateComedianAccount;
