import constObj from '../constant';

const initialState = {
  currentSessionId: null,
  sessionList: [],
  relateChatAccount: [], // 聊过天的相关用户账号
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SESSIONID':
      const {currentSessionId} = action;
      return Object.assign({...state}, {currentSessionId});
    case 'RESET_SESSIONID':
      return Object.assign({...state}, {currentSessionId: null});
    case 'SESSIONSLIST':
      const {sessionList} = action;
      console.log('sessionList', state.relateChatAccount);
      const data = sessionList.filter(
        item => state.relateChatAccount.findIndex(e => e === item.to) !== -1,
      );
      return Object.assign({...state}, {sessionList: data});
    case 'RELATECHATUSERACCOUNT':
      const {relateChatAccount} = action;
      return Object.assign({...state}, {relateChatAccount});
    // case 'DELSESSION':
    //   console.log('DELSESSION', action, state);
    //   const {sessionId} = action;
    //   const newList = [...state.sessionList];
    //   constObj.nim &&
    //     constObj.nim.deleteLocalSession({
    //       id: sessionId,
    //       done: done => {
    //         console.log('done', done);
    //         if (!done) {
    //           //删除会话成功
    //           console.log('donesss');
    //           const prevIndex = state.sessionList.findIndex(
    //             item => item.id === sessionId,
    //           );
    //           newList.splice(prevIndex, 1);
    //           state.sessionList = newList;
    //         }
    //       },
    //     });
    //   return Object.assign({...state}, {sessionList: newList});
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};
