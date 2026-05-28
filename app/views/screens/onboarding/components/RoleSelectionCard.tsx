import React from 'react';
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';
import CheckCircle from '../../../../../assets/images/icons/check-contained.svg';
import { spacing, moderateScale, verticalScale } from '../../../../utils/dimensions';
import TextView from '../../../components/TextView';

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
          backgroundColor: colors.cardBackground,
          borderColor: selected ? colors.primaryText : colors.border,
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
            <View style={[styles.radioUnselected, { borderColor: colors.radioUnselectedBorder }]} />
          )}
        </View>
      </View>

      <View style={styles.textContainer}>
        <TextView variant="subtitle" style={[styles.title, { color: colors.primaryText }]}>
          {title}
        </TextView>
        <TextView variant="description" style={[styles.description, { color: colors.secondaryText }]}>
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
    height: verticalScale(188),
    borderRadius: moderateScale(10),
    padding: spacing(16),
    gap: spacing(18),
    marginBottom: spacing(16),
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: spacing(54),
    height: spacing(54),
    borderRadius: moderateScale(32),
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
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
    borderRadius: moderateScale(12),
    borderWidth: 1,
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
