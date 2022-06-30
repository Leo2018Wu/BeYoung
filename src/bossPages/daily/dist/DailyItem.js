"use strict";
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
var react_1 = require("react");
var native_base_1 = require("native-base");
var CFastImage_1 = require("../../components/CFastImage");
var AntDesign_1 = require("react-native-vector-icons/AntDesign");
var daily_1 = require("../../api/daily");
var react_native_1 = require("react-native");
var native_1 = require("@react-navigation/native");
var config_1 = require("../../util/config");
var useRequest_1 = require("../../hooks/useRequest");
var genImages = function (imgs) {
    if (!imgs) {
        return [];
    }
    else {
        return JSON.parse(imgs);
    }
};
var isEqual = function (pre, next) {
    // 优化无关渲染
    // JSON.stringify(pre.item) === JSON.stringify(next.item);
    return (pre.item.score === next.item.score &&
        pre.item.liked === next.item.liked &&
        pre.item.likeNum === next.item.likeNum &&
        pre.item.commentNum === next.item.commentNum &&
        pre.item.giftNum === next.item.giftNum &&
        pre.item.collectNum === next.item.collectNum &&
        pre.item.collected === next.item.collected);
};
var Index = function (_a) {
    var item = _a.item, returnFunc = _a.returnFunc;
    var runLikeDynamic = useRequest_1["default"](daily_1.likeDynamic.url).run;
    var runCollectDynamic = useRequest_1["default"](daily_1.collectDynamic.url).run;
    var navigation = native_1.useNavigation();
    var width = react_native_1.useWindowDimensions().width;
    var IMG_ITEM_WIDTH = (width - 104) / 3;
    var IMG_ITEM_HEIGHT = IMG_ITEM_WIDTH;
    var preview = function (index) {
        var imgUrls = genImages(item.images).map(function (img) {
            var temp = { url: "" + (config_1.BASE_DOWN_URL + img) };
            return temp;
        });
        navigation.navigate('Preview', { index: index, imgUrls: imgUrls });
    };
    var likeClick = function (_a) {
        var id = _a.id, liked = _a.liked;
        return __awaiter(void 0, void 0, void 0, function () {
            var _b, success, data, error_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, runLikeDynamic({
                                dynamicId: id,
                                cancel: liked
                            })];
                    case 1:
                        _b = _c.sent(), success = _b.success, data = _b.data;
                        if (success) {
                            returnFunc && returnFunc(data);
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _c.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    var collectClick = function (_a) {
        var id = _a.id, collected = _a.collected;
        return __awaiter(void 0, void 0, void 0, function () {
            var _b, success, data, error_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, runCollectDynamic({
                                dynamicId: id,
                                cancel: collected
                            })];
                    case 1:
                        _b = _c.sent(), success = _b.success, data = _b.data;
                        if (success) {
                            returnFunc && returnFunc(data);
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _c.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return (react_1["default"].createElement(native_base_1.Box, { bg: "white" },
        react_1["default"].createElement(native_base_1.Pressable, { onPress: function () {
                navigation.navigate('DailyDetail', { item: item });
            } },
            react_1["default"].createElement(native_base_1.HStack, { alignItems: "center" },
                react_1["default"].createElement(native_base_1.Pressable, { onPress: function () {
                        return navigation.navigate('HomeDetail', { userId: item.userId });
                    } },
                    react_1["default"].createElement(CFastImage_1["default"], { url: item.headImg, styles: {
                            width: 48,
                            height: 48,
                            borderRadius: 24
                        } })),
                react_1["default"].createElement(native_base_1.VStack, { flex: 1, mr: 'auto', ml: 2, justifyContent: 'space-around' },
                    react_1["default"].createElement(native_base_1.Text, { fontSize: 'lg', style: {
                            color: '#8E8895'
                        } }, item.nickName || '青回'),
                    react_1["default"].createElement(native_base_1.Text, { fontSize: 'xs', style: {
                            color: '#C7C4CC'
                        } }, item.createTime)),
                react_1["default"].createElement(native_base_1.Text, { style: { color: '#FF6035', marginTop: 4, marginLeft: 4 } }, "223")),
            react_1["default"].createElement(native_base_1.View, { style: {
                    marginLeft: 56
                }, pt: 4 },
                react_1["default"].createElement(native_base_1.HStack, { mb: 2, flexWrap: 'wrap' }, genImages(item.images).map(function (ele, index) { return (react_1["default"].createElement(native_base_1.Pressable, { onPress: function () { return preview(index); }, key: index },
                    react_1["default"].createElement(CFastImage_1["default"], { url: ele, styles: {
                            marginRight: (index + 1) % 3 === 0 ? 0 : 8,
                            width: IMG_ITEM_WIDTH,
                            height: IMG_ITEM_HEIGHT,
                            borderRadius: 8,
                            marginBottom: 8
                        } }))); })),
                react_1["default"].createElement(native_base_1.Text, { numberOfLines: 3, fontSize: 'md', color: 'fontColors._72' }, item.content)),
            react_1["default"].createElement(native_base_1.Stack, { space: 2, pt: 2, style: {
                    marginLeft: 56
                }, direction: 'row', alignItems: 'center' },
                react_1["default"].createElement(native_base_1.Pressable, { onPress: function () { return collectClick(item); }, flexDirection: 'row', alignItems: 'center' },
                    item.collected ? (react_1["default"].createElement(AntDesign_1["default"], { name: "star", size: 18, color: "#FDE220" })) : (react_1["default"].createElement(AntDesign_1["default"], { name: "staro", size: 18, color: "#C7C4CC" })),
                    react_1["default"].createElement(native_base_1.Text, { ml: 1, fontSize: 'xs', style: { color: '#C7C4CC' } }, item.collectNum)),
                react_1["default"].createElement(native_base_1.Pressable, { onPress: function () { return likeClick(item); }, flexDirection: 'row', alignItems: 'center' },
                    item.liked ? (react_1["default"].createElement(AntDesign_1["default"], { name: "heart", size: 18, color: "#9650FF" })) : (react_1["default"].createElement(AntDesign_1["default"], { name: "hearto", size: 18, color: "#C7C4CC" })),
                    react_1["default"].createElement(native_base_1.Text, { ml: 1, fontSize: 'xs', style: { color: '#C7C4CC' } }, item.likeNum)),
                react_1["default"].createElement(native_base_1.HStack, { alignItems: 'center' },
                    react_1["default"].createElement(AntDesign_1["default"], { name: "message1", size: 18, color: "#C7C4CC" }),
                    react_1["default"].createElement(native_base_1.Text, { ml: 1, fontSize: 'xs', style: { color: '#C7C4CC' } }, item.commentNum)),
                react_1["default"].createElement(native_base_1.HStack, { alignItems: 'center' },
                    react_1["default"].createElement(AntDesign_1["default"], { name: "gift", size: 18, color: "#C7C4CC" }),
                    react_1["default"].createElement(native_base_1.Text, { ml: 1, fontSize: 'xs', style: { color: '#C7C4CC' } }, item.giftNum))))));
};
exports["default"] = react_1["default"].memo(Index, isEqual);
