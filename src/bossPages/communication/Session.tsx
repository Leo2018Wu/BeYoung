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
  AlertDialog,
  Button,
  View,
  Divider,
} from 'native-base';
import CFastImage from '../../components/CFastImage';
import {connect} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import useRequest from '../../hooks/useRequest';
import {fetchAccountUser} from '../../api/common';
import {ChatLeft, ChatRight} from '../../components/base/ChatItem';
import Intimacy from '../../components/base/Intimacy';
import {queryDynamic} from '../../api/daily';
import {InteractionManager, Keyboard, Platform} from 'react-native';
import util from '../../util/util';
import Gifts from '../../components/base/Gifts';
import ChatEmoji from '../../components/base/ChatEmoji';
import {giveGift} from '../../api/gift';
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
    relateChatAccount: state.session.relateChatAccount,
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
  const [dialogVisible, setIsDialogShow] = useState(false);
  const [isEmojiShow, setIsEmojiShow] = useState(false);

  const cancelRef = useRef(null);
  const {run: runGetChatUsers} = useRequest(fetchAccountUser.url);
  const {run: runQueryDynamic} = useRequest(queryDynamic.url);

  const [chatUserInfo, setChatUserInfo] = useState({});
  const [lastDailyInfo, setDailyInfo] = useState({});

  const {run: runGiveGift} = useRequest(giveGift.url);

  useEffect(() => {
    if (chatUserInfo?.userId) {
      // 获取最新发出的动态
      getLatestDaily();
    }
  }, [chatUserInfo]);

  useEffect(() => {
    const sameItem = (ele: any) => ele === props.route.params.chatUserId;
    if (props.relateChatAccount.findIndex(sameItem) === -1) {
      props.relateChatAccount.push(props.route.params.chatUserId);
      props.dispatch({
        type: 'RELATECHATUSERACCOUNT',
        relateChatAccount: props.relateChatAccount,
      });
    }
  }, []);

  const getLatestDaily = async () => {
    try {
      const {data} = await runQueryDynamic({
        userId: chatUserInfo.userId,
        pageNum: 1, //分页页码
        pageSize: 1, //每页大小
        // eslint-disable-next-line no-sparse-arrays
        orders: [
          {
            column: 'createTime', //排序字段名称
            dir: 'desc', //排序方向，asc=顺序、desc=倒序，默认为顺序
            chinese: false, //是否为中文排序，默认为否
          },
        ], //排序参数列表
      });
      setDailyInfo(data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const getData = async () => {
    try {
      const {data} = await runGetChatUsers({
        accountIds: [props.route.params.chatUserId],
      });
      if (data.length >= 0 && data instanceof Array) {
        setChatUserInfo(data[0]);
      }
    } catch (error) {}
  };

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

  const presentGift = async (item: object) => {
    try {
      const {success, code} = await runGiveGift({
        giftId: item.id,
        num: 1,
        receiveUserId: chatUserInfo?.userId,
      });
      if (code === 50001) {
        // 余额不足情况
        setIsDialogShow(true);
        return;
      }
      if (success) {
        const content = {
          type: 1,
          giftKey: item.img,
        };
        props.dispatch(
          sendCustomMsg({
            to: props.route.params.chatUserId,
            content,
          }),
        );
        scrollToEnd();
      }
    } catch (error) {
      console.log('presentGift', error);
    }
  };
  const _keyboardDidShow = () => {
    setKeyborad(true);
    setIsEmojiShow(false);
  };

  const _keyboardDidHide = () => {
    setKeyborad(false);
  };

  useEffect(() => {
    getData();
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
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={dialogVisible}
        onClose={() => setIsDialogShow(false)}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>提示</AlertDialog.Header>
          <AlertDialog.Body
            justifyContent={'center'}
            alignItems={'center'}
            minHeight={98}>
            您的余额不足，需要去充值吗？
          </AlertDialog.Body>
          <AlertDialog.Footer justifyContent={'center'}>
            <Button
              colorScheme="blue"
              onPress={() => {
                setIsDialogShow(false);
                props.navigation.navigate('Wallet');
              }}>
              去充值
            </Button>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
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
                {chatUserInfo?.nickName || '暂无昵称'}
              </Text>
            </View>
            {chatUserInfo?.intimacy ? (
              <Box
                style={{
                  position: 'absolute',
                  right: 16,
                }}>
                <Intimacy num={chatUserInfo?.intimacy} />
              </Box>
            ) : //   <View>
            //   <Text fontSize={'xs'} textAlign={'center'} color={'#fff'}>
            //     亲密度{chatUserInfo[0]?.intimacy}
            //   </Text>
            // </View>
            null}
            {/* <Pressable
              onPress={() =>
                props.navigation.navigate('HomeDetail', {
                  userId: chatUserInfo[0]?.userId,
                })
              }
              h={'full'}
              justifyContent="center"
              w={10}>
              <CFastImage
                url={chatUserInfo[0]?.headImg || ''}
                styles={{
                  width: 28,
                  height: 28,
                  borderRadius: 14,
                }}
              />
            </Pressable> */}
          </HStack>
        </Box>
      </LinearGradient>
      <Actionsheet hideDragIndicator isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content
          style={{
            backgroundColor: '#1f2937',
            borderRadius: 40,
          }}>
          <Gifts
            clickItem={(item: object) => {
              onClose();
              presentGift(item);
            }}
          />
        </Actionsheet.Content>
      </Actionsheet>
      <KeyboardAvoidingView
        contentContainerStyle={{
          height: '100%',
        }}
        behavior={Platform.OS === 'ios' ? 'position' : 'height'}
        style={{height: '100%'}}>
        <Pressable
          onPress={() => {
            props.navigation.navigate('DailyDetail', {item: lastDailyInfo});
          }}
          my={4}
          mx="auto"
          px={4}
          py={3}
          shadow={2}
          borderRadius={5}
          w={'70%'}
          bg="white">
          <Text numberOfLines={1}>{lastDailyInfo?.content}</Text>
          <HStack mt={2} justifyContent={'space-between'}>
            {lastDailyInfo?.images
              ? JSON.parse(lastDailyInfo.images).map(
                  (item: string, index: number) => (
                    <Box key={index}>
                      <CFastImage
                        url={item}
                        styles={{
                          width: 60,
                          height: 60,
                          borderRadius: 8,
                        }}
                      />
                    </Box>
                  ),
                )
              : null}
          </HStack>
          <Divider mt={3} mb={2} />
          <HStack
            w={'full'}
            alignItems="center"
            justifyContent={'space-between'}>
            <Text fontSize={'sm'} style={{color: '#B9B9B9'}}>
              她发布的新动态
            </Text>
            <Text fontSize={'sm'} fontWeight="bold" color="primary.100">
              去看看
            </Text>
          </HStack>
        </Pressable>
        <ScrollView
          ref={(e: object) => {
            scrollRef.current = e;
            scrollToEnd();
          }}
          onTouchStart={() => {
            setIsEmojiShow(false);
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
                          navigation={props.navigation}
                          msg={Object.assign(ele, {
                            avatar: chatUserInfo?.headImg,
                            userId: chatUserInfo?.userId,
                          })}
                        />
                      )}
                      {ele.flow === 'out' && (
                        <ChatRight navigation={props.navigation} msg={ele} />
                      )}
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
          <HStack py={2.5} alignItems="center" w={'full'} px={4}>
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
                <FontAwesome5 name="smile" size={28} color="#000000" />
              ) : (
                <FontAwesome name="keyboard-o" size={24} color="#000000" />
              )}
            </Pressable>
            {props.myUserInfo.gender === 'GENDER_MALE' ? (
              <Pressable
                onPress={() => {
                  onOpen();
                  Keyboard.dismiss();
                }}>
                <Ionicons
                  style={{
                    marginLeft: 16,
                  }}
                  name="gift"
                  size={26}
                  color="#9650FF"
                />
              </Pressable>
            ) : null}
            <Input
              ref={(e: object) => (inputRef.current = e)}
              multiline
              enablesReturnKeyAutomatically={true}
              returnKeyType="send"
              onSubmitEditing={() => {
                sendMsg();
                // inputRef.current.focus();
              }}
              blurOnSubmit
              fontSize={'sm'}
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
