import React, {useEffect, useState} from 'react';
import {Box, Button, Center, HStack, Pressable, Text} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {getMyGifts, getMyWallet} from '../../store/action';
import {connect} from 'react-redux';
import useRequest from '../../hooks/useRequest';
import {fetchGift} from '../../api/gift';
import {useWindowDimensions} from 'react-native';
import {BASE_DOWN_URL} from '../../util/config';
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
  const GIFT_ITEM_WiIDTH = (width - 16) / 4;
  const {myWallet, myGifts} = props;

  const {result: giftSkuList} = useRequest(
    fetchGift.url,
    {},
    fetchGift.options,
  );

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
      <HStack minHeight={24} flexWrap={'wrap'}>
        {giftSkuList &&
          giftSkuList.map((item: any) => (
            <Pressable
              key={item.id}
              onPress={() => setActive(item.id)}
              alignItems="center"
              style={{
                borderRadius: 10,
                width: GIFT_ITEM_WiIDTH,
                height: 1.3 * GIFT_ITEM_WiIDTH,
              }}>
              <Box
                flex={1}
                py={2}
                justifyContent={'space-around'}
                w="full"
                borderTopRadius={8}
                borderBottomWidth={0}
                style={{
                  borderWidth: activeItem === item.id ? 0.5 : 0,
                }}
                borderColor="white">
                <Center flex={1}>
                  <CFastImage
                    url={`${BASE_DOWN_URL + item.img}`}
                    styles={{
                      width: GIFT_ITEM_WiIDTH / 2.5,
                      height: GIFT_ITEM_WiIDTH / 2.5,
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
                  <HStack
                    justifyContent={'center'}
                    pb={2}
                    alignItems={'center'}>
                    <Icon name="diamond" color={'#9650FF'} size={12} />
                    <Text ml={2} fontSize={'xs'} color="white">
                      {item.coinNum}
                    </Text>
                  </HStack>
                )}
              </Box>
              {activeItem === item.id && (
                <Pressable
                  borderBottomRadius={8}
                  alignItems={'center'}
                  py={1}
                  w={'full'}
                  bg="red.600">
                  <Text color={'white'}>赠送</Text>
                </Pressable>
              )}
            </Pressable>
          ))}
      </HStack>
      {/* <Button
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
      </Button> */}
    </Box>
  );
};

export default connect(mapStateToProps)(Index);
