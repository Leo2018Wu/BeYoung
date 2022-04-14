import constObj from '../constant';

const initialState = {
  myUserInfo: {},
  myGifts: {}, // 格式{id:{}}
  myWallet: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'MY_USERINFO':
      const {myUserInfo} = action;
      return Object.assign({...state}, {myUserInfo});
    case 'MY_GIFTS':
      const {gifts} = action;
      return Object.assign({...state}, {myGifts: gifts});
    case 'MY_WALLET':
      const {myWallet} = action;
      return Object.assign({...state}, {myWallet});
    default:
      return state;
  }
};
