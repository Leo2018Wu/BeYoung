/* eslint-disable prettier/prettier */
'use strict';
import { Platform, NativeModules, Dimensions } from 'react-native';

const { StatusBarManager } = NativeModules;
// const { width, height, scale } = Dimensions.get('screen')
const { width, height, scale } = Dimensions.get('window');
let STATUSBAR_HEIGHT;//状态栏高度
let safeHeight;
let isIphoneX = false;
if (Platform.OS === 'ios') {
  //判断是否是全面屏
  if (height >= 812 && scale >= 2) {
    safeHeight = height - 34 - 24;   //34为底部安全区域高度，24为顶部安全高度
    STATUSBAR_HEIGHT = 0;
    isIphoneX = true;
  } else {
    STATUSBAR_HEIGHT = 20;
  }
} else {
  STATUSBAR_HEIGHT = StatusBarManager.HEIGHT;
}

export default {
  width,
  height,
  safeHeight,
  STATUSBAR_HEIGHT,
  isIphoneX,
};
