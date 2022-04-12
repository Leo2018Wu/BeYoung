"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
var native_base_1 = require("native-base");
var async_storage_1 = require("@react-native-community/async-storage");
var AntDesign_1 = require("react-native-vector-icons/AntDesign");
var native_1 = require("@react-navigation/native");
var useRequest_1 = require("../../hooks/useRequest");
var common_1 = require("../../api/common");
var CFastImage_1 = require("../../components/CFastImage");
var Layout_1 = require("../../components/Layout");
var Setting = function (_a) {
    var props = __rest(_a, []);
    var _b = react_1.useState(''), service = _b[0], setService = _b[1];
    var _c = react_1.useState([
        { id: 0 },
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
    ]), list = _c[0], setList = _c[1];
    var _d = useRequest_1["default"](common_1.fetchMyInfo.url), result = _d.result, run = _d.run;
    native_1.useFocusEffect(react_1.useCallback(function () {
        run();
    }, []));
    react_1.useEffect(function () {
        if (result) {
            async_storage_1["default"].setItem('USERINFO', JSON.stringify(result));
        }
    }, [result]);
    var editUser = function (type, value) {
        props.navigation.navigate('EditUser', {
            type: type,
            value: value
        });
    };
    return (react_1["default"].createElement(native_base_1.NativeBaseProvider, null,
        react_1["default"].createElement(native_base_1.ScrollView, { style: styles.userInfoContain },
            react_1["default"].createElement(native_base_1.Pressable, { onPress: function () {
                    return props.navigation.navigate('EditHeadImg', {
                        headImg: (result === null || result === void 0 ? void 0 : result.headImg) || ''
                    });
                }, style: styles.itemView },
                react_1["default"].createElement(native_base_1.Text, { style: styles.userInfo_item_text }, "\u5934\u50CF"),
                react_1["default"].createElement(CFastImage_1["default"], { url: result === null || result === void 0 ? void 0 : result.headImg, styles: { width: 45, height: 45, borderRadius: 50 } })),
            react_1["default"].createElement(native_base_1.Pressable, { onPress: function () { return props.navigation.navigate('EditStudentCard'); }, style: styles.itemView },
                react_1["default"].createElement(native_base_1.Text, null, "\u5B66\u751F\u8BC1"),
                react_1["default"].createElement(native_base_1.View, { style: {
                        justifyContent: 'flex-end',
                        flexDirection: 'row',
                        alignItems: 'center'
                    } },
                    (result === null || result === void 0 ? void 0 : result.studentCard) ? (react_1["default"].createElement(CFastImage_1["default"], { url: result === null || result === void 0 ? void 0 : result.studentCard, styles: { width: 45, height: 45 } })) : (react_1["default"].createElement(native_base_1.Image, { source: require('../assets/defaultAva.png'), style: {
                            width: 45,
                            height: 45
                        } })),
                    react_1["default"].createElement(AntDesign_1["default"], { name: "right", size: 16, color: "#919191", style: { marginLeft: 4 } }))),
            react_1["default"].createElement(native_base_1.Pressable, { onPress: function () { return editUser('昵称', result === null || result === void 0 ? void 0 : result.nickName); }, style: styles.itemView },
                react_1["default"].createElement(native_base_1.Text, null, "\u6635\u79F0"),
                react_1["default"].createElement(native_base_1.View, { style: {
                        justifyContent: 'flex-end',
                        flexDirection: 'row',
                        alignItems: 'center'
                    } },
                    react_1["default"].createElement(native_base_1.Text, { style: { color: '#919191', marginRight: 4 } }, (result === null || result === void 0 ? void 0 : result.nickName) || '请设置昵称'),
                    react_1["default"].createElement(AntDesign_1["default"], { name: "right", size: 16, color: "#919191" }))),
            react_1["default"].createElement(native_base_1.Pressable, { onPress: function () { return editUser('姓名', result === null || result === void 0 ? void 0 : result.name); }, style: styles.itemView },
                react_1["default"].createElement(native_base_1.Text, null, "\u59D3\u540D"),
                react_1["default"].createElement(native_base_1.View, { style: {
                        justifyContent: 'flex-end',
                        flexDirection: 'row',
                        alignItems: 'center'
                    } },
                    react_1["default"].createElement(native_base_1.Text, { style: { color: '#919191', marginRight: 4 } }, (result === null || result === void 0 ? void 0 : result.name) || '请设置姓名'),
                    react_1["default"].createElement(AntDesign_1["default"], { name: "right", size: 16, color: "#919191" }))),
            react_1["default"].createElement(native_base_1.Pressable, { onPress: function () { return editUser('身份证号', result === null || result === void 0 ? void 0 : result.cardNum); }, style: styles.itemView },
                react_1["default"].createElement(native_base_1.Text, null, "\u8EAB\u4EFD\u8BC1\u53F7"),
                react_1["default"].createElement(native_base_1.View, { style: {
                        justifyContent: 'flex-end',
                        flexDirection: 'row',
                        alignItems: 'center'
                    } },
                    react_1["default"].createElement(native_base_1.Text, { style: { color: '#919191', marginRight: 4 } }, (result === null || result === void 0 ? void 0 : result.cardNum) || '请设置身份证号'),
                    react_1["default"].createElement(AntDesign_1["default"], { name: "right", size: 16, color: "#919191" }))),
            react_1["default"].createElement(native_base_1.View, { style: styles.itemView },
                react_1["default"].createElement(native_base_1.Text, null, "\u624B\u673A\u53F7"),
                react_1["default"].createElement(native_base_1.View, { style: {
                        justifyContent: 'flex-end',
                        flexDirection: 'row',
                        alignItems: 'center'
                    } },
                    react_1["default"].createElement(native_base_1.Text, { style: { color: '#919191', marginRight: 4 } }, result === null || result === void 0 ? void 0 : result.phone))),
            react_1["default"].createElement(native_base_1.Pressable, { onPress: function () { return editUser('微信号', result === null || result === void 0 ? void 0 : result.weChat); }, style: styles.itemView },
                react_1["default"].createElement(native_base_1.Text, null, "\u5FAE\u4FE1\u53F7"),
                react_1["default"].createElement(native_base_1.View, { style: {
                        justifyContent: 'flex-end',
                        flexDirection: 'row',
                        alignItems: 'center'
                    } },
                    react_1["default"].createElement(native_base_1.Text, { style: { color: '#919191', marginRight: 4 } }, (result === null || result === void 0 ? void 0 : result.weChat) || '请设置微信号'),
                    react_1["default"].createElement(AntDesign_1["default"], { name: "right", size: 16, color: "#919191" }))),
            react_1["default"].createElement(native_base_1.Pressable, { onPress: function () { return editUser('QQ号', result === null || result === void 0 ? void 0 : result.qq); }, style: styles.itemView },
                react_1["default"].createElement(native_base_1.Text, null, "QQ\u53F7"),
                react_1["default"].createElement(native_base_1.View, { style: {
                        justifyContent: 'flex-end',
                        flexDirection: 'row',
                        alignItems: 'center'
                    } },
                    react_1["default"].createElement(native_base_1.Text, { style: { color: '#919191', marginRight: 4 } }, (result === null || result === void 0 ? void 0 : result.qq) || '请设置QQ号'),
                    react_1["default"].createElement(AntDesign_1["default"], { name: "right", size: 16, color: "#919191" }))),
            react_1["default"].createElement(native_base_1.View, { style: styles.itemView },
                react_1["default"].createElement(native_base_1.Text, null, "\u5E74\u7EAA"),
                react_1["default"].createElement(native_base_1.Select, { selectedValue: service, width: 40, height: 35, borderRadius: 4, borderWidth: 0, textAlign: 'right', accessibilityLabel: "\u5927\u4E00", placeholder: "\u5927\u4E00", _selectedItem: {
                        endIcon: react_1["default"].createElement(native_base_1.CheckIcon, { size: "5" })
                    }, onValueChange: function (itemValue) { return setService(itemValue); } },
                    react_1["default"].createElement(native_base_1.Select.Item, { label: "\u5927\u4E00", value: "ux" }),
                    react_1["default"].createElement(native_base_1.Select.Item, { label: "\u5927\u4E8C", value: "web" }),
                    react_1["default"].createElement(native_base_1.Select.Item, { label: "\u5927\u4E09", value: "cross" }))),
            react_1["default"].createElement(native_base_1.View, { style: styles.itemView },
                react_1["default"].createElement(native_base_1.Text, null, "\u4E2A\u6027\u6807\u7B7E"),
                react_1["default"].createElement(native_base_1.View, { style: {
                        justifyContent: 'flex-end',
                        flexDirection: 'row',
                        alignItems: 'center'
                    } },
                    react_1["default"].createElement(native_base_1.Text, { style: { color: '#919191', marginRight: 4 } }, "\u4FEE\u6539"),
                    react_1["default"].createElement(AntDesign_1["default"], { name: "right", size: 16, color: "#919191" }))),
            react_1["default"].createElement(native_base_1.View, { style: styles.labelContain }, list &&
                list.map(function (item, index) {
                    return (react_1["default"].createElement(native_base_1.View, { style: styles.labelView },
                        react_1["default"].createElement(native_base_1.Text, { style: styles.labelText }, "\u8BDD\u9898\u738B\u8005")));
                })),
            react_1["default"].createElement(native_base_1.View, { style: styles.itemView },
                react_1["default"].createElement(native_base_1.Text, null, "\u7231\u597D"),
                react_1["default"].createElement(native_base_1.View, { style: {
                        justifyContent: 'flex-end',
                        flexDirection: 'row',
                        alignItems: 'center'
                    } },
                    react_1["default"].createElement(native_base_1.Text, { style: { color: '#919191', marginRight: 4 } }, "No surprise\u539F\u5219"),
                    react_1["default"].createElement(AntDesign_1["default"], { name: "right", size: 16, color: "#919191" }))),
            react_1["default"].createElement(native_base_1.View, { style: styles.btnView },
                react_1["default"].createElement(native_base_1.Text, { style: styles.btnTextView }, "\u63D0\u4EA4")))));
};
exports["default"] = Setting;
var styles = react_native_1.StyleSheet.create({
    userInfoContain: {
        padding: 20,
        backgroundColor: '#fff',
        flex: 1
    },
    itemView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10
    },
    userInfo_item_text: {
        fontSize: 14,
        color: '#111118'
    },
    labelContain: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    labelView: {
        borderColor: '#8861FF',
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderWidth: 1,
        borderRadius: 6,
        backgroundColor: '#F0ECFF',
        margin: 4
    },
    labelText: {
        color: '#8861FF',
        fontSize: 14
    },
    btnView: {
        width: Layout_1["default"].width - 60,
        marginLeft: 15,
        marginTop: 20,
        height: 50,
        backgroundColor: '#D988FF',
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '40%'
    },
    btnTextView: {
        color: '#fff',
        fontSize: 16
    }
});
