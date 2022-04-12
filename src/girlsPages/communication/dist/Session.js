"use strict";
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
var CFastImage_1 = require("../../components/CFastImage");
var react_redux_1 = require("react-redux");
var constant_1 = require("../../store/constant");
var react_native_linear_gradient_1 = require("react-native-linear-gradient");
var Feather_1 = require("react-native-vector-icons/Feather");
var FontAwesome5_1 = require("react-native-vector-icons/FontAwesome5");
var FontAwesome_1 = require("react-native-vector-icons/FontAwesome");
var Ionicons_1 = require("react-native-vector-icons/Ionicons");
var react_native_safe_area_context_1 = require("react-native-safe-area-context");
var useRequest_1 = require("../../hooks/useRequest");
var common_1 = require("../../api/common");
var ChatItem_1 = require("../../components/base/ChatItem");
var react_native_1 = require("react-native");
var _scrollTimer;
var BOTTOM_FIXED_HEIGHT = 92; // 底部遮盖拦高度
var mapStateToProps = function (state) {
    return {
        msgs: state.msg.currentSessionMsgs || [],
        currentSessionId: state.session.currentSessionId
    };
};
var Msgs = function (_a) {
    var _b, _c;
    var props = __rest(_a, []);
    var scrollRef = react_1.useRef(null);
    var insets = react_native_safe_area_context_1.useSafeAreaInsets();
    var _d = react_1.useState(''), textValue = _d[0], setValue = _d[1];
    var chatUserInfo = useRequest_1["default"](common_1.fetchAccountUser.url, {
        accountIds: [props.route.params.chatUserId]
    }, common_1.fetchAccountUser.options).result;
    var scrollToEnd = function () {
        if (scrollRef.current) {
            clearTimeout(_scrollTimer);
            _scrollTimer = setTimeout(function () {
                react_native_1.InteractionManager.runAfterInteractions(function () {
                    scrollRef.current.scrollToEnd();
                });
            }, 500);
        }
    };
    react_1.useEffect(function () {
        scrollToEnd();
        constant_1["default"].nim &&
            constant_1["default"].nim.getLocalMsgs({
                sessionId: props.currentSessionId,
                limit: 100,
                done: function (err, obj) {
                    console.log(err, obj);
                    props.dispatch({
                        type: 'SESSION_MSGS',
                        currentSessionMsgs: obj.msgs || []
                    });
                }
            });
        return function () {
            _scrollTimer && clearTimeout(_scrollTimer);
            // 退出重置当前会话ID
            props.dispatch({
                type: 'RESET_SESSIONID'
            });
        };
    }, []);
    var sendMsg = function () {
        setValue('');
        react_native_1.Keyboard.dismiss();
        constant_1["default"].nim &&
            constant_1["default"].nim.sendText({
                scene: 'p2p',
                // isUnreadable: false,
                to: props.route.params.chatUserId,
                text: textValue,
                done: function (err, done) {
                    props.dispatch({
                        type: 'MERGE_SESSION_MSGS',
                        msg: done
                    });
                    scrollToEnd();
                    console.log('done', err, done);
                    if (err) {
                        console.log('sendFail', err);
                    }
                    // if (!err) {
                    //   setValue('');
                    //   Keyboard.dismiss();
                    // }
                }
            });
    };
    var msgs = props.msgs;
    if (!chatUserInfo) {
        return (react_1["default"].createElement(native_base_1.Center, { flex: 1 },
            react_1["default"].createElement(native_base_1.Spinner, { size: 'lg', color: "primary.100" })));
    }
    return (react_1["default"].createElement(native_base_1.Box, { bg: 'white', flex: 1, style: {
            paddingBottom: BOTTOM_FIXED_HEIGHT
        } },
        react_1["default"].createElement(react_native_linear_gradient_1["default"], { style: {
                position: 'relative',
                zIndex: 1
            }, start: { x: 0, y: 0.5 }, end: { x: 1, y: 0.5 }, colors: ['#B83AF3', '#6950FB'] },
            react_1["default"].createElement(native_base_1.Box, { justifyContent: "center", style: { paddingTop: insets.top } },
                react_1["default"].createElement(native_base_1.HStack, { px: 4, style: { height: 52 }, justifyContent: "space-between", alignItems: 'center' },
                    react_1["default"].createElement(native_base_1.Pressable, { h: 'full', onPress: function () { return props.navigation.goBack(); }, w: 10, justifyContent: "center" },
                        react_1["default"].createElement(Feather_1["default"], { name: "chevron-left", color: 'white', size: 32 })),
                    react_1["default"].createElement(native_base_1.Text, { color: 'white', fontSize: "lg", fontWeight: 'bold' }, ((_b = chatUserInfo[0]) === null || _b === void 0 ? void 0 : _b.nickName) || '暂无昵称'),
                    react_1["default"].createElement(native_base_1.Box, { h: 'full', justifyContent: "center", w: 10 },
                        react_1["default"].createElement(CFastImage_1["default"], { url: ((_c = chatUserInfo[0]) === null || _c === void 0 ? void 0 : _c.headImg) || '', styles: {
                                width: 28,
                                height: 28,
                                borderRadius: 14
                            } }))))),
        react_1["default"].createElement(native_base_1.KeyboardAvoidingView, { contentContainerStyle: {
                height: '100%',
                paddingBottom: BOTTOM_FIXED_HEIGHT
            }, behavior: "position" },
            react_1["default"].createElement(native_base_1.ScrollView, { ref: function (e) {
                    scrollRef.current = e;
                    scrollToEnd();
                }, pt: 4, px: 2, mb: 5, flex: 1 }, msgs &&
                msgs.map(function (item, index) {
                    if (item.flow === 'in') {
                        return react_1["default"].createElement(ChatItem_1.ChatLeft, { key: index, msg: item });
                    }
                    else if (item.flow === 'out') {
                        return react_1["default"].createElement(ChatItem_1.ChatRight, { key: index, msg: item });
                    }
                    else {
                        return null;
                    }
                })),
            react_1["default"].createElement(native_base_1.HStack, { shadow: 2, alignItems: "center", w: 'full', px: 4, style: {
                    height: BOTTOM_FIXED_HEIGHT,
                    position: 'absolute',
                    left: 0,
                    bottom: 0,
                    paddingBottom: insets.bottom,
                    backgroundColor: '#fff'
                } },
                react_1["default"].createElement(FontAwesome5_1["default"], { name: "smile", size: 28, color: "#C1C0C9" }),
                react_1["default"].createElement(Ionicons_1["default"], { style: {
                        marginLeft: 16
                    }, name: "gift", size: 26, color: "#9650FF" }),
                react_1["default"].createElement(native_base_1.Input, { fontSize: 'md', variant: "filled", py: 2, mx: 4, onChangeText: function (e) { return setValue(e); }, value: textValue, maxLength: 300, placeholder: "\u8F93\u5165\u4F60\u7684\u6D88\u606F...", placeholderTextColor: 'tip.placeholder', flex: 1 }),
                textValue ? (react_1["default"].createElement(native_base_1.Pressable, { onPress: function () { return sendMsg(); } },
                    react_1["default"].createElement(FontAwesome_1["default"], { name: "send", size: 24, color: "#9650FF" }))) : null))));
};
exports["default"] = react_redux_1.connect(mapStateToProps)(Msgs);
