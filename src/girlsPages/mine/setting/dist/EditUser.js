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
var react_native_safe_area_context_1 = require("react-native-safe-area-context");
var common_1 = require("../../../api/common");
var useRequest_1 = require("../../../hooks/useRequest");
var Index = function (_a) {
    var props = __rest(_a, []);
    var params = props.route.params;
    var insets = react_native_safe_area_context_1.useSafeAreaInsets();
    var _b = react_1.useState(''), editType = _b[0], setType = _b[1];
    var _c = react_1.useState(params.value), inputValue = _c[0], setValue = _c[1];
    var _d = react_1.useState(false), changeStatus = _d[0], setStatus = _d[1];
    var run = useRequest_1["default"](common_1.updateUserInfo.url).run;
    react_1.useEffect(function () {
        setType(params.type);
    }, []);
    react_1.useEffect(function () {
        setStatus(inputValue !== params.value);
    }, [inputValue]);
    var edit = function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = params.type;
                    switch (_a) {
                        case '昵称': return [3 /*break*/, 1];
                        case '微信号': return [3 /*break*/, 3];
                        case 'QQ号': return [3 /*break*/, 5];
                    }
                    return [3 /*break*/, 7];
                case 1: return [4 /*yield*/, run({ nickName: inputValue })];
                case 2:
                    _b.sent();
                    return [3 /*break*/, 8];
                case 3: return [4 /*yield*/, run({ weChat: inputValue })];
                case 4:
                    _b.sent();
                    return [3 /*break*/, 8];
                case 5: return [4 /*yield*/, run({ qq: inputValue })];
                case 6:
                    _b.sent();
                    return [3 /*break*/, 8];
                case 7: return [3 /*break*/, 8];
                case 8:
                    props.navigation.goBack();
                    return [2 /*return*/];
            }
        });
    }); };
    return (react_1["default"].createElement(native_base_1.Box, { flex: 1 },
        react_1["default"].createElement(native_base_1.HStack, { h: 20, alignItems: 'center', justifyContent: 'center', style: { paddingTop: insets.top } },
            react_1["default"].createElement(native_base_1.Text, { fontSize: 'md', fontWeight: "bold" },
                "\u7F16\u8F91",
                editType),
            changeStatus && (react_1["default"].createElement(native_base_1.Button, { onPress: function () { return edit(); }, w: 16, h: 8, style: {
                    backgroundColor: '#9650FF',
                    position: 'absolute',
                    right: 16,
                    top: '25%',
                    transform: [
                        {
                            translateY: 28
                        },
                    ]
                } },
                react_1["default"].createElement(native_base_1.Text, { fontWeight: 'bold', color: 'white', fontSize: "sm", lineHeight: 16 }, "\u5B8C\u6210")))),
        editType === '昵称' && (react_1["default"].createElement(native_base_1.HStack, { px: 4, alignItems: 'center', h: 16 },
            react_1["default"].createElement(native_base_1.Text, { fontWeight: 'bold', fontSize: 'md' }, "\u6635\u79F0\uFF1A"),
            react_1["default"].createElement(native_base_1.Input, { clearButtonMode: "while-editing", onChangeText: function (e) { return setValue(e); }, flex: 1, maxLength: 13, fontSize: 'md', value: inputValue, placeholder: "\u8BF7\u8F93\u5165\u6635\u79F0" }))),
        editType === '微信号' && (react_1["default"].createElement(native_base_1.HStack, { px: 4, alignItems: 'center', h: 16 },
            react_1["default"].createElement(native_base_1.Text, { fontWeight: 'bold', fontSize: 'md' }, "\u5FAE\u4FE1\u53F7\uFF1A"),
            react_1["default"].createElement(native_base_1.Input, { clearButtonMode: "while-editing", onChangeText: function (e) { return setValue(e); }, keyboardType: "phone-pad", flex: 1, fontSize: 'md', value: inputValue, placeholder: "\u8BF7\u8F93\u5165\u5FAE\u4FE1\u53F7" }))),
        editType === 'QQ号' && (react_1["default"].createElement(native_base_1.HStack, { px: 4, alignItems: 'center', h: 16 },
            react_1["default"].createElement(native_base_1.Text, { fontWeight: 'bold', fontSize: 'md' }, "QQ\u53F7\uFF1A"),
            react_1["default"].createElement(native_base_1.Input, { clearButtonMode: "while-editing", onChangeText: function (e) { return setValue(e); }, keyboardType: "phone-pad", flex: 1, fontSize: 'md', value: inputValue, placeholder: "\u8BF7\u8F93\u5165QQ\u53F7" })))));
};
exports["default"] = Index;
