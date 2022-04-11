import React from 'react';
import {LogBox} from 'react-native';
import {Provider} from 'react-redux';
import {NativeBaseProvider, extendTheme, StatusBar} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';

import Navigation from './src/navigation/Index';
import colors from './src/theme/bossColor';
import {store} from './src/store/index.js';

const App = () => {
  LogBox.ignoreLogs(['Sending', 'Remote', 'NativeBase', 'Animated']);
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
    <Provider store={store}>
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
    </Provider>
  );
};
export default App;
