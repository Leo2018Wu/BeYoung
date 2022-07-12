import React, { useEffect, useState } from 'react';
import { DeviceEventEmitter } from 'react-native';
import { HStack, Box, Actionsheet, Image, Text, VStack, Pressable, useDisclose, ScrollView, FlatList } from 'native-base';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CFastImage from '../../components/CFastImage';
import { queryComment, commentDynamic } from '../../api/daily';
import { useSelector } from 'react-redux';
import ChatBox from '../../components/base/ChatBox';
import useRequest from '../../hooks/useRequest';
import { useFocusEffect } from '@react-navigation/native';
import {
  pageConstant,
  PageEmpty,
  PageError,
  PageLoadAll,
  PageLoading,
  PageLoadMore,
} from '../../components/base/Pagination';
interface ItemProps {
  content: string;
  delFlag: boolean;
  headImg: string;
  nickName: string;
  createTime: string;
  userId: string;
}

const {
  PAGE_IS_LOADING,
  PAGE_IS_NEXTPAGE,
  PAGE_IS_END,
  IS_EMPTY,
  IS_LOADDING,
  IS_NET_ERROR,
  IS_LIST,
} = pageConstant;

const areEqual = (pre: any, next: any) => {
  // 优化无关渲染
  return JSON.stringify(pre.item) === JSON.stringify(next.item);
};

