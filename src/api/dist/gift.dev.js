"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queryGiftGiving = exports.fetchGift = void 0;

/**
 * options 里面传入一些控制参数 eg：
 *  manual:true代表手动调用 默认手动调用
 *  token 请求头中需要传入accessToken 默认不传
 *  msg: 展示返回message 默认不展示
 */
// 获取礼物列表
var fetchGift = {
  url: 'cgi/core/gift/fetchGift',
  options: {
    options: false
  }
}; // 查询用户送礼

exports.fetchGift = fetchGift;
var queryGiftGiving = {
  url: 'cgi/core/dynamic/queryGiftGiving',
  options: {}
};
exports.queryGiftGiving = queryGiftGiving;