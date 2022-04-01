"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
var native_base_1 = require("native-base");
var DynamicItem_1 = require("./DynamicItem");
var dynamic_1 = require("../../api/dynamic");
var useRequest_1 = require("../../../hooks/useRequest");
var Login = function () {
    var _a = react_1.useState(false), showLoading = _a[0], setLoading = _a[1];
    var _b = react_1.useState([]), listData = _b[0], setList = _b[1];
    var _c = react_1.useState(null), total = _c[0], setTotal = _c[1];
    var _d = react_1.useState({
        pageNum: 1,
        pageSize: 10,
        orders: [
            {
                column: 'createTime',
                dir: 'desc',
                chinese: false
            },
        ]
    }), params = _d[0], setParams = _d[1];
    var _e = useRequest_1["default"](dynamic_1.queryMyDynamic.url, params), runQueryMyDynamic = _e.run, result = _e.result;
    // useFocusEffect(
    //   React.useCallback(() => {
    //     runQueryMyDynamic();
    //   }, [runQueryMyDynamic]),
    // );
    react_1.useEffect(function () {
        runQueryMyDynamic();
        if (result) {
            setList(result);
            console.log('--result--', result);
        }
    }, []);
    return (react_1["default"].createElement(native_base_1.View, null,
        react_1["default"].createElement(native_base_1.FlatList, { contentContainerStyle: styles.main, data: listData, onEndReachedThreshold: 0.1, showsVerticalScrollIndicator: false, renderItem: function (_a) {
                var item = _a.item;
                return react_1["default"].createElement(DynamicItem_1["default"], { item: item });
            }, keyExtractor: function (item) { return item.id; } })));
};
exports["default"] = Login;
var styles = react_native_1.StyleSheet.create({
    main: {}
});
