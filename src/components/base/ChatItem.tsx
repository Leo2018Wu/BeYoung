import React from 'react';
import util from '../../util/util';
import {Text, Box} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';

export const ChatLeft = ({msg}: any) => {
  if (msg.type === 'text') {
    return (
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
    );
  } else {
    return (
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
    );
  }
};

export const ChatRight = ({msg}: any) => {
  if (msg.type === 'text') {
    return (
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
    );
  } else {
    return (
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
    );
  }
};
