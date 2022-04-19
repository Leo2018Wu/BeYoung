import React from 'react';
import {Text, Box, HStack} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import CFastImage from '../CFastImage';
import {useSelector} from 'react-redux';
import {BASE_DOWN_URL} from '../../util/config';

export const ChatLeft = ({msg}: any) => {
  const avatar = (
    <CFastImage
      url={msg.avatar}
      styles={{
        width: 42,
        height: 42,
        borderRadius: 4,
        marginRight: 8,
      }}
    />
  );
  if (msg.type === 'text') {
    return (
      <HStack>
        {avatar}
        <Box
          p={4}
          mr="auto"
          borderRadius={10}
          borderBottomLeftRadius={0.5}
          alignItems="center"
          style={{
            minWidth: 60,
            maxWidth: '60%',
            backgroundColor: '#EFEFEF',
          }}>
          <Text fontSize={'sm'}>{msg.text}</Text>
        </Box>
      </HStack>
    );
  } else if (msg.type === 'custom') {
    const content = JSON.parse(msg.content);
    return (
      <HStack mr={'auto'}>
        <Box borderRadius={4} overflow="hidden">
          <CFastImage
            url={`${BASE_DOWN_URL + content.giftKey}`}
            styles={{
              width: 100,
              height: 100,
            }}
          />
        </Box>
        {avatar}
      </HStack>
    );
  } else {
    return (
      <HStack>
        {avatar}
        <Box
          p={4}
          mr="auto"
          borderRadius={10}
          borderBottomLeftRadius={0.5}
          alignItems="center"
          style={{
            minWidth: 60,
            maxWidth: '60%',
            backgroundColor: '#EFEFEF',
          }}>
          <Text fontSize={'sm'}>暂时只支持发送文本消息</Text>
        </Box>
      </HStack>
    );
  }
};

export const ChatRight = ({msg}: any) => {
  const userInfo = useSelector(state => state.user.myUserInfo);
  const avatar = (
    <CFastImage
      url={userInfo?.headImg}
      styles={{
        width: 42,
        height: 42,
        borderRadius: 4,
        marginLeft: 8,
      }}
    />
  );
  if (msg.type === 'text') {
    return (
      <HStack>
        <LinearGradient
          style={{
            minWidth: 60,
            maxWidth: '60%',
            marginLeft: 'auto',
            borderRadius: 10,
            borderBottomRightRadius: 2,
          }}
          start={{x: 0, y: 0.5}}
          end={{x: 0.9, y: 0.5}}
          colors={['#B83AF3', '#6950FB']}>
          <Box p={4} justifyContent="center">
            <Text fontSize={'sm'} color="white">
              {msg.text}
            </Text>
          </Box>
        </LinearGradient>
        {avatar}
      </HStack>
    );
  } else if (msg.type === 'custom') {
    const content = JSON.parse(msg.content);
    return (
      <HStack ml={'auto'}>
        <Box borderRadius={4} overflow="hidden">
          <CFastImage
            url={`${BASE_DOWN_URL + content.giftKey}`}
            styles={{
              width: 100,
              height: 100,
            }}
          />
        </Box>
        {avatar}
      </HStack>
    );
  } else {
    return (
      <HStack>
        <LinearGradient
          style={{
            minWidth: 60,
            maxWidth: '60%',
            marginLeft: 'auto',
            borderRadius: 10,
            borderBottomRightRadius: 2,
          }}
          start={{x: 0, y: 0.5}}
          end={{x: 0.9, y: 0.5}}
          colors={['#B83AF3', '#6950FB']}>
          <Box p={4} justifyContent="center">
            <Text fontSize={'sm'} color="white">
              暂时只支持发送文本消息
            </Text>
          </Box>
        </LinearGradient>
        {avatar}
      </HStack>
    );
  }
};
