import React from 'react';
import {Box, Text, HStack, Pressable} from 'native-base';
import CustomFuncFlatList from '../../components/CustomFuncFlatList';
import {fetchRechargeRecord} from '../../api/wallet';
import {useSelector} from 'react-redux';
import {getDictName} from '../../util/dictAnaly';

interface ItemProps {
  applyTime: string;
  rechargeMethod: string;
  rmbAmount: string | number;
  coinNum: string | number;
  rechargeStatus: string;
}

const isEqual = (pre: any, next: any) => {
  // 优化无关渲染
  return JSON.stringify(pre.item) === JSON.stringify(next.item);
};

const Item = React.memo(({item, sysDicts}: {item: ItemProps; sysDicts: []}) => {
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
          {getDictName(sysDicts, item.rechargeMethod)}(
          {getDictName(sysDicts, item.rechargeStatus)})
        </Text>
        <Text color={'primary.100'} fontSize={'lg'} fontWeight="bold">
          {item.coinNum}青贝
        </Text>
      </HStack>
      <HStack justifyContent={'space-between'} alignItems="center">
        <Text fontSize={'md'} color={'fontColors.b2'}>
          {item.applyTime}
        </Text>
        <Text fontSize={'md'} color={'fontColors._72'}>
          ¥{item.rmbAmount}
        </Text>
      </HStack>
    </Pressable>
  );
}, isEqual);

const Index = () => {
  const sysDicts = useSelector(state => state.user.sysDicts);
  return (
    <Box bg={'bg.f5'} flex={1}>
      <CustomFuncFlatList
        renderItem={({item}: {item: ItemProps}) => (
          <Item sysDicts={sysDicts} item={item} />
        )}
        url={fetchRechargeRecord.url}
      />
    </Box>
  );
};

export default Index;
