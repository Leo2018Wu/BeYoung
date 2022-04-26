import React from 'react';
import {Box, HStack, Text, VStack} from 'native-base';
import CustomFuncFlatList from '../../components/CustomFuncFlatList';
import CFastImage from '../../components/CFastImage';
import {queryUnlockWeChat} from '../../api/user';

interface ItemProp {
  relateWeChat: string;
  relateNickName: string;
  relateHeadImg: string;
  updateTime: string;
}

const isEqual = (pre: any, next: any) => {
  // 优化无关渲染
  return JSON.stringify(pre.item) === JSON.stringify(next.item);
};

const Item = React.memo(({item}: {item: ItemProp}) => {
  return (
    <HStack mb={4} bg={'white'} px={4} py={2} alignItems="center">
      <CFastImage
        url={item.relateHeadImg}
        styles={{
          width: 50,
          height: 50,
          borderRadius: 25,
        }}
      />
      <Text fontWeight={'bold'} ml={2} fontSize="md">
        {item.relateNickName}
      </Text>
      <VStack ml={'auto'}>
        <Text fontSize={'md'} style={{color: '#5F5E5E'}}>
          微信号：
          <Text selectable color={'primary.100'} fontWeight={'bold'}>
            {item.relateWeChat || '该用户还未填写微信号'}
          </Text>
        </Text>
        {/* <Text fontSize={'md'} style={{color: '#5F5E5E'}}>
          手机号：
          <Text selectable color={'primary.100'} fontWeight={'bold'}>
            11111
          </Text>
        </Text> */}
      </VStack>
    </HStack>
  );
}, isEqual);
const Index = () => {
  return (
    <Box flex={1}>
      <CustomFuncFlatList
        renderItem={({item}: {item: ItemProp}) => <Item item={item} />}
        url={queryUnlockWeChat.url}
      />
    </Box>
  );
};
export default Index;
