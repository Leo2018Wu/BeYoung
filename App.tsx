import React, {useEffect} from 'react';
import {LogBox} from 'react-native';
import {Provider} from 'react-redux';
import {NativeBaseProvider, extendTheme, StatusBar} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import AliyunPush from 'react-native-aliyun-push';

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
  useEffect(() => {
    // 获取deviceId
    AliyunPush.getDeviceId()
      .then(deviceId => {
        console.log('deviceId:' + deviceId);
      })
      .catch(error => {
        console.log('getDeviceId() failed');
      });

    //监听推送事件
    AliyunPush.addListener(handleAliyunPushMessage);
  }, []);

  const handleAliyunPushMessage = e => {
    console.log('Message Received. ' + JSON.stringify(e));
    //e结构说明:
    //e.type: "notification":通知 或者 "message":消息
    //e.title: 推送通知/消息标题
    //e.body: 推送通知/消息具体内容
    //e.actionIdentifier: "opened":用户点击了通知, "removed"用户删除了通知, 其他非空值:用户点击了自定义action（仅限ios）
    //e.extras: 用户附加的{key:value}的对象
  };

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
