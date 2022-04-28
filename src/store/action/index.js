import {
  fetchAccountUser,
  fetchMyInfo,
  fetchWalletInfo,
  querySysDic,
} from '../../api/common';
import {fetchMyGift} from '../../api/gift';
import fetchData from '../../util/request';

// 获取会话列表聊天对象信用户信息
export const getChatUsers = params => dispatch => {
  fetchData(fetchAccountUser.url, params).then(res => {
    if (res.data instanceof Array && res.data.length > 0) {
      const map = res.data.reduce((t, v) => {
        const {account, ...rest} = v;
        t[account] = rest;
        return t;
      }, {});
      dispatch({type: 'CHATUSERINFO', userInfosMap: map});
    }
  });
};

//分发我的礼物信息
export const getMyGifts = () => async dispatch => {
  try {
    const {data} = await fetchData(fetchMyGift.url);
    if (data instanceof Array && data.length > 0) {
      console.log('---data---', data);
      const map = data.reduce((t, v) => {
        const {giftId, ...rest} = v;
        t[giftId] = rest;
        return t;
      }, {});
      dispatch({type: 'MY_GIFTS', gifts: map});
    }
  } catch (error) {}
};

// 分发我的钱包信息
export const getMyWallet = () => async dispatch => {
  try {
    const {data} = await fetchData(fetchWalletInfo.url);
    dispatch({type: 'MY_WALLET', myWallet: data || []});
  } catch (error) {
    console.log('eee', error);
  }
};

//分发我的用户信息
export const getMyInfo = () => async dispatch => {
  try {
    const {data} = await fetchData(fetchMyInfo.url);
    dispatch({type: 'MY_USERINFO', myUserInfo: data || {}});
  } catch (error) {
    console.log('eee', error);
  }
};

//分发系统字典信息
export const getAllDicts = () => async dispatch => {
  try {
    const {data} = await fetchData(querySysDic.url);
    dispatch({type: 'SYS_DICTS', sysDicts: data || []});
  } catch (error) {
    console.log('eee', error);
  }
};
