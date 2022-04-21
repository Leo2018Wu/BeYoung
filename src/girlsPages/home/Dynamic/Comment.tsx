import React, {useEffect, useState} from 'react';
import {DeviceEventEmitter} from 'react-native';
import {HStack, Box, Stack, Text, VStack, Pressable} from 'native-base';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/AntDesign';
import CFastImage from '../../../components/CFastImage';
import CustomFuncFlatList from '../../../components/CustomFuncFlatList';
import {queryComment} from '../../../api/daily';
import DailyDetailContext from '../../../commonPages/daily/context';
import {useSelector} from 'react-redux';
interface ItemProps {
  content: string;
  delFlag: boolean;
  headImg: string;
  nickName: string;
  createTime: string;
  userId: string;
}

const areEqual = (pre: any, next: any) => {
  // 优化无关渲染
  return JSON.stringify(pre.item) === JSON.stringify(next.item);
};

const Item = React.memo(({item}: {item: ItemProps}) => {
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

  return (
    <Box mb={6}>
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
      <Text fontSize={'md'} color={'fontColors.333'} style={{marginLeft: 48}}>
        {item.content}
      </Text>
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
                <Text
                  fontSize={'md'}
                  color={'fontColors.333'}
                  style={{marginLeft: 48}}>
                  {item1.content}
                </Text>
                {item1.userId !== userInfo.id ? (
                  <Pressable
                    onPress={() => setReply(item1)}
                    style={{marginLeft: 56, width: 30, marginTop: 10}}>
                    <Text fontSize={'sm'} style={{color: '#8B5CFF'}}>
                      回复
                    </Text>
                  </Pressable>
                ) : null}
              </Box>
            );
          })
        : null}
      <Pressable
        onPress={() => setReply(item)}
        style={{marginLeft: 56, width: 30, marginTop: 10}}>
        <Text fontSize={'sm'} style={{color: '#8B5CFF'}}>
          回复
        </Text>
      </Pressable>
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
        <Text mb={2} fontSize={'md'}>
          最新评论
        </Text>
        <DailyDetailContext.Consumer>
          {value => {
            return (
              <CustomFuncFlatList
                key={keyData}
                url={queryComment.url}
                par={{
                  dynamicId: value?.id,
                }}
                renderItem={({item}: {item: ItemProps}) => <Item item={item} />}
              />
            );
          }}
        </DailyDetailContext.Consumer>
      </Box>
    </Box>
  );
};
export default Index;
