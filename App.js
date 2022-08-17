import React, {Component} from 'react';
import {
  LogBox,
  Alert,
  Platform,
  DeviceEventEmitter,
  AppState,
} from 'react-native';
import {Provider} from 'react-redux';
import {NativeBaseProvider, extendTheme, StatusBar} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import * as WeChat from '@shm-open/react-native-wechat';
import Splash from 'react-native-splash-screen';
import AliyunPush from 'react-native-aliyun-push';
import {openSettings} from 'react-native-permissions';
import fetchData from './src/util/request';
import {finishTask} from './src/api/task';

import Navigation from './src/navigation/Index';
import colors from './src/theme/bossColor';
import {store} from './src/store/index.js';
import NotifService from './NotifService';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appState: AppState.currentState,
      keepAliveTime: 15, // 需要处于前台完成活跃任务的时间
      timeoutID: null, // 定时器ID
    };
    this.notif = new NotifService(
      this.onRegister.bind(this),
      this.onNotif.bind(this),
    );
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
    AppState.addEventListener('change', this._handleAppStateChange.bind(this));
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
    //监听推送事件
    AliyunPush.addListener(this.listenPush.bind(this));
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
    AppState.removeEventListener('change', this._handleAppStateChange);
    this.clearTime();
    //移除监听
    // AliyunPush.removeListener(this.listenPush);
  }

  _handleAppStateChange(nextAppState) {
    const timeCount = this.state.keepAliveTime;
    if (nextAppState === 'active') {
      const timeoutID = setTimeout(() => {
        this.finishKeepAliveTask();
      }, timeCount * 60 * 1000);
      this.setState({timeoutID});
    } else if (nextAppState === 'background' || nextAppState === 'inactive') {
      this.clearTime();
    }
  }

  clearTime() {
    this.state.timeoutID && clearTimeout(this.state.timeoutID);
    this.setState({timeoutID: null});
  }

  async finishKeepAliveTask() {
    try {
      const {success} = await fetchData(finishTask.url, {taskCode: 'browse'});
      if (success) {
        this.clearTime();
      }
    } catch (error) {
      console.erro(error);
    }
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
      if (e.actionIdentifier === 'opened' && e.extras) {
        DeviceEventEmitter.emit('NOTIFICATION', e.extras);
      }
    }
  }

  onNotif(notif) {
    if (notif.data) {
      DeviceEventEmitter.emit('NOTIFICATION', notif.data);
    }
  }

  handlePerm(perms) {
    Alert.alert('Permissions', JSON.stringify(perms));
  }
}
