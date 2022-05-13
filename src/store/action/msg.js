import {Alert} from 'react-native';
import constObj from '../constant';

//发送文本消息
export const sendText = options => dispatch => {
  const {scene = 'p2p', to, text} = options;
  constObj.nim &&
    constObj.nim.sendText({
      scene,
      to,
      text,
      done: (error, done) => {
        dispatch({
          type: 'MERGE_SESSION_MSGS',
          msg: done,
        });
        if (error) {
          Alert.alert('提示', error.message, [{text: '确认'}]);
        }
      },
    });
};

// 发送自定义消息
export const sendCustomMsg = options => dispatch => {
  const {scene = 'p2p', to, content} = options;
  constObj.nim &&
    constObj.nim.sendCustomMsg({
      scene,
      to,
      content: JSON.stringify(content),
      done: (error, done) => {
        dispatch({
          type: 'MERGE_SESSION_MSGS',
          msg: done,
        });
        if (error) {
          Alert.alert('提示', error.message, [{text: '确认'}]);
        }
      },
    });
};

//获取本地当前消息列表
export const getLocalMsgs = options => dispatch => {
  const {sessionId, limit = 100} = options;
  constObj.nim &&
    constObj.nim.getLocalMsgs({
      sessionId,
      limit,
      done(error, obj) {
        dispatch({
          type: 'SESSION_MSGS',
          currentSessionMsgs: obj.msgs || [],
        });
        if (error) {
          Alert.alert('提示', error.message, [{text: '确认'}]);
        }
      },
    });
};
