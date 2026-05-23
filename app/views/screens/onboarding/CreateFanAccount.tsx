import React, { useState, useEffect } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme, useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import CloseCircle from '../../../../assets/images/icons/x-circle-contained.svg';
import CheckCircle from '../../../../assets/images/icons/check-contained.svg';
import TextInputView from '../../components/TextInputView';
import ButtonView from '../../components/ButtonView';
import BaseView from '../../components/BaseView';
import TextView from '../../components/TextView';
import { fontScale, spacing } from '../../../utils/dimensions';
import { routes } from '../../../navigator/routes';
import { HomeStackParamList } from '../../../navigator/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const validationSchema = Yup.object().shape({
  displayName: Yup.string()
    .trim()
    .required('Display name is required'),
  userName: Yup.string()
    .trim()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters'),
});

function CreateFanAccount() {
  const { colors } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  const [usernameSuggestions, setUsernameSuggestions] = useState<string[]>([]);

  const formik = useFormik({
    initialValues: {
      displayName: 'Sandee Das',
      userName: 'sandeep.das',
    },
    validationSchema,
    validateOnMount: true,
    onSubmit: (values) => {
      console.log('Continue with:', values);
      navigation.replace(routes.HOME_TABS);
    },
  });

  useEffect(() => {
    // Simulate API call for username availability
    const { userName } = formik.values;
    if (userName === 'sandeep.das') {
      formik.setFieldError('userName', 'The user name is not available');
      setUsernameSuggestions(['sandeep.das01', 'sandeep_das01', 'sandeep.das02', 'sandeep_das02']);
    } else {
      setUsernameSuggestions([]);
    }
  }, [formik.values.userName]);

  const handleSuggestionPress = (suggestion: string) => {
    formik.setFieldValue('userName', suggestion);
    setUsernameSuggestions([]);
  };

  const isContinueEnabled = formik.isValid && !formik.errors.userName && formik.values.displayName.trim() && formik.values.userName.trim();

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
    >
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.content}>
          <View style={styles.headerTextContainer}>
            <TextView variant="heading" style={[styles.title, { color: colors.primaryText }]}>
              What should we call you?
            </TextView>
            <TextView variant="subheading" style={[styles.subtitle, { color: colors.secondaryText }]}>
              Enter your display name and choose a unique username for your profile.
            </TextView>
          </View>

          <View style={styles.inputsContainer}>
            <TextInputView
              label="Display name"
              value={formik.values.displayName}
              onChangeText={formik.handleChange('displayName')}
              onBlur={formik.handleBlur('displayName')}
              error={formik.touched.displayName && formik.errors.displayName ? formik.errors.displayName : undefined}
              autoCapitalize="words"
            />
            <View style={styles.usernameInputContainer}>
              <TextInputView
                label="User name"
                value={formik.values.userName}
                onChangeText={formik.handleChange('userName')}
                onBlur={formik.handleBlur('userName')}
                autoCapitalize="none"
                autoCorrect={false}
                error={formik.touched.userName || formik.values.userName === 'sandeep.das' ? formik.errors.userName : undefined}
                errorAlign="right"
                rightIcon={
                  formik.errors.userName ? (
                    <CloseCircle width={20} height={20} />
                  ) : null
                }
              />
            </View>

            {usernameSuggestions.length > 0 && (
              <View
                style={[
                  styles.suggestionsContainer,
                  {
                    backgroundColor: colors.cardBackground,
                  },
                ]}
              >
                {usernameSuggestions.map((suggestion, index) => (
                  <View key={suggestion} style={styles.suggestionRowWrapper}>
                    <TouchableOpacity
                      style={styles.suggestionRow}
                      onPress={() => handleSuggestionPress(suggestion)}
                      activeOpacity={0.7}
                    >
                      <TextView
                        style={[
                          styles.suggestionText,
                          { color: colors.primaryText },
                        ]}
                      >
                        {suggestion}
                      </TextView>
                      <CheckCircle width={20} height={20} />
                    </TouchableOpacity>
                    {index < usernameSuggestions.length - 1 && <View style={[styles.divider, { backgroundColor: colors.border }]} />}
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>

        <View style={styles.footer}>
          <ButtonView
            label="Continue"
            variant="auth"
            fillWidth
            disabled={!isContinueEnabled}
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
  content: {
    flex: 1,
    paddingHorizontal: spacing(24),
    paddingTop: spacing(24),
  },
  headerTextContainer: {
    marginBottom: spacing(24),
  },
  title: {
    marginBottom: spacing(12),
  },
  subtitle: {
  },
  inputsContainer: {
    gap: spacing(16),
  },
  usernameInputContainer: {
    position: 'relative',
  },
  suggestionsContainer: {
    borderRadius: spacing(12),
    paddingHorizontal: spacing(16),
    marginTop: spacing(-4),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  suggestionRowWrapper: {
    width: '100%',
  },
  suggestionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing(16),
  },
  suggestionText: {
    fontSize: fontScale(15),
    fontWeight: '600',
    color: '#333333',
  },
  divider: {
    height: 1,
    width: '100%',
  },
  footer: {
    paddingHorizontal: spacing(24),
    paddingBottom: spacing(16),
  },
});

export default CreateFanAccount;
