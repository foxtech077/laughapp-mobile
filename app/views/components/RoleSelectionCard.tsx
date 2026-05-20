import React from 'react';
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { fontScale, spacing } from '../../utils/dimensions';
import TextView from './TextView';
import CheckCircle from '../../../assets/images/icons/check-contained.svg';

interface RoleSelectionCardProps {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  selected: boolean;
  onPress: (id: string) => void;
  disabled?: boolean;
  selectedIcon?: React.ReactNode;
}

function RoleSelectionCard({
  id,
  title,
  description,
  icon,
  selected,
  onPress,
  disabled = false,
  selectedIcon,
}: RoleSelectionCardProps) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={() => onPress(id)}
      disabled={disabled}
      style={[
        styles.container,
        {
          backgroundColor: colors.cardBackground || '#FFFFFF',
          borderColor: selected ? '#231F20' : '#C4C4C4',
          borderWidth: 1,
        },
      ]}
    >
      <View style={styles.headerRow}>
        <View style={styles.iconContainer}>{icon}</View>
        <View style={styles.radioContainer}>
          {selected ? (
            selectedIcon ? selectedIcon : <CheckCircle width={24} height={24} />
          ) : (
            <View style={styles.radioUnselected} />
          )}
        </View>
      </View>

      <View style={styles.textContainer}>
        <TextView variant="subtitle" style={[styles.title, { color: colors.primaryText || '#231F20' }]}>
          {title}
        </TextView>
        <TextView variant="description" style={[styles.description, { color: colors.secondaryText || '#687280' }]}>
          {description}
        </TextView>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 398,
    alignSelf: 'center',
    height: 188,
    borderRadius: 10,
    padding: 16,
    gap: 18,
    marginBottom: spacing(16),
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: spacing(48),
    height: spacing(48),
    borderRadius: spacing(24),
    backgroundColor: '#FFE4B2', // Soft yellow
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioContainer: {
    width: spacing(24),
    height: spacing(24),
    marginTop: spacing(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioUnselected: {
    width: spacing(24),
    height: spacing(24),
    borderRadius: spacing(12),
    borderWidth: 1,
    borderColor: '#D1D5DB',
    backgroundColor: 'transparent',
  },
  textContainer: {
    gap: spacing(4),
  },
  title: {
    fontWeight: '700',
  },
  description: {
    lineHeight: spacing(22),
  },
});

export default React.memo(RoleSelectionCard);
