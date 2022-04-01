/* eslint-disable prettier/prettier */
'use strict';
"use strict";
exports.__esModule = true;
var react_native_1 = require("react-native");
var StatusBarManager = react_native_1.NativeModules.StatusBarManager;
// const { width, height, scale } = Dimensions.get('screen')
var _a = react_native_1.Dimensions.get('window'), width = _a.width, height = _a.height, scale = _a.scale;
var STATUSBAR_HEIGHT; //状态栏高度
var safeHeight;
var isIphoneX = false;
if (react_native_1.Platform.OS === 'ios') {
    //判断是否是全面屏
    if (height >= 812 && scale >= 2) {
        safeHeight = height - 34 - 24; //34为底部安全区域高度，24为顶部安全高度
        STATUSBAR_HEIGHT = 0;
        isIphoneX = true;
    }
    else {
        STATUSBAR_HEIGHT = 20;
    }
}
else {
    STATUSBAR_HEIGHT = StatusBarManager.HEIGHT;
}
exports["default"] = {
    width: width,
    height: height,
    safeHeight: safeHeight,
    STATUSBAR_HEIGHT: STATUSBAR_HEIGHT,
    isIphoneX: isIphoneX
};
