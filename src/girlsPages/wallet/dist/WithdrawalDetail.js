"use strict";
// 提现详情
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
var Layout_1 = require("../common/Layout");
function Index(props) {
    return (react_1["default"].createElement(react_native_1.View, { style: {
            width: '100%',
            height: '100%',
            backgroundColor: '#fff'
        } },
        react_1["default"].createElement(react_native_1.ImageBackground, { resizeMode: "cover", source: require('../assets/record_detail_bg.png'), style: styles.container },
            react_1["default"].createElement(react_native_1.Image, { resizeMode: "cover", style: styles.status_icon, source: require('../assets/detail_success.png') }),
            react_1["default"].createElement(react_native_1.View, { style: {
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginTop: 16
                } },
                react_1["default"].createElement(react_native_1.Text, { style: { color: '#000000', fontSize: 18, marginRight: 10 } }, "\u94B1\u5305\u5230\u8D26"),
                react_1["default"].createElement(react_native_1.Text, { style: styles.amount }, "1300")),
            react_1["default"].createElement(react_native_1.View, { style: styles.bottom_container },
                react_1["default"].createElement(react_native_1.View, { style: styles.bottom_item },
                    react_1["default"].createElement(react_native_1.Text, { style: styles.bottom_item_title }, "\u6536\u652F\u7C7B\u578B"),
                    react_1["default"].createElement(react_native_1.Text, { style: styles.bottom_item_content }, "\u63D0\u73B0")),
                react_1["default"].createElement(react_native_1.View, { style: styles.bottom_item },
                    react_1["default"].createElement(react_native_1.Text, { style: styles.bottom_item_title }, "\u63D0\u73B0\u65F6\u95F4"),
                    react_1["default"].createElement(react_native_1.Text, { style: styles.bottom_item_content }, "2020-07-05 17:04:23")),
                react_1["default"].createElement(react_native_1.View, { style: styles.bottom_item },
                    react_1["default"].createElement(react_native_1.Text, { style: styles.bottom_item_title }, "\u5F53\u524D\u4F59\u989D"),
                    react_1["default"].createElement(react_native_1.Text, { style: styles.bottom_item_content }, "1244.00\u5E01")),
                react_1["default"].createElement(react_native_1.View, { style: styles.bottom_item },
                    react_1["default"].createElement(react_native_1.Text, { style: styles.bottom_item_title }, "\u4EA4\u6613\u5355\u53F7"),
                    react_1["default"].createElement(react_native_1.Text, { style: styles.bottom_item_content }, "176****8280"))))));
}
exports["default"] = Index;
var styles = react_native_1.StyleSheet.create({
    container: {
        width: Layout_1["default"].width - 32,
        minHeight: 344,
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 21,
        paddingVertical: 27
    },
    status_icon: {
        width: 84,
        height: 84
    },
    amount: {
        color: '#FFB048',
        fontSize: 26,
        fontWeight: 'bold'
    },
    bottom_container: {
        width: '80%',
        marginTop: 40
    },
    bottom_item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 6
    },
    bottom_item_title: {
        fontSize: 14,
        color: '#999'
    },
    bottom_item_content: {
        color: '#333333',
        fontSize: 14
    }
});
