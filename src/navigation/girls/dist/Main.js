"use strict";
exports.__esModule = true;
var react_1 = require("react");
var native_stack_1 = require("@react-navigation/native-stack");
var TabNav_1 = require("./TabNav");
var DynamicItemDetail_1 = require("../../girlsPages/home/Dynamic/DynamicItemDetail");
var UserInfoSetting_1 = require("../../girlsPages/mine/UserInfoSetting");
var QuickReply_1 = require("../../girlsPages/mine/QuickReply");
var Wallet_1 = require("../../girlsPages/wallet/Wallet");
var TransferDetail_1 = require("../../girlsPages/wallet/TransferDetail");
var WithdrawalDetail_1 = require("../../girlsPages/wallet/WithdrawalDetail");
var Preview_1 = require("../../girlsPages/common/Preview");
var Stack = native_stack_1.createNativeStackNavigator();
var MyStack = function () {
    return (react_1["default"].createElement(Stack.Navigator, { screenOptions: {
            headerTitleAlign: 'center'
        } },
        react_1["default"].createElement(Stack.Screen, { options: {
                headerShown: false
            }, name: "HomeTab", component: TabNav_1["default"] }),
        react_1["default"].createElement(Stack.Screen, { name: "DynamicItemDetail", component: DynamicItemDetail_1["default"], options: function () { return ({
                title: '帖子详情',
                headerStyle: { backgroundColor: '#fff' }
            }); } }),
        react_1["default"].createElement(Stack.Screen, { name: "UserInfoSetting", component: UserInfoSetting_1["default"], options: function () { return ({
                title: '个人信息',
                headerStyle: { backgroundColor: '#fff' }
            }); } }),
        react_1["default"].createElement(Stack.Screen, { name: "QuickReply", component: QuickReply_1["default"], options: function () { return ({
                title: '快捷回复',
                headerStyle: { backgroundColor: '#fff' }
            }); } }),
        react_1["default"].createElement(Stack.Screen, { name: "Wallet", component: Wallet_1["default"], options: function () { return ({
                title: '钱包',
                headerStyle: { backgroundColor: '#fff' }
            }); } }),
        react_1["default"].createElement(Stack.Screen, { name: "TransferDetail", component: TransferDetail_1["default"], options: function () { return ({
                title: '交易明细',
                headerStyle: { backgroundColor: '#fff' }
            }); } }),
        react_1["default"].createElement(Stack.Screen, { name: "WithdrawalDetail", component: WithdrawalDetail_1["default"], options: function () { return ({
                title: '提现详情',
                headerStyle: { backgroundColor: '#fff' }
            }); } }),
        react_1["default"].createElement(Stack.Screen, { name: "Preview", component: Preview_1["default"], options: {
                headerTitle: '',
                headerTransparent: true
            } })));
};
exports["default"] = MyStack;
