import AsyncStorage from '@react-native-community/async-storage';
import {StatusBar} from 'native-base';
import React, {useEffect, useState} from 'react';
import {DeviceEventEmitter} from 'react-native';
import getStorage from '../util/Storage';
import StackMain from './boss/Main';
import StackLogin from './Login';
import Splash from './Splash';

const Index = () => {
  const [loading, setLoading] = useState(true); // 加载页面
  const [isLogin, setIsLogin] = useState(''); // 判断是否登录和登录的性别

  useEffect(() => {
    // AsyncStorage.setItem('LOGIN_NAVIGAITON_NAME', '');
    getStorage(['USER_INFO']).then(res => {
      console.log('USER_INFO', res);
    });
    getStorage(['LOGIN_NAVIGAITON_NAME']).then(res => {
      console.log('LOGIN_NAVIGAITON_NAME', res);

      setLoading(false);
      if (res) {
        setIsLogin(res);
      }
    });
    DeviceEventEmitter.addListener('LOGIN_EVENT', res => {
      setIsLogin(res);
    });
  }, []);

  if (loading) {
    return <Splash />;
  }

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      {isLogin === 'MALE_LOGIN' && <StackMain />}
      {!isLogin && <StackLogin />}
    </>
  );
};

export default Index;
