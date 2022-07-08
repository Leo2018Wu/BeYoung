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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
var native_base_1 = require("native-base");
var react_native_safe_area_context_1 = require("react-native-safe-area-context");
var AntDesign_1 = require("react-native-vector-icons/AntDesign");
var FontAwesome_1 = require("react-native-vector-icons/FontAwesome");
var CFastImage_1 = require("../../components/CFastImage");
var react_native_linear_gradient_1 = require("react-native-linear-gradient");
var openPicker_1 = require("../../util/openPicker");
var cameraPhoto_1 = require("../../util/cameraPhoto");
var newUploadOSS_1 = require("../../util/newUploadOSS");
var daily_1 = require("../../api/daily");
var useRequest_1 = require("../../hooks/useRequest");
var util_1 = require("../../util/util");
var Layout_1 = require("../../components/Layout");
var Index = function (props) {
    var navigation = props.navigation;
    var toast = native_base_1.useToast();
    var insets = react_native_safe_area_context_1.useSafeAreaInsets();
    var _a = react_1.useState(''), textAreaValue = _a[0], setTextAreaValue = _a[1];
    var _b = react_1.useState([]), list = _b[0], setList = _b[1];
    var _c = useRequest_1["default"](daily_1.addDynamic.url), runAddDynamic = _c.run, result = _c.result;
    var runFetchDynamicLabels = useRequest_1["default"](daily_1.fetchDynamicLabels.url).run;
    var _d = react_1.useState(false), loading = _d[0], setLoading = _d[1];
    var _e = native_base_1.useDisclose(), isOpen = _e.isOpen, onOpen = _e.onOpen, onClose = _e.onClose;
    var _f = react_1.useState(false), labelFlag = _f[0], setLabelFLag = _f[1];
    var _g = react_1.useState([]), tipsClassList = _g[0], setTipsClassList = _g[1];
    var _h = react_1.useState(0), actIndex = _h[0], setActIndex = _h[1];
    var _j = react_1.useState(0), atvedIndex = _j[0], setAtvedIndex = _j[1];
    var _k = react_1.useState(''), labelType = _k[0], setLabelType = _k[1];
    var _l = react_1.useState(''), labelDetail = _l[0], setLabelDetail = _l[1];
    var _m = react_1.useState(false), tipsFlag = _m[0], setTipsFlag = _m[1];
    react_1.useEffect(function () {
        if (result) {
            setLoading(false);
            setTextAreaValue('');
            setList([]);
            setLabelType('');
            setLabelDetail('');
            navigation.navigate('Home');
        }
    }, [result]);
    var getDynamicLabels = function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, data, success;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, runFetchDynamicLabels()];
                case 1:
                    _a = _b.sent(), data = _a.data, success = _a.success;
                    if (success) {
                        setTipsClassList(data);
                        setLabelType(data[0].name);
                    }
                    return [2 /*return*/];
            }
        });
    }); };
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
                    onClose();
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
        if (!labelDetail) {
            toast.show({
                description: '请添加标签',
                placement: 'top',
                duration: 1000
            });
            return;
        }
        try {
            if (list && list.length) {
                var filterUploadFiles = list.filter(function (item) { return item.substr(0, 3) !== 'img'; });
                setLoading(true);
                if (filterUploadFiles.length > 0) {
                    uploadDynamic(filterUploadFiles);
                }
            }
            else if (textAreaValue) {
                runAddDynamic({
                    content: textAreaValue,
                    labelType: labelType,
                    labelDetail: labelDetail
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
                images: arr,
                labelType: labelType,
                labelDetail: labelDetail
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
                newUploadOSS_1.upload({ path: item })
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
    var cameraPhoto = function () { return __awaiter(void 0, void 0, void 0, function () {
        var path, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, cameraPhoto_1.openCamera()];
                case 1:
                    path = (_a.sent()).path;
                    list.push(path);
                    setList(JSON.parse(JSON.stringify(list)));
                    onClose();
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error(error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    return (react_1["default"].createElement(native_base_1.Box, { flex: 1 },
        react_1["default"].createElement(react_native_1.StatusBar, { backgroundColor: "transparent", translucent: true }),
        react_1["default"].createElement(native_base_1.Modal, { isOpen: tipsFlag, onClose: function () {
                setTipsFlag(false);
            } },
            react_1["default"].createElement(native_base_1.Modal.Content, { style: { width: '90%' } },
                react_1["default"].createElement(native_base_1.Modal.Body, null,
                    react_1["default"].createElement(native_base_1.Text, { color: '#404040', fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 2 }, "\u5B66\u59B9\u5708\u53D1\u5E03\u5185\u5BB9\u89C4\u5219"),
                    react_1["default"].createElement(native_base_1.Text, null, "\u4FE1\u606F\u53D1\u5E03\u89C4\u5219\u9002\u7528\u4E8E\u5728\u9752\u56DE\u5E73\u53F0\u4E0A\u53D1\u5E03\u4FE1\u606F\u7684\u6240\u6709\u7528\u6237\uFF0C\u7528\u6237\u9700\u9075\u5B88\u8BE5\u89C4\u5219\u53D1\u5E03\u4FE1\u606F\u5185\u5BB9\u3002"),
                    react_1["default"].createElement(native_base_1.Text, { fontWeight: 'bold' }, "\u4E00\u3001\u53D1\u5E03\u6587\u6848\u89C4\u5219"),
                    react_1["default"].createElement(native_base_1.Text, null, "1.\u4E0D\u5F97\u5728\u6587\u6848\u4E2D\u53D1\u5E03\u5E7F\u544A"),
                    react_1["default"].createElement(native_base_1.Text, null, "2.\u4E0D\u5F97\u5728\u6587\u6848\u4E2D\u4F7F\u7528\u591A\u97F3\u5B57\u3001\u7247\u5047\u5B57\u3001\u62C6\u5206\u5B57\u6216\u5916\u8BED\u7B49\u6765\u8868\u8FBE\u9EC4\u8D4C\u6BD2\u53CA\u653F\u6CBB"),
                    react_1["default"].createElement(native_base_1.Text, null, "3.\u4E0D\u5F97\u5728\u6587\u6848\u4E2D\u6076\u610F\u7092\u4F5C\u8D1F\u9762\u4FE1\u606F\u3001\u8FB1\u9A82\u4ED6\u4EBA\u53CA\u62B1\u6028\u3001\u8BA8\u8BBA\u654F\u611F\u793E\u4F1A\u4E8B\u4EF6"),
                    react_1["default"].createElement(native_base_1.Text, null, "4.\u4E0D\u5F97\u5728\u6587\u6848\u4E2D\u51FA\u73B0\u4E2A\u4EBA\u4FE1\u606F\u5FAE\u4FE1\u53F7\u3001QQ\u53F7\u3001\u624B\u673A\u53F7\u53CA\u4E00\u5207\u5176\u4ED6\u793E\u4EA4\u5E73\u53F0\u8F6F\u4EF6\u8D26\u53F7\u4E14\u4E0D\u80FD\u4EE5\u5176\u4ED6\u5982\u82F1\u6587\u3001\u591A\u97F3\u5B57\u7B49\u5176\u4ED6\u5F62\u5F0F\u8FDB\u884C\u53D1\u9001"),
                    react_1["default"].createElement(native_base_1.Text, null, "5.\u4E0D\u5F97\u5728\u6587\u6848\u4E2D\u51FA\u73B0\u5F15\u6D41\u4FE1\u606F"),
                    react_1["default"].createElement(native_base_1.Text, { fontWeight: 'bold' }, "\u4E8C\u3001\u53D1\u5E03\u56FE\u7247\u89C4\u5219"),
                    react_1["default"].createElement(native_base_1.Text, null, "1.\u4E0D\u5F97\u5728\u7167\u7247\u4E2D\u53D1\u5E03\u5E7F\u544A"),
                    react_1["default"].createElement(native_base_1.Text, null, "2.\u4E0D\u5F97\u5728\u7167\u7247\u4E2D\u5C55\u73B0\u5176\u4ED6\u65B9\u5F0F\u7684\u5F15\u6D41\u624B\u6BB5"),
                    react_1["default"].createElement(native_base_1.Text, null, "3.\u4E0D\u5F97\u5728\u7167\u7247\u4E2D\u5C55\u793A\u5371\u9669\u884C\u4E3A\u53CA\u52A8\u4F5C"),
                    react_1["default"].createElement(native_base_1.Text, null, "4.\u4E0D\u5F97\u5728\u7167\u7247\u4E2D\u5C55\u793A\u60CA\u609A\u5947\u8469\u7C7B\u5185\u5BB9\uFF1A\u519B\u88C5\u3001\u4F4E\u4FD7\u5947\u8469\u670D\u88C5\u3001\u626E\u9B3C\u5413\u4EBA\u3001\u8840\u8165\u6050\u6016\u5986\u5BB9\u7B49"),
                    react_1["default"].createElement(native_base_1.Text, null, "5.\u4E0D\u5F97\u5728\u7167\u7247\u4E2D\u5C55\u793A\u5C01\u5EFA\u8FF7\u4FE1\u5185\u5BB9\uFF08\u7B97\u547D\u7B97\u5366\u3001\u8DF3\u5927\u795E\u7B49\uFF09"),
                    react_1["default"].createElement(native_base_1.Text, null, "6.\u4E0D\u5F97\u5728\u7167\u7247\u4E2D\u5C55\u73B0\u654F\u611F\u6216\u79C1\u5BC6\u90E8\u4F4D"),
                    react_1["default"].createElement(native_base_1.Text, null, "7.\u4E0D\u5F97\u5728\u7167\u7247\u4E2D\u51FA\u73B0\u975E\u6CD5\u573A\u666F\u53CA\u80CC\u666F")))),
        react_1["default"].createElement(native_base_1.Actionsheet, { hideDragIndicator: true, isOpen: isOpen, onClose: onClose },
            react_1["default"].createElement(native_base_1.Actionsheet.Content, null,
                react_1["default"].createElement(native_base_1.Actionsheet.Item, { onPress: function () { return cameraPhoto(); }, justifyContent: 'center' }, "\u62CD\u7167"),
                react_1["default"].createElement(native_base_1.Actionsheet.Item, { onPress: function () { return chooseImg(); }, justifyContent: 'center' }, "\u4ECE\u76F8\u518C\u9009\u62E9")),
            react_1["default"].createElement(native_base_1.Actionsheet.Footer, { mt: 2, borderRadius: 0, style: {
                    paddingBottom: insets.bottom
                } },
                react_1["default"].createElement(native_base_1.Actionsheet.Item, { onPress: function () { return onClose(); }, justifyContent: 'center' }, "\u53D6\u6D88"))),
        react_1["default"].createElement(native_base_1.Actionsheet, { hideDragIndicator: true, isOpen: labelFlag, onClose: function () { return setLabelFLag(false); } },
            react_1["default"].createElement(native_base_1.Actionsheet.Content, null,
                react_1["default"].createElement(native_base_1.Actionsheet.Item, { justifyContent: 'center' },
                    react_1["default"].createElement(native_base_1.Text, { fontSize: 16, color: "#232323" }, "\u9009\u62E9\u5185\u5BB9\u5206\u7C7B")),
                react_1["default"].createElement(native_base_1.Actionsheet.Item, { justifyContent: 'center' },
                    react_1["default"].createElement(native_base_1.View, { style: {
                            flexDirection: 'row',
                            width: Layout_1["default"].width,
                            height: Layout_1["default"].height / 3
                        } },
                        react_1["default"].createElement(native_base_1.ScrollView, { w: '50%', _contentContainerStyle: {
                                px: '0',
                                mb: '4'
                            } }, tipsClassList &&
                            tipsClassList.map(function (item, index) {
                                return (react_1["default"].createElement(native_base_1.Pressable, { onPress: function () {
                                        setActIndex(index);
                                        setAtvedIndex(0);
                                        setLabelType(item.name);
                                    }, style: [
                                        {
                                            paddingVertical: 12,
                                            width: '100%',
                                            alignItems: 'center'
                                        },
                                        actIndex == index
                                            ? { backgroundColor: '#fff' }
                                            : { backgroundColor: '#F3F3F3' },
                                    ] },
                                    react_1["default"].createElement(native_base_1.Text, null, item.name)));
                            })),
                        react_1["default"].createElement(native_base_1.ScrollView, { w: '50%', _contentContainerStyle: {
                                px: '0',
                                mb: '4'
                            } }, tipsClassList[actIndex] &&
                            tipsClassList[actIndex].subLabels.map(function (item, index) {
                                return (react_1["default"].createElement(native_base_1.Pressable, { onPress: function () {
                                        setAtvedIndex(index);
                                        setLabelFLag(false);
                                        setLabelDetail(item.name);
                                    }, style: {
                                        paddingVertical: 12,
                                        width: '100%',
                                        alignItems: 'center',
                                        backgroundColor: '#fff'
                                    } },
                                    react_1["default"].createElement(native_base_1.Text, { style: [
                                            atvedIndex == index
                                                ? { color: '#8B5CFF' }
                                                : { color: '#232323' },
                                        ] }, item.name)));
                            })))))),
        react_1["default"].createElement(native_base_1.Box, { justifyContent: "center", style: styles.banner },
            react_1["default"].createElement(react_native_linear_gradient_1["default"], { start: { x: 0, y: 0 }, end: { x: 0, y: 1 }, colors: ['#D988FF', '#8B5CFF'] },
                react_1["default"].createElement(native_base_1.HStack, { h: 20, alignItems: 'center', justifyContent: 'center', style: { paddingTop: insets.top } },
                    react_1["default"].createElement(native_base_1.Text, { fontSize: 'md', fontWeight: "bold", color: '#fff' }, "\u53D1\u8D34"),
                    react_1["default"].createElement(native_base_1.Text, { onPress: function () {
                            setTipsFlag(true);
                        }, fontWeight: 'bold', color: '#fff', fontSize: "sm", lineHeight: 16, style: {
                            position: 'absolute',
                            top: 50,
                            right: 16
                        } }, "\u89C4\u5219")))),
        react_1["default"].createElement(native_base_1.Modal, { isOpen: loading },
            react_1["default"].createElement(native_base_1.View, { style: styles.toastViewer },
                react_1["default"].createElement(native_base_1.View, { style: styles.iconView },
                    react_1["default"].createElement(react_native_1.ActivityIndicator, { size: "large", color: '#fff' })),
                react_1["default"].createElement(native_base_1.Text, { style: styles.toastText }, "\u6B63\u5728\u4E0A\u4F20..."))),
        react_1["default"].createElement(native_base_1.Box, { my: 0, px: 4, py: 4, bg: "white" },
            react_1["default"].createElement(react_native_1.TextInput, { style: {
                    minHeight: 100,
                    textAlignVertical: 'top',
                    paddingBottom: 20,
                    paddingTop: 0,
                    marginBottom: 20
                }, multiline: true, onChangeText: function (text) { return setTextAreaValue(text); }, value: textAreaValue, placeholder: "\u8BB0\u5F55\u751F\u6D3B\uFF0C\u5206\u4EAB\u7ED9\u61C2\u4F60\u7684\u4EBA" }),
            react_1["default"].createElement(native_base_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 30 } }, list &&
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
                                var newData = __spreadArrays(list);
                                newData.splice(index, 1);
                                setList(JSON.parse(JSON.stringify(newData)));
                            } },
                            react_1["default"].createElement(AntDesign_1["default"], { name: "closecircle", size: 14, color: "#B2B2B2" }))));
                })),
            react_1["default"].createElement(native_base_1.Pressable, { onPress: function () {
                    // chooseImg();
                    onOpen();
                }, style: styles.addImg },
                react_1["default"].createElement(FontAwesome_1["default"], { name: "image", size: 20, color: "#B2B2B2" }),
                react_1["default"].createElement(native_base_1.Text, { style: { marginLeft: 4, fontSize: 14 } }, "\u62CD\u7167/\u6DFB\u52A0\u56FE\u7247")),
            react_1["default"].createElement(native_base_1.Pressable, { onPress: function () {
                    setLabelFLag(true);
                    getDynamicLabels();
                }, style: styles.titleView },
                react_1["default"].createElement(native_base_1.Text, { fontSize: 'sm', color: '#727272' }, "\u6DFB\u52A0\u6807\u7B7E"),
                react_1["default"].createElement(native_base_1.View, { style: styles.rightView },
                    react_1["default"].createElement(native_base_1.Text, null, labelType || '请选择'),
                    react_1["default"].createElement(AntDesign_1["default"], { name: "right", size: 16, color: "#999" }))),
            react_1["default"].createElement(native_base_1.View, { style: styles.btnView },
                react_1["default"].createElement(native_base_1.Text, { fontSize: 'sm', color: '#727272' }, "\u5BF9\u5E94\u6C14\u8D28"),
                react_1["default"].createElement(native_base_1.Text, { fontSize: 'sm' }, labelDetail || '请选择'))),
        react_1["default"].createElement(react_native_1.TouchableOpacity, { onPress: function () { return util_1["default"].throttle(checkSubmit(), 2000); }, style: {
                width: '100%',
                marginTop: 10,
                position: 'absolute',
                bottom: '5%'
            } },
            react_1["default"].createElement(react_native_linear_gradient_1["default"], { start: { x: 0, y: 0 }, end: { x: 1, y: 0 }, colors: ['#D988FF', '#8B5CFF'], style: [styles.linearGradient, { width: '90%', marginLeft: '5%' }] },
                react_1["default"].createElement(native_base_1.Text, { style: styles.buttonText }, "\u53D1\u5E03")))));
};
exports["default"] = Index;
var styles = react_native_1.StyleSheet.create({
    banner: __assign({}, react_native_1.Platform.select({
        ios: {
        // paddingTop: 28 + 40,
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
    },
    addImg: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    titleView: {
        marginTop: 30,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    rightView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    btnView: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    linearGradient: {
        width: Layout_1["default"].width - 60,
        marginLeft: 30,
        marginTop: 20,
        height: 50,
        borderRadius: 28,
        marginBottom: '5%'
    },
    buttonText: {
        fontSize: 16,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        lineHeight: 50,
        color: '#ffffff',
        backgroundColor: 'transparent'
    }
});
