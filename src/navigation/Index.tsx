import {StatusBar} from 'native-base';
import React, {useEffect, useState} from 'react';
import {DeviceEventEmitter} from 'react-native';
import {login} from '../nim/link';
import constObj from '../store/constant';
import getStorage from '../util/Storage';
import StackBossMain from './boss/Main';
import StackGirlsMain from './girls/Main';
import StackLogin from './Login';
import Splash from './Splash';

const Index = () => {
  const [loading, setLoading] = useState(true); // 加载页面
  const [isLogin, setIsLogin] = useState(''); // 判断是否登录和登录的性别

  useEffect(() => {
    getStorage(['chatAccount']).then(res => {
      const chatAccount = JSON.parse(res) || {};
      if (!constObj.nim) {
        login(chatAccount.account, chatAccount.token); // 初始化聊天账号
      }
    });
    getStorage(['LOGIN_NAVIGAITON_NAME']).then(res => {
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
      {isLogin === 'MALE_LOGIN' && <StackBossMain />}
      {isLogin === 'FEMALE_LOGIN' && <StackGirlsMain />}
      {!isLogin && <StackLogin />}
    </>
  );
};

export default Index;
