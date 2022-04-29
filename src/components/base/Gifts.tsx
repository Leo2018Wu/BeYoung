import React, {useEffect, useState} from 'react';
import {Box, Center, HStack, Pressable, Text} from 'native-base';
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

//过滤礼物
const filterGifts = (data: [], type: string) => {
  if (!type) {
    return data;
  }
  if (type === 'chat') {
    return data.filter(item => item.canChat);
  }
  if (type === 'contact') {
    return data.filter(item => item.weChatFlag);
  }
};

const Index = ({...props}) => {
  const {width} = useWindowDimensions();
  const [activeItemId, setActiveId] = useState('');
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

  const present = (item: object) => {
    props.clickItem(item);
  };

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
          filterGifts(giftSkuList, props.giftType).map((item: any) => (
            <Pressable
              key={item.id}
              onPress={() => setActiveId(item.id)}
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
                  borderWidth: activeItemId === item.id ? 0.5 : 0,
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
              {activeItemId === item.id && (
                <Pressable
                  onPress={() => present(item)}
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
    </Box>
  );
};

export default connect(mapStateToProps)(Index);
