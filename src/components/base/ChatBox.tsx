import React, {useEffect, useRef, useState} from 'react';
import {KeyboardAvoidingView, Platform, Keyboard} from 'react-native';
import {Pressable, HStack, Input, Box} from 'native-base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import ChatEmoji from './ChatEmoji';

const Index = ({pressCb}: {pressCb: Function}) => {
  const inputRef = useRef({});

  const [textValue, setValue] = useState(''); // 输入框内容
  const [isEmojiShow, setEmojiShow] = useState(false);
  const userInfo = useSelector(state => state.user.myUserInfo);

  const _keyboardDidShow = () => {
    setEmojiShow(false);
  };

  const _keyboardDidHide = () => {};

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidShow', () => {});
      Keyboard.removeListener('keyboardDidHide', () => {});
    };
  }, []);

  const sendMsg = (type = 'text') => {
    setEmojiShow(false);
    if (type === 'text') {
      pressCb({type: 'text', value: textValue});
      setValue('');
    } else {
      pressCb({type});
    }
  };

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={90}
      behavior={Platform.OS === 'ios' ? 'position' : 'height'}
      contentContainerStyle={{
        width: '100%',
        position: 'absolute',
        bottom: 0,
        left: 0,
      }}>
      <HStack
        shadow={2}
        alignItems="center"
        w={'full'}
        // h={16}
        px={4}
        py={2}
        style={{
          paddingBottom: 20,
          backgroundColor: '#F1F0F3',
        }}>
        <Pressable
          onPress={() => {
            if (isEmojiShow) {
              inputRef.current.focus();
            } else {
              inputRef.current.blur();
            }
            setEmojiShow(!isEmojiShow);
          }}>
          {!isEmojiShow ? (
            <FontAwesome5 name="smile" size={28} color="#000000" />
          ) : (
            <FontAwesome name="keyboard-o" size={24} color="#000000" />
          )}
        </Pressable>
        {userInfo.gender === 'GENDER_MALE' && (
          <Pressable onPress={() => sendMsg('gift')} ml={4}>
            <Ionicons name="gift" size={26} color="#9650FF" />
          </Pressable>
        )}
        <Input
          multiline
          ref={(e: object) => (inputRef.current = e)}
          enablesReturnKeyAutomatically={true}
          returnKeyType="send"
          onSubmitEditing={() => {
            sendMsg();
          }}
          blurOnSubmit
          fontSize={'sm'}
          variant="filled"
          mx={2}
          paddingLeft={2}
          p={1}
          h={'full'}
          flexWrap={'wrap'}
          type="text"
          textAlignVertical="center"
          backgroundColor={'#fff'}
          onChangeText={e => setValue(e)}
          value={textValue}
          maxLength={300}
          placeholder="输入你的评论..."
          placeholderTextColor={'tip.placeholder'}
          flex={1}
        />
        {textValue ? (
          <FontAwesome
            onPress={() => sendMsg()}
            name="send"
            size={24}
            color="#9650FF"
          />
        ) : null}
      </HStack>
      {isEmojiShow && (
        <Box style={{height: 336}}>
          <ChatEmoji
            onSelectEmoji={(key: string) => {
              setValue(`${textValue + key}`);
            }}
          />
        </Box>
      )}
    </KeyboardAvoidingView>
  );
};

export default Index;
