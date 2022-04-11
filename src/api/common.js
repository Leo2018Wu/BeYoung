/**
 * options 里面传入一些控制参数 eg：
 *  manual:true代表手动调用 默认手动调用
 *  token 请求头中需要传入accessToken 默认不传
 *  msg: 展示返回message 默认不展示
 */

// 获取字典信息
export const querySysDic = {
  url: 'cgi/core/dic/querySysDic',
  options: {},
};

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

// 更新用户信息
export const updateUserInfo = {
  url: 'cgi/core/user/updateUserInfo',
  options: {},
};

// 获取用户信息
export const fetchUserInfo = {
  url: 'cgi/core/user/fetchUserInfo',
  options: {},
};

// 获取我的信息
export const fetchMyInfo = {
  url: 'cgi/core/user/fetchMyInfo',
  options: {
    manual: false,
  },
};

// 获取我的统计信息
export const fetchMyStatistic = {
  url: 'cgi/core/user/fetchMyStatistic',
  options: {
    manual: false,
  },
};

// 获取聊天账号
export const fetchChatAccount = {
  url: 'cgi/core/user/fetchChatAccount',
  options: {
    manual: false,
  },
};
