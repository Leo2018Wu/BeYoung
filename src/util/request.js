import {BASE_URL} from '../util/config';
import getStorage from '../util/Storage';

const fetchData = async (url, params) => {
  const userInfo = await getStorage(['USERINFO']);
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ACCESS_TOKEN: userInfo && JSON.parse(userInfo).accessToken,
  };

  const response = await fetch(BASE_URL + url, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
  if (response.status === 200) {
    const responseJSON = await response.json();
    return responseJSON;
  }
};

export default fetchData;
