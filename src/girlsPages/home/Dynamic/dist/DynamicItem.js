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
var react_native_1 = require("react-native");
var native_base_1 = require("native-base");
var CFastImage_1 = require("../../../components/CFastImage");
var native_1 = require("@react-navigation/native");
var Layout_1 = require("../../common/Layout");
var Login = function (_a) {
    var props = __rest(_a, []);
    console.log('--props--', props);
    var navigation = native_1.useNavigation();
    var item = props.item;
    var _b = react_1.useState([]), imgList = _b[0], setImgList = _b[1];
    var _c = react_1.useState(''), time = _c[0], setTime = _c[1];
    react_1.useEffect(function () {
        if (item.images && JSON.parse(item.images).length) {
            setImgList(JSON.parse(item.images));
        }
        console.log('-sd-s-d-d-s', item.createTime);
        if (item.createTime) {
            var tempTime = Math.ceil((new Date().getTime() - new Date(item.createTime).getTime()) / 1000);
            if (tempTime < 60) {
                setTime(tempTime + '秒之前');
            }
            else if (tempTime >= 60 && tempTime < 3600) {
                setTime(Math.ceil(tempTime / 60) + '分钟之前');
            }
            else if (tempTime >= 3600 && tempTime < 86400) {
                setTime(Math.ceil(tempTime / 3600) + '小时之前');
            }
            else if (tempTime >= 86400) {
                setTime(Math.ceil(tempTime / 86400) + '天之前');
            }
        }
    }, []);
    return (react_1["default"].createElement(react_native_1.Pressable, { onPress: function () { return navigation.navigate('DynamicItemDetail'); }, style: {
            flexDirection: 'row',
            paddingHorizontal: 15,
            paddingVertical: 10
        } },
        react_1["default"].createElement(react_native_1.Image, { source: require('../../assets/defaultAva.png'), style: {
                width: 50,
                height: 50
            } }),
        react_1["default"].createElement(native_base_1.View, { style: styles.itemContain },
            react_1["default"].createElement(native_base_1.Text, { style: { color: '#8E8895', fontSize: 14 } }, "\u5566\u5566\u5566"),
            react_1["default"].createElement(native_base_1.Text, { style: { color: '#c7c7c7', fontSize: 10 } }, time),
            react_1["default"].createElement(native_base_1.Text, { style: { color: '#554C5F', fontSize: 14 } }, item.content),
            react_1["default"].createElement(native_base_1.View, { style: {
                    marginVertical: 10,
                    flexDirection: 'row'
                } }, imgList &&
                imgList.map(function (item, index) {
                    return (
                    // <FastImage
                    //   style={{
                    //     width: 85,
                    //     height: 85,
                    //     borderRadius: 10,
                    //   }}
                    //   source={{
                    //     uri:
                    //       item.substr(0, 3) !== 'img' ? item : BASE_DOWN_URL + item,
                    //     headers: {Authorization: 'someAuthToken'},
                    //     priority: FastImage.priority.normal,
                    //   }}
                    //   resizeMode={FastImage.resizeMode.cover}
                    // />
                    react_1["default"].createElement(CFastImage_1["default"], { url: item, styles: {
                            width: 85,
                            height: 85,
                            borderRadius: 10
                        } }));
                })),
            react_1["default"].createElement(native_base_1.View, { style: styles.optContain },
                react_1["default"].createElement(native_base_1.Text, { style: styles.optSize },
                    "\u8BC4\u5206",
                    item.score),
                react_1["default"].createElement(native_base_1.View, { style: styles.optView },
                    react_1["default"].createElement(react_native_1.Image, { source: require('../../assets/home_linke.png'), style: {
                            width: 18,
                            height: 18,
                            marginRight: 3
                        } }),
                    react_1["default"].createElement(native_base_1.Text, { style: styles.optSize }, item.likeNum)),
                react_1["default"].createElement(native_base_1.View, { style: styles.optView },
                    react_1["default"].createElement(react_native_1.Image, { source: require('../../assets/home_message.png'), style: {
                            width: 18,
                            height: 18,
                            marginRight: 3
                        } }),
                    react_1["default"].createElement(native_base_1.Text, { style: styles.optSize }, item.commentNum)),
                react_1["default"].createElement(native_base_1.View, { style: styles.optView },
                    react_1["default"].createElement(react_native_1.Image, { source: require('../../assets/home_gift.png'), style: {
                            width: 18,
                            height: 18,
                            marginRight: 3
                        } }),
                    react_1["default"].createElement(native_base_1.Text, { style: styles.optSize }, item.giftNum))))));
};
exports["default"] = Login;
var styles = react_native_1.StyleSheet.create({
    itemContain: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        width: Layout_1["default"].width - 80
    },
    optContain: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },
    optView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    optSize: {
        color: '#C7C4CC',
        fontSize: 12
    }
});
