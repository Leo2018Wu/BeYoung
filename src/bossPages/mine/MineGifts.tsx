import React, {useEffect, useState} from 'react';
import {
  Box,
  ScrollView,
  HStack,
  Pressable,
  Text,
  View,
  VStack,
} from 'native-base';
import {getMyGifts} from '../../store/action';
import {connect} from 'react-redux';
import useRequest from '../../hooks/useRequest';
import {fetchGift} from '../../api/gift';
import {useWindowDimensions} from 'react-native';
import {BASE_DOWN_URL} from '../../util/config';
import CFastImage from '../../components/CFastImage';

const mapStateToProps = (state: any) => {
  return {
    myGifts: state.user.myGifts,
  };
};

const Index = ({...props}) => {
  const {width} = useWindowDimensions();
  const GIFT_ITEM_WiIDTH = width / 3;
  const {myGifts} = props;

  const {result: giftSkuList} = useRequest(
    fetchGift.url,
    {},
    fetchGift.options,
  );

  useEffect(() => {
    props.dispatch(getMyGifts());
  }, []);

  return (
    <Box py={4} px={4} flex={1} bg="white">
      <ScrollView style={{flex: 1, height: '100%'}}>
        {/* <HStack> */}
        {giftSkuList &&
          giftSkuList.map((item: any) => (
            <Pressable
              key={item.id}
              mb={4}
              alignItems="center"
              style={{
                flex: 1,
                flexDirection: 'row',
                width: '100%',
                height: GIFT_ITEM_WiIDTH / 2,
              }}>
              <HStack alignItems="center" mr={4}>
                <CFastImage
                  url={`${BASE_DOWN_URL + item.img}`}
                  styles={{
                    width: GIFT_ITEM_WiIDTH / 2,
                    height: GIFT_ITEM_WiIDTH / 2,
                  }}
                />
              </HStack>
              <VStack h="full" flex={7} justifyContent={'center'}>
                {item.canChat ? (
                  <Text fontWeight={'bold'}>赠送该礼物可开启聊天</Text>
                ) : null}
                {item.weChatFlag ? (
                  <Text fontWeight={'bold'}>赠送该礼物可解锁微信</Text>
                ) : null}
              </VStack>
              <VStack h="full" justifyContent={'center'} flex={1}>
                <Text
                  color={'primary.100'}
                  alignSelf={'center'}
                  fontWeight="bold"
                  fontSize={'md'}>
                  X{myGifts[item.id]?.num || 0}
                </Text>
              </VStack>
            </Pressable>
          ))}
        {/* </HStack> */}
      </ScrollView>
    </Box>
  );
};

export default connect(mapStateToProps)(Index);
