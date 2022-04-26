import React, {useEffect} from 'react';
import {Badge, Box, Center, HStack, Pressable, Text, VStack} from 'native-base';
import {StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {SwipeListView} from 'react-native-swipe-list-view';
import CFastImage from '../../components/CFastImage';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {connect} from 'react-redux';
import constant from '../../store/constant';
import util from '../../util/util';
import {getChatUsers} from '../../store/action';
import EmptySession from '../../components/base/EmptySession';
import Intimacy from '../../components/base/Intimacy';
import {useFocusEffect} from '@react-navigation/native';

// 处理会话数据以便渲染使用
const genSessions = (sessions: any, userMap: any) => {
  const list =
    sessions &&
    sessions.map((item: any, index: any) => {
      return {
        key: `${index}`,
        item: item,
        chatUserInfo: userMap[item.to] || {},
      };
    });
  console.log('list', list);

  return list;
};

const mapStateToProps = (state: any) => {
  return {
    chatUserMap: state.nim.userInfosMap,
    listData: state.session.sessionList || [],
    currentSessionId: state.session.currentSessionId,
  };
};
const mapDispatch = (state: any, action: any) => {
  action(state);
};
function Basic({...props}) {
  const nim = constant.nim;

  const insets = useSafeAreaInsets();
  useFocusEffect(
    React.useCallback(() => {
      const chatUserIds =
        props.listData && props.listData.map((item: any) => item.to);
      props.dispatch(getChatUsers({accountIds: chatUserIds}));
    }, []),
  );

  const stickTopRow = (rowMap: any, key: any, item: any) => {
    nim &&
      nim.addStickTopSession({
        id: item.id,
        done: done => {
          console.log('done', done);
          // if (rowMap[key]) {
          //   rowMap[key].closeRow();
          // }
        },
      });
  };

  const closeRow = (rowMap: any, id: any) => {
    if (rowMap[id]) {
      rowMap[id].closeRow();
    }
  };

  const deleteRow = (rowMap: any, key: any, item: any) => {
    let {listData, dispatch} = props;
    if (rowMap[key]) {
      rowMap[key].closeRow();
    }
    nim &&
      nim.deleteLocalSession({
        id: item.id,
        done: (done: any) => {
          if (!done) {
            //删除会话成功
            const newData = [...listData];
            const prevIndex = listData.findIndex((ele: any) => {
              return ele.id === item.id;
            });
            newData.splice(prevIndex, 1);
            mapDispatch(
              {type: 'SESSIONSLIST', sessionList: [...newData]},
              dispatch,
            );
          }
        },
      });
  };

  const onRowDidOpen = (secId: any, rowId: any, rowMap: any) => {
    console.log('This row opened', secId, rowId, rowMap);
  };

  const chat = (session: any) => {
    mapDispatch(
      {type: 'SESSIONID', currentSessionId: session.id},
      props.dispatch,
    );
    props.navigation.navigate('Session', {chatUserId: session.to});
  };

  const renderItem = ({item}: {item: any}) => {
    const msgInfo = item.item.lastMsg || {};
    return (
      <Pressable onPress={() => chat(item.item)} bg={'white'}>
        <HStack px={4} style={{height: 80}} alignItems="center">
          <Box pr={4}>
            {item.item.unread && item.item.unread > 0 ? (
              <Badge
                bg="red.600"
                rounded="full"
                mb={-4}
                mr={-2}
                zIndex={1}
                variant="solid"
                alignSelf="flex-end"
                _text={{
                  fontSize: 12,
                }}>
                {item.item.unread <= 99 ? item.item.unread : '...'}
              </Badge>
            ) : null}
            <CFastImage
              url={item?.chatUserInfo.headImg}
              styles={{
                borderRadius: 24,
                width: 48,
                height: 48,
              }}
            />
          </Box>
          <HStack
            flex={1}
            h="full"
            borderBottomColor="border.lightGray"
            borderBottomWidth={0.5}>
            <VStack py={4} justifyContent={'space-around'}>
              <Text fontSize={'md'} fontWeight="bold">
                {item?.chatUserInfo.nickName || '暂无昵称'}
              </Text>
              {msgInfo.type === 'text' && (
                <Text
                  numberOfLines={1}
                  fontSize={'md'}
                  style={{
                    color: '#C1C0C9',
                  }}>
                  {msgInfo.text}
                </Text>
              )}
              {msgInfo.type === 'custom' && (
                <Text
                  numberOfLines={1}
                  fontSize={'md'}
                  style={{
                    color: '#C1C0C9',
                  }}>
                  {util.parseCustomMsg(msgInfo)}
                </Text>
              )}
            </VStack>
          </HStack>
          <Intimacy num={item?.chatUserInfo.intimacy} />
        </HStack>
      </Pressable>
    );
  };

  const renderHiddenItem = (data: any, rowMap: any) => {
    return (
      <HStack flex={1} bg={'white'}>
        <Pressable
          bg={'blue.600'}
          style={[styles.backRightBtn, styles.backRightBtnLeft]}
          onPress={() => stickTopRow(rowMap, data.item.key, data.item.item)}>
          {/* onPress={() => closeRow(rowMap, data.item.key)} */}
          <Text fontSize={'lg'} color="white">
            置顶
          </Text>
        </Pressable>
        <Pressable
          bg={'red.600'}
          style={[styles.backRightBtn, styles.backRightBtnRight]}
          onPress={() => deleteRow(rowMap, data.item.key, data.item.item)}>
          <Text fontSize={'lg'} color="white">
            删除
          </Text>
        </Pressable>
      </HStack>
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 0.5}}
        colors={['#B83AF3', '#6950FB']}>
        <Box justifyContent="center" style={{paddingTop: insets.top}}>
          <Center style={{height: 52}}>
            <Text color={'white'} fontSize="lg" fontWeight={'bold'}>
              消息
            </Text>
          </Center>
        </Box>
      </LinearGradient>
      {props.listData.length <= 0 ? (
        <EmptySession />
      ) : (
        <SwipeListView
          data={genSessions(props.listData, props.chatUserMap)}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          rightOpenValue={-150}
          previewRowKey={'0'}
          previewOpenValue={-40}
          previewOpenDelay={3000}
          onRowDidOpen={onRowDidOpen}
        />
      )}
    </View>
  );
}
export default connect(mapStateToProps)(Basic);
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    right: 75,
  },
  backRightBtnRight: {
    right: 0,
  },
});
