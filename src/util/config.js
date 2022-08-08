const BASE_URL = __DEV__
  ? 'https://worker.zyxsnet.com:8443/chat/'
  : 'https://worker.zyxsnet.com/';
const BASE_UPLOAD_URL = `${BASE_URL}cgi/api/oss/getOssAppToken`;
const BASE_DOWN_URL = `${BASE_URL}cgi/api/oss/downloadFile?fileName=`;

module.exports = {
  BASE_URL,
  BASE_DOWN_URL,
  BASE_UPLOAD_URL,
};
