"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
var Feather_1 = require("react-native-vector-icons/Feather");
var native_1 = require("@react-navigation/native");
var useRequest_1 = require("../../hooks/useRequest");
var common_1 = require("../../api/common");
var native_2 = require("@react-navigation/native");
var CFastImage_1 = require("../../components/CFastImage");
var Index = function () {
    var navigation = native_1.useNavigation();
    var _a = useRequest_1["default"](common_1.fetchMyInfo.url), result = _a.result, run = _a.run;
    native_2.useFocusEffect(react_1.useCallback(function () {
        run();
        console.log('---result---', result);
    }, []));
    return (react_1["default"].createElement(react_native_1.View, { style: styles.userView },
        react_1["default"].createElement(react_native_1.Pressable, { onPress: function () { return navigation.navigate('UserInfoSetting'); } },
            react_1["default"].createElement(react_native_1.View, { style: styles.contain },
                react_1["default"].createElement(react_native_1.Image, { source: require('../assets/gift.png'), style: {
                        width: 16,
                        height: 16
                    } }),
                react_1["default"].createElement(react_native_1.Text, { style: { fontSize: 12, color: '#fff', marginLeft: 2 } }, "101")),
            react_1["default"].createElement(react_native_1.View, { style: { alignItems: 'center', marginVertical: 20 } },
                react_1["default"].createElement(CFastImage_1["default"], { url: result === null || result === void 0 ? void 0 : result.headImg, styles: { width: 85, height: 85, borderRadius: 50 } }),
                react_1["default"].createElement(react_native_1.View, { style: styles.editView },
                    react_1["default"].createElement(react_native_1.Text, { style: { color: '#fff', fontSize: 14, marginRight: 8 } }, (result === null || result === void 0 ? void 0 : result.nickName) || '请设置昵称'),
                    react_1["default"].createElement(Feather_1["default"], { name: "edit-3", size: 14, color: "#fff" })))),
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
    editView: {
        flexDirection: 'row',
        marginTop: 15,
        marginBottom: 10,
        alignItems: 'center'
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
