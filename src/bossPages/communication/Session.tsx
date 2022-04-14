import React, {useEffect, useRef, useState} from 'react';
import {
  Center,
  ScrollView,
  Text,
  Box,
  HStack,
  Pressable,
  Spinner,
  Input,
  KeyboardAvoidingView,
} from 'native-base';
import CFastImage from '../../components/CFastImage';
import {connect} from 'react-redux';
import constObj from '../../store/constant';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import useRequest from '../../hooks/useRequest';
import {fetchAccountUser} from '../../api/common';
import {ChatLeft, ChatRight} from '../../components/base/ChatItem';
import {InteractionManager, Keyboard, Platform} from 'react-native';

import util from '../../util/util';
import Gifts from '../../components/base/Gifts';

let _scrollTimer: any;
const BOTTOM_FIXED_HEIGHT = 92; // 底部遮盖拦高度
const mapStateToProps = (state: any) => {
  return {
    msgs: state.msg.currentSessionMsgs || [],
    currentSessionId: state.session.currentSessionId,
  };
};

const Msgs = ({...props}) => {
  const scrollRef = useRef(null);
  const inputRef = useRef(null);
  const insets = useSafeAreaInsets();
  const [textValue, setValue] = useState(''); // 输入框内容
  const [keyboradShow, setKeyborad] = useState(false); // 键盘拉起状态
  const [giftModal, setGiftModal] = useState(false); // 礼物弹窗
  const {result: chatUserInfo} = useRequest(
    fetchAccountUser.url,
    {
      accountIds: [props.route.params.chatUserId],
    },
    fetchAccountUser.options,
  );
  const scrollToEnd = () => {
    if (scrollRef.current) {
      clearTimeout(_scrollTimer);
      _scrollTimer = setTimeout(() => {
        InteractionManager.runAfterInteractions(() => {
          scrollRef.current.scrollToEnd();
        });
      }, 500);
    }
  };

  const setCurrentSession = () => {
    //调用此接口会重置该会话消息未读数
    constObj.nim && constObj.nim.setCurrSession(props.currentSessionId);
  };

  const _keyboardDidShow = () => {
    setKeyborad(true);
  };

  const _keyboardDidHide = () => {
    setKeyborad(false);
  };

  useEffect(() => {
    scrollToEnd();
  }, [props.msgs]);

  useEffect(() => {
    scrollToEnd();
  }, [giftModal, keyboradShow]);

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
    setCurrentSession();
    constObj.nim &&
      constObj.nim.getLocalMsgs({
        sessionId: props.currentSessionId,
        limit: 100,
        done(err: any, obj: any) {
          console.log(err, obj);
          props.dispatch({
            type: 'SESSION_MSGS',
            currentSessionMsgs: obj.msgs || [],
          });
        },
      });
    return () => {
      //取消设置当前会话
      constObj.nim && constObj.nim.resetCurrSession();
      _scrollTimer && clearTimeout(_scrollTimer);
      // 退出重置当前会话ID
      props.dispatch({
        type: 'RESET_SESSIONID',
      });
      props.dispatch({
        type: 'SESSION_MSGS',
        currentSessionMsgs: [],
      });
    };
  }, []);

  const sendMsg = () => {
    setValue('');
    constObj.nim &&
      constObj.nim.sendText({
        scene: 'p2p',
        // isUnreadable: false,
        to: props.route.params.chatUserId,
        text: textValue,
        done: (err: any, done: any) => {
          setValue('');
          props.dispatch({
            type: 'MERGE_SESSION_MSGS',
            msg: done,
          });
          scrollToEnd();
          console.log('done', err, done);
          if (err) {
            console.log('sendFail', err);
          }
          // if (!err) {
          //   setValue('');
          // }
        },
      });
  };

  const {msgs} = props;
  if (!chatUserInfo) {
    return (
      <Center flex={1}>
        <Spinner size={'lg'} color="primary.100" />
      </Center>
    );
  }
  return (
    <Box bg={'white'} flex={1} style={{paddingBottom: BOTTOM_FIXED_HEIGHT}}>
      <LinearGradient
        style={{
          position: 'relative',
          zIndex: 1,
        }}
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 0.5}}
        colors={['#B83AF3', '#6950FB']}>
        <Box justifyContent="center" style={{paddingTop: insets.top}}>
          <HStack
            px={4}
            style={{height: 52}}
            justifyContent="space-between"
            alignItems={'center'}>
            <Pressable
              h={'full'}
              onPress={() => props.navigation.goBack()}
              w={10}
              justifyContent="center">
              <Icon name="chevron-left" color={'white'} size={32} />
            </Pressable>
            <Text color={'white'} fontSize="lg" fontWeight={'bold'}>
              {chatUserInfo[0]?.nickName || '暂无昵称'}
            </Text>
            <Box h={'full'} justifyContent="center" w={10}>
              <CFastImage
                url={chatUserInfo[0]?.headImg || ''}
                styles={{
                  width: 28,
                  height: 28,
                  borderRadius: 14,
                }}
              />
            </Box>
          </HStack>
        </Box>
      </LinearGradient>
      <KeyboardAvoidingView
        contentContainerStyle={{
          height: '100%',
        }}
        behavior={Platform.OS === 'ios' ? 'position' : 'height'}
        style={{height: '100%'}}>
        <ScrollView
          ref={e => {
            scrollRef.current = e;
            scrollToEnd();
          }}
          pt={4}
          px={2}
          mb={5}
          flex={1}>
          {msgs &&
            msgs.map((item: any, index: any) => {
              return (
                <Box key={index} mb={4}>
                  {util.formatTime(item.time) && (
                    <Text
                      alignSelf={'center'}
                      mb={2}
                      fontSize={'xs'}
                      style={{
                        color: '#9B9B9B',
                      }}>
                      {util.formatTime(item.time)}
                    </Text>
                  )}

                  {item.flow === 'in' && (
                    <ChatLeft
                      key={index}
                      msg={Object.assign(item, {
                        avatar: chatUserInfo[0]?.headImg,
                      })}
                    />
                  )}
                  {item.flow === 'out' && <ChatRight key={index} msg={item} />}
                </Box>
              );
            })}
        </ScrollView>
        <Box
          w={'full'}
          shadow={2}
          borderRadius={giftModal ? 10 : 0}
          style={{
            paddingBottom: !keyboradShow ? insets.bottom : 10,
            backgroundColor: '#fff',
          }}>
          {giftModal && (
            <Box
              w={'full'}
              borderTopRadius={10}
              style={{
                backgroundColor: '#00000060',
              }}>
              <Gifts />
            </Box>
          )}
          <HStack bg={'white'} py={2.5} alignItems="center" w={'full'} px={4}>
            <FontAwesome5 name="smile" size={28} color="#C1C0C9" />
            <Pressable onPress={() => setGiftModal(!giftModal)}>
              <Ionicons
                style={{
                  marginLeft: 16,
                }}
                name="gift"
                size={26}
                color="#9650FF"
              />
            </Pressable>
            <Input
              ref={e => (inputRef.current = e)}
              multiline
              enablesReturnKeyAutomatically={true}
              returnKeyType="send"
              onSubmitEditing={() => {
                sendMsg();
                inputRef.current.focus();
              }}
              blurOnSubmit
              fontSize={'md'}
              variant="filled"
              py={2}
              mx={4}
              type="text"
              textAlignVertical="top"
              height="full"
              onChangeText={e => setValue(e)}
              value={textValue}
              maxLength={300}
              placeholder="输入你的消息..."
              placeholderTextColor={'tip.placeholder'}
              flex={1}
            />
            {textValue ? (
              <Pressable onPress={() => sendMsg()}>
                <FontAwesome name="send" size={24} color="#9650FF" />
              </Pressable>
            ) : null}
          </HStack>
        </Box>
      </KeyboardAvoidingView>
    </Box>
  );
};

export default connect(mapStateToProps)(Msgs);
