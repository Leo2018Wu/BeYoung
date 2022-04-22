import React from 'react';
import {Box, Text} from 'native-base';
import {Image} from 'react-native';
const Empty = () => {
  return (
    <Box alignItems={'center'} mt={'40%'} flex={1}>
      <Image
        style={{
          width: 235,
          height: 167,
        }}
        source={require('../../images/empty_message.png')}
      />
      <Text mt={3} color={'fontColors.gray'}>
        还没有人给你发消息哦～～～
      </Text>
    </Box>
  );
};

export default Empty;
