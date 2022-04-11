import React, {useState} from 'react';
import {Box} from 'native-base';
import {queryMyDynamic} from '../../../api/daily';
import CustomFlatList from '../../../components/CustomFlatList';
import DailyItem from '../../../commonPages/daily/DailyItem';
import {useFocusEffect} from '@react-navigation/native';

const Login = () => {
  const [keyData, setKeyData] = useState(0);
  const params = {
    orders: [
      {
        column: 'createTime',
        dir: 'desc',
        chinese: false,
      },
    ],
  };

  useFocusEffect(
    React.useCallback(() => {
      setKeyData(Math.random());
    }, []),
  );

  return (
    <Box flex={1} bg="white">
      <Box my={4} px={4} flex={1}>
        <CustomFlatList
          key={keyData}
          renderItem={({item}: any) => <DailyItem item={item} />}
          isPage={true}
          api={{
            url: queryMyDynamic.url,
            params: params,
          }}
        />
      </Box>
    </Box>
  );
};

export default Login;
