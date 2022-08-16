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

// 查询用户关系
export const fetchRelation = {
  url: 'cgi/core/user/fetchRelation',
  options: {
    manual: false,
  },
};

// 查询已解锁到女生微信号
export const queryUnlockWeChat = {
  url: 'cgi/core/user/queryUnlockWeChat',
  options: {
    manual: false,
  },
};

// 查询我的关系
export const queryMyRelation = {
  url: 'cgi/core/user/queryMyRelation',
  options: {},
};
// 开启关系
export const startRelation = {
  url: 'cgi/core/relation/startRelation',
  options: {},
};
// 获取女生热度排行
export const queryFemaleRank = {
  url: 'cgi/core/user/queryFemaleRank',
  options: {},
};

// 获取我的任务
export const fetchMyTask = {
  url: 'cgi/core/user/fetchMyTask',
  options: {},
};
