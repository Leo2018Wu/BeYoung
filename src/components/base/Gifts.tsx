import React, {useEffect, useRef, useState} from 'react';
import {Box, Button, Center, HStack, Pressable, Text} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {getMyGifts, getMyWallet} from '../../store/action';
import {connect} from 'react-redux';
import useRequest from '../../hooks/useRequest';
import {fetchGift} from '../../api/gift';
import {useWindowDimensions} from 'react-native';
import CFastImage from '../CFastImage';

const mapStateToProps = (state: any) => {
  return {
    myGifts: state.user.myGifts,
    myWallet: state.user.myWallet,
  };
};

const Index = ({...props}) => {
  const {width} = useWindowDimensions();
  const [activeItem, setActive] = useState('');
  const GIFT_ITEM_WiIDTH = width / 4;
  const {myWallet, myGifts} = props;

  const {result: giftSkuList} = useRequest(
    fetchGift.url,
    {},
    fetchGift.options,
  );

  useEffect(() => {
    console.log('giftSkuList', giftSkuList);
  }, [giftSkuList]);

  useEffect(() => {
    props.dispatch(getMyGifts());
    props.dispatch(getMyWallet());
  }, []);

  return (
    <Box pb={4} w={'full'}>
      <HStack px={4} py={4} justifyContent="space-between">
        <HStack>
          <AntDesign name="gift" size={20} color="white" />
          <Text ml={1} fontSize={'md'} color="white">
            礼物
          </Text>
        </HStack>
        <HStack>
          <Icon name="diamond" color={'#9650FF'} size={20} />
          <Text ml={2} fontSize={'md'} color="white">
            {myWallet.coinBalance}
          </Text>
        </HStack>
      </HStack>
      <HStack flexWrap={'wrap'}>
        {giftSkuList &&
          giftSkuList.map((item: any) => (
            <Pressable
              key={item.id}
              borderWidth={activeItem === item.id ? 0 : 0.25}
              onPress={() => setActive(item.id)}
              borderColor="black"
              justifyContent={'space-around'}
              alignItems="center"
              style={{
                backgroundColor:
                  activeItem === item.id ? '#9013FE50' : 'transparent',
                width: GIFT_ITEM_WiIDTH,
                height: GIFT_ITEM_WiIDTH,
              }}>
              <Center flex={1}>
                <CFastImage
                  url={item.img}
                  styles={{
                    height: GIFT_ITEM_WiIDTH / 2,
                    width: GIFT_ITEM_WiIDTH / 2,
                  }}
                />
              </Center>
              {myGifts[item.id]?.num ? (
                <Text
                  mb={2}
                  alignSelf={'center'}
                  ml={2}
                  fontSize={'xs'}
                  color="white">
                  剩余{myGifts[item.id]?.num}次
                </Text>
              ) : (
                <HStack pb={2} alignItems={'center'}>
                  <Icon name="diamond" color={'#9650FF'} size={12} />
                  <Text ml={2} fontSize={'xs'} color="white">
                    {item.coinNum}
                  </Text>
                </HStack>
              )}
            </Pressable>
          ))}
      </HStack>
      <Button
        ml={'auto'}
        mr={4}
        mt={5}
        style={{
          backgroundColor: '#9650FF',
          borderRadius: 50,
          paddingVertical: 10,
          width: 90,
        }}>
        <Text fontSize={'md'} color="white">
          购买
        </Text>
      </Button>
    </Box>
  );
};

export default connect(mapStateToProps)(Index);
