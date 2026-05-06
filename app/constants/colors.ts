import { DarkTheme, DefaultTheme, Theme } from '@react-navigation/native';

export const CustomLightTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FF0000',
    background: '#FFFFFF',
    text: '#000000',
  },
};

export const CustomDarkTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#FF0000',
    background: '#121212',
    text: '#FFFFFF',
  },
};