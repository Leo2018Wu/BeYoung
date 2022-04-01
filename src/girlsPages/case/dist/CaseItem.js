"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
var native_base_1 = require("native-base");
var native_1 = require("@react-navigation/native");
var Layout_1 = require("../common/Layout");
var Login = function () {
    var navigation = native_1.useNavigation();
    return (react_1["default"].createElement(react_native_1.Pressable, null,
        react_1["default"].createElement(react_native_1.ImageBackground, { source: require('../assets/IMG_2729.png'), borderRadius: 4, style: styles.banner, resizeMode: "cover" },
            react_1["default"].createElement(native_base_1.View, { style: styles.optContain },
                react_1["default"].createElement(native_base_1.View, { style: styles.optView },
                    react_1["default"].createElement(native_base_1.Image, { source: require('../assets/follow.png'), style: {
                            width: 17,
                            height: 16,
                            marginRight: 3
                        } }),
                    react_1["default"].createElement(native_base_1.Text, { style: styles.optSize }, "71k")),
                react_1["default"].createElement(native_base_1.View, { style: styles.optView },
                    react_1["default"].createElement(native_base_1.Image, { source: require('../assets/home_message.png'), style: {
                            width: 17,
                            height: 16,
                            marginRight: 3
                        } }),
                    react_1["default"].createElement(native_base_1.Text, { style: styles.optSize }, "71k")),
                react_1["default"].createElement(native_base_1.View, { style: styles.optView },
                    react_1["default"].createElement(native_base_1.Image, { source: require('../assets/gift.png'), style: {
                            width: 17,
                            height: 16,
                            marginRight: 3
                        } }),
                    react_1["default"].createElement(native_base_1.Text, { style: styles.optSize }, "71k"))))));
};
exports["default"] = Login;
var styles = react_native_1.StyleSheet.create({
    optContain: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        position: 'absolute',
        bottom: 6,
        width: '100%',
        paddingHorizontal: 10
    },
    optView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    optSize: {
        color: '#C7C4CC',
        fontSize: 9
    },
    banner: {
        width: (Layout_1["default"].width - 26) / 2,
        height: 210,
        position: 'relative',
        justifyContent: 'center',
        marginBottom: 8
    }
});
