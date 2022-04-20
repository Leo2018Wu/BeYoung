import React, {useEffect, useState} from 'react';
import {HStack, Box, Stack, Text, VStack, FlatList} from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import CFastImage from '../../../components/CFastImage';
import CustomFuncFlatList from '../../../components/CustomFuncFlatList';
import {queryGiftGiving} from '../../../api/gift';
import DailyDetailContext from '../../../commonPages/daily/context';
import {BASE_DOWN_URL} from '../../../util/config';
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
  console.log('---礼物item---', item);
  if (item.delFlag) {
    return null;
  }

  return (
    <Box mb={6}>
      <HStack mb={2} alignItems="center">
        <CFastImage
          url={`${BASE_DOWN_URL + item.giftImg}`}
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
              {item.giveNickName || '青回'}
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
      <HStack mb={2} ml={12} flexDirection={'column'} textAlign={'center'}>
        <CFastImage
          url={`${BASE_DOWN_URL + item.giftImg}`}
          styles={{
            width: 40,
            height: 40,
            borderRadius: 20,
          }}
        />
        <Text
          fontSize={'sm'}
          style={{
            color: '#000',
          }}>
          {item.giftName}
        </Text>
        <Text
          fontSize={'md'}
          style={{
            color: '#8B5CFF',
          }}>
          x{item.num}
        </Text>
      </HStack>
    </Box>
  );
}, areEqual);

const Index = () => {
  const queryList = [
    {
      createTime: '2022-03-14 17:12:59',
      createUserId: '6906840366444446720',
      createUserName: '',
      giftId: '6914483638864184320', //礼物ID
      giftImg: '礼物图片/招呼.jpg', //礼物图片
      giftName: '招呼', //礼物名称
      giveHeadImg: 'head.jpg', //送礼用户头像
      giveNickName: '船长🚢', //送礼用户昵称
      giveUserId: '6906840366444446720', //送礼用户ID
      id: '6909063819880825856', //送礼ID
      num: 3, //送礼礼物数量
      receiveHeadImg: '', //收礼用户头像
      receiveNickName: '', //收礼用户昵称
      receiveUserId: '6909049332855473152', //收礼用户ID
      updateTime: '2022-03-14 17:12:59',
      updateUserId: '6906840366444446720',
      updateUserName: '',
      userDynamicId: '6907918684937782272', //用户动态ID
    },
    {
      createTime: '2022-03-14 17:12:25',
      createUserId: '6906840366444446720',
      createUserName: '',
      giftId: '6914483638864184320', //礼物ID
      giftImg: '礼物图片/招呼.jpg', //礼物图片
      giftName: '招呼', //礼物名称
      giveHeadImg: 'head.jpg', //送礼用户头像
      giveNickName: '船长🚢', //送礼用户昵称
      giveUserId: '6906840366444446720', //送礼用户ID
      id: '6909063676045558784', //送礼ID
      num: 1, //送礼礼物数量
      receiveHeadImg: '', //收礼用户头像
      receiveNickName: '', //收礼用户昵称
      receiveUserId: '6909049332855473152', //收礼用户ID
      updateTime: '2022-03-14 17:12:25',
      updateUserId: '6906840366444446720',
      updateUserName: '',
      userDynamicId: '6907918684937782272', //用户动态ID
    },
    {
      createTime: '2022-03-14 17:00:17',
      createUserId: '6906840366444446720',
      createUserName: '',
      giftId: '6914483638864184320', //礼物ID
      giftImg: '礼物图片/招呼.jpg', //礼物图片
      giftName: '招呼', //礼物名称
      giveHeadImg: 'head.jpg', //送礼用户头像
      giveNickName: '船长🚢', //送礼用户昵称
      giveUserId: '6906840366444446720', //送礼用户ID
      id: '6909060624928474112', //送礼ID
      num: 1, //送礼礼物数量
      receiveHeadImg: '', //收礼用户头像
      receiveNickName: '', //收礼用户昵称
      receiveUserId: '6909049332855473152', //收礼用户ID
      updateTime: '2022-03-14 17:00:17',
      updateUserId: '6906840366444446720',
      updateUserName: '',
      userDynamicId: '6907918684937782272', //用户动态ID
    },
  ];

  return (
    <Box flex={1}>
      <Box px={3} flex={1} style={{}}>
        <DailyDetailContext.Consumer>
          {value => {
            return (
              // <CustomFuncFlatList
              //   url={queryGiftGiving.url}
              //   par={{
              //     dynamicId: value?.id,
              //   }}
              //   renderItem={({item}: {item: ItemProps}) => <Item item={item} />}
              // />
              <FlatList
                data={queryList}
                renderItem={({item}: {item: ItemProps}) => <Item item={item} />}
                keyExtractor={(item: any) => `key${item.id}`}
              />
            );
          }}
        </DailyDetailContext.Consumer>
      </Box>
    </Box>
  );
};
export default Index;
