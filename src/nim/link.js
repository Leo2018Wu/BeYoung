/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
// import {useStore} from 'react-redux';
import {store} from '../store/index';
import constObj from '../store/constant';

const configs = {
  appkey: '32e1c42992aa95724f5d51c1a1849998',
};

// yx6917744124191835136
const NIM = require('./sdk/NIM_Web_NIM_rn_v9.0.1');
const realm = require('realm');

NIM.usePlugin({
  db: realm,
});

const onSysMsgs = sysmsgs => {
  console.log('onSysMsgs', sysmsgs);
};

const onSession = session => {
  //会话信息
  const sessionList = constObj.nim.mergeSessions(
    store.getState().session.sessionList,
    session,
  );
  // .sort((a,b)=>{
  //   const time1 = a.lastMsg ? a.lastMsg.time : a.updateTime;
  //     const time2 = b.lastMsg ? b.lastMsg.time : b.updateTime;
  //     return time2 - time1;
  // })
  store.dispatch({type: 'SESSIONSLIST', sessionList});
  console.log('store', store.getState());
};

const destroyNIM = () =>
  new Promise((resolve, reject) => {
    if (constObj.nim) {
      constObj.nim.destroy({
        done(error) {
          constObj.nim = null;
          store.dispatch({type: 'RESET'}); //需要去重置store里面的nim对象
          console.log('destroyNIM', store.getState());
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        },
      });
    } else {
      resolve();
    }
  });

export const initNIM = (account, token, callback) => {
  constObj.nim = NIM.getInstance({
    debug: true,
    appKey: configs.appkey,
    // account: '13916838994',
    // token: '1234567890',
    account,
    token,
    db: true, // 使用数据库
    syncSessionUnread: true,
    // iosPushConfig,
    // androidPushConfig,
    onconnect: () => {
      store.dispatch({type: 'USERID', userID: account});
    },
    onwillreconnect(obj) {
      // 此时说明 SDK 已经断开连接, 请开发者在界面上提示用户连接已断开, 而且正在重新建立连接
      console.log('即将重连');
      console.log(obj.retryCount);
      console.log(obj.duration);
    },
    ondisconnect(event) {
      destroyNIM();
    },
    onerror(event, obj) {
      console.log('IM error:', event, obj);
      // destroyNIM();
      // callback(event);
    },
    onsyncdone() {},
    onmyinfo(info) {
      // 传入名片信息
      store.dispatch({type: 'MYINFO', myInfo: info});
    },
    onupdatemyinfo(info) {
      // 更新名片信息
      store.dispatch({type: 'MYINFO', myInfo: info});
    },
    onmsg(msg) {
      // 当前聊天消息
      console.log('当前聊天消息', msg);
      // dosmoething
      const {session, nim} = store.getState();
      const msgs = session.currentSessionMsgs || [];
      if (session.currentSessionId === msg.sessionId) {
        store.dispatch({
          type: 'SESSION_MSGS',
          currentSessionMsgs: msgs.concat([msg]),
        });
        constObj.nim.sendMsgReceipt({
          msg,
          done: error => {
            // do something
            console.log('sendMsgReceipt', error);
          },
        });
      }
      // if (global.ISANDROID) {
      //   let showText = '';
      //   if (msg.type === 'text') {
      //     showText = msg.text;
      //   } else {
      //     showText = util.mapMsgType(msg);
      //   }
      //   showNotification({
      //     icon: '', title: msg.from, content: showText, time: `${msg.time}`,
      //   });
      // }
    },
    onsessions: onSession,
    onupdatesession: onSession,
    // 系统通知
    onsysmsg: onSysMsgs,
    onofflinesysmsgs: onSysMsgs,
    onSignalingNotify: function (data) {
      console.log('收到通知包 :: onSignalingMutilClientSyncNotify');
      console.log(data);
    },
  });
};

export const login = (account, token) => {
  initNIM(account, token);
};

export const logout = () => {
  constObj.nim.logout({
    done(error) {
      constObj.nim = null;
      // store.dispatch({type: 'RESET'});
      if (error) {
        console.log(error);
      }
    },
  });
};
