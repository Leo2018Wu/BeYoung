"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
var native_base_1 = require("native-base");
var native_1 = require("@react-navigation/native");
var Layout_1 = require("../common/Layout");
var Login = function () {
    var navigation = native_1.useNavigation();
    var _a = react_1.useState([{ id: 0 }, { id: 1 }, { id: 2 }]), imgList = _a[0], setImgList = _a[1];
    return (react_1["default"].createElement(react_native_1.Pressable, { onPress: function () { return navigation.navigate('WithdrawalDetail'); }, style: {
            flexDirection: 'row',
            paddingHorizontal: 20,
            paddingVertical: 10,
            justifyContent: 'center',
            alignItems: 'center'
        } },
        react_1["default"].createElement(native_base_1.Image, { source: require('../assets/defaultAva.png'), style: {
                width: 50,
                height: 50
            } }),
        react_1["default"].createElement(native_base_1.View, { style: styles.itemContain },
            react_1["default"].createElement(native_base_1.View, null,
                react_1["default"].createElement(native_base_1.Text, { style: { color: '#554C5F', fontSize: 16 } }, "\u63D0\u73B0\u5230\u5FAE\u4FE1"),
                react_1["default"].createElement(native_base_1.Text, { style: { color: '#c7c7c7', fontSize: 12 } }, "11-11 10:20")),
            react_1["default"].createElement(native_base_1.View, { style: {
                    marginVertical: 10
                } },
                react_1["default"].createElement(native_base_1.Text, { style: { color: '#554C5F', fontSize: 12, alignSelf: 'flex-end' } }, "RMB"),
                react_1["default"].createElement(native_base_1.Text, { style: { color: '#554C5F', fontSize: 20, fontWeight: 'bold' } }, "+6.00")))));
};
exports["default"] = Login;
var styles = react_native_1.StyleSheet.create({
    itemContain: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        width: Layout_1["default"].width - 80,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    optContain: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },
    optView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    optSize: {
        color: '#C7C4CC',
        fontSize: 12
    }
});
