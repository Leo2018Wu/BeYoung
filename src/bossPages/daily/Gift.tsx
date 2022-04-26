import React, {useState, useEffect} from 'react';
import {DeviceEventEmitter} from 'react-native';
import {HStack, Box, Image, View, VStack, Text, Center} from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import CFastImage from '../../components/CFastImage';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CustomFuncFlatList from '../../components/CustomFuncFlatList';
import DailyDetailContext from './context';
import {queryGiftGiving} from '../../api/gift';
import {BASE_DOWN_URL} from '../../util/config';

const areEqual = (pre: any, next: any) => {
  // 优化无关渲染
  return JSON.stringify(pre.item) === JSON.stringify(next.item);
};

const Item = React.memo(({item}: {item: any}) => {
  return (
    <Box mb={4}>
      {/* 动态用户信息 */}
      <HStack mb={2} alignItems="center">
        <CFastImage
          url={item.giveHeadImg}
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
        {/* 暂时不支持点赞评论 */}
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
      <Box flexDir={'row'} style={{marginLeft: 48}}>
        <Center>
          <CFastImage
            url={`${BASE_DOWN_URL + item.giftImg}`}
            styles={{width: 64, height: 64}}
          />
          <Text fontSize={'sm'} mt={3}>
            {item.giftName}{' '}
            <Text fontWeight={'bold'} color={'primary.100'}>
              x{item.num}
            </Text>
          </Text>
        </Center>
      </Box>
    </Box>
  );
}, areEqual);

const Index = () => {
  const insets = useSafeAreaInsets();
  const [keyData, setKeyData] = useState(0);

  useEffect(() => {
    DeviceEventEmitter.addListener('PRESENT_GIFT', res => {
      setKeyData(res);
    });
  }, []);

  return (
    <Box
      flex={1}
      px={3}
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
              url={queryGiftGiving.url}
              par={{
                dynamicId: value?.id,
              }}
              renderItem={({item}: {item: any}) => <Item item={item} />}
            />
          );
        }}
      </DailyDetailContext.Consumer>
    </Box>
  );
};
export default Index;
