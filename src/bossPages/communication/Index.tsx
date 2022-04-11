import React, {useState} from 'react';
import {
  Box,
  Button,
  Center,
  HStack,
  Pressable,
  Text,
  VStack,
} from 'native-base';
import {StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {SwipeListView} from 'react-native-swipe-list-view';
import CFastImage from '../../components/CFastImage';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {connect} from 'react-redux';
import constant from '../../store/constant';

const genSessions = (sessions: any) => {
  const list =
    sessions &&
    sessions.map((item: any, index: any) => {
      return {key: `${index}`, item: item};
    });
  return list;
};

const mapStateToProps = (state: any) => {
  return {
    listData: state.session.sessionList || [],
    currentSessionId: state.session.currentSessionId,
  };
};
const mapDispatch = (state: any, action: any) => {
  action(state);
};
function Basic({...props}) {
  console.log('props', props);
  const nim = constant.nim;

  const insets = useSafeAreaInsets();

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
    console.log('nim', nim);
    if (rowMap[key]) {
      rowMap[key].closeRow();
    }
    nim &&
      nim.deleteLocalSession({
        id: item.id,
        done: (done: any) => {
          console.log('done', done);

          if (!done) {
            //删除会话成功
            const newData = [...listData];
            const prevIndex = listData.findIndex((ele: any) => ele.key === key);
            newData.splice(prevIndex, 1);
            console.log('[...newData]', newData);

            mapDispatch(
              {type: 'SESSIONSLIST', sessionList: [...newData]},
              dispatch,
            );
            console.log('sttt', props.listData);
          }
        },
      });
  };

  const onRowDidOpen = (secId: any, rowId: any, rowMap: any) => {
    console.log('This row opened', secId, rowId, rowMap);
  };

  const chat = (session: any) => {
    console.log('se', session);

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
        <HStack style={{height: 80}} alignItems="center">
          <Box px={4}>
            <CFastImage
              url=""
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
                {msgInfo.fromNick || '暂无昵称'}
              </Text>
              <Text
                numberOfLines={1}
                fontSize={'md'}
                style={{
                  color: '#C1C0C9',
                }}>
                {msgInfo.text || '您收到一条消息'}
              </Text>
            </VStack>
          </HStack>
        </HStack>
      </Pressable>
    );
  };

  const renderHiddenItem = (data: any, rowMap: any) => {
    console.log('data', data, rowMap);
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

      <Text>{props.currentSessionId}</Text>
      <Button
        onPress={() =>
          mapDispatch({type: 'USERID', userID: '88888888'}, props.dispatch)
        }>
        <Text>测试dispatch</Text>
      </Button>
      <SwipeListView
        data={genSessions(props.listData)}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-150}
        previewRowKey={'0'}
        previewOpenValue={-40}
        previewOpenDelay={3000}
        onRowDidOpen={onRowDidOpen}
      />
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