const Item = React.memo(({ item }: { item: ItemProps }) => {
  
  const { isOpen, onOpen, onClose } = useDisclose();
  const [replyId, setReplyId] = useState(null);
  const [flag, setFlag] = useState(false);
  const { run: runCommentDymaic } = useRequest(commentDynamic.url);

  const userInfo = useSelector(state => state.user.myUserInfo);
  if (item.delFlag) {
    return null;
  }

  const setReply = data => {
    DeviceEventEmitter.emit('REPLY_FLAG', data);
  };

  const getUserName = replyId => {
    let index = item.replies.findIndex(e => {
      return e.id == replyId;
    });
    if (index != -1) {
      return (
        <>
          <Text
            fontSize={'md'}
            style={{
              color: '#000',
              marginHorizontal: 4,
            }}>
            回复
          </Text>
          <Text
            fontSize={'md'}
            style={{
              color: '#8E8895',
              marginHorizontal: 4,
            }}>
            {item.replies[index].nickName}
          </Text>
        </>
      );
    }
    return null;
  };

  const setComment = data => {
    setReplyId(data.id);
    setFlag(true);
    setTimeout(() => {
      DeviceEventEmitter.emit('KEYBOARD', true);
    }, 500);
  };

  const comment = async (data: Object, dynamicId: string, replyId: string) => {
    if (data.type === 'text') {
      const { success } = await runCommentDymaic({
        dynamicId,
        replyId,
        content: data.content,
        images: data.images,
      });
      if (success) {
        DeviceEventEmitter.emit('REPLY_REFRESH', Math.random());
      }
    }
  };

  return (
    <Box mb={6}>
      <Actionsheet hideDragIndicator isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Box w={'100%'} h={500}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ flex: 1, padding: 8, paddingBottom: 100 }}>
              <HStack mb={2} alignItems="center">
                <CFastImage
                  url={item.headImg}
                  styles={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                  }}
                />
                <VStack flex={1} mr={'auto'} ml={2} justifyContent={'space-between'}>
                  <HStack>
                    <Text
                      fontSize={'md'}
                      style={{
                        color: '#8E8895',
                      }}>
                      {item.nickName || '青回'}
                    </Text>
                  </HStack>
                  <Text
                    fontSize={'xs'}
                    style={{
                      color: '#C7C4CC',
                    }}>
                    {item.createTime}
                  </Text>
                </VStack>
              </HStack>
              <Text fontSize={'sm'}>{item.content}</Text>
              {item.images &&
                JSON.parse(item.images).length &&
                JSON.parse(item.images)[0].length ? (
                <CFastImage
                  url={JSON.parse(item.images)[0]}
                  styles={{
                    width: 80,
                    height: 80,
                    borderRadius: 10,
                    marginLeft: 48,
                  }}
                />
              ) : null}
              {item.replies.length
                ? item.replies.map((item1, index) => {
                  return (
                    <Box mt={4} ml={10} width={'80%'}>
                      <HStack mb={2} alignItems="center">
                        <CFastImage
                          url={item1.headImg}
                          styles={{
                            width: 30,
                            height: 30,
                            borderRadius: 20,
                          }}
                        />
                        <VStack
                          flex={1}
                          mr={'auto'}
                          ml={2}
                          justifyContent={'space-between'}>
                          <HStack>
                            {item1.userId !== userInfo.id ? (
                              <Text
                                fontSize={'md'}
                                style={{
                                  color: '#8E8895',
                                }}>
                                {item1.nickName || '青回'}
                              </Text>
                            ) : (
                              <>
                                <Text
                                  fontSize={'md'}
                                  style={{
                                    color: '#8E8895',
                                  }}>
                                  {item1.nickName || '青回'}
                                </Text>
                                <Box
                                  borderRadius={3}
                                  px={1.5}
                                  alignSelf={'center'}
                                  py={0.5}
                                  bg="primary.100">
                                  <Text fontSize={'2xs'} color="white">
                                    自己
                                  </Text>
                                </Box></>
                            )}
                            {getUserName(item1.replyId)}
                          </HStack>
                          <Text
                            fontSize={'xs'}
                            style={{
                              color: '#C7C4CC',
                            }}>
                            {item1.createTime}
                          </Text>
                        </VStack>
                      </HStack>
                      <Text fontSize={'sm'}>{item1.content}</Text>
                      {item1.images &&
                        JSON.parse(item1.images).length &&
                        JSON.parse(item1.images)[0].length ? (
                        <CFastImage
                          url={JSON.parse(item1.images)[0]}
                          styles={{
                            width: 80,
                            height: 80,
                            borderRadius: 10,
                            marginLeft: 48,
                          }}
                        />
                      ) : null}
                      {item1.userId !== userInfo.id ? (
                        <Pressable
                          onPress={() => setComment(item1)}
                          style={{ marginLeft: 56, width: 30, marginTop: 10 }}>
                          <Text fontSize={'sm'} style={{ color: '#8B5CFF' }}>
                            回复
                          </Text>
                        </Pressable>
                      ) : null}
                    </Box>
                  );
                })
                : null}
              {/* <Pressable
                onPress={() => setComment(item)}
                style={{ marginLeft: 56, width: 30, marginTop: 10, marginBottom: 30 }}>
                <Text fontSize={'sm'} style={{ color: '#8B5CFF' }}>
                  回复
                </Text>
              </Pressable> */}
            </ScrollView>
            {flag && <ChatBox
              pressCb={(data: Object) => {
                comment(data, item.userDynamicId, replyId);
              }}
            />}
          </Box>
        </Actionsheet.Content>
      </Actionsheet>
      <HStack mb={2} alignItems="center">
        <CFastImage
          url={item.headImg}
          styles={{
            width: 40,
            height: 40,
            borderRadius: 20,
          }}
        />
        <VStack flex={1} mr={'auto'} ml={2} justifyContent={'space-between'}>
          <HStack>
            <Text
              fontSize={'md'}
              style={{
                color: '#8E8895',
              }}>
              {item.nickName || '青回'}
            </Text>
          </HStack>
          <Text
            fontSize={'xs'}
            style={{
              color: '#C7C4CC',
            }}>
            {item.createTime}
          </Text>
        </VStack>
      </HStack>
      <Text fontSize={'sm'}>{item.content}</Text>
      {item.images &&
        JSON.parse(item.images).length &&
        JSON.parse(item.images)[0].length ? (
        <CFastImage
          url={JSON.parse(item.images)[0]}
          styles={{
            width: 80,
            height: 80,
            borderRadius: 10,
            marginLeft: 48,
          }}
        />
      ) : null}
      {item.replies.length
        ? item.replies.map((item1, index) => {
          return (
            <>
              {index < 3 ? (
                <Box mt={4} ml={10} width={'80%'}>
                  <HStack mb={2} alignItems="center">
                    <CFastImage
                      url={item1.headImg}
                      styles={{
                        width: 30,
                        height: 30,
                        borderRadius: 20,
                      }}
                    />
                    <VStack
                      flex={1}
                      mr={'auto'}
                      ml={2}
                      justifyContent={'space-between'}>
                      <HStack>
                        {item1.userId !== userInfo.id ? (
                          <Text
                            fontSize={'md'}
                            style={{
                              color: '#8E8895',
                            }}>
                            {item1.nickName || '青回'}
                          </Text>
                        ) : (
                          <>
                          <Text
                            fontSize={'md'}
                            style={{
                              color: '#8E8895',
                            }}>
                            {item1.nickName || '青回'}
                          </Text>
                          <Box
                            borderRadius={3}
                            px={1.5}
                            alignSelf={'center'}
                            py={0.5}
                            bg="primary.100">
                            <Text fontSize={'2xs'} color="white">
                              自己
                            </Text>
                          </Box></>
                        )}
                        {getUserName(item1.replyId)}
                      </HStack>
                      <Text
                        fontSize={'xs'}
                        style={{
                          color: '#C7C4CC',
                        }}>
                        {item1.createTime}
                      </Text>
                    </VStack>
                  </HStack>
                  <Text fontSize={'sm'}>{item1.content}</Text>
                  {item1.images &&
                    JSON.parse(item1.images).length &&
                    JSON.parse(item1.images)[0].length ? (
                    <CFastImage
                      url={JSON.parse(item1.images)[0]}
                      styles={{
                        width: 80,
                        height: 80,
                        borderRadius: 10,
                        marginLeft: 48,
                      }}
                    />
                  ) : null}
                  {item.userId === userInfo.id && item1.userId !== userInfo.id ? (
                    <Pressable
                      onPress={() => setReply(item1)}
                      style={{ marginLeft: 56, width: 30, marginTop: 10 }}>
                      <Text fontSize={'sm'} style={{ color: '#8B5CFF' }}>
                        回复
                      </Text>
                    </Pressable>
                  ) : null}
                </Box>
              ) : null}
            </>
          );
        })
        : null}
      {item.replies.length > 3 ? (
        <Pressable onPress={() => onOpen()} style={{ alignItems: 'center', flex: 1 }}>
          <Text color={'#06B4FD'}>查看全部></Text>
        </Pressable>
      ) :
        null
      }
    </Box>
  );
}, areEqual);

