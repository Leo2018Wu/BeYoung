import {fetchAccountUser} from '../../api/common';
import fetchData from '../../util/request';

export const getChatUsers = params => dispatch => {
  fetchData(fetchAccountUser.url, params).then(res => {
    if (res.data instanceof Array) {
      const map =
        res.data &&
        res.data.reduce((t, v) => {
          const {account, ...rest} = v;
          t[account] = rest;
          return t;
        }, {});
      dispatch({type: 'CHATUSERINFO', userInfosMap: map});
    }
  });
};
