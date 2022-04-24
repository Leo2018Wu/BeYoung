/**
 * options 里面传入一些控制参数 eg：
 *  manual:true代表手动调用 默认手动调用
 *  token 请求头中需要传入accessToken 默认不传
 *  msg: 展示返回message 默认不展示
 */

// 获取修图教程
// 获取精选示例
export const fetchCase = {
  url: 'cgi/core/user/fetchCase',
  options: {},
};

// 获取我的媒体信息
export const fetchMyMedia = {
  url: 'cgi/core/user/fetchMyMedia',
  options: {},
};

// 添加媒体信息
export const fetchAddMedia = {
  url: 'cgi/core/user/addMedia',
  options: {},
};

// 删除媒体信息
export const fetchDelMedia = {
  url: 'cgi/core/user/delMedia',
  options: {},
};
