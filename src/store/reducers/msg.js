import constObj from '../constant';

const initialState = {
  lastMsg: '',
  currentSessionMsgs: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SESSION_MSGS':
      const {currentSessionMsgs} = action;
      return Object.assign({...state}, {currentSessionMsgs});
    case 'MERGE_SESSION_MSGS':
      const {msg} = action;
      const msgs = state.currentSessionMsgs.concat([msg]);
      console.log('msgs', msgs);
      return Object.assign({...state}, {currentSessionMsgs: msgs});
    // case 'SEND_TEXT':
    //   const {toUserId, text} = action;
    //   constObj.nim &&
    //     constObj.nim.sendText({
    //       scene: 'p2p',
    //       isUnreadable: false,
    //       to: toUserId,
    //       text,
    //       done: done => {
    //         console.log('done');
    //       },
    //     });
    //   // const {currentSessionId} = action;
    //   return Object.assign({...state}, {lastMsg});
    default:
      return state;
  }
};
