const initialState = {
  // 登录账户ID
  userID: null,
  // 用户名片
  myInfo: {},
  msgsMap: {},
  // 会话列表
  sessionlist: [],
  sessionMap: {},
  // 当前会话ID（即当前聊天列表，只有单聊群聊采用，可用于判别）
  currentSessionId: null,
  currentSessionMsgs: [],
  // 是否有更多历史消息，用于上拉加载更多
  noMoreHistoryMsgs: false,
  //系统消息
  sysMsgs: [],
  customSysMsgs: [],
  sysMsgUnread: {
    total: 0,
  },
  customSysMsgUnread: 0,
  searchedUsers: [],
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
    case 'SESSIONSLIST':
      const {sessionlist} = action;
      return Object.assign({...state}, {sessionlist});
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};
