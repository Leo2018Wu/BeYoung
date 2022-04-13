import React, {useState} from 'react';
import {Box} from 'native-base';
import {queryMyDynamic} from '../../../api/daily';
import CustomFuncFlatList from '../../../components/CustomFuncFlatList';
import DailyItem from '../../../commonPages/daily/DailyItem';
import {useFocusEffect} from '@react-navigation/native';

const Login = () => {
  const [keyData, setKeyData] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      setKeyData(Math.random());
    }, []),
  );

  return (
    <Box flex={1} bg="white">
      <Box my={4} px={4} flex={1}>
        <CustomFuncFlatList
          key={keyData}
          renderItem={({item}: any) => <DailyItem item={item} />}
          url={queryMyDynamic.url}
          par={{}}
        />
      </Box>
    </Box>
  );
};

export default Login;
