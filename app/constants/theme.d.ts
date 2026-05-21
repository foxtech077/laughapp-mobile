import '@react-navigation/native';

declare module '@react-navigation/native' {
  export type ExtendedTheme = {
    dark: boolean;
    colors: {
      primary: string;
      background: string;
      card: string;
      text: string;
      border: string;
      notification: string;
      primaryGradient: string[];
      primaryText: string;
      secondaryText: string;
      placeholder: string;
      border: string;
      error: string;
      cardBackground: string;
      cardBorder: string;
      cardSelectedBorder: string;
      radioUnselectedBorder: string;
      iconBackground: string;
      buttonDisabled: string;
      buttonEnabled: string;
      subtitle: string;
      black: string;
      yellow_700: string;
      yellow_600: string;
    };
  };

  export function useTheme(): ExtendedTheme;
}
