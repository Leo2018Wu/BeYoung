"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queryMyDynamic = void 0;

/**
 * options 里面传入一些控制参数 eg：
 *  manual:true代表手动调用 默认手动调用
 *  token 请求头中需要传入accessToken 默认不传
 *  msg: 展示返回message 默认不展示
 */
// 查询我的动态
var queryMyDynamic = {
  url: 'cgi/core/dynamic/queryMyDynamic',
  options: {}
};
exports.queryMyDynamic = queryMyDynamic;