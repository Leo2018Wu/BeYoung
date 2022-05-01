/**
 * options 里面传入一些控制参数 eg：
 *  manual:true代表手动调用 默认手动调用
 *  token 请求头中需要传入accessToken 默认不传
 *  msg: 展示返回message 默认不展示
 */

// 获取字典信息
export const querySysDic = {
  url: 'cgi/core/dic/querySysDic',
  options: {
    manual: false,
  },
};

// 获取隐私协议
export const fetchPrivateProtocol = {
  url: 'cgi/core/user/fetchPrivateProtocol',
  options: {
    manual: false,
  },
};

// 获取用户协议（男生）
export const fetchUserProtocolMale = {
  url: 'cgi/core/user/fetchUserProtocol/maleUser',
  options: {
    manual: false,
  },
};

// 获取用户协议（女生）
export const fetchUserProtocolFeMale = {
  url: 'cgi/core/user/fetchUserProtocol/femaleUser',
  options: {
    manual: false,
  },
};

// 获取验证码
export const sendCode = {
  url: 'cgi/core/login/sendCode',
  options: {
    showMsg: true,
  },
};

// 校验验证码
export const verifyCode = {
  url: 'cgi/core/login/verifyCode',
  options: {},
};

// 更新用户信息
export const updateUserInfo = {
  url: 'cgi/core/user/updateUserInfo',
  options: {
    showMsg: false,
  },
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

// 获取聊天账号对象信息
export const fetchAccountUser = {
  url: 'cgi/core/user/fetchAccountUser',
  options: {
    manual: false,
  },
};

// 获取钱包信息
export const fetchWalletInfo = {
  url: 'cgi/core/user/fetchWalletInfo',
  options: {
    manual: false,
  },
};

// 获取统计信息
export const fetchStatistic = {
  url: 'cgi/core/user/fetchStatistic',
  options: {
    manual: false,
  },
};

// 获取聊天相关账号
export const fetchRelateChatAccount = {
  url: 'cgi/core/user/fetchRelateChatAccount',
  options: {
    manual: false,
  },
};
