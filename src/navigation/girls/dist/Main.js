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
var PhotoSelection_1 = require("../../girlsPages/mine/photoSelect/PhotoSelection");
var PhotoUpload_1 = require("../../girlsPages/mine/photoSelect/PhotoUpload");
var RepairHelp_1 = require("../../girlsPages/mine/photoSelect/RepairHelp");
var Wallet_1 = require("../../girlsPages/wallet/Wallet");
var TransferDetail_1 = require("../../girlsPages/wallet/TransferDetail");
var WithdrawalDetail_1 = require("../../girlsPages/wallet/WithdrawalDetail");
var WithdrawalCards_1 = require("../../girlsPages/wallet/WithdrawalCards");
var Preview_1 = require("../../components/Preview");
var EditUser_1 = require("../../girlsPages/mine/setting/EditUser");
var EditName_1 = require("../../girlsPages/mine/setting/EditName");
var EditStudentCard_1 = require("../../girlsPages/mine/setting/EditStudentCard");
var EditHeadImg_1 = require("../../girlsPages/mine/setting/EditHeadImg");
var Session_1 = require("../../girlsPages/communication/Session");
var Label_1 = require("../../girlsPages/mine/Label");
var Index_1 = require("../../bossPages/customService/Index");
var MineGifts_1 = require("../../girlsPages/mine/MineGifts");
var Follow_1 = require("../../girlsPages/mine/Follow");
var Stack = native_stack_1.createNativeStackNavigator();
var MyStack = function () {
    return (react_1["default"].createElement(Stack.Navigator, { screenOptions: {
            headerTitleAlign: 'center'
        } },
        react_1["default"].createElement(Stack.Screen, { options: {
                headerShown: false
            }, name: "HomeTab", component: TabNav_1["default"] }),
        react_1["default"].createElement(Stack.Screen, { name: "DailyDetail", component: DailyDetail_1["default"], options: function () { return ({
                title: '动态详情',
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
                headerShown: false,
                headerBackVisible: true
            }); } }),
        react_1["default"].createElement(Stack.Screen, { options: {
                title: '修图帮助',
                headerStyle: { backgroundColor: '#fff' }
            }, name: "RepairHelp", component: RepairHelp_1["default"] }),
        react_1["default"].createElement(Stack.Screen, { name: "PhotoUpload", component: PhotoUpload_1["default"], options: function () { return ({
                title: '添加照片',
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
                title: '交易详情',
                headerStyle: { backgroundColor: '#fff' }
            }); } }),
        react_1["default"].createElement(Stack.Screen, { name: "WithdrawalCards", component: WithdrawalCards_1["default"], options: function () { return ({
                title: '绑定账号',
                headerStyle: { backgroundColor: '#fff' }
            }); } }),
        react_1["default"].createElement(Stack.Screen, { name: "Preview", component: Preview_1["default"], options: {
                title: '',
                headerTransparent: true
            } }),
        react_1["default"].createElement(Stack.Screen, { options: {
                headerShown: false,
                headerBackVisible: true
            }, name: "EditUser", component: EditUser_1["default"] }),
        react_1["default"].createElement(Stack.Screen, { options: {
                headerShown: false,
                headerBackVisible: true
            }, name: "EditName", component: EditName_1["default"] }),
        react_1["default"].createElement(Stack.Screen, { options: {
                headerBackVisible: true
            }, name: "EditHeadImg", component: EditHeadImg_1["default"] }),
        react_1["default"].createElement(Stack.Screen, { options: function () { return ({
                title: '编辑学生证',
                headerStyle: { backgroundColor: '#fff' }
            }); }, name: "EditStudentCard", component: EditStudentCard_1["default"] }),
        react_1["default"].createElement(Stack.Screen, { options: {
                headerShown: false
            }, name: "Session", component: Session_1["default"] }),
        react_1["default"].createElement(Stack.Screen, { name: "Label", component: Label_1["default"], options: function () { return ({
                headerShown: false,
                headerBackVisible: true
            }); } }),
        react_1["default"].createElement(Stack.Screen, { options: {
                title: '客服',
                headerBackTitle: '我的'
            }, name: "Service", component: Index_1["default"] }),
        react_1["default"].createElement(Stack.Screen, { options: {
                title: '我的礼物',
                headerBackTitle: '我的'
            }, name: "MineGifts", component: MineGifts_1["default"] }),
        react_1["default"].createElement(Stack.Screen, { options: {
                title: '被关注',
                headerStyle: { backgroundColor: '#fff' }
            }, name: "Follow", component: Follow_1["default"] })));
};
exports["default"] = MyStack;
