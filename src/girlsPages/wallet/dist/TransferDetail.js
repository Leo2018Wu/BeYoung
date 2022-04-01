"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
var native_1 = require("@react-navigation/native");
var DashLine_1 = require("../common/DashLine");
var Login = function () {
    var navigation = native_1.useNavigation();
    var _a = react_1.useState([
        { id: 0 },
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 3 },
        { id: 4 },
    ]), list = _a[0], setList = _a[1];
    var Item = function (item) {
        return (react_1["default"].createElement(react_native_1.Pressable, { style: {
                backgroundColor: 'white',
                width: '100%',
                height: 120,
                paddingTop: 0,
                paddingLeft: 15,
                paddingRight: 15,
                marginBottom: 10
            }, onPress: function () {
                navigation.navigate('WithdrawalDetail');
            } },
            react_1["default"].createElement(react_native_1.View, { style: {
                    flex: 1,
                    flexDirection: 'row',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'flex-start'
                } },
                react_1["default"].createElement(react_native_1.View, { style: { marginRight: 10 } },
                    react_1["default"].createElement(react_native_1.Image, { style: { width: 50, height: 50 }, source: require('../assets/money.png') })),
                react_1["default"].createElement(react_native_1.View, { style: {
                        flex: 3,
                        justifyContent: 'center',
                        height: 50
                    } },
                    react_1["default"].createElement(react_native_1.View, null,
                        react_1["default"].createElement(react_native_1.Text, { style: { color: '#5B5959', fontSize: 16 } }, "\u63D0\u73B0"))),
                react_1["default"].createElement(react_native_1.View, { style: {
                        flex: 2,
                        alignSelf: 'center',
                        justifyContent: 'center',
                        height: 50
                    } },
                    react_1["default"].createElement(react_native_1.Text, { style: [styles.amountText, styles.color1] }, "+1200.00\u5E01"))),
            react_1["default"].createElement(react_native_1.View, null,
                react_1["default"].createElement(DashLine_1["default"], null)),
            react_1["default"].createElement(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', height: 40 } },
                react_1["default"].createElement(react_native_1.Text, { style: { fontSize: 14, color: '#666666' } }, "\u5230\u8D26\u65F6\u95F4\uFF1A2020-07-11 14:00-17:00"))));
    };
    return (react_1["default"].createElement(react_native_1.FlatList, { contentContainerStyle: styles.main, data: list, onEndReachedThreshold: 0.1, showsVerticalScrollIndicator: false, renderItem: function (_a) {
            var item = _a.item;
            return react_1["default"].createElement(Item, { item: item });
        }, keyExtractor: function (item) { return item.id; } }));
};
exports["default"] = Login;
var styles = react_native_1.StyleSheet.create({
    item: {
        backgroundColor: 'white',
        flexDirection: 'column',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 5,
        paddingBottom: 5,
        marginBottom: 10
    },
    topView: {
        flexDirection: 'row'
    },
    viewContain: {
        flex: 1,
        width: '100%',
        height: '100%',
        paddingBottom: 5,
        paddingTop: 5
    },
    titleStyle: {
        flex: 1,
        textAlign: 'left',
        fontSize: 15,
        color: '#525050',
        fontWeight: 'bold'
    },
    moneyStyle: {
        flex: 1,
        textAlign: 'right',
        fontSize: 14
    },
    positiveColor: {
        color: '#33C74C'
    },
    negativeColor: {
        color: '#F47680'
    },
    timeStyle: {
        textAlign: 'left',
        flex: 1,
        fontSize: 15,
        color: '#7B7B7B'
    },
    balanceStyle: {
        textAlign: 'right',
        flex: 1,
        fontSize: 14,
        color: '#777777'
    },
    amountText: {
        fontSize: 20,
        textAlign: 'right'
    },
    color2: {
        color: '#000'
    },
    color1: {
        color: '#EEB026'
    }
});
