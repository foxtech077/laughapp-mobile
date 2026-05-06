/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { useColorScheme } from 'react-native';
import RootNavigator from './app/navigator/RootNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { CustomDarkTheme, CustomLightTheme } from './app/constants/colors';


function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <NavigationContainer theme={isDarkMode ? CustomDarkTheme : CustomLightTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

export default App;
