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
var upload_1 = require("../../../util/upload");
var useRequest_1 = require("../../../hooks/useRequest");
var ChooseImgModal_1 = require("../../../components/ChooseImgModal");
var react_native_image_zoom_viewer_1 = require("react-native-image-zoom-viewer");
var CFastImage_1 = require("../../../components/CFastImage");
var config_1 = require("../../../util/config");
var react_native_linear_gradient_1 = require("react-native-linear-gradient");
// import constObj from '../../../store/constant';
var Layout_1 = require("../../../components/Layout");
var Index = function (_a) {
    var props = __rest(_a, []);
    var headImg = props.route.params.headImg;
    var _b = react_1.useState(false), showMdal = _b[0], setShowModal = _b[1];
    var _c = react_1.useState(''), showImg = _c[0], setShowImg = _c[1];
    var insets = react_native_safe_area_context_1.useSafeAreaInsets();
    var runUpdateUserInfo = useRequest_1["default"](common_1.updateUserInfo.url).run;
    react_1.useEffect(function () {
        console.log('----ss-', headImg);
        // constObj.nim.sendText({
        //   scene: 'p2p',
        //   to: '13916838994',
        //   text: '长江收到',
        //   done: done => {
        //     console.log('done');
        //   },
        // });
    }, []);
    var edit = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            // props.navigation.goBack();
            upload_1.upload(showImg)
                .then(function (res) {
                runUpdateUserInfo({
                    headImg: res
                });
            })["catch"](function (error) {
                console.log(error);
            });
            return [2 /*return*/];
        });
    }); };
    return (react_1["default"].createElement(native_base_1.Box, { flex: 1 },
        react_1["default"].createElement(native_base_1.HStack, { h: 20, alignItems: 'center', justifyContent: 'center', style: { paddingTop: insets.top } },
            react_1["default"].createElement(native_base_1.Text, { fontSize: 'md', fontWeight: "bold" }, "\u7F16\u8F91\u5934\u50CF"),
            react_1["default"].createElement(native_base_1.Button, { onPress: function () { return edit(); }, w: 16, h: 8, style: {
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
                react_1["default"].createElement(native_base_1.Text, { fontWeight: 'bold', color: 'white', fontSize: "sm", lineHeight: 16 }, "\u5B8C\u6210"))),
        react_1["default"].createElement(ChooseImgModal_1["default"], { visible: showMdal, hideModal: function () { return setShowModal(false); }, imgCb: function (value) {
                console.log('value', value);
                setShowImg(value);
            } }),
        showImg || headImg ? (react_1["default"].createElement(react_native_image_zoom_viewer_1["default"], { style: {
                width: Layout_1["default"].width,
                height: 300
            }, renderImage: function (data) {
                if (!data.source.uri) {
                    return null;
                }
                react_1["default"].createElement(CFastImage_1["default"], { url: data.source.uri, styles: data.style });
            }, saveToLocalByLongPress: false, imageUrls: [
                {
                    url: showImg ? showImg : config_1.BASE_DOWN_URL + headImg
                },
            ] })) : (react_1["default"].createElement(native_base_1.Image, { source: require('../../../images/default_avatar.jpg'), style: {
                width: Layout_1["default"].width - 60,
                height: Layout_1["default"].height - 200,
                margin: 30,
                borderRadius: 20
            }, alt: "img" })),
        react_1["default"].createElement(react_native_linear_gradient_1["default"], { start: { x: 0, y: 0 }, end: { x: 1, y: 0 }, colors: ['#D988FF', '#8B5CFF'], style: {
                width: Layout_1["default"].width - 60,
                marginLeft: 30,
                marginBottom: '5%',
                position: 'absolute',
                bottom: 0,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 28,
                height: 50
            } },
            react_1["default"].createElement(native_base_1.Text, { onPress: function () { return setShowModal(true); }, style: {
                    width: '100%',
                    color: '#fff',
                    fontSize: 18,
                    textAlign: 'center'
                } }, "\u66F4\u6362"))));
};
exports["default"] = Index;
