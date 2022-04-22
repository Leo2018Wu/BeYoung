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

// 充值记录
export const fetchRechargeRecord = {
  url: 'cgi/core/recharge/fetchRechargeRecord',
  options: {},
};
