"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
var async_storage_1 = require("@react-native-community/async-storage");
var react_native_2 = require("react-native");
var Layout_1 = require("../common/Layout");
var UserInfo_1 = require("./UserInfo");
var LinkList_1 = require("./LinkList");
var Mine = function (props) {
    var navigation = props.navigation;
    return (react_1["default"].createElement(react_native_1.View, null,
        react_1["default"].createElement(react_native_1.StatusBar, { backgroundColor: "transparent", translucent: true }),
        react_1["default"].createElement(react_native_1.ImageBackground, { source: require('../assets/mineBg.png'), style: styles.banner, resizeMode: "cover" },
            react_1["default"].createElement(UserInfo_1["default"], null)),
        react_1["default"].createElement(LinkList_1["default"], { onPress: function (routeName) {
                if (routeName === 'logout') {
                    async_storage_1["default"].removeItem('USER_INFO');
                    async_storage_1["default"].removeItem('LOGIN_NAVIGAITON_NAME');
                    react_native_2.DeviceEventEmitter.emit('LOGIN_EVENT', false);
                }
                else {
                    navigation.navigate(routeName);
                }
            } })));
};
exports["default"] = Mine;
var styles = react_native_1.StyleSheet.create({
    banner: __assign(__assign({ width: Layout_1["default"].width, height: 280 }, react_native_1.Platform.select({
        ios: {
            paddingTop: 28 + 40
        },
        android: {
            paddingTop: Layout_1["default"].STATUSBAR_HEIGHT + 20
        }
    })), { position: 'relative', justifyContent: 'center', paddingHorizontal: 20, paddingVertical: 15 })
});
