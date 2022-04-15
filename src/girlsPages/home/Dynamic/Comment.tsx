import React from 'react';
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

const Item = ({item}: {item: ItemProps}) => {
  const userInfo = useSelector(state => state.user.myUserInfo);

  if (item.delFlag) {
    return null;
  }

  const setReply = () => {
    console.log('-回复-');
    DeviceEventEmitter.emit('REPLY_FLAG', true);
  };

  return (
    <Box>
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
            {item.userId === userInfo.id && (
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
          </HStack>
          <Text
            fontSize={'xs'}
            style={{
              color: '#C7C4CC',
            }}>
            {item.createTime}
          </Text>
        </VStack>
        {/* <HStack alignItems={'center'}>
          {false ? (
            <Icon name="heart" size={18} color="#9650FF" />
          ) : (
            <Icon name="hearto" size={18} color="#C7C4CC" />
          )}
          <Text ml={1} fontSize={'md'} style={{color: '#D4D4D4'}}>
            24
          </Text>
        </HStack> */}
      </HStack>
      <Text fontSize={'md'} color={'fontColors.333'} style={{marginLeft: 48}}>
        {item.content}
      </Text>
      <Pressable
        onPress={() => setReply()}
        style={{marginLeft: 56, width: 30, marginTop: 10}}>
        <Text fontSize={'sm'} style={{color: '#8B5CFF'}}>
          回复
        </Text>
      </Pressable>
    </Box>
  );
};

const Index = () => {
  const insets = useSafeAreaInsets();
  return (
    <Box flex={1}>
      <Box
        px={3}
        flex={1}
        style={{
          paddingBottom: insets.bottom + 64,
        }}>
        <Text mb={2} fontSize={'md'}>
          最新评论
        </Text>
        <DailyDetailContext.Consumer>
          {value => {
            return (
              <CustomFuncFlatList
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
