import {StatusBar} from 'native-base';
import React, {useEffect, useState} from 'react';
import {DeviceEventEmitter} from 'react-native';
import {useDispatch} from 'react-redux';
import {fetchChatAccount} from '../api/common';
import useRequest from '../hooks/useRequest';
import {login, logout} from '../nim/link';
import {getMyInfo, getAllDicts, getRelateChatAccount} from '../store/action';
import constObj from '../store/constant';
import getStorage from '../util/Storage';
import StackBossMain from './boss/Main';
import StackGirlsMain from './girls/Main';
import StackLogin from './Login';
import Splash from './Splash';
import SplashScreen from 'react-native-splash-screen';

const Index = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // 加载页面
  const [isLogin, setIsLogin] = useState(''); // 判断是否登录和登录的性别
  const {run: runChatAccount} = useRequest(fetchChatAccount.url);

  const getAccount = async () => {
    try {
      const {data: chatAccount} = await runChatAccount();
      console.log('chatAccount', chatAccount);

      if (chatAccount.account) {
        login(chatAccount.account, chatAccount.token); // 初始化聊天账号
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    dispatch(getRelateChatAccount());
    dispatch(getMyInfo());
    dispatch(getAllDicts());
    SplashScreen.hide();
    getStorage(['LOGIN_NAVIGAITON_NAME']).then(res => {
      setLoading(false);
      if (res) {
        getAccount();
        setIsLogin(res);
      }
    });
    DeviceEventEmitter.addListener('LOGIN_EVENT', res => {
      if (!res) {
        //清除 聊天关联账号信息
        dispatch({type: 'RELATECHATUSERACCOUNT', relateChatAccount: []});
        if (constObj.nim) {
          logout();
        }
      } else {
        dispatch(getRelateChatAccount());
        dispatch(getMyInfo());
        dispatch(getAllDicts());
        getAccount();
      }
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
