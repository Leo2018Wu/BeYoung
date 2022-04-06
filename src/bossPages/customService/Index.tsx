import {Box, HStack, Stack, Text} from 'native-base';
import React from 'react';
import {} from 'react-native-svg';

const Index = () => {
  return (
    <Box flex={1} bg="bg.f5">
      <Stack space={2}>
        <HStack px={4} h={10} bg={'white'} alignItems="center">
          <Text fontWeight={'bold'} fontSize={'md'}>
            客服微信号：
          </Text>
          <Text fontSize={'lg'} selectable color={'primary.100'}>
            111111
          </Text>
        </HStack>
        <HStack px={4} h={10} bg={'white'} alignItems="center">
          <Text fontWeight={'bold'} fontSize={'md'}>
            客服手机号：
          </Text>
          <Text fontSize={'lg'} color="primary.100" selectable>
            222222
          </Text>
        </HStack>
      </Stack>
    </Box>
  );
};

export default Index;
