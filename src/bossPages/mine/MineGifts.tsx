import React, {useEffect, useState} from 'react';
import {Box, Center, HStack, Pressable, Text} from 'native-base';
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
    <Box py={4} flex={1} bg="white">
      <HStack flexWrap={'wrap'}>
        {giftSkuList &&
          giftSkuList.map((item: any) => (
            <Pressable
              key={item.id}
              mb={1.5}
              alignItems="center"
              style={{
                borderRadius: 10,
                width: GIFT_ITEM_WiIDTH,
              }}>
              <Center py={2}>
                <CFastImage
                  url={`${BASE_DOWN_URL + item.img}`}
                  styles={{
                    width: GIFT_ITEM_WiIDTH / 2,
                    height: GIFT_ITEM_WiIDTH / 2,
                  }}
                />
              </Center>
              <Text
                color={'primary.100'}
                mb={2}
                alignSelf={'center'}
                fontWeight="bold"
                fontSize={'md'}>
                X{myGifts[item.id]?.num || 0}
              </Text>
            </Pressable>
          ))}
      </HStack>
    </Box>
  );
};

export default connect(mapStateToProps)(Index);
