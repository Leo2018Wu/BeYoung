import React, { useEffect, useState } from 'react';
import { DeviceEventEmitter, Image } from 'react-native';
import { HStack, Box, Actionsheet, Text, VStack, Pressable, useDisclose, ScrollView } from 'native-base';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CFastImage from '../../components/CFastImage';
import CustomFuncFlatList from '../../components/CustomFuncFlatList';
import { queryComment,commentDynamic } from '../../api/daily';
import DailyDetailContext from './context';
import { useSelector } from 'react-redux';
import emojiObj from '../../res/emoji';
import ChatBox from '../../components/base/ChatBox';
import getStorage from '../../util/Storage';
import useRequest from '../../hooks/useRequest';
interface ItemProps {
  content: string;
  delFlag: boolean;
  headImg: string;
  nickName: string;
  createTime: string;
  userId: string;
}

// 展示评论内容
const GenContent = ({ ...props }) => {
  const { emoji } = emojiObj.emojiList;
  let { showText } = props;
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
    <HStack my={1} mx={0} style={{ marginLeft: 40 }}>
      {showTextArray.map((item, index) => {
        const id = `${item}${index}`;
        if (emoji[item]) {
          return (
            <Image
              key={id}
              source={emoji[item].img}
              style={{ width: 5 * 5, height: 5 * 5 }}
            />
          );
        }
        return (
          <Text key={id} fontSize={'sm'}>
            {item}
          </Text>
        );
      })}
    </HStack>
  );
};

const areEqual = (pre: any, next: any) => {
  // 优化无关渲染
  return JSON.stringify(pre.item) === JSON.stringify(next.item);
};

const Item = React.memo(({ item }: { item: ItemProps }) => {
  const { isOpen, onOpen, onClose } = useDisclose();
  const [replyId, setReplyId] = useState(null);
  const [itemId, setItemId] = useState(null);
  const [flag, setFlag] = useState(false);
  const {run: runCommentDymaic} = useRequest(commentDynamic.url);

  useEffect(async ()=>{
    let d = await getStorage(['DYNAMIC_ID']);
    setItemId(d);
  }, []);

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
  };

  const comment = async (data: Object, dynamicId: string, replyId: string) => {
    if (data.type === 'text') {
      const {success} = await runCommentDymaic({
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
              style={{ flex: 1, padding: 8 }}>
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
              <GenContent showText={item.content} />
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
                              <Box
                                borderRadius={3}
                                px={1.5}
                                alignSelf={'center'}
                                py={0.5}
                                bg="primary.100">
                                <Text fontSize={'2xs'} color="white">
                                  自己
                                </Text>
                              </Box>
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
                      <GenContent showText={item1.content} />
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
              <Pressable
                onPress={() => setComment(item)}
                style={{ marginLeft: 56, width: 30, marginTop: 10, marginBottom: 30 }}>
                <Text fontSize={'sm'} style={{ color: '#8B5CFF' }}>
                  回复
                </Text>
              </Pressable>
            </ScrollView>
            {flag && <ChatBox
              pressCb={(data: Object) => {
                comment(data, itemId, replyId);
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
      <GenContent showText={item.content} />
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
                          <Box
                            borderRadius={3}
                            px={1.5}
                            alignSelf={'center'}
                            py={0.5}
                            bg="primary.100">
                            <Text fontSize={'2xs'} color="white">
                              自己
                            </Text>
                          </Box>
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
                  <GenContent showText={item1.content} />
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
        <Pressable
          onPress={() => setReply(item)}
          style={{ marginLeft: 56, width: 30, marginTop: 10 }}>
          <Text fontSize={'sm'} style={{ color: '#8B5CFF' }}>
            回复
          </Text>
        </Pressable>
      }
    </Box>
  );
}, areEqual);

const Index = () => {
  const insets = useSafeAreaInsets();
  const [keyData, setKeyData] = useState(0);

  useEffect(() => {
    DeviceEventEmitter.addListener('REPLY_REFRESH', res => {
      setKeyData(res);
      DeviceEventEmitter.emit('REPLY_FLAG', false);
      DeviceEventEmitter.removeListener('REPLY_REFRESH', () => { });
    });
  }, []);

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
        <DailyDetailContext.Consumer>
          {value => {
            return (
              <CustomFuncFlatList
                key={keyData}
                url={queryComment.url}
                par={{
                  dynamicId: value?.id,
                }}
                renderItem={({ item }: { item: ItemProps }) => <Item item={item} />}
              />
            );
          }}
        </DailyDetailContext.Consumer>
      </Box>
    </Box>
  );
};
export default Index;
