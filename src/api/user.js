/**
 * options 里面传入一些控制参数 eg：
 *  manual:true代表手动调用 默认手动调用
 *  token 请求头中需要传入accessToken 默认不传
 *  msg: 展示返回message 默认不展示
 */

// 获取女生列表
export const queryFemaleUser = {
  url: 'cgi/core/user/queryFemaleUser',
  options: {},
};

// 查询用户媒体信息
export const queryMedia = {
  url: 'cgi/core/user/queryMedia',
  options: {
    manual: false,
  },
};
