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
var Layout_1 = require("../common/Layout");
var WalletItem_1 = require("./WalletItem");
var Mine = function (props) {
    var navigation = props.navigation;
    var _a = react_1.useState([
        { id: 0 },
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 3 },
        { id: 4 },
    ]), list = _a[0], setList = _a[1];
    return (react_1["default"].createElement(react_native_1.View, { style: { backgroundColor: '#fff', flex: 1 } },
        react_1["default"].createElement(react_native_1.StatusBar, { backgroundColor: "transparent", translucent: true }),
        react_1["default"].createElement(react_native_1.View, { style: { backgroundColor: '#fff', height: '40%', position: 'relative' } },
            react_1["default"].createElement(react_native_1.ImageBackground, { source: require('../assets/mineBg.png'), style: styles.banner, resizeMode: "cover" },
                react_1["default"].createElement(react_native_1.View, { style: styles.walletContain },
                    react_1["default"].createElement(react_native_1.View, { style: styles.contain_text },
                        react_1["default"].createElement(react_native_1.Text, { style: { color: '#fff', fontSize: 16 } }, "\u9752\u56DE\u5E01"),
                        react_1["default"].createElement(react_native_1.Image, { source: require('../assets/mineBg.png'), style: {
                                width: 16,
                                height: 16
                            }, resizeMode: "cover" })),
                    react_1["default"].createElement(react_native_1.Text, { style: { color: '#fff', fontSize: 34 } }, "753,256,00"))),
            react_1["default"].createElement(react_native_1.View, { style: styles.contain_inner },
                react_1["default"].createElement(react_native_1.View, { style: styles.item_inner },
                    react_1["default"].createElement(react_native_1.Image, { source: require('../assets/mineBg.png'), style: {
                            width: 50,
                            height: 50
                        }, resizeMode: "cover" }),
                    react_1["default"].createElement(react_native_1.Text, { style: { color: '#000', fontSize: 14 } }, "\u7ED1\u5B9A\u652F\u4ED8\u5B9D")),
                react_1["default"].createElement(react_native_1.View, { style: styles.item_inner },
                    react_1["default"].createElement(react_native_1.Image, { source: require('../assets/mineBg.png'), style: {
                            width: 50,
                            height: 50
                        }, resizeMode: "cover" }),
                    react_1["default"].createElement(react_native_1.Text, { style: { color: '#000', fontSize: 14 } }, "\u7ED1\u5B9A\u5FAE\u4FE1")),
                react_1["default"].createElement(react_native_1.Pressable, { onPress: function () { return navigation.navigate('TransferDetail'); }, style: styles.item_inner },
                    react_1["default"].createElement(react_native_1.Image, { source: require('../assets/mineBg.png'), style: {
                            width: 50,
                            height: 50
                        }, resizeMode: "cover" }),
                    react_1["default"].createElement(react_native_1.Text, { style: { color: '#000', fontSize: 14 } }, "\u4EA4\u6613\u660E\u7EC6"))),
            react_1["default"].createElement(react_native_1.Text, { style: styles.withdrawal }, "\u63D0\u73B0\u8BB0\u5F55")),
        react_1["default"].createElement(react_native_1.FlatList, { contentContainerStyle: styles.main, data: list, onEndReachedThreshold: 0.1, showsVerticalScrollIndicator: false, renderItem: function (_a) {
                var item = _a.item;
                return react_1["default"].createElement(WalletItem_1["default"], { item: item });
            }, keyExtractor: function (item) { return item.id; } }),
        react_1["default"].createElement(react_native_1.View, { style: styles.btnView },
            react_1["default"].createElement(react_native_1.Text, { style: styles.btnTextView }, "\u63D0\u4EA4"))));
};
exports["default"] = Mine;
var styles = react_native_1.StyleSheet.create({
    banner: __assign(__assign({ width: Layout_1["default"].width, height: 180 }, react_native_1.Platform.select({
        ios: {
            paddingTop: 28 + 40
        },
        android: {
            paddingTop: Layout_1["default"].STATUSBAR_HEIGHT + 20
        }
    })), { position: 'relative', justifyContent: 'center', paddingHorizontal: 20, paddingVertical: 15 }),
    walletContain: {
        position: 'absolute',
        top: '40%',
        left: 30
    },
    contain_text: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    contain_inner: {
        width: '90%',
        backgroundColor: '#fff',
        position: 'absolute',
        top: '45%',
        left: '5%',
        flex: 1,
        flexDirection: 'row',
        padding: 20,
        justifyContent: 'space-around',
        borderRadius: 10
    },
    item_inner: {
        alignItems: 'center'
    },
    withdrawal: {
        position: 'absolute',
        bottom: '5%',
        paddingLeft: 20,
        color: '#554C5F',
        fontSize: 14
    },
    main: {},
    btnView: {
        width: Layout_1["default"].width - 60,
        marginLeft: 30,
        marginTop: 20,
        height: 50,
        backgroundColor: '#D988FF',
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '5%'
    },
    btnTextView: {
        color: '#fff',
        fontSize: 16
    }
});
