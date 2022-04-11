const util = {};

// 消息类型列表
util.mapMsgType = function (msg) {
  const map = {
    text: '文本消息',
    image: '图片消息',
    file: '文件消息',
    audio: '语音消息',
    video: '视频消息',
    geo: '地理位置消息',
    tip: '提醒消息',
    custom: '自定义消息',
    notification: '系统通知',
    robot: '机器人消息',
  };
  const type = msg.type;
  return map[type] || '未知消息类型';
};

export default util;