const Index = ({ ...props }) => {
  const { dynamicId } = props;

  const insets = useSafeAreaInsets();
  const [params, setParams] = useState({
    dynamicId,
    pageNum: 1, //分页页码
    pageSize: 100, //每页大小
    orders: [
      {
        column: 'likeNum',
        dir: 'desc', //排序方向，asc=顺序、desc=倒序，默认为顺序
        chinese: false, //是否为中文排序，默认为否
      },
      {
        column: 'createTime', //排序字段名称
        dir: 'desc', //排序方向，asc=顺序、desc=倒序，默认为顺序
        chinese: false, //是否为中文排序，默认为否
      },
    ], //排序参数列表
  });
  const [queryList, setList] = useState([]); //
  const [pageStatus, setPageStatus] = useState(IS_LOADDING); // 页面状态
  const [pagingStatus, setPagingStatus] = useState(''); // 分页状态
  const { run: runQueryComment } = useRequest(queryComment.url);

  useEffect(() => {
    DeviceEventEmitter.addListener('REPLY_REFRESH', res => {
      _getList();
      DeviceEventEmitter.emit('REPLY_FLAG', false);
      DeviceEventEmitter.removeListener('REPLY_REFRESH', () => { });
    });
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      _getList();
    }, [params]),
  );

  const _getList = async () => {
    try {
      const data = await runQueryComment(params);
      _dealData(data);
    } catch (error) {
      // 错误信息 比如网络错误
      setPagingStatus(IS_NET_ERROR);
    }
  };

  // 处理页面数据及状态
  const _dealData = (response: any) => {
    const { data, total } = response;
    if (total === 0) {
      setPageStatus(IS_EMPTY);
      return;
    }
    if (data instanceof Array) {
      const isNextPage = data.length < total - queryList.length;
      setPagingStatus(isNextPage ? PAGE_IS_NEXTPAGE : PAGE_IS_END);
      setPageStatus(IS_LIST);
      setList(params.pageNum <= 1 ? data : mergeList(queryList, data));
    }
  };

  const _onRefresh = async () => {
    setPageStatus(IS_LOADDING);
    setParams({ ...params, pageNum: 1 }); //改变param自动刷新数据
  };

  const _loadMore = async () => {
    setParams({ ...params, pageNum: ++params.pageNum });
  };

  const _onEndReached = () => {
    if (pagingStatus === PAGE_IS_NEXTPAGE) {
      _loadMore();
    }
  };

  const renderFooter = () => {
    switch (pagingStatus) {
      case PAGE_IS_LOADING:
        return <PageLoading />;
      case PAGE_IS_NEXTPAGE:
        return <PageLoadMore />;
      case PAGE_IS_END:
        return <PageLoadAll content="-已经到达底部了-" />;
      default:
        return null;
    }
  };

  const renderList = () => {
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        onRefresh={() => _onRefresh()}
        data={queryList}
        renderItem={({ item }: { item: ItemProps }) => <Item item={item} />}
        refreshing={pageStatus === IS_LOADDING}
        ListFooterComponent={renderFooter()}
        onEndReached={() => _onEndReached()}
        onEndReachedThreshold={0.01}
        keyExtractor={(item: any) => `key${item.id}`}
      />
    );
  };

  return (
    <Box flex={1}>
      <Box
        px={3}
        flex={1}
        style={
          {
            // paddingBottom: insets.bottom + 64,
          }
        }>
        {pageStatus === IS_EMPTY && <PageEmpty />}
        {pageStatus === IS_LIST && renderList()}
        {pageStatus === IS_LOADDING && <PageLoading />}
        {pageStatus === IS_NET_ERROR && <PageError />}
      </Box>
    </Box>
  );
};
export default Index;
