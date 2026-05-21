import { DarkTheme, DefaultTheme, Theme } from '@react-navigation/native';

export const CustomLightTheme: Theme | any = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FF0000',
    background: '#FFFFFF',
    text: '#000000',
    primaryGradient: ['#f8dc6a', '#fceac3', '#fdd3b1'],
    primaryText: '#231F20',
    secondaryText: '#5A5656',
    placeholder: '#949494',
    border: '#C4C4C4',
    error: '#FF3B30',
    cardBackground: '#FFFFFF',
    cardBorder: '#E5E5E5',
    cardSelectedBorder: '#231F20',
    radioUnselectedBorder: '#D1D5DB',
    iconBackground: '#FFE4B2',
    buttonDisabled: '#9CA3AF',
    buttonEnabled: '#231F20'
  },
};

export const CustomDarkTheme: Theme | any = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#FF0000',
    background: '#121212',
    text: '#FFFFFF',
    primaryGradient: ['#f8dc6a', '#fceac3', '#fdd3b1'],
    primaryText: '#231F20',
    secondaryText: '#5A5656',
    placeholder: '#949494',
    border: '#C4C4C4',
    error: '#FF3B30',
    cardBackground: '#FFFFFF',
    cardBorder: '#E5E5E5',
    cardSelectedBorder: '#231F20',
    radioUnselectedBorder: '#D1D5DB',
    iconBackground: '#FFE4B2',
    buttonDisabled: '#9CA3AF',
    buttonEnabled: '#231F20'
  },
};