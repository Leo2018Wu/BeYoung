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
var react_1 = require("react");
var react_native_1 = require("react-native");
var native_base_1 = require("native-base");
var react_native_safe_area_context_1 = require("react-native-safe-area-context");
var AntDesign_1 = require("react-native-vector-icons/AntDesign");
var CFastImage_1 = require("../../components/CFastImage");
var react_native_linear_gradient_1 = require("react-native-linear-gradient");
var openPicker_1 = require("../../util/openPicker");
var upload_1 = require("../../util/upload");
var daily_1 = require("../../api/daily");
var useRequest_1 = require("../../hooks/useRequest");
var Index = function (props) {
    var navigation = props.navigation;
    var insets = react_native_safe_area_context_1.useSafeAreaInsets();
    var _a = react_1.useState(''), textAreaValue = _a[0], setTextAreaValue = _a[1];
    var _b = react_1.useState([]), list = _b[0], setList = _b[1];
    var _c = useRequest_1["default"](daily_1.addDynamic.url), runAddDynamic = _c.run, result = _c.result;
    var _d = react_1.useState(false), loading = _d[0], setLoading = _d[1];
    react_1.useEffect(function () {
        console.log('result', result);
        if (result) {
            setLoading(false);
            setTextAreaValue('');
            setList([]);
            navigation.navigate('Home');
        }
    }, [result]);
    var chooseImg = function () { return __awaiter(void 0, void 0, void 0, function () {
        var images, currentLength, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, openPicker_1.openPicker(9 - list.length)];
                case 1:
                    images = _a.sent();
                    currentLength = images.length + list.length;
                    if (currentLength > 9) {
                        images.length = 9 - list.length;
                    }
                    images.forEach(function (item) {
                        list.push(item.path);
                    });
                    setList(JSON.parse(JSON.stringify(list)));
                    console.log('--list--', list);
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    console.log('--err--', err_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var checkSubmit = function () {
        try {
            var filterUploadFiles = list.filter(function (item) { return item.substr(0, 3) !== 'img'; });
            setLoading(true);
            if (filterUploadFiles.length > 0) {
                uploadDynamic(filterUploadFiles);
            }
            else {
                runAddDynamic({
                    content: textAreaValue
                });
            }
        }
        catch (err) { }
    };
    var uploadDynamic = function (files) {
        multiUpload(files).then(function (res) {
            var filterFiles = list.filter(function (item) { return item.substr(0, 3) === 'img'; });
            var arr = filterFiles.concat(res);
            runAddDynamic({
                content: textAreaValue,
                images: arr
            });
        });
    };
    var multiUpload = function (files) {
        if (files.length <= 0) {
            return Promise.resolve([]);
        }
        return new Promise(function (reslove, reject) {
            var arr = [];
            files.forEach(function (item, index) {
                upload_1.upload(item)
                    .then(function (res) {
                    arr.push(res);
                    if (arr.length == files.length) {
                        reslove(arr);
                    }
                })["catch"](function () {
                    reject(new Errow('上传失败'));
                });
            });
        });
    };
    return (react_1["default"].createElement(native_base_1.Box, { flex: 1 },
        react_1["default"].createElement(react_native_1.StatusBar, { backgroundColor: "transparent", translucent: true }),
        react_1["default"].createElement(native_base_1.Box, { justifyContent: "center", style: styles.banner },
            react_1["default"].createElement(react_native_linear_gradient_1["default"], { start: { x: 0, y: 0 }, end: { x: 0, y: 1 }, colors: ['#D988FF', '#8B5CFF'] },
                react_1["default"].createElement(native_base_1.Center, { px: 3, h: 24, alignItems: "center" },
                    react_1["default"].createElement(native_base_1.Text, { color: '#fff', fontSize: 'xl', paddingTop: 5 }, "\u53D1\u5E16"),
                    react_1["default"].createElement(native_base_1.Pressable, { onPress: function () { return checkSubmit(); }, style: { position: 'absolute', right: 10, top: 48 } },
                        react_1["default"].createElement(native_base_1.Text, { color: '#fff' }, "\u53D1\u9001"))))),
        react_1["default"].createElement(react_native_1.Modal, { animationType: "fade", transparent: true, visible: loading },
            react_1["default"].createElement(native_base_1.View, { style: styles.toastViewer },
                react_1["default"].createElement(native_base_1.View, { style: styles.iconView },
                    react_1["default"].createElement(react_native_1.ActivityIndicator, { size: "large", color: '#fff' })),
                react_1["default"].createElement(native_base_1.Text, { style: styles.toastText }, "\u6B63\u5728\u4E0A\u4F20..."))),
        react_1["default"].createElement(native_base_1.Box, { my: 0, px: 4, bg: "white" },
            react_1["default"].createElement(react_native_1.TextInput, { style: {
                    minHeight: 100,
                    textAlignVertical: 'top',
                    paddingBottom: 20,
                    paddingTop: 0,
                    marginBottom: 20
                }, multiline: true, onChangeText: function (text) { return setTextAreaValue(text); }, value: textAreaValue }),
            react_1["default"].createElement(native_base_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 30 } },
                list &&
                    list.map(function (item, index) {
                        return (react_1["default"].createElement(native_base_1.View, { style: { flexDirection: 'row' } },
                            react_1["default"].createElement(CFastImage_1["default"], { url: item, styles: {
                                    width: 60,
                                    height: 60,
                                    margin: 8
                                } }),
                            react_1["default"].createElement(native_base_1.Pressable, { style: {
                                    width: 14,
                                    height: 14,
                                    position: 'absolute',
                                    right: 0,
                                    top: 0
                                }, onPress: function () {
                                    if (index != 0) {
                                        setList(list.splice(index, 1));
                                    }
                                    else {
                                        setList([]);
                                    }
                                } },
                                react_1["default"].createElement(AntDesign_1["default"], { name: "closecircle", size: 14, color: "#B2B2B2" }))));
                    }),
                react_1["default"].createElement(native_base_1.Pressable, { onPress: function () {
                        chooseImg();
                    }, style: styles.img_item },
                    react_1["default"].createElement(react_native_1.Image, { source: require('../assets/album_add_icon.png'), style: {
                            width: 60,
                            height: 60
                        }, resizeMode: "cover" }))))));
};
exports["default"] = Index;
var styles = react_native_1.StyleSheet.create({
    banner: __assign({}, react_native_1.Platform.select({
        ios: {
            paddingTop: 28 + 40
        },
        android: {
        // paddingTop: layout.STATUSBAR_HEIGHT + 0,
        }
    })),
    img_item: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 8
    },
    toastViewer: {
        width: 120,
        minHeight: 120,
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginLeft: -60,
        marginTop: -60,
        borderRadius: 10,
        backgroundColor: 'rgba(0,0,0,0.8)'
    },
    iconView: {
        flex: 0.7,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    toastText: {
        flex: 0.3,
        textAlign: 'center',
        color: '#fff',
        fontSize: 14
    }
});
