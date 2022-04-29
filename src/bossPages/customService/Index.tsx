import React from 'react';
import {
  Box,
  HStack,
  Pressable,
  Stack,
  Text,
  useClipboard,
  useToast,
} from 'native-base';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

const Index = () => {
  const sysDicts = useSelector(state => state.user.sysDicts);
  const wechat = sysDicts.filter(
    item => item.code === 'CUSTOMER_SERVICE_WECHAT',
  );
  const toast = useToast();
  const {onCopy} = useClipboard();
  const phone = sysDicts.filter(item => item.code === 'CUSTOMER_SERVICE_PHONE');

  const copyText = (value: string) => {
    onCopy(value);
    toast.show({description: '复制成功', placement: 'top'});
  };

  return (
    <Box flex={1} bg="bg.f5">
      <Stack space={2}>
        <HStack px={4} h={10} bg={'white'} alignItems="center">
          <Text fontWeight={'bold'} fontSize={'md'}>
            客服微信号：
          </Text>
          <Text fontSize={'lg'} selectable color={'primary.100'}>
            {wechat[0].value}
          </Text>
          <Pressable ml={2} onPress={() => copyText(wechat[0].value)}>
            <Icon name="copy" size={20} color="#9650FF" />
          </Pressable>
        </HStack>
        <HStack px={4} h={10} bg={'white'} alignItems="center">
          <Text fontWeight={'bold'} fontSize={'md'}>
            客服手机号：
          </Text>
          <Text fontSize={'lg'} color="primary.100" selectable>
            {phone[0].value}
          </Text>
          <Pressable ml={2} onPress={() => copyText(phone[0].value)}>
            <Icon name="copy" size={20} color="#9650FF" />
          </Pressable>
        </HStack>
      </Stack>
    </Box>
  );
};

export default Index;
