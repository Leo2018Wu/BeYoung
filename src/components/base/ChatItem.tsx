import React from 'react';
import {Text, HStack, Center, Pressable, Box} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import CFastImage from '../CFastImage';
import {useSelector} from 'react-redux';
import {BASE_DOWN_URL} from '../../util/config';

const Content = ({...props}) => {
  const {msg = {}, pos = ''} = props;
  if (msg.type === 'custom') {
    const content = JSON.parse(msg.content);
    // fix 蒋存自定义类型消息type问题（content.type === 2）
    if (content.type === 1 || content.type === 2) {
      // 礼物自定义消息
      return (
        <Box borderRadius={4} overflow="hidden">
          <CFastImage
            url={`${BASE_DOWN_URL + content.giftKey}`}
            styles={{
              width: 100,
              height: 100,
            }}
          />
        </Box>
      );
    }
  }
  return (
    <Text color={pos === 'left' ? 'fontColors.333' : 'white'} fontSize={'sm'}>
      {msg.text}
    </Text>
  );
};

export const ChatLeft = ({msg, navigation}: {msg: any; navigation: any}) => {
  const avatar = (
    <Pressable
      onPress={() => {
        if (navigation && msg?.userId) {
          navigation.navigate('HomeDetail', {userId: msg.userId});
        }
      }}>
      <CFastImage
        url={msg.avatar}
        styles={{
          width: 42,
          height: 42,
          borderRadius: 4,
          marginRight: 8,
        }}
      />
    </Pressable>
  );
  return (
    <HStack>
      {avatar}
      <Center
        p={msg.type === 'text' ? 2 : 0}
        mr="auto"
        borderRadius={10}
        borderBottomLeftRadius={0.5}
        alignItems="center"
        style={{
          minWidth: 60,
          maxWidth: '60%',
          backgroundColor: '#EFEFEF',
        }}>
        <Content msg={msg} pos="left" />
      </Center>
    </HStack>
  );
};

export const ChatRight = ({msg, navigation}: {msg: any; navigation: any}) => {
  const userInfo = useSelector(state => state.user.myUserInfo);
  const avatar = (
    <Pressable onPress={() => navigation && navigation.navigate('Setting')}>
      <CFastImage
        url={userInfo?.headImg}
        styles={{
          width: 42,
          height: 42,
          borderRadius: 4,
          marginLeft: 8,
        }}
      />
    </Pressable>
  );

  return (
    <HStack>
      {msg.type === 'text' ? (
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
          <Center p={2}>
            <Content msg={msg} pos="right" />
          </Center>
        </LinearGradient>
      ) : (
        <Center
          ml="auto"
          borderRadius={10}
          borderBottomLeftRadius={0.5}
          alignItems="center"
          style={{
            minWidth: 60,
            maxWidth: '60%',
          }}>
          <Content msg={msg} pos="right" />
        </Center>
      )}
      {avatar}
    </HStack>
  );
};
