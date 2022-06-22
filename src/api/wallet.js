/**
 * options 里面传入一些控制参数 eg：
 *  manual:true代表手动调用 默认手动调用
 *  token 请求头中需要传入accessToken 默认不传
 *  msg: 展示返回message 默认不展示
 */

// 获取充值项目列表
export const fetchRechargeItems = {
  url: 'cgi/core/recharge/fetchRechargeItems',
  options: {
    manual: false,
  },
};

// 微信充值申请
export const rechargeApplyWX = {
  url: 'cgi/core/recharge/rechargeApply',
  options: {},
};
// 微信充值申请V3
export const rechargeApplyWXV3 = {
  url: 'cgi/core/recharge/wxPayV3RechargeForApp',
  options: {},
};

// 支付宝充值申请
export const rechargeApplyAli = {
  url: 'cgi/core/recharge/rechargeApplyByAlipay',
  options: {},
};

// IOS内购充值申请
export const rechargeApplyByIos = {
  url: 'cgi/core/recharge/rechargeApplyByIos',
  options: {},
};

// IOS内购支付校验
export const verifyApplePayResult = {
  url: 'cgi/core/recharge/verifyApplePayResult',
  options: {},
};

// 充值记录
export const fetchRechargeRecord = {
  url: 'cgi/core/recharge/fetchRechargeRecord',
  options: {},
};

// 绑定钱包账户
export const fetchBindAccount = {
  url: 'cgi/core/wallet/bindAccount',
  options: {},
};

//获取钱包账户列表
export const fetchAccountList = {
  url: 'cgi/core/wallet/fetchAccountList',
  options: {},
};

//获取支付宝授权请求信息
export const fetchAlipayAuthInfo = {
  url: 'cgi/core/wallet/fetchAlipayAuthInfo',
  options: {},
};

//删除钱包账户
export const deleteAccount = {
  url: 'cgi/core/wallet/deleteAccount',
  options: {},
};

//查询我的提现记录
export const queryMyWithdraws = {
  url: 'cgi/core/withdraw/queryMyWithdraws',
  options: {},
};

//获取钱包明细
export const fetchWalletDetail = {
  url: 'cgi/core/user/fetchWalletDetail',
  options: {},
};

//申请提现
export const fetchWithdraw = {
  url: 'cgi/core/withdraw/withdraw',
  options: {},
};
