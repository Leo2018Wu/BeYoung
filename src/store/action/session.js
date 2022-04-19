import {Alert} from 'react-native';
import constObj from '../constant';

//调用此接口会重置该会话消息未读数
export const setCurrSession = options => dispatch => {
  const {sessionId} = options;
  constObj.nim && constObj.nim.setCurrSession(sessionId);
};

//取消设置当前会话
export const resetCurrSession = options => dispatch => {
  constObj.nim && constObj.nim.resetCurrSession();
};
