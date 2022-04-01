"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
var native_base_1 = require("native-base");
var Login = function () {
    var _a = react_1.useState(''), goodsName = _a[0], setGoodsName = _a[1];
    var _b = react_1.useState([
        { id: 0 },
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 3 },
        { id: 4 },
    ]), list = _b[0], setList = _b[1];
    return (react_1["default"].createElement(native_base_1.View, { style: styles.quickContain }, list &&
        list.map(function (item, index) {
            return (react_1["default"].createElement(native_base_1.View, null,
                react_1["default"].createElement(native_base_1.Text, { style: styles.quickTitle }, "\u82B1\u5C0F\u94B1\u5F00\u542F\u804A\u5929\u573A\u666F"),
                react_1["default"].createElement(native_base_1.Input, { value: goodsName, onChangeText: function (text) { return setGoodsName(text); }, variant: "outline", placeholder: "\u8BF7\u8F93\u5165\u8D27\u7269\u540D\u79F0", fontSize: 14, borderRadius: 10, borderColor: '#C7C4CC' })));
        })));
};
exports["default"] = Login;
var styles = react_native_1.StyleSheet.create({
    quickContain: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 30
    },
    quickTitle: {
        fontWeight: 'bold',
        color: '#252222',
        fontSize: 18,
        marginBottom: 15,
        marginVertical: 20
    }
});
