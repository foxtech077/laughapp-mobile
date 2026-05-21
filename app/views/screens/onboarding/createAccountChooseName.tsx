import React, { useState, useEffect } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme, useNavigation } from '@react-navigation/native';
;
import BackArrow from '../../../../assets/images/icons/arrow-left.svg';
import CloseCircle from '../../../../assets/images/icons/x-circle-contained.svg';
import CheckCircle from '../../../../assets/images/icons/check-contained.svg';
import TextInputView from '../../components/TextInputView';
import ButtonView from '../../components/ButtonView';
import BaseView from '../../components/BaseView';
import TextView from '../../components/TextView';
import { fontScale, spacing } from '../../../utils/dimensions';

function CreateAccountChooseName() {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const [displayName, setDisplayName] = useState('Sandee Das');
  const [userName, setUserName] = useState('sandeep.das');
  const [usernameError, setUsernameError] = useState<string >("");
  const [usernameSuggestions, setUsernameSuggestions] = useState<string[]>([]);

  useEffect(() => {
    // Simulate API call for username availability
    if (userName === 'sandeep.das') {
      setUsernameError('The user name is not available');
      setUsernameSuggestions(['sandeep.das01', 'sandeep_das01', 'sandeep.das02', 'sandeep_das02']);
    } else {
      setUsernameError("");
      setUsernameSuggestions([]);
    }
  }, [userName]);

  const isContinueEnabled = displayName.trim().length > 0 && userName.trim().length > 0 && !usernameError;

  const handleSuggestionPress = (suggestion: string) => {
    setUserName(suggestion);
    setUsernameError("");
    setUsernameSuggestions([]);
  };

  const handleContinue = () => {
    if (isContinueEnabled) {
      console.log('Continue with:', { displayName, userName });
    }
  };

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <BaseView
      style={styles.container}
      gradientBackground
      gradientColors={colors.primaryGradient || ['#f8dc6a', '#fceac3', '#fdd3b1']}
      gradientLocations={[0, 0.5, 1]}
      gradientStart={{ x: 0, y: 0.5 }}
      gradientEnd={{ x: 1, y: 0.5 }}
      applyBottomInset={true}
    >
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.content}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack} hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
            <BackArrow width={24} height={24} stroke={colors.primaryText } />
          </TouchableOpacity>

          <View style={styles.headerTextContainer}>
            <TextView variant="authHeading" style={[styles.title, { color: colors.primaryText }]}>
              What should we call you?
            </TextView>
            <TextView variant="authSubheading" style={[styles.subtitle, { color: colors.secondaryText}]}>
              Enter your display name and choose a unique username for your profile.
            </TextView>
          </View>

          <View style={styles.inputsContainer}>
            <TextInputView
              label="Display name"
            //   variant="auth"
              value={displayName}
              onChangeText={setDisplayName}
              autoCapitalize="words"
            />
            <View style={styles.usernameInputContainer}>
              <TextInputView
                label="User name"
                // variant="auth"
                value={userName}
                onChangeText={setUserName}
                autoCapitalize="none"
                autoCorrect={false}
                error={usernameError}
                errorAlign="right"
                rightIcon={
                  usernameError ? (
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
                    {index < usernameSuggestions.length - 1 && <View style={styles.divider} />}
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
            onPress={handleContinue}
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
  backButton: {
    width: spacing(40),
    height: spacing(40),
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: spacing(16),
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
  backgroundColor: '#C4C4C4',
  },
  footer: {
    paddingHorizontal: spacing(24),
    paddingBottom: spacing(16),
  },
});

export default CreateAccountChooseName;
