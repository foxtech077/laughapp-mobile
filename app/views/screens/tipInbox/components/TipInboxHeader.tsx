import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme, useNavigation } from '@react-navigation/native';
import TextView from '../../../components/TextView';
import { fontScale, moderateScale, spacing, verticalScale } from '../../../../utils/dimensions';
import { images } from '../../../../constants/images';
// import BackArrow from '../../../../../assets/images/icons/arrow-left.svg';

const { SortButton } = images;

interface TipInboxHeaderProps {
  onSortPress: () => void;
  hasActiveSort?: boolean;
}

export default function TipInboxHeader({ onSortPress, hasActiveSort = false }: TipInboxHeaderProps) {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <TouchableOpacity
          onPress={handleBack}
          activeOpacity={0.7}
          style={styles.backButton}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          {/* <BackArrow width={24} height={24} stroke={colors.primaryText} /> */}
        </TouchableOpacity>
        <TextView
          size={22}
          weight="800"
          style={[styles.title, { color: colors.primaryText }]}
        >
          Tip inbox
        </TextView>
      </View>

      <TouchableOpacity
        onPress={onSortPress}
        activeOpacity={0.8}
        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        style={[
          styles.sortButton,
          {
            borderColor: colors.white,
            backgroundColor: colors.gray100,
          },
        ]}
      >
        <View style={styles.sortButtonContent}>
          <SortButton stroke={colors.primaryText} width={spacing(14)} height={spacing(14)} />
          <TextView
            size={fontScale(15)}
            weight="700"
            style={[styles.sortText, { color: colors.primaryText }]}
          >
            Sort by
          </TextView>
          {hasActiveSort && (
            <View
              style={[
                styles.badgeContainer,
                { backgroundColor: colors.buttonEnabled },
              ]}
            >
              <TextView
                size={fontScale(11)}
                weight="700"
                style={{ color: colors.white }}
              >
                1
              </TextView>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: verticalScale(44),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing(16),
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing(8),
  },
  backButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Inter',
    letterSpacing: -0.5,
  },
  sortButton: {
    borderWidth: 1,
    borderRadius: moderateScale(8),
    paddingHorizontal: spacing(8),
    paddingVertical: spacing(4),
  },
  sortButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing(4),
  },
  sortText: {
    letterSpacing: -0.2,
  },
  badgeContainer: {
    width: moderateScale(18),
    height: moderateScale(18),
    borderRadius: moderateScale(9),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing(2),
  },
});
