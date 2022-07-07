import React, {useEffect, useRef, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  StyleSheet,
  DeviceEventEmitter,
} from 'react-native';
import {Pressable, HStack, Input, Box, View} from 'native-base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import ChatEmoji from './ChatEmoji';
import CFastImage from '../CFastImage';

const Index = ({pressCb}: {pressCb: Function}) => {
  const inputRef = useRef({});

  const [content, setContent] = useState(''); // 输入框内容
  const [packageValue, setPackageValue] = useState(null);
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

  useEffect(() => {
    DeviceEventEmitter.addListener('KEYBOARD', res => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
      DeviceEventEmitter.removeListener('KEYBOARD', () => {});
    });
  }, [inputRef]);

  const sendMsg = (type = 'text') => {
    let images = [];
    if (packageValue) {
      images.push(packageValue);
    }
    setEmojiShow(false);
    if (type === 'text') {
      pressCb({type: 'text', content: content, images: images});
      setContent('');
    } else {
      pressCb({type});
    }
  };

  return (
    <>
      {packageValue ? (
        <View style={styles.imgView}>
          <CFastImage
            url={packageValue}
            styles={{
              width: 70,
              height: 70,
              borderRadius: 10,
            }}
          />
          <Pressable
            onPress={() => setPackageValue(null)}
            style={styles.delView}>
            <Icon name="closecircle" size={16} color="#B2B2B2" />
          </Pressable>
        </View>
      ) : null}
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
          px={2}
          py={2}
          style={{
            paddingBottom: 10,
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
              Keyboard.dismiss;
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
            onChangeText={e => setContent(e)}
            value={content}
            maxLength={300}
            placeholder="输入你的评论..."
            placeholderTextColor={'tip.placeholder'}
            flex={1}
          />
          {content || packageValue ? (
            <FontAwesome
              onPress={() => {
                sendMsg();
                inputRef.current.blur();
              }}
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
                setContent(`${content + key}`);
              }}
              onSelectPackage={(key: string) => {
                console.log('--key--', key);
                setPackageValue(key);
              }}
            />
          </Box>
        )}
      </KeyboardAvoidingView>
    </>
  );
};

export default Index;

const styles = StyleSheet.create({
  imgView: {
    width: 90,
    height: 90,
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
  delView: {
    position: 'absolute',
    right: 2,
    top: 2,
  },
});
