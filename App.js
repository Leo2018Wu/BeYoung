import React, {Component} from 'react';
import {LogBox, Alert, Platform} from 'react-native';
import {Provider} from 'react-redux';
import {NativeBaseProvider, extendTheme, StatusBar} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import * as WeChat from '@shm-open/react-native-wechat';
import Splash from 'react-native-splash-screen';
import AliyunPush from 'react-native-aliyun-push';
import {request, PERMISSIONS} from 'react-native-permissions';

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
    // this.notif.checkPermission(({alert}) => {
    //   if (!alert) {
    //     console.log(32321);
    //     request(PERMISSIONS.ANDROID.);
    //   }
    // });
    AliyunPush.addListener(this.listenPush);

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
    this.props.notif.localNotif(e);
  }

  onNotif(notif) {
    console.log('onNotif--- callback', notif);
  }

  handlePerm(perms) {
    Alert.alert('Permissions', JSON.stringify(perms));
  }
}
