"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var React = require("react");
var react_native_1 = require("react-native");
var native_base_1 = require("native-base");
var react_native_tab_view_1 = require("react-native-tab-view");
var Comment_1 = require("../../girlsPages/home/Dynamic/Comment");
var Gift_1 = require("../../girlsPages/home/Dynamic/Gift");
var CustomTabBarExample = /** @class */ (function (_super) {
    __extends(CustomTabBarExample, _super);
    function CustomTabBarExample(_a) {
        var props = _a.props;
        var _this = _super.call(this, props) || this;
        _this.handleIndexChange = function (index) {
            return _this.setState({
                index: index
            });
        };
        _this.renderItem = function (_a) {
            var navigationState = _a.navigationState, position = _a.position;
            return function (_a) {
                var route = _a.route, index = _a.index;
                var inputRange = navigationState.routes.map(function (_, i) { return i; });
                var activeOpacity = position.interpolate({
                    inputRange: inputRange,
                    outputRange: inputRange.map(function (i) { return (i === index ? 1 : 0); })
                });
                var inactiveOpacity = position.interpolate({
                    inputRange: inputRange,
                    outputRange: inputRange.map(function (i) { return (i === index ? 0 : 1); })
                });
                return (React.createElement(native_base_1.Box, { bg: 'bg.darkGray', w: 'full', h: 10 },
                    React.createElement(react_native_1.Animated.View, { style: [
                            styles.item,
                            styles.inactiveItem,
                            { opacity: inactiveOpacity },
                        ] },
                        React.createElement(native_base_1.Text, { fontWeight: "bold", fontSize: "md", color: "fontColors.333" }, route.title)),
                    React.createElement(react_native_1.Animated.View, { style: [styles.item, styles.activeItem, { opacity: activeOpacity }] },
                        React.createElement(native_base_1.Text, { fontWeight: "bold", fontSize: "md", color: "white" }, route.title))));
            };
        };
        _this.renderTabBar = function (props) { return (React.createElement(native_base_1.HStack, { h: 16, px: 16, alignItems: 'center' }, props.navigationState.routes.map(function (route, index) {
            return (React.createElement(native_base_1.Pressable, { flex: 1, key: route.key, onPress: function () { return props.jumpTo(route.key); } }, _this.renderItem(props)({ route: route, index: index })));
        }))); };
        _this.renderScene = react_native_tab_view_1.SceneMap({
            comment: Comment_1["default"],
            gift: Gift_1["default"]
        });
        _this.state = {
            index: 0,
            routes: [
                { key: 'comment', title: '评论' },
                { key: 'gift', title: '礼物' },
            ]
        };
        return _this;
    }
    CustomTabBarExample.prototype.render = function () {
        return (React.createElement(react_native_tab_view_1.TabView, { navigationState: this.state, renderScene: this.renderScene, renderTabBar: this.renderTabBar, onIndexChange: this.handleIndexChange }));
    };
    return CustomTabBarExample;
}(React.Component));
exports["default"] = CustomTabBarExample;
var styles = react_native_1.StyleSheet.create({
    item: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        borderRadius: 4,
        paddingHorizontal: 10
    },
    inactiveItem: {},
    activeItem: {
        backgroundColor: '#9650FF',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }
});
