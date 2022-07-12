/**
 * options 里面传入一些控制参数 eg：
 *  manual:true代表手动调用 默认手动调用
 *  token 请求头中需要传入accessToken 默认不传
 *  msg: 展示返回message 默认不展示
 */

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

// 获取动态案例(新)
export const queryCase = {
  url: 'cgi/core/case/queryCase',
  options: {},
};

// 查询动态评论
export const queryComment = {
  url: 'cgi/core/dynamic/queryComment',
  options: {
    manual: false,
  },
};

// 评论动态
export const commentDynamic = {
  url: 'cgi/core/dynamic/commentDynamic',
  options: {},
};

// 点赞动态
export const likeDynamic = {
  url: 'cgi/core/dynamic/likeDynamic',
  options: {},
};

// 收藏动态
export const collectDynamic = {
  url: 'cgi/core/dynamic/collectDynamic',
  options: {},
};

// 查询收藏动态
export const queryCollectedDynamic = {
  url: 'cgi/core/dynamic/queryCollectedDynamic',
  options: {},
};

// 获取动态标签列表
export const fetchDynamicLabels = {
  url: 'cgi/core/label/fetchDynamicLabels',
  options: {},
};

// 查询收到的评论回复
export const queryReply = {
  url: 'cgi/core/dynamic/queryReply',
  options: {},
};

// 获取动态详情
export const fetchDynamic = {
  url: 'cgi/core/dynamic/fetchDynamic',
  options: {},
};

// 获取未读评论/回复数
export const fetchUnreadComment = {
  url: 'cgi/core/dynamic/fetchUnreadComment',
  options: {},
};

// 获取最新动态
export const fetchLastDynamic = {
  url: 'cgi/core/dynamic/fetchLastDynamic',
  options: {},
};

// 删除动态
export const delDynamic = {
  url: 'cgi/core/dynamic/delDynamic',
  options: {},
};
