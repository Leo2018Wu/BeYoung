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
var native_base_1 = require("native-base");
var AntDesign_1 = require("react-native-vector-icons/AntDesign");
var react_native_1 = require("react-native");
var native_1 = require("@react-navigation/native");
var config_1 = require("../../util/config");
var Storage_1 = require("../../util/Storage");
var CFastImage_1 = require("../../components/CFastImage");
var Index = function (_a) {
    var props = __rest(_a, []);
    console.log('--props--', props);
    var navigation = native_1.useNavigation();
    var item = props.item;
    var _b = react_1.useState([]), imgList = _b[0], setImgList = _b[1];
    var width = react_native_1.useWindowDimensions().width;
    var IMG_ITEM_WIDTH = (width - 104) / 3;
    var IMG_ITEM_HEIGHT = IMG_ITEM_WIDTH;
    var _c = react_1.useState('MALE_LOGIN'), isBoss = _c[0], setIsBoss = _c[1];
    react_1.useEffect(function () { return __awaiter(void 0, void 0, void 0, function () {
        var boss;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Storage_1["default"](['LOGIN_NAVIGAITON_NAME'])];
                case 1:
                    boss = _a.sent();
                    setIsBoss(boss);
                    if (item.images && JSON.parse(item.images).length) {
                        setImgList(JSON.parse(item.images));
                    }
                    return [2 /*return*/];
            }
        });
    }); }, []);
    return (react_1["default"].createElement(native_base_1.Box, { bg: "white", marginBottom: 10 },
        react_1["default"].createElement(react_native_1.Pressable, { onPress: function () {
                navigation.navigate('DailyDetail', { item: item });
            } },
            react_1["default"].createElement(native_base_1.HStack, { alignItems: "center" },
                react_1["default"].createElement(CFastImage_1["default"], { url: item.headImg, styles: { width: 50, height: 50, borderRadius: 50 } }),
                react_1["default"].createElement(native_base_1.VStack, { flex: 1, mr: 'auto', ml: 2, justifyContent: 'space-around' },
                    react_1["default"].createElement(native_base_1.Text, { fontSize: 'sm', style: {
                            color: '#8E8895'
                        } }, item.nickName),
                    react_1["default"].createElement(native_base_1.Text, { fontSize: 'xs', style: {
                            color: '#C7C4CC'
                        } }, item.createTime)),
                isBoss == 'MALE_LOGIN' ? (react_1["default"].createElement(native_base_1.Button, { disabled: true, py: 1, borderRadius: 'full', borderColor: "#9650FF", borderWidth: 0.5, bg: 'transparent' },
                    react_1["default"].createElement(native_base_1.Text, { fontSize: 'xs', color: 'primary.100' }, "\u5173\u6CE8"))) : null),
            react_1["default"].createElement(native_base_1.View, { style: {
                    marginLeft: 56
                }, pt: 4 },
                react_1["default"].createElement(native_base_1.HStack, { mb: 2, flexWrap: 'wrap' }, imgList &&
                    imgList.map(function (item, index) { return (react_1["default"].createElement(native_base_1.Image, { key: index, mb: 2, alt: "dairy", borderRadius: 10, style: {
                            marginRight: (index + 1) % 3 === 0 ? 0 : 8,
                            width: IMG_ITEM_WIDTH,
                            height: IMG_ITEM_HEIGHT
                        }, source: { uri: config_1.BASE_DOWN_URL + item } })); })),
                react_1["default"].createElement(native_base_1.Text, { numberOfLines: 3, fontSize: 'sm', color: 'fontColors._72' }, item.content)),
            react_1["default"].createElement(native_base_1.Stack, { space: 2, pt: 2, style: {
                    marginLeft: 56
                }, direction: 'row', alignItems: 'center' },
                react_1["default"].createElement(native_base_1.HStack, { mr: 'auto', alignItems: 'center' },
                    react_1["default"].createElement(native_base_1.Text, { fontSize: 'xs', style: { color: '#C7C4CC' } }, "\u8BC4\u5206"),
                    react_1["default"].createElement(native_base_1.Text, { fontSize: 'xs', style: { color: '#C7C4CC' } }, item.score)),
                react_1["default"].createElement(native_base_1.HStack, { alignItems: 'center' },
                    react_1["default"].createElement(AntDesign_1["default"], { name: "hearto", size: 18, color: false ? '#9650FF' : '#C7C4CC' }),
                    react_1["default"].createElement(native_base_1.Text, { ml: 1, fontSize: 'xs', style: { color: '#C7C4CC' } }, item.likeNum)),
                react_1["default"].createElement(native_base_1.HStack, { alignItems: 'center' },
                    react_1["default"].createElement(AntDesign_1["default"], { name: "message1", size: 18, color: "#C7C4CC" }),
                    react_1["default"].createElement(native_base_1.Text, { ml: 1, fontSize: 'xs', style: { color: '#C7C4CC' } }, item.commentNum)),
                react_1["default"].createElement(native_base_1.HStack, { alignItems: 'center' },
                    react_1["default"].createElement(AntDesign_1["default"], { name: "gift", size: 18, color: "#C7C4CC" }),
                    react_1["default"].createElement(native_base_1.Text, { ml: 1, fontSize: 'xs', style: { color: '#C7C4CC' } }, item.giftNum))))));
};
exports["default"] = Index;
