import React, {Component} from 'react';
import {LogBox, Alert, Platform, DeviceEventEmitter} from 'react-native';
import {Provider} from 'react-redux';
import {NativeBaseProvider, extendTheme, StatusBar} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import * as WeChat from '@shm-open/react-native-wechat';
import Splash from 'react-native-splash-screen';
import AliyunPush from 'react-native-aliyun-push';
import {openSettings} from 'react-native-permissions';

import Navigation from './src/navigation/Index';
import colors from './src/theme/bossColor';
import {store} from './src/store/index.js';
import NotifService from './NotifService';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.notif = new NotifService(
      this.onRegister.bind(this),
      this.onNotif.bind(this),
    );
    console.log('this.notif', this.notif);
    this.config = {
      dependencies: {
        'linear-gradient': require('react-native-linear-gradient'),
      },
    };
    this.theme = extendTheme({
      colors,
      components: {
        Input: {
          baseStyle: {},
          defaultProps: {},
        },
      },
    });
  }

  componentDidMount() {
    console.log('componentDidMount', this.notif);
    this.notif.checkPermission(({alert}) => {
      if (!alert && Platform.OS === 'android') {
        Alert.alert('推送权限', '推送权限暂未开启，是否要去打开权限', [
          {
            text: '取消',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: '确定',
            onPress: () => openSettings(),
            style: 'destructive',
          },
        ]);
      }
    });
    AliyunPush.addListener(this.listenPush.bind(this));

    //监听推送事件
    LogBox.ignoreLogs(['Sending', 'Remote', 'NativeBase', 'Animated']);

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
  }

  componentWillUnmount() {
    //移除监听
    // AliyunPush.removeListener(this.listenPush);
  }

  render() {
    const {config, theme} = this;
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
  }

  onRegister(token) {
    console.log('onRegister token', token);
    // this.setState({registerToken: token.token, fcmRegistered: true});
  }

  listenPush(e) {
    if (Platform.OS !== 'ios') {
      this.notif.localNotif(e);
    } else {
      if (e.actionIdentifier === 'opened') {
        DeviceEventEmitter.emit('NOTIFICATION', e.extras);
      }
    }
  }

  onNotif(notif) {
    console.log('onNotif--- callback', notif);
    DeviceEventEmitter.emit('NOTIFICATION', notif.data);
  }

  handlePerm(perms) {
    Alert.alert('Permissions', JSON.stringify(perms));
  }
}
