import React from 'react';
import AliyunOSS from 'aliyun-oss-react-native-self';
import {BASE_UPLOAD_URL} from './config';

const configuration = {
  maxRetryCount: 3,
  timeoutIntervalForRequest: 30,
  timeoutIntervalForResource: 24 * 60 * 60,
};
const bucketname = 'young-save-2022';
const endPoint = 'oss-cn-shanghai.aliyuncs.com';
AliyunOSS.initWithServerSTS(BASE_UPLOAD_URL, endPoint, configuration);

const uuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    })
    .toUpperCase();
};

export const upload = async (options = {}) => {
  try {
    const {path = '', type = 'img', second = ''} = options;
    let suffix;
    if (type === 'img') {
      suffix = 'img' + uuid() + path.replace(/.+\./, '.').toLowerCase();
    } else if (type === 'audio') {
      suffix = `voice&voiceduration=${second}&${uuid()}${path
        .replace(/.+\./, '.')
        .toLowerCase()}`;
    }
    return new Promise((reslove, reject) => {
      AliyunOSS.asyncUpload(bucketname, suffix, path)
        .then(res => {
          reslove(suffix);
        })
        .catch(err => {
          reject(err);
        });
    });
  } catch (error) {
    console.error(error);
  }
};
