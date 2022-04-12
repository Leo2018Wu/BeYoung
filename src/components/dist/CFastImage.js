"use strict";
exports.__esModule = true;
var native_base_1 = require("native-base");
var react_1 = require("react");
var react_native_fast_image_1 = require("react-native-fast-image");
var config_1 = require("../util/config");
var DEFAULT_AVATAR = require('../images/default_avatar.jpg');
var Index = function (_a) {
    var styles = _a.styles, url = _a.url;
    if (!url) {
        return react_1["default"].createElement(native_base_1.Image, { source: DEFAULT_AVATAR, style: styles, alt: "img" });
    }
    return (react_1["default"].createElement(react_native_fast_image_1["default"], { style: styles, source: {
            uri: url.substr(0, 3) !== 'img' ? url : config_1.BASE_DOWN_URL + url,
            headers: { Authorization: 'someAuthToken' },
            priority: react_native_fast_image_1["default"].priority.normal
        }, resizeMode: react_native_fast_image_1["default"].resizeMode.cover }));
};
exports["default"] = Index;
