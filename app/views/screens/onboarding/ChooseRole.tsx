import React, { useState, useCallback } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { useTheme, useNavigation } from '@react-navigation/native';
import { spacing, fontScale } from '../../../utils/dimensions';
import { routes } from '../../../navigator/routes';
import BaseView from '../../components/BaseView';
import TextView from '../../components/TextView';
import ButtonView from '../../components/ButtonView';
import RoleSelectionCard from '../../components/RoleSelectionCard';
import RoleIcon1 from '../../../../assets/images/icons/role_icon1.svg';
import RoleIcon2 from '../../../../assets/images/icons/role_icon2.svg';
import CheckMarkCircle2 from '../../../../assets/images/icons/check-mark-circle2.svg';

const roles = [
  {
    id: 'fan',
    title: "I’m here to laugh",
    description: "Watch, support, and share your favourite comedians.",
    icon: <RoleIcon1 width={24} height={24} />,
  },
  {
    id: 'comedian',
    title: "I’m a stand up comedian",
    description: "Request a comedian account to share clips and build your audience.",
    icon: <RoleIcon2 width={24} height={24} />,
  }
];

function ChooseRoleScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);

  const handleSelectRole = useCallback((id: string) => {
    setSelectedRoleId(id);
  }, []);

  const handleContinue = () => {
    if (selectedRoleId) {
      // Navigation will be handled here
      console.log('Selected role:', selectedRoleId);
      navigation.navigate(routes.AUTH_CREATE_ACCOUNT_CHOOSE_NAME_SCREEN);
    }
  };

  return (
    <BaseView 
      style={styles.container} 
      gradientBackground 
      gradientColors={colors.primaryGradient} 
      gradientLocations={[0, 0.5, 1]} 
      gradientStart={{ x: 0, y: 0 }} 
      gradientEnd={{ x: 1, y: 1 }}
      applyBottomInset={true}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <TextView variant="authHeading" style={[styles.title, { color: '#231F20' }]}>
            What brings you to LaughApp?
          </TextView>
          <TextView variant="authSubheading" style={[styles.subtitle, { color: '#5A5656' }]}>
            Select your role to get the right features and recommendations.
          </TextView>
        </View>

        <View style={styles.cardsContainer}>
          {roles.map((role) => (
            <RoleSelectionCard
              key={role.id}
              id={role.id}
              title={role.title}
              description={role.description}
              icon={role.icon}
              selected={selectedRoleId === role.id}
              onPress={handleSelectRole}
              selectedIcon={<CheckMarkCircle2 width={24} height={24} />}
            />
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <ButtonView
          label="Continue"
          variant="auth"
          fillWidth
          disabled={!selectedRoleId}
          onPress={handleContinue}
          style={styles.continueButton}
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
    paddingTop: spacing(40),
  },
  header: {
    marginBottom: spacing(32),
  },
  title: {
    marginBottom: spacing(12),
  },
  subtitle: {
  },
  cardsContainer: {
    // RoleSelectionCard already has marginBottom, so we don't need gap here
  },
  footer: {
    paddingHorizontal: spacing(24),
    paddingBottom: spacing(16),
  },
  continueButton: {
    width: '100%',
    maxWidth: 398,
    alignSelf: 'center',
    gap: 4,
  },
});

export default ChooseRoleScreen;