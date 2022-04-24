/**
 * options 里面传入一些控制参数 eg：
 *  manual:true代表手动调用 默认手动调用
 *  token 请求头中需要传入accessToken 默认不传
 *  msg: 展示返回message 默认不展示
 */

// 添加快捷回复
export const addQuickReply = {
  url: 'cgi/core/user/addQuickReply',
  options: {
    showMsg: false,
  },
};

// 获取我的快捷回复
export const fetchQuickReply = {
  url: 'cgi/core/user/fetchQuickReply',
  options: {},
};
