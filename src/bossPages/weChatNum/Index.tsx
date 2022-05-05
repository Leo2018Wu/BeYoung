import React from 'react';
import {
  Box,
  HStack,
  Pressable,
  Text,
  useClipboard,
  useToast,
  VStack,
} from 'native-base';
import CustomFuncFlatList from '../../components/CustomFuncFlatList';
import Icon from 'react-native-vector-icons/Ionicons';

import CFastImage from '../../components/CFastImage';
import {queryUnlockWeChat} from '../../api/user';

interface ItemProp {
  relateWeChat: string;
  relateNickName: string;
  relateHeadImg: string;
  updateTime: string;
  userId: string;
}

const isEqual = (pre: any, next: any) => {
  // 优化无关渲染
  return JSON.stringify(pre.item) === JSON.stringify(next.item);
};

const Item = React.memo(({item, navigation}: {item: ItemProp}) => {
  const {onCopy} = useClipboard();
  const toast = useToast();
  const copyText = (value: string) => {
    onCopy(value);
    toast.show({description: '复制成功', placement: 'top', duration: 1000});
  };
  return (
    <HStack mb={4} bg={'white'} px={4} py={2} alignItems="center">
      <Pressable
        onPress={() =>
          navigation.navigate('HomeDetail', {userId: item.relateUserId})
        }>
        <CFastImage
          url={item.relateHeadImg}
          styles={{
            width: 50,
            height: 50,
            borderRadius: 25,
          }}
        />
      </Pressable>
      <VStack ml={2}>
        <HStack>
          {/* <Text fontWeight={'bold'} fontSize="md">
            昵称:
          </Text> */}
          <Text fontWeight={'bold'} fontSize="md">
            {item.relateNickName}
          </Text>
        </HStack>
        <HStack>
          <Text fontSize={'sm'} style={{color: '#5F5E5E'}}>
            微信号：
          </Text>
          <Text
            selectable
            fontSize={'sm'}
            color={'primary.100'}
            fontWeight={'bold'}>
            {item.relateWeChat || '该用户还未填写微信号'}
          </Text>
          <Pressable ml={2} onPress={() => copyText(item.relateWeChat)}>
            <Icon name="copy" size={20} color="#9650FF" />
          </Pressable>
        </HStack>
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
const Index = ({...props}) => {
  return (
    <Box flex={1}>
      <CustomFuncFlatList
        renderItem={({item}: {item: ItemProp}) => (
          <Item navigation={props.navigation} item={item} />
        )}
        url={queryUnlockWeChat.url}
      />
    </Box>
  );
};
export default Index;
