import React, {useEffect, useState} from 'react';
import {ScrollView} from 'native-base';
import useRequest from '../../../hooks/useRequest';
import {fetchCase} from '../../../api/photoSelect';
import CFastImage from '../../../components/CFastImage';
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
            <CFastImage
              url={`${BASE_DOWN_URL + item}`}
              styles={{
                width: Layout.width,
                height: Layout.height - 110,
              }}
            />
          ))
        : null}
    </ScrollView>
  );
};

export default Login;
