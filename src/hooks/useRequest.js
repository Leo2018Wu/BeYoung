/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect, useRef} from 'react';
import {useToast} from 'native-base';
import {BASE_URL} from '../util/config';
import getStorage from '../util/Storage';
import AsyncStorage from '@react-native-community/async-storage';
import {DeviceEventEmitter} from 'react-native';
import {logout} from '../nim/link';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

/**
 *
 * @param {请求地址} url
 * @param {请求body} body
 * @param {其他请求选项} options
 * @returns
 */
const useRequest = (
  url,
  body = {},
  options = {
    manual: true,
  },
) => {
  const Toast = useToast();
  const controllerRef = useRef(null); // 请求Controller
  const [loading, setLoading] = useState(!options.manual);
  const [result, setResult] = useState(null);
  const [error] = useState(null);

  useEffect(() => {
    console.log('options', options);
    if (!controllerRef.current) {
      // eslint-disable-next-line no-undef
      controllerRef.current = new AbortController();
    }
    if (!options.manual) {
      // 是否默认执行
      run();
    }
    return () => controllerRef.current.abort(); // 组件卸载时中断未完成的请求
  }, []);

  const run = async (params = body) => {
    console.log('run', params);
    const userInfo = await getStorage(['USERINFO']);
    setLoading(true);
    try {
      if (userInfo) {
        headers.ACCESS_TOKEN = JSON.parse(userInfo).accessToken;
      }
      console.log('header', headers, BASE_URL + url);
      const response = await fetch(BASE_URL + url, {
        method: 'POST',
        headers,
        body: JSON.stringify(params),
        signal: controllerRef.current.signal,
      });
      console.log('response', response);
      if (response.status === 200) {
        setLoading(false);
        const responseJSON = await response.json();
        console.log('responseJSON', responseJSON);
        const {success, data, message, type} = responseJSON;
        if (data === '访问凭据已过期，请重新登陆') {
          AsyncStorage.setItem('LOGIN_NAVIGAITON_NAME', '');
          AsyncStorage.setItem('USERINFO', '');
          AsyncStorage.setItem('chatAccount', '');
          DeviceEventEmitter.emit('LOGIN_EVENT', '');
          logout();
          return;
        }
        if (type !== 'SUCCESS') {
          Toast.show({
            description: message,
            placement: 'top',
          });
        }
        if (!success) {
          // 请求失败
          return;
        }
        setResult(JSON.parse(JSON.stringify(data)));
        return data;
      }
    } catch (errMsg) {
      console.error(errMsg);
      setLoading(false);
    }
  };
  return {
    loading,
    result,
    error,
    run,
  };
};
export default useRequest;
