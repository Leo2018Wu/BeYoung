import React from 'react';
import {Text, Box, HStack, Center, Pressable} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import CFastImage from '../CFastImage';
import {useSelector} from 'react-redux';
import {BASE_DOWN_URL} from '../../util/config';
import util from '../../util/util';
import emojiObj from '../../res/emoji';
import {Image} from 'react-native';

const ChatContent = ({...props}) => {
  const {msg = {}, pos = ''} = props;
  const {emoji} = emojiObj.emojiList;
  if (msg.type === 'text') {
    let showText = msg.text;
    const showTextArray = [];
    if (/\[[^\]]+\]/.test(showText)) {
      const emojiItems = showText.match(/\[[^\]]+\]/g);
      emojiItems.forEach((item: string) => {
        const wordIndex = showText.indexOf(item);
        if (wordIndex > 0) {
          showTextArray.push(showText.substr(0, wordIndex));
          showText = showText.substr(wordIndex);
        }
        showTextArray.push(item);
        showText = showText.substr(item.length);
      });
    }
    if (showText.length > 0) {
      showTextArray.push(showText);
    }
    return (
      <HStack py={2} px={2} flexWrap={'wrap'} alignItems={'center'}>
        {showTextArray.map((item, index) => {
          const id = `${item}${index}`;
          if (emoji[item]) {
            return (
              <Image
                key={id}
                source={emoji[item].img}
                style={{width: 5 * 5, height: 5 * 5}}
              />
            );
          }
          return (
            <Text
              color={pos === 'left' ? 'fontColors.333' : 'white'}
              key={id}
              fontSize={'sm'}>
              {item}
            </Text>
          );
        })}
      </HStack>
    );
  } else if (msg.type === 'custom') {
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
  //用于会话列表出展示消息缩略
  const showMsg = util.parseCustomMsg(msg);
  return <Text fontSize={'sm'}>{showMsg}</Text>;
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
        mr="auto"
        borderRadius={10}
        borderBottomLeftRadius={0.5}
        alignItems="center"
        style={{
          minWidth: 60,
          maxWidth: '60%',
          backgroundColor: '#EFEFEF',
        }}>
        <ChatContent pos="left" msg={msg} />
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
        <Center>
          <ChatContent pos="right" msg={msg} />
        </Center>
      </LinearGradient>
      {avatar}
    </HStack>
  );
};
