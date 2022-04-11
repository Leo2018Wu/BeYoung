const initialState = {
  // 登录账户ID
  userID: null,
  // 用户名片
  myInfo: {},
  // 好友/黑名单/陌生人名片,
  userInfosMap: {},
  // 是否有更多历史消息，用于上拉加载更多
  noMoreHistoryMsgs: false,
  //系统消息
  sysMsgs: [],
  customSysMsgs: [],
  sysMsgUnread: {
    total: 0,
  },
};

export default (state = initialState, action) => {
  console.log('action', action);
  switch (action.type) {
    case 'USERID':
      const {userID} = action;
      return Object.assign({...state}, {userID});
    case 'MYINFO':
      const {myInfo} = action;
      return Object.assign({...state}, {myInfo});
    case 'RESET':
      return initialState;
    case 'CHATUSERINFO':
      const {userInfosMap} = action;
      return Object.assign({...state}, {userInfosMap});
    default:
      return state;
  }
};
