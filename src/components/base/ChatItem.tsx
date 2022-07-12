import React from 'react';
import {Text, HStack, Center, Pressable} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import CFastImage from '../CFastImage';
import {useSelector} from 'react-redux';

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
        p={2}
        mr="auto"
        borderRadius={10}
        borderBottomLeftRadius={0.5}
        alignItems="center"
        style={{
          minWidth: 60,
          maxWidth: '60%',
          backgroundColor: '#EFEFEF',
        }}>
        <Text color={'fontColors.333'} fontSize={'sm'}>
          {msg.text}
        </Text>
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
    <HStack alignItems={'center'}>
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
          <Text color={'white'} fontSize={'sm'}>
            {msg.text}
          </Text>
        </Center>
      </LinearGradient>
      {avatar}
    </HStack>
  );
};
