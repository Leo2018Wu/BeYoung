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
var bottom_tabs_1 = require("@react-navigation/bottom-tabs");
var native_base_1 = require("native-base");
var react_native_safe_area_context_1 = require("react-native-safe-area-context");
var Home_1 = require("../../girlsPages/home/Home");
var Case_1 = require("../../girlsPages/case/Case");
var Index_1 = require("../../girlsPages/communication/Index");
var Mine_1 = require("../../girlsPages/mine/Mine");
var ReleaseDynamics_1 = require("../../girlsPages/releaseDynamics/ReleaseDynamics");
var Tab = bottom_tabs_1.createBottomTabNavigator();
var MyTabs = function () {
    var insets = react_native_safe_area_context_1.useSafeAreaInsets(); // 安全区域边界信息
    var INSET_BOTTOM = insets.bottom; // 安全区域额底部高度
    var TABBAR_HEIGHT = 48; // 底部tab高度
    var MyTabBar = function (props) {
        var state = props.state, descriptors = props.descriptors, navigation = props.navigation;
        return (react_1["default"].createElement(native_base_1.HStack
        // eslint-disable-next-line react-native/no-inline-styles
        , { 
            // eslint-disable-next-line react-native/no-inline-styles
            style: {
                height: TABBAR_HEIGHT + INSET_BOTTOM / 2,
                backgroundColor: '#fff'
            } }, state.routes.map(function (route, index) {
            var options = descriptors[route.key].options;
            var label = options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                    ? options.title
                    : route.name;
            var isFocused = state.index === index;
            var onPress = function () {
                var event = navigation.emit({
                    type: 'tabPress',
                    target: route.key
                });
                if (!isFocused && !event.defaultPrevented) {
                    navigation.navigate(route.name);
                }
            };
            return (react_1["default"].createElement(native_base_1.Pressable, { flex: 1, key: route.key, onPress: onPress, bg: '#fff', pb: INSET_BOTTOM / 2 },
                react_1["default"].createElement(native_base_1.Center, { h: "full" }, index != 2 ? (react_1["default"].createElement(native_base_1.Text, { style: { color: isFocused ? '#8B5CFF' : '#999' } }, label)) : (react_1["default"].createElement(native_base_1.Image, { source: require('../../girlsPages/assets/tab_post_ed.png'), style: {
                        width: 55,
                        height: 55,
                        marginBottom: 10
                    } })))));
        })));
    };
    return (react_1["default"].createElement(Tab.Navigator, { tabBar: function (props) { return react_1["default"].createElement(MyTabBar, __assign({}, props)); }, backBehavior: "history", initialRouteName: "Home" },
        react_1["default"].createElement(Tab.Screen, { options: {
                headerShown: false,
                tabBarLabel: '动态'
            }, name: "Home", component: Home_1["default"] }),
        react_1["default"].createElement(Tab.Screen, { options: {
                title: '案例',
                tabBarLabel: '案例',
                headerTitleAlign: 'center',
                tabBarItemStyle: { borderRadius: 10 }
            }, name: "Case", component: Case_1["default"] }),
        react_1["default"].createElement(Tab.Screen, { options: {
                headerShown: false
            }, name: "ReleaseDynamics", component: ReleaseDynamics_1["default"] }),
        react_1["default"].createElement(Tab.Screen, { options: {
                title: '我的消息',
                tabBarLabel: '消息',
                headerTitleAlign: 'center',
                tabBarItemStyle: { borderRadius: 10 }
            }, name: "Order", component: Index_1["default"] }),
        react_1["default"].createElement(Tab.Screen, { options: {
                headerShown: false,
                tabBarLabel: '我的'
            }, name: "Mine", component: Mine_1["default"] })));
};
exports["default"] = MyTabs;
