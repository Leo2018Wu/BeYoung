import React from 'react';
import {HStack, Box, Text, VStack} from 'native-base';
import CFastImage from '../../components/CFastImage';
import CustomFuncFlatList from '../../components/CustomFuncFlatList';
import {queryGiftGiving} from '../../api/gift';
import DailyDetailContext from './context';
import {BASE_DOWN_URL} from '../../util/config';
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
  if (item.delFlag) {
    return null;
  }

  return (
    <Box mb={6}>
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
  return (
    <Box flex={1}>
      <Box px={3} flex={1} style={{}}>
        <DailyDetailContext.Consumer>
          {value => {
            return (
              <CustomFuncFlatList
                url={queryGiftGiving.url}
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
