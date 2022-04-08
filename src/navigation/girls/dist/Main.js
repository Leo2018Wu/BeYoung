"use strict";
exports.__esModule = true;
var react_1 = require("react");
var native_stack_1 = require("@react-navigation/native-stack");
var TabNav_1 = require("./TabNav");
// import DynamicItemDetail from '../../girlsPages/home/Dynamic/DynamicItemDetail';
var DailyDetail_1 = require("../../commonPages/daily/DailyDetail");
var UserInfoSetting_1 = require("../../girlsPages/mine/UserInfoSetting");
var QuickReply_1 = require("../../girlsPages/mine/QuickReply");
var ReplyExpPackage_1 = require("../../girlsPages/mine/ReplyExpPackage");
var PhotoSelection_1 = require("../../girlsPages/mine/PhotoSelection");
var Wallet_1 = require("../../girlsPages/wallet/Wallet");
var TransferDetail_1 = require("../../girlsPages/wallet/TransferDetail");
var WithdrawalDetail_1 = require("../../girlsPages/wallet/WithdrawalDetail");
var Preview_1 = require("../../girlsPages/common/Preview");
var EditUser_1 = require("../../girlsPages/mine/setting/EditUser");
var Stack = native_stack_1.createNativeStackNavigator();
var MyStack = function () {
    return (react_1["default"].createElement(Stack.Navigator, { screenOptions: {
            headerTitleAlign: 'center'
        } },
        react_1["default"].createElement(Stack.Screen, { options: {
                headerShown: false
            }, name: "HomeTab", component: TabNav_1["default"] }),
        react_1["default"].createElement(Stack.Screen, { name: "DailyDetail", component: DailyDetail_1["default"], options: function () { return ({
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
        react_1["default"].createElement(Stack.Screen, { name: "ReplyExpPackage", component: ReplyExpPackage_1["default"], options: function () { return ({
                title: '回复表情包',
                headerStyle: { backgroundColor: '#fff' }
            }); } }),
        react_1["default"].createElement(Stack.Screen, { name: "PhotoSelection", component: PhotoSelection_1["default"], options: function () { return ({
                title: '精选照片',
                headerStyle: { backgroundColor: '#fff' }
            }); } }),
        react_1["default"].createElement(Stack.Screen, { name: "Wallet", component: Wallet_1["default"], options: function () { return ({
                title: '',
                headerShown: false
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
            } }),
        react_1["default"].createElement(Stack.Screen, { options: {
                headerShown: false,
                headerBackVisible: true
            }, name: "EditUser", component: EditUser_1["default"] })));
};
exports["default"] = MyStack;
