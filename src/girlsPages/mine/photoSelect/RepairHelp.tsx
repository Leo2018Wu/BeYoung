import React, {useEffect, useState} from 'react';
import {ScrollView} from 'native-base';
import useRequest from '../../../hooks/useRequest';
import {fetchCase} from '../../../api/photoSelect';
import FastImage from 'react-native-fast-image';
import {BASE_DOWN_URL} from '../../../util/config';
import Layout from '../../../components/Layout';

const Login = () => {
  const {run, result} = useRequest(fetchCase.url, {scene: 'BEATIFY_TUTORIAL'});
  const [list, setList] = useState([]);

  useEffect(() => {
    run();
  }, []);

  useEffect(() => {
    if (result) {
      console.log('--s-s-s-drs', result, JSON.parse(result[0].imgs));
      setList(JSON.parse(result[0].imgs));
    }
  }, [result]);
  return (
    <ScrollView
      style={{
        flex: 1,
      }}>
      {list
        ? list &&
          list.map((item, index) => (
            <FastImage
              style={{
                width: Layout.width,
                height: Layout.height - 110,
              }}
              source={{
                uri: BASE_DOWN_URL + item,
                headers: {Authorization: 'someAuthToken'},
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
          ))
        : null}
    </ScrollView>
  );
};

export default Login;
