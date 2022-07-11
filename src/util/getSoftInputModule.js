import {NativeModules} from 'react-native';

export const getSoftInputModule = value => {
  // 当value为1时 tab栏页面的input框聚焦时 底部tab不会弹起
  // 当value不为1时，非tab栏页面的input框聚焦时 软键盘弹起
  NativeModules.SoftInputModule.changeSoftInputMode(
    value,
    success => {
      console.log('success回调-->', success);
    },
    err => {
      console.log('err回调-->', err);
    },
  );
};
