import { DarkTheme, DefaultTheme, Theme } from '@react-navigation/native';

export const CustomLightTheme: Theme | any = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FF0000',
    background: '#FFFFFF',
    text: '#000000',
    primaryGradient: ['#f8dc6a', '#fceac3', '#fdd3b1']
  },
};

export const CustomDarkTheme: Theme | any = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#FF0000',
    background: '#121212',
    text: '#FFFFFF',
    primaryGradient: ['#f8dc6a', '#fceac3', '#fdd3b1']

  },
};