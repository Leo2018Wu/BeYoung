import React, {useEffect} from 'react';
import {LogBox, AppState} from 'react-native';
import {Provider} from 'react-redux';
import {NativeBaseProvider, extendTheme, StatusBar} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import AliyunPush from 'react-native-aliyun-push';
import * as WeChat from '@shm-open/react-native-wechat';
import Splash from 'react-native-splash-screen';

import Navigation from './src/navigation/Index';
import colors from './src/theme/bossColor';
import {store} from './src/store/index.js';

var PushNotification = require('react-native-push-notification');

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
    Splash.hide();
    // 注册微信SDK
    WeChat.registerApp(
      'wxbf897d24e484ccc8',
      'https://worker.zyxsnet.com/young/',
    )
      .then(res => {
        console.log('register', res);
      })
      .catch(err => {
        console.log('registerFail', err);
      });
    AppState.addEventListener('change', _handleAppStateChange);

    AliyunPush.setApplicationIconBadgeNumber(0);
    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, []);

  const _handleAppStateChange = nextappState => {
    //切换应用或者息屏时nextappState值为background
    console.log('--nextappState---', nextappState !== 'active');
    AliyunPush.addListener(handleAliyunPushMessage);

    //移除监听
    // AliyunPush.removeListener(handleAliyunPushMessage);
    if (nextappState !== 'active') {
      // 当应用在后台的时候
      // let e = {
      //   extras: {
      //     page: 'CommunicateScreen',
      //   },
      // };
      // pushTest(e);
    }
  };

  const handleAliyunPushMessage = e => {
    console.log('Message Received. ' + JSON.stringify(e));

    if (e.type == 'notification') {
      onNotification(e);
    } else if (e.type == 'message') {
      onMessage(e);
    }
    //e结构说明:
    //e.type: "notification":通知 或者 "message":消息
    //e.title: 推送通知/消息标题
    //e.body: 推送通知/消息具体内容
    //e.actionIdentifier: "opened":用户点击了通知, "removed"用户删除了通知, 其他非空值:用户点击了自定义action（仅限ios）
    //e.extras: 用户附加的{key:value}的对象
  };

  //事件处理逻辑
  const onMessage = e => {
    console.log(
      'Message Received. Title:' + e.title + ', Content:' + e.content,
    );
  };
  const onNotification = e => {
    console.log('进入到了这里', e);
    LocalNotification(e);
  };

  const LocalNotification = e => {
    PushNotification.localNotification({
      extras: e.extras,
      channelId: '1',
      id: e.extras._ALIYUN_NOTIFICATION_ID_,
      autoCancel: true,
      bigText: e.body,
      subText: e.title,
      largeIcon: 'ic_launcher',
      vibrate: true,
      vibration: 300,
      tag: 'some_tag',
      group: 'group',
      ongoing: false,
      priority: 'high',
      visibility: 'private',
      importance: 'high',
      allowWhileIdle: false,
      ignoreInForeground: false,
      shortcutId: 'shortcut-id',
      invokeApp: true,
      // actions: '["打开","关闭"]',
      /* iOS and Android properties */
      title: e.title || e.body.title,
      message: e.body || e.body.body,
      playSound: true,
      number: 10,
      soundName: 'default',
      repeatType: 'time',
    });

    // todo  在localNotification本地接收到通知后应该立即取消该通知  通过id（必需的）在cancelLocalNotification中取消通知
    PushNotification.cancelLocalNotification({
      id: e.extras._ALIYUN_NOTIFICATION_ID_,
    });
  };

  const pushTest = e => {
    PushNotification.localNotification({
      channelId: '1',
      extras: e.extras,
      autoCancel: true,
      bigText:
        'This is local notification demo in React Native app. Only shown, when expanded.',
      subText: 'Local Notification Demo',
      title: 'Local Notification Title',
      message: 'Expand me to see more',
      vibrate: true,
      vibration: 300,
      playSound: true,
      soundName: 'default',
    });
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
