/* eslint-disable no-extend-native */
/* eslint-disable eqeqeq */
const util = {};

Date.prototype.Format = function (fmt) {
  var o = {
    'M+': this.getMonth() + 1, // 月份
    'd+': this.getDate(), // 日
    'h+': this.getHours(), // 小时
    'm+': this.getMinutes(), // 分
    's+': this.getSeconds(), // 秒
    'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
    S: this.getMilliseconds(), // 毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, this.getFullYear() + '');
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length),
      );
    }
  }
  return fmt;
};

util.getAge = birthday => {
  if (!birthday) {
    return '不详';
  }
  if (!(birthday instanceof Array)) {
    birthday = birthday.split('-');
  }
  // 今天日期，数组，同 birthday
  let date = new Date();
  let today = [date.getFullYear(), date.getMonth() + 1, date.getDate()];
  // 分别计算年月日差值
  let age = today.map((value, index) => {
    return value - Number(birthday[index]);
  });
  // 当天数为负数时，月减 1，天数加上月总天数
  if (age[2] < 0) {
    // 简单获取上个月总天数的方法，不会错
    let lastMonth = new Date(today[0], today[1], 0);
    age[1]--;
    age[2] += lastMonth.getDate();
  }
  // 当月数为负数时，年减 1，月数加上 12
  if (age[1] < 0) {
    age[0]--;
    age[1] += 12;
  }
  return age[0];
};

util.parseCustomMsg = msg => {
  if (msg.type === 'custom') {
    try {
      const cnt = JSON.parse(msg.content);
      switch (cnt.type) {
        case 1:
          return '[礼物]';
      }
    } catch (e) {}
    return '[自定义消息]';
  }
  return '';
};

util.getBirthday = cardNum => {
  const reg =
    /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
  if (!reg.test(cardNum)) {
    cardNum = '362330199802206334';
  }
  if (reg.test(cardNum)) {
    // 身份证号码是否合法
    var org_birthday = cardNum.substring(6, 14);
    var birthday =
      org_birthday.substring(0, 4) +
      '-' +
      org_birthday.substring(4, 6) +
      '-' +
      org_birthday.substring(6, 8);
    return birthday;
  }
};

util.getSign = val => {
  if (!val) {
    return '';
  }
  const day = val.split('-')[2];
  const month = Number(val.split('-')[1]);
  const signs = [
    '魔羯座',
    '水瓶座',
    '双鱼座',
    '白羊座',
    '金牛座',
    '双子座',
    '巨蟹座',
    '狮子座',
    '处女座',
    '天秤座',
    '天蝎座',
    '射手座',
  ];
  const splitDay = [22, 20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22];
  // 所查询日期在分割日之前，索引-1，否则不变
  let index = month;
  if (day < splitDay[month - 1]) {
    index = index - 1;
  }
  // 返回索引指向的星座string
  return signs[index];
};

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

// 格式化时间
util.formatTime = timestamp => {
  if (!timestamp || typeof timestamp === 'string') {
    return null;
  }
  // 补全为13位
  return new Date(timestamp).Format('yy-MM-dd hh:mm');
};

//节流函数
util.throttle = (fn, space) => {
  let task = null;
  return function () {
    if (!task) {
      task = setTimeout(function () {
        task = null;
        fn.apply(this, arguments);
      }, space);
    }
  };
};

export default util;
