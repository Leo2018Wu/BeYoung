"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
var AntDesign_1 = require("react-native-vector-icons/AntDesign");
var Layout_1 = require("../common/Layout");
var list = [
    {
        routeName: 'photo',
        iconUrl: require('../assets/account_security.png'),
        name: '照片精选'
    },
    {
        routeName: 'QuickReply',
        iconUrl: require('../assets/notice.png'),
        name: '快捷回复设置'
    },
    {
        routeName: 'privacy',
        iconUrl: require('../assets/privacy.png'),
        name: '回复表情包上传'
    },
    {
        routeName: 'Wallet',
        iconUrl: require('../assets/wallet.png'),
        name: '钱包'
    },
    {
        routeName: 'Promote',
        iconUrl: require('../assets/Promote.png'),
        name: '帮助教程'
    },
    {
        routeName: 'logout',
        iconUrl: require('../assets/logout.png'),
        name: '退出登录'
    },
];
function Index(_a) {
    var onPress = _a.onPress;
    var ITEMS = list.map(function (item, index) { return (react_1["default"].createElement(react_native_1.View, { key: index, style: styles.contain },
        react_1["default"].createElement(react_native_1.TouchableOpacity, { onPress: function () {
                onPress(item.routeName);
            }, style: styles.itemView },
            react_1["default"].createElement(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center' } },
                react_1["default"].createElement(react_native_1.Image, { source: item.iconUrl, style: {
                        width: 16,
                        height: 16
                    }, resizeMode: "cover" }),
                react_1["default"].createElement(react_native_1.Text, { style: styles.textStyle }, item.name)),
            react_1["default"].createElement(react_native_1.View, { style: { justifyContent: 'flex-end' } },
                react_1["default"].createElement(AntDesign_1["default"], { name: "right", size: 16, color: "#000" }))))); });
    return react_1["default"].createElement(react_1["default"].Fragment, null, ITEMS);
}
exports["default"] = Index;
var styles = react_native_1.StyleSheet.create({
    textStyle: {
        color: '#767676',
        fontSize: 16,
        marginLeft: 10
    },
    contain: {
    // padding: 15,
    },
    itemView: {
        flexDirection: 'row',
        width: Layout_1["default"].width - 40,
        marginLeft: 20,
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: 'rgba(0,0,0,0.1)'
    }
});
