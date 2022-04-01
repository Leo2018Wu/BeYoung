"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
var Feather_1 = require("react-native-vector-icons/Feather");
var Index = function () {
    return (react_1["default"].createElement(react_native_1.View, { style: styles.userView },
        react_1["default"].createElement(react_native_1.View, { style: styles.contain },
            react_1["default"].createElement(react_native_1.Image, { source: require('../assets/gift.png'), style: {
                    width: 16,
                    height: 16
                } }),
            react_1["default"].createElement(react_native_1.Text, { style: { fontSize: 12, color: '#fff', marginLeft: 2 } }, "101")),
        react_1["default"].createElement(react_native_1.View, { style: { alignItems: 'center', marginVertical: 20 } },
            react_1["default"].createElement(react_native_1.Image, { source: require('../assets/defaultAva.png'), style: {
                    width: 85,
                    height: 85
                } }),
            react_1["default"].createElement(react_native_1.View, { style: { flexDirection: 'row', marginVertical: 10 } },
                react_1["default"].createElement(react_native_1.Text, { style: { color: '#fff', fontSize: 14 } }, "\u5566\u5566\u5566"),
                react_1["default"].createElement(Feather_1["default"], { name: "edit-3", size: 16, color: "#000" }))),
        react_1["default"].createElement(react_native_1.View, { style: styles.itemView },
            react_1["default"].createElement(react_native_1.View, { style: styles.item },
                react_1["default"].createElement(react_native_1.Text, { style: styles.topText }, "123"),
                react_1["default"].createElement(react_native_1.Text, { style: styles.btmText }, "\u70B9\u8D5E")),
            react_1["default"].createElement(react_native_1.View, { style: styles.line }),
            react_1["default"].createElement(react_native_1.View, { style: styles.item },
                react_1["default"].createElement(react_native_1.Text, { style: styles.topText }, "2345"),
                react_1["default"].createElement(react_native_1.Text, { style: styles.btmText }, "\u8BC4\u8BBA")),
            react_1["default"].createElement(react_native_1.View, { style: styles.line }),
            react_1["default"].createElement(react_native_1.View, { style: styles.item },
                react_1["default"].createElement(react_native_1.Text, { style: styles.topText }, "123"),
                react_1["default"].createElement(react_native_1.Text, { style: styles.btmText }, "\u52A8\u6001")))));
};
exports["default"] = Index;
var styles = react_native_1.StyleSheet.create({
    userView: {
        position: 'relative',
        height: '100%'
    },
    contain: {
        flexDirection: 'row',
        width: 60,
        height: 26,
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute'
    },
    itemView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    item: {
        flex: 1,
        alignItems: 'center'
    },
    topText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },
    btmText: {
        color: '#fff',
        fontSize: 12
    },
    line: {
        width: 1,
        borderWidth: 0.4,
        height: 16,
        borderColor: '#fff',
        opacity: 0.3
    }
});
