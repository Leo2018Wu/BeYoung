import React from 'react';
import {Text} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import {DeviceEventEmitter} from 'react-native';

const Index = () => {
  return (
    <Text
      onPress={() => {
        AsyncStorage.setItem('LOGIN_NAVIGAITON_NAME', '');
        AsyncStorage.setItem('USER_INFO', '');
        DeviceEventEmitter.emit('LOGIN_EVENT', '');
      }}
      style={{fontSize: 20, margin: 40}}>
      退出登录
    </Text>
  );
};

export default Index;
