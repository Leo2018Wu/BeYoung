/**
 * options 里面传入一些控制参数 eg：
 *  manual:true代表手动调用 默认手动调用
 *  token 请求头中需要传入accessToken 默认不传
 *  msg: 展示返回message 默认不展示
 */

// 获取礼物列表
export const fetchGift = {
  url: 'cgi/core/gift/fetchGift',
  options: {
    options: false,
  },
};

// 查询用户送礼
export const queryGiftGiving = {
  url: 'cgi/core/dynamic/queryGiftGiving',
  options: {},
};

// 获取我的礼物
export const fetchMyGift = {
  url: 'cgi/core/gift/fetchMyGift',
  options: {
    manual: false,
  },
};

// 赠送礼物
export const giveGift = {
  url: 'cgi/core/gift/giveGift',
  options: {},
};

// 动态礼物排行
export const queryDynamicGiftRank = {
  url: 'cgi/core/gift/queryDynamicGiftRank',
  options: {},
};
