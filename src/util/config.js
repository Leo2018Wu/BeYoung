const BASE_URL = 'https://worker.zyxsnet.com:8443/chat/';
const BASE_UPLOAD_URL = `${BASE_URL}cgi/api/oss/getOssAppToken`;
const BASE_DOWN_URL = `${BASE_URL}cgi/api/oss/downloadFile?fileName=`;

module.exports = {
  BASE_URL,
  BASE_DOWN_URL,
  BASE_UPLOAD_URL,
};
