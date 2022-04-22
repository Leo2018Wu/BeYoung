/**
 * options 里面传入一些控制参数 eg：
 *  manual:true代表手动调用 默认手动调用
 *  token 请求头中需要传入accessToken 默认不传
 *  msg: 展示返回message 默认不展示
 */

// 获取标签列表
export const fetchLabels = {
  url: 'cgi/core/label/fetchLabels',
  options: {},
};

// 贴标签
export const attachLabels = {
  url: 'cgi/core/label/attachLabels',
  options: {},
};

// 获取我的标签
export const fetchMyLabels = {
  url: 'cgi/core/label/fetchMyLabels',
  options: {},
};
