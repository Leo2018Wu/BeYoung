/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect, useRef} from 'react';
import {useToast} from 'native-base';

// const BASE_URL = 'https://lms.hymjweb.com:9443/flps';
const BASE_URL = 'https://worker.zyxsnet.com:8443/hwds/cgi/';

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
    manual: false,
  },
) => {
  const Toast = useToast();
  const controllerRef = useRef(null); // 请求Controller
  const [loading, setLoading] = useState(!options.manual);
  const [result, setResult] = useState(null);
  const [error] = useState(null);

  useEffect(() => {
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

  const run = async () => {
    setLoading(true);
    try {
      const response = await fetch(BASE_URL + url, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
        signal: controllerRef.current.signal,
      });
      if (response.status === 200) {
        setLoading(false);
        const responseJSON = await response.json();
        const {data, message} = responseJSON;
        setResult(data);
        Toast.show({
          description: message,
          placement: 'top',
        });
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
