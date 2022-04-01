/**
 * options 里面传入一些控制参数 eg：
 *  manual:true代表手动调用 默认手动调用
 *  token 请求头中需要传入accessToken 默认不传
 *  msg: 展示返回message 默认不展示
 */

// 获取验证码
export const sendCode = {
  url: 'cgi/core/login/sendCode',
  options: {},
};

// 校验验证码
export const verifyCode = {
  url: 'cgi/core/login/verifyCode',
  options: {},
};

// 查询动态
export const queryDynamic = {
  url: 'cgi/core/dynamic/queryDynamic',
  options: {},
};
