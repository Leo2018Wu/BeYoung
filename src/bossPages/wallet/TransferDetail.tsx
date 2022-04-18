import React from 'react';
import {Box, Text, HStack, Pressable} from 'native-base';
import CustomFuncFlatList from '../../components/CustomFuncFlatList';
import {queryDynamic} from '../../api/daily';

const isEqual = (pre: any, next: any) => {
  // 优化无关渲染
  return JSON.stringify(pre.item) === JSON.stringify(next.item);
};

const Item = React.memo(() => {
  return (
    <Pressable
      w={'full'}
      style={{backgroundColor: '#ffffff'}}
      bg={'white'}
      px={4}
      py={3}
      mb={2.5}>
      <HStack justifyContent={'space-between'} alignItems="center">
        <Text fontSize={'md'} fontWeight="bold">
          支付宝充值
        </Text>
        <Text color={'primary.100'} fontSize={'lg'} fontWeight="bold">
          1200
        </Text>
      </HStack>
      <HStack justifyContent={'space-between'} alignItems="center">
        <Text fontSize={'md'} color={'fontColors.b2'}>
          2020-07-06 17:04
        </Text>
        <Text fontSize={'md'} color={'fontColors._72'}>
          余额 1200
        </Text>
      </HStack>
    </Pressable>
  );
}, isEqual);

const Index = () => {
  return (
    <Box bg={'bg.f5'} flex={1}>
      <CustomFuncFlatList
        renderItem={({item}: {item: any}) => <Item item={item} />}
        url={queryDynamic.url}
        par={{}}
      />
    </Box>
  );
};

export default Index;
