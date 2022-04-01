import React from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  ImageBackground,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {DeviceEventEmitter} from 'react-native';

import layout from '../common/Layout';
import UserInfo from './UserInfo';
import LinkList from './LinkList';

const Mine = (props: any) => {
  const {navigation} = props;
  return (
    <View>
      <StatusBar backgroundColor="transparent" translucent />
      <ImageBackground
        source={require('../assets/mineBg.png')}
        style={styles.banner}
        resizeMode="cover">
        <UserInfo />
      </ImageBackground>
      <LinkList
        onPress={(routeName: any) => {
          if (routeName === 'logout') {
            AsyncStorage.removeItem('USER_INFO');
            AsyncStorage.removeItem('LOGIN_NAVIGAITON_NAME');
            DeviceEventEmitter.emit('LOGIN_EVENT', false);
          } else {
            navigation.navigate(routeName);
          }
        }}
      />
    </View>
  );
};

export default Mine;

const styles = StyleSheet.create({
  banner: {
    width: layout.width,
    height: 280,
    ...Platform.select({
      ios: {
        paddingTop: 28 + 40,
      },
      android: {
        paddingTop: layout.STATUSBAR_HEIGHT + 20,
      },
    }),
    position: 'relative',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
});
