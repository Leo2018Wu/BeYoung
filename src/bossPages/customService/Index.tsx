import React from 'react';
import {Box, HStack, Stack, Text} from 'native-base';
import {useSelector} from 'react-redux';

const Index = () => {
  const sysDicts = useSelector(state => state.user.sysDicts);
  const wechat = sysDicts.filter(
    item => item.code === 'CUSTOMER_SERVICE_WECHAT',
  );
  const phone = sysDicts.filter(item => item.code === 'CUSTOMER_SERVICE_PHONE');

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
        </HStack>
        <HStack px={4} h={10} bg={'white'} alignItems="center">
          <Text fontWeight={'bold'} fontSize={'md'}>
            客服手机号：
          </Text>
          <Text fontSize={'lg'} color="primary.100" selectable>
            {phone[0].value}
          </Text>
        </HStack>
      </Stack>
    </Box>
  );
};

export default Index;
