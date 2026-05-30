/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import RootNavigator from './app/navigator/RootNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { CustomDarkTheme, CustomLightTheme } from './app/constants/colors';
import { useEffect } from 'react';
import BootSplash from 'react-native-bootsplash';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  useEffect(() => {
    const init = async () => {
    };

    init().finally(async () => {
      await BootSplash.hide({ fade: true });
    });
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer theme={isDarkMode ? CustomDarkTheme : CustomLightTheme}>
        <RootNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;
