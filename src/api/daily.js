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

// 发布动态-女生端
export const addDynamic = {
  url: 'cgi/core/dynamic/addDynamic',
  options: {},
};

// 查询我的动态-女生端
export const queryMyDynamic = {
  url: 'cgi/core/dynamic/queryMyDynamic',
  options: {},
};

// 获取动态案例
export const queryDynamicCase = {
  url: 'cgi/core/dynamic/queryDynamicCase',
  options: {},
};
