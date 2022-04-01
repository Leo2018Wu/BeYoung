"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
var native_base_1 = require("native-base");
var CaseItem_1 = require("./CaseItem");
var Login = function () {
    var _a = react_1.useState([
        { id: 0 },
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
    ]), list = _a[0], setList = _a[1];
    return (react_1["default"].createElement(native_base_1.View, { style: { padding: 8 } },
        react_1["default"].createElement(native_base_1.FlatList, { contentContainerStyle: styles.main, data: list, onEndReachedThreshold: 0.1, showsVerticalScrollIndicator: false, renderItem: function (_a) {
                var item = _a.item;
                return react_1["default"].createElement(CaseItem_1["default"], { item: item });
            }, keyExtractor: function (item) { return item.id; } })));
};
exports["default"] = Login;
var styles = react_native_1.StyleSheet.create({
    main: {
        padding: 0,
        justifyContent: 'space-between',
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
});
