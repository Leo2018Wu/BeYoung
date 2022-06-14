import React from 'react';
import {Box} from 'native-base';
import CustomFuncFlatList from '../../components/CustomFuncFlatList';
import {fetchWalletDetail} from '../../api/wallet';
import TransferDetailItem from './TransferDetailItem';

const Login = () => {
  return (
    <Box flex={1} bg="#F6F6F6">
      <Box my={4} px={0} flex={1}>
        <CustomFuncFlatList
          renderItem={({item}: any) => <TransferDetailItem item={item} />}
          url={fetchWalletDetail.url}
        />
      </Box>
    </Box>
  );
};

export default Login;
