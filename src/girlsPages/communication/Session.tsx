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
  Actionsheet,
  useDisclose,
  View,
} from 'native-base';
import CFastImage from '../../components/CFastImage';
import {connect} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import IconNew from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import useRequest from '../../hooks/useRequest';
import {fetchAccountUser} from '../../api/common';
import {ChatLeft, ChatRight} from '../../components/base/ChatItem';
import Intimacy from '../../components/base/Intimacy';
import {InteractionManager, Keyboard, Platform} from 'react-native';
import util from '../../util/util';
import ChatEmoji from '../../components/base/ChatEmoji';
import ReplyEmoj from '../../components/base/ReplyEmoj';
import QuickReply from '../../components/base/QuickReply';
import {sendText, getLocalMsgs, sendCustomMsg} from '../../store/action/msg';
import {setCurrSession, resetCurrSession} from '../../store/action/session';

const genMsgs = (msgList = [], interval = 30 * 1000, timeKey = 'time') => {
  let groupMsg: {time: any; msgList: any[]}[] = [];
  let lastGm: {time: any; msgList: any} | null = null;
  msgList.forEach(msg => {
    if (lastGm == null) {
      lastGm = {time: msg[timeKey], msgList: [msg]};
      groupMsg.push(lastGm);
    } else {
      if (msg[timeKey] - lastGm.time <= interval) {
        lastGm.msgList.push(msg);
      } else {
        lastGm = {time: msg[timeKey], msgList: [msg]};
        groupMsg.push(lastGm);
      }
    }
  });

  return groupMsg;
};

let _scrollTimer: any;
const BOTTOM_FIXED_HEIGHT = 92; // 底部遮盖拦高度
const mapStateToProps = (state: any) => {
  return {
    myUserInfo: state.user.myUserInfo,
    msgs: state.msg.currentSessionMsgs || [],
    currentSessionId: state.session.currentSessionId,
  };
};

