"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
/* eslint-disable react-hooks/exhaustive-deps */
var react_1 = require("react");
var native_base_1 = require("native-base");
var useRequest_1 = require("../hooks/useRequest");
var native_1 = require("@react-navigation/native");
var Pagination_1 = require("./base/Pagination");
var PAGE_IS_LOADING = Pagination_1.pageConstant.PAGE_IS_LOADING, PAGE_IS_NEXTPAGE = Pagination_1.pageConstant.PAGE_IS_NEXTPAGE, PAGE_IS_END = Pagination_1.pageConstant.PAGE_IS_END, IS_EMPTY = Pagination_1.pageConstant.IS_EMPTY, IS_LOADDING = Pagination_1.pageConstant.IS_LOADDING, IS_NET_ERROR = Pagination_1.pageConstant.IS_NET_ERROR, IS_LIST = Pagination_1.pageConstant.IS_LIST;
var mergeList = function (sourceList, nowList) {
    if (sourceList) {
        nowList = sourceList.concat(nowList);
        return nowList;
    }
    return nowList;
};
var Index = function (_a) {
    var url = _a.url, par = _a.par, renderItem = _a.renderItem, horizontal = _a.horizontal, numColumns = _a.numColumns;
    var _b = react_1.useState(Object.assign({
        pageNum: 1,
        pageSize: 10,
        orders: [
            {
                column: 'createTime',
                dir: 'desc',
                chinese: false
            },
        ]
    }, par)), params = _b[0], setParams = _b[1];
    var _c = react_1.useState([]), queryList = _c[0], setList = _c[1]; // 动态列表
    var _d = react_1.useState(IS_LOADDING), pageStatus = _d[0], setPageStatus = _d[1]; // 页面状态
    var _e = react_1.useState(''), pagingStatus = _e[0], setPagingStatus = _e[1]; // 分页状态
    var runGetList = useRequest_1["default"](url).run;
    native_1.useFocusEffect(react_1["default"].useCallback(function () {
        _getList();
    }, [params]));
    var _getList = function () { return __awaiter(void 0, void 0, void 0, function () {
        var data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, runGetList(params)];
                case 1:
                    data = _a.sent();
                    _dealData(data);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    // 错误信息 比如网络错误
                    setPagingStatus(IS_NET_ERROR);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    // 处理页面数据及状态
    var _dealData = function (response) {
        var data = response.data, total = response.total;
        if (parseInt(total, 10) === 0) {
            setPageStatus(IS_EMPTY);
            return;
        }
        if (data instanceof Array) {
            var isNextPage = data.length < total - queryList.length;
            setPagingStatus(isNextPage ? PAGE_IS_NEXTPAGE : PAGE_IS_END);
            setPageStatus(IS_LIST);
            setList(params.pageNum <= 1 ? data : mergeList(queryList, data));
        }
    };
    var _onRefresh = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            setPageStatus(IS_LOADDING);
            setParams(__assign(__assign({}, params), { pageNum: 1 })); //改变param自动刷新数据
            return [2 /*return*/];
        });
    }); };
    var _loadMore = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            setParams(__assign(__assign({}, params), { pageNum: ++params.pageNum }));
            return [2 /*return*/];
        });
    }); };
    var _onEndReached = function () {
        if (pagingStatus === PAGE_IS_NEXTPAGE) {
            _loadMore();
        }
    };
    var renderFooter = function () {
        switch (pagingStatus) {
            case PAGE_IS_LOADING:
                return react_1["default"].createElement(Pagination_1.PageLoading, null);
            case PAGE_IS_NEXTPAGE:
                return react_1["default"].createElement(Pagination_1.PageLoadMore, null);
            case PAGE_IS_END:
                return react_1["default"].createElement(Pagination_1.PageLoadAll, null);
            default:
                return null;
        }
    };
    var renderList = function () {
        return (react_1["default"].createElement(native_base_1.FlatList, { horizontal: horizontal, numColumns: numColumns, removeClippedSubviews: true, showsVerticalScrollIndicator: false, onRefresh: function () { return _onRefresh(); }, data: queryList, refreshing: pageStatus === IS_LOADDING, renderItem: renderItem, ListFooterComponent: renderFooter(), keyExtractor: function (item, index) { return "key" + index; }, onEndReached: function () { return _onEndReached(); }, onEndReachedThreshold: 0.01 }));
    };
    return (react_1["default"].createElement(native_base_1.Box, { flex: 1 },
        pageStatus === IS_EMPTY && react_1["default"].createElement(Pagination_1.PageEmpty, null),
        pageStatus === IS_LIST && renderList(),
        pageStatus === IS_LOADDING && react_1["default"].createElement(Pagination_1.PageLoading, null),
        pageStatus === IS_NET_ERROR && react_1["default"].createElement(Pagination_1.PageError, null)));
};
exports["default"] = Index;
