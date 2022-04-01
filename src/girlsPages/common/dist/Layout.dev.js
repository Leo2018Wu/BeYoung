"use strict";

/* eslint-disable prettier/prettier */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reactNative = require("react-native");

var StatusBarManager = _reactNative.NativeModules.StatusBarManager; // const { width, height, scale } = Dimensions.get('screen')

var _Dimensions$get = _reactNative.Dimensions.get('window'),
    width = _Dimensions$get.width,
    height = _Dimensions$get.height,
    scale = _Dimensions$get.scale;

var STATUSBAR_HEIGHT; //状态栏高度

var safeHeight;
var isIphoneX = false;

if (_reactNative.Platform.OS === 'ios') {
  //判断是否是全面屏
  if (height >= 812 && scale >= 2) {
    safeHeight = height - 34 - 24; //34为底部安全区域高度，24为顶部安全高度

    STATUSBAR_HEIGHT = 0;
    isIphoneX = true;
  } else {
    STATUSBAR_HEIGHT = 20;
  }
} else {
  STATUSBAR_HEIGHT = StatusBarManager.HEIGHT;
}

var _default = {
  width: width,
  height: height,
  safeHeight: safeHeight,
  STATUSBAR_HEIGHT: STATUSBAR_HEIGHT,
  isIphoneX: isIphoneX
};
exports["default"] = _default;