const Msgs = ({...props}) => {
  const scrollRef = useRef({});
  const inputRef = useRef({});
  const insets = useSafeAreaInsets();
  const [textValue, setValue] = useState(''); // 输入框内容
  const [keyboradShow, setKeyborad] = useState(false); // 键盘拉起状态
  const {isOpen, onOpen, onClose} = useDisclose();
  const [quickFlag, setQuickFlag] = useState(false); //判断表情回复或快捷回复
  const [isEmojiShow, setIsEmojiShow] = useState(false);
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
          scrollRef.current?.scrollToEnd && scrollRef.current.scrollToEnd();
        });
      }, 500);
    }
  };

  const setCurrentSession = () => {
    //调用此接口会重置该会话消息未读数
    props.dispatch(setCurrSession({sessionId: props.currentSessionId}));
  };

  const _keyboardDidShow = () => {
    setKeyborad(true);
    setIsEmojiShow(false);
  };

  const _keyboardDidHide = () => {
    setKeyborad(false);
  };

  // 自定义表情回复
  const replyEmojFunc = async (item: object) => {
    try {
      const content = {
        type: 2,
        giftKey: item.url,
      };
      props.dispatch(
        sendCustomMsg({
          to: props.route.params.chatUserId,
          content,
        }),
      );
      scrollToEnd();
      onClose();
    } catch (error) {
      console.log('replyEmoj', error);
    }
  };

  // 快捷回复
  const quickReplyFunc = async (item: object) => {
    props.dispatch(
      sendText({to: props.route.params.chatUserId, text: item.content}),
    );
    scrollToEnd();
    onClose();
  };

  useEffect(() => {
    scrollToEnd();
  }, [props.msgs]);

  useEffect(() => {
    scrollToEnd();
  }, [keyboradShow, isEmojiShow]);

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
    props.dispatch(getLocalMsgs({sessionId: props.currentSessionId}));
    return () => {
      //取消设置当前会话
      props.dispatch(resetCurrSession());
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
    props.dispatch(
      sendText({to: props.route.params.chatUserId, text: textValue}),
    );
    setValue('');
    scrollToEnd();
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
            justifyContent="center"
            alignItems={'center'}>
            <Pressable
              h={'full'}
              onPress={() => props.navigation.goBack()}
              w={10}
              style={{
                position: 'absolute',
                left: 16,
              }}
              justifyContent="center">
              <Icon name="chevron-left" color={'white'} size={32} />
            </Pressable>
            <View>
              <Text
                alignSelf={'center'}
                color={'white'}
                fontSize="md"
                fontWeight={'bold'}>
                {chatUserInfo[0]?.nickName || '暂无昵称'}
              </Text>
            </View>
            {chatUserInfo[0]?.intimacy ? (
              <Box
                style={{
                  position: 'absolute',
                  right: 16,
                }}>
                <Intimacy num={chatUserInfo[0]?.intimacy} />
              </Box>
            ) : // <View>
            //   <Text fontSize={'xs'} textAlign={'center'} color={'#fff'}>
            //     亲密度{chatUserInfo[0]?.intimacy}
            //   </Text>
            // </View>
            // <Box
            //   style={{
            //     position: 'absolute',
            //     right: 16,
            //   }}>
            //   <Intimacy num={chatUserInfo[0]?.intimacy} />
            // </Box>
            null}

            {/* <Box h={'full'} justifyContent="center" w={10}>
              <CFastImage
                url={chatUserInfo[0]?.headImg || ''}
                styles={{
                  width: 28,
                  height: 28,
                  borderRadius: 14,
                }}
              />
            </Box> */}
          </HStack>
        </Box>
      </LinearGradient>
      <Actionsheet hideDragIndicator isOpen={isOpen} onClose={onClose}>
        {quickFlag ? (
          <Actionsheet.Content
            style={{
              backgroundColor: '#1f2937',
              borderRadius: 40,
            }}>
            <ReplyEmoj
              clickItem={(item: object) => {
                replyEmojFunc(item);
              }}
              closeItem={() => {
                onClose();
              }}
            />
          </Actionsheet.Content>
        ) : (
          <Actionsheet.Content
            style={{
              backgroundColor: '#fff',
              borderRadius: 40,
            }}>
            <QuickReply
              clickItem={(item: object) => {
                quickReplyFunc(item);
              }}
              closeItem={() => {
                onClose();
              }}
            />
          </Actionsheet.Content>
        )}
      </Actionsheet>
      <KeyboardAvoidingView
        contentContainerStyle={{
          height: '100%',
        }}
        behavior={Platform.OS === 'ios' ? 'position' : 'height'}
        style={{height: '100%'}}>
        <ScrollView
          ref={(e: object) => {
            scrollRef.current = e;
            scrollToEnd();
          }}
          pt={4}
          px={2}
          mb={5}
          flex={1}>
          {genMsgs(msgs) &&
            genMsgs(msgs).map((item: any, index: any) => {
              return (
                <Box key={index}>
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
                  {item.msgList.map((ele: any, idx: number) => (
                    <Box key={idx} mb={4}>
                      {ele.flow === 'in' && (
                        <ChatLeft
                          msg={Object.assign(ele, {
                            avatar: chatUserInfo[0]?.headImg,
                          })}
                        />
                      )}
                      {ele.flow === 'out' && <ChatRight msg={ele} />}
                    </Box>
                  ))}
                </Box>
              );
            })}
        </ScrollView>
        <Box
          w={'full'}
          shadow={2}
          style={{
            // paddingBottom: !keyboradShow ? insets.bottom : 10,
            paddingBottom: Platform.OS === 'ios' ? 20 : 0,
            backgroundColor: '#F1F0F3',
          }}>
          <HStack bg={'#F1F0F3'} py={2.5} alignItems="center" w={'full'} px={4}>
            <Pressable
              onPress={() => {
                if (isEmojiShow) {
                  inputRef.current.focus();
                } else {
                  inputRef.current.blur();
                }
                setIsEmojiShow(!isEmojiShow);
              }}>
              {!isEmojiShow ? (
                <FontAwesome5 name="smile" size={22} color="#000000" />
              ) : (
                <FontAwesome name="keyboard-o" size={22} color="#000000" />
              )}
            </Pressable>
            <Octicons
              onPress={() => {
                setQuickFlag(true);
                onOpen();
              }}
              style={{
                marginLeft: 12,
              }}
              name="package"
              color={'#9650FF'}
              size={22}
            />
            <Pressable
              onPress={() => {
                setQuickFlag(false);
                onOpen();
              }}>
              <IconNew
                style={{
                  marginLeft: 12,
                }}
                name="quickreply"
                size={22}
                color="#9650FF"
              />
            </Pressable>
            <Input
              ref={(e: object) => (inputRef.current = e)}
              multiline
              enablesReturnKeyAutomatically={true}
              returnKeyType="send"
              onSubmitEditing={() => {
                sendMsg();
                inputRef.current.focus();
              }}
              blurOnSubmit
              fontSize={'sm'}
              variant="filled"
              mx={2}
              paddingLeft={2}
              p={1}
              h={'full'}
              type="text"
              textAlignVertical="center"
              backgroundColor={'#fff'}
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
          {isEmojiShow && (
            <Box
              style={{
                backgroundColor: '#F5F5F5',
                //  解决外部没有高度时scrollView不能滑动bug
                height: isEmojiShow ? 336 : 0,
                paddingBottom: isEmojiShow ? insets.bottom : 10,
              }}
              justifyContent={'center'}>
              <ChatEmoji
                onSelectEmoji={(key: string) => {
                  setValue(`${textValue + key}`);
                }}
              />
            </Box>
          )}
        </Box>
      </KeyboardAvoidingView>
    </Box>
  );
};

export default connect(mapStateToProps)(Msgs);
