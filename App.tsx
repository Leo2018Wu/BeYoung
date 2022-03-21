import React from 'react';
import {LogBox} from 'react-native';
import {NativeBaseProvider, extendTheme, StatusBar} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';

import Navigation from './src/navigation/Index';
import colors from './src/theme/bossColor';

const App = () => {
  LogBox.ignoreLogs(['Sending', 'Remote', 'NativeBase']);
  const config = {
    dependencies: {
      'linear-gradient': require('react-native-linear-gradient'),
    },
  };
  const theme = extendTheme({
    colors,
    components: {
      Input: {
        baseStyle: {},
        defaultProps: {},
      },
    },
  });
  return (
    <NavigationContainer>
      <NativeBaseProvider config={config} theme={theme}>
        <StatusBar
          barStyle={'dark-content'}
          backgroundColor="transparent"
          translucent
        />
        <Navigation />
      </NativeBaseProvider>
    </NavigationContainer>
  );
};
export default App;
