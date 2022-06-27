"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
var native_base_1 = require("native-base");
var Ionicons_1 = require("react-native-vector-icons/Ionicons");
var DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
        flag: true
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
        flag: true
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
        flag: false
    },
];
var Item = function (_a) {
    var item = _a.item;
    return (react_1["default"].createElement(react_native_1.View, { style: styles.item },
        react_1["default"].createElement(native_base_1.Image, { source: require('../assets/defaultAva.png'), style: {
                width: 52,
                height: 52,
                marginRight: 10
            }, alt: "dairy" }),
        react_1["default"].createElement(react_native_1.View, { style: styles.rightView },
            react_1["default"].createElement(native_base_1.Text, { fontSize: 'lg', fontWeight: 'bold' }, item.title),
            item.flag ? (react_1["default"].createElement(react_native_1.View, { style: styles.followEdView },
                react_1["default"].createElement(native_base_1.Image, { source: require('../assets/each.png'), style: {
                        width: 10,
                        height: 8,
                        marginRight: 4
                    }, alt: "dairy" }),
                react_1["default"].createElement(native_base_1.Text, { color: '#AAAAAA' }, "\u4E92\u76F8\u5173\u6CE8"))) : (react_1["default"].createElement(react_native_1.View, { style: styles.followView },
                react_1["default"].createElement(Ionicons_1["default"], { name: "add", size: 20, color: "#AF70FF" }),
                react_1["default"].createElement(native_base_1.Text, { color: '#AF70FF' }, "\u5173\u6CE8"))))));
};
var App = function () {
    var renderItem = function (_a) {
        var item = _a.item;
        return react_1["default"].createElement(Item, { item: item });
    };
    return (react_1["default"].createElement(react_native_1.SafeAreaView, { style: styles.container },
        react_1["default"].createElement(react_native_1.FlatList, { data: DATA, renderItem: renderItem, keyExtractor: function (item) { return item.id; } })));
};
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        padding: 16
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 18
    },
    title: {
        fontSize: 32
    },
    rightView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#EDEDED',
        height: '100%',
        alignItems: 'center'
    },
    followView: {
        borderColor: '#AF70FF',
        borderWidth: 1,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    followEdView: {
        backgroundColor: '#DDDDDD',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center'
    }
});
exports["default"] = App;
