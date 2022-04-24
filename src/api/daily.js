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
