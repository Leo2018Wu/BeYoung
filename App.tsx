import React, {useEffect} from 'react';
import {LogBox} from 'react-native';
import {Provider} from 'react-redux';
import {NativeBaseProvider, extendTheme, StatusBar} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import AliyunPush from 'react-native-aliyun-push';

import Navigation from './src/navigation/Index';
import colors from './src/theme/bossColor';
import {store} from './src/store/index.js';

import PushNotification from 'react-native-push-notification';

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

    // //监听推送事件
    // AliyunPush.addListener(handleAliyunPushMessage);
    PushNotification.localNotification({
      /* Android Only Properties */
      channelId: 'your-channel-id', // (required) channelId, if the channel doesn't exist, notification will not trigger.
      ticker: 'My Notification Ticker', // (optional)
      showWhen: true, // (optional) default: true
      autoCancel: true, // (optional) default: true
      largeIcon: 'ic_launcher', // (optional) default: "ic_launcher". Use "" for no large icon.
      largeIconUrl: 'https://www.example.tld/picture.jpg', // (optional) default: undefined
      smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher". Use "" for default small icon.
      bigText:
        'My big text that will be shown when notification is expanded. Styling can be done using HTML tags(see android docs for details)', // (optional) default: "message" prop
      subText: 'This is a subText', // (optional) default: none
      bigPictureUrl: 'https://www.example.tld/picture.jpg', // (optional) default: undefined
      bigLargeIcon: 'ic_launcher', // (optional) default: undefined
      bigLargeIconUrl: 'https://www.example.tld/bigicon.jpg', // (optional) default: undefined
      color: 'red', // (optional) default: system default
      vibrate: true, // (optional) default: true
      vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
      tag: 'some_tag', // (optional) add tag to message
      group: 'group', // (optional) add group to message
      groupSummary: false, // (optional) set this notification to be the group summary for a group of notifications, default: false
      ongoing: false, // (optional) set whether this is an "ongoing" notification
      priority: 'high', // (optional) set notification priority, default: high
      visibility: 'private', // (optional) set notification visibility, default: private
      ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear). should be used in combine with `com.dieam.reactnativepushnotification.notification_foreground` setting
      shortcutId: 'shortcut-id', // (optional) If this notification is duplicative of a Launcher shortcut, sets the id of the shortcut, in case the Launcher wants to hide the shortcut, default undefined
      onlyAlertOnce: false, // (optional) alert will open only once with sound and notify, default: false

      when: null, // (optional) Add a timestamp (Unix timestamp value in milliseconds) pertaining to the notification (usually the time the event occurred). For apps targeting Build.VERSION_CODES.N and above, this time is not shown anymore by default and must be opted into by using `showWhen`, default: null.
      usesChronometer: false, // (optional) Show the `when` field as a stopwatch. Instead of presenting `when` as a timestamp, the notification will show an automatically updating display of the minutes and seconds since when. Useful when showing an elapsed time (like an ongoing phone call), default: false.
      timeoutAfter: null, // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null

      messageId: 'google:message_id', // (optional) added as `message_id` to intent extras so opening push notification can find data stored by @react-native-firebase/messaging module.

      actions: ['Yes', 'No'], // (Android only) See the doc for notification actions to know more
      invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true

      /* iOS only properties */
      category: '', // (optional) default: empty string
      subtitle: 'My Notification Subtitle', // (optional) smaller title below notification title

      /* iOS and Android properties */
      id: 0, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
      title: 'My Notification Title', // (optional)
      message: 'My Notification Message', // (required)
      picture: 'https://www.example.tld/picture.jpg', // (optional) Display an picture with the notification, alias of `bigPictureUrl` for Android. default: undefined
      userInfo: {}, // (optional) default: {} (using null throws a JSON value '<null>' error)
      playSound: false, // (optional) default: true
      soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
      number: 10, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
      repeatType: 'day', // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
    });
  }, []);

  // const handleAliyunPushMessage = e => {
  //   console.log('Message Received. ' + JSON.stringify(e));
  //   if (e.actionIdentifier == 'opened') {
  //     alert('我的点击好像生效了');
  //   }

  //   // if (e.type == 'notification') {
  //   //   onNotification(e);
  //   // } else if (e.type == 'message') {
  //   //   onMessage(e);
  //   // }
  //   //e结构说明:
  //   //e.type: "notification":通知 或者 "message":消息
  //   //e.title: 推送通知/消息标题
  //   //e.body: 推送通知/消息具体内容
  //   //e.actionIdentifier: "opened":用户点击了通知, "removed"用户删除了通知, 其他非空值:用户点击了自定义action（仅限ios）
  //   //e.extras: 用户附加的{key:value}的对象
  // };

  //事件处理逻辑
  const onMessage = e => {
    console.log(
      'Message Received. Title:' + e.title + ', Content:' + e.content,
    );
  };
  const onNotification = e => {
    console.log('进入到了这里', e);

    // PushNotification.localNotification({
    //   extras: e.extras,
    //   /* Android Only Properties */
    //   id: e.extras._ALIYUN_NOTIFICATION_ID_, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
    //   ticker: 'My Notification Ticker', // (optional)
    //   showWhen: true, // (optional) default: true
    //   autoCancel: true, // (optional) default: true
    //   largeIcon: 'ic_launcher', // (optional) default: 'ic_launcher'
    //   largeIconUrl: 'https://www.example.tld/picture.jpg', // (optional) default: undefined
    //   smallIcon: 'ic_notification', // (optional) default: 'ic_notification' with fallback for 'ic_launcher'
    //   bigText: e.body, // (optional) default: 'message' prop
    //   subText: e.title, // (optional) default: none
    //   bigPictureUrl: 'https://www.example.tld/picture.jpg', // (optional) default: undefined
    //   color: 'red', // (optional) default: system default
    //   vibrate: true, // (optional) default: true
    //   vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
    //   tag: 'some_tag', // (optional) add tag to message
    //   group: 'group', // (optional) add group to message
    //   groupSummary: false, // (optional) set this notification to be the group summary for a group of notifications, default: false
    //   ongoing: false, // (optional) set whether this is an 'ongoing' notification
    //   priority: 'high', // (optional) set notification priority, default: high
    //   visibility: 'private', // (optional) set notification visibility, default: private
    //   importance: 'high', // (optional) set notification importance, default: high
    //   allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
    //   ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear)
    //   shortcutId: 'shortcut-id', // (optional) If this notification is duplicative of a Launcher shortcut, sets the id of the shortcut, in case the Launcher wants to hide the shortcut, default undefined
    //   channelId: 1, // (optional) custom channelId, if the channel doesn't exist, it will be created with options passed above (importance, vibration, sound). Once the channel is created, the channel will not be update. Make sure your channelId is different if you change these options. If you have created a custom channel, it will apply options of the channel.

    //   actions: '["打开","关闭"]', // (Android only) See the doc for notification actions to know more
    //   invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true

    //   /* iOS only properties */
    //   alertAction: 'view', // (optional) default: view
    //   category: '', // (optional) default: empty string
    //   userInfo: {}, // (optional) default: {} (using null throws a JSON value '<null>' error)
    //   date: new Date(Date.now() + 60 * 1000),
    //   /* iOS and Android properties */
    //   title: e.title || e.body.title, // (optional)
    //   message: e.body || e.body.body, // (required)
    //   playSound: false, // (optional) default: true
    //   soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
    //   number: 10, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
    //   repeatType: 'time', // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
    // });

    // // todo  在localNotification本地接收到通知后应该立即取消该通知  通过id（必需的）在cancelLocalNotifications中取消通知
    // PushNotification.cancelLocalNotifications({
    //   id: e.extras._ALIYUN_NOTIFICATION_ID_,
    // });
  };

  const LocalNotification = () => {
    console.log('---进来了吧----');
    PushNotification.localNotification({
      extras: {
        page: 'TransferDetail',
        pageParam: 'walletDetailId=6764716712651654144&name=TransferDetail',
      },
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
      actions: '["Yes", "No"]',
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
