import React from 'react';
import {
  HStack,
  Box,
  View,
  VStack,
  Text,
  Divider,
  Pressable,
  Actionsheet,
  useDisclose,
  useToast,
} from 'native-base';
import {useWindowDimensions} from 'react-native';
import Tab from './DailyTab';
import CFastImage from '../../components/CFastImage';
import DailyDetailContext from './context.js';
import ChatBox from '../../components/base/ChatBox';
import Gifts from '../../components/base/Gifts';
import useRequest from '../../hooks/useRequest';
import {commentDynamic} from '../../api/daily';
import {giveGift} from '../../api/gift';
import {BASE_DOWN_URL} from '../../util/config';

interface commentProp {
  type: string;
  value: string;
}

const genImages = (imgs: string) => {
  if (!imgs) {
    return [];
  } else {
    return JSON.parse(imgs);
  }
};

const Index = ({...props}) => {
  const toast = useToast();
  const {item} = props.route.params;
  const {width} = useWindowDimensions();
  const {run: runCommentDymaic} = useRequest(commentDynamic.url);
  const {run: runGiveGift} = useRequest(giveGift.url);
  const {isOpen, onOpen, onClose} = useDisclose();
  const IMG_ITEM_WIDTH = (width - 60) / 3;
  const IMG_ITEM_HEIGHT = IMG_ITEM_WIDTH;

  const comment = (data: commentProp, dynamicId: string) => {
    if (data.type === 'text') {
      runCommentDymaic({
        dynamicId,
        content: data.value,
      });
    }
  };

  const preview = (index: number) => {
    const imgUrls = genImages(item.images).map((img: string) => {
      const temp = {url: `${BASE_DOWN_URL + img}`};
      return temp;
    });
    props.navigation.navigate('Preview', {index, imgUrls});
  };

  const presentGift = async (
    giftItem: object,
    receiveUserId: string,
    userDynamicId: string,
  ) => {
    try {
      await runGiveGift({
        giftId: giftItem?.id,
        num: 1,
        receiveUserId,
        userDynamicId,
      });
      onClose();
      toast.show({
        title: '赠送礼物成功',
        placement: 'top',
        duration: 2000,
      });
    } catch (error) {
      console.log('presentGift', error);
    }
  };

  return (
    <DailyDetailContext.Provider value={item}>
      <Actionsheet hideDragIndicator isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content
          style={{
            backgroundColor: '#1f2937',
            borderRadius: 40,
          }}>
          <Gifts
            clickItem={(giftItem: object) => {
              onClose();
              presentGift(giftItem, item.userId, item.id);
            }}
          />
        </Actionsheet.Content>
      </Actionsheet>
      <Box flex={1} pt={4} bg="white">
        <Box px={5} pb={4}>
          <HStack alignItems="center">
            <CFastImage
              url={item.headImg}
              styles={{
                width: 48,
                height: 48,
                borderRadius: 24,
              }}
            />
            <VStack flex={1} mr={'auto'} ml={2} justifyContent={'space-around'}>
              <Text
                fontSize={'lg'}
                style={{
                  color: '#8E8895',
                }}>
                {item.nickName}
              </Text>
              <Text
                fontSize={'xs'}
                style={{
                  color: '#C7C4CC',
                }}>
                {item.createTime}
              </Text>
            </VStack>
            {/* <Button
              disabled
              py={1}
              borderRadius={'full'}
              borderColor="#9650FF"
              borderWidth={0.5}
              bg={'transparent'}>
              <Text fontSize={'xs'} color={'primary.100'}>
                关注
              </Text>
            </Button> */}
          </HStack>
          <View pt={4}>
            <HStack mb={2} flexWrap={'wrap'}>
              {genImages(item.images).map((ele: string, index: number) => (
                <Pressable key={index} onPress={() => preview(index)}>
                  <CFastImage
                    url={ele}
                    styles={{
                      marginRight: (index + 1) % 3 === 0 ? 0 : 8,
                      width: IMG_ITEM_WIDTH,
                      height: IMG_ITEM_HEIGHT,
                      borderRadius: 8,
                      marginBottom: 8,
                    }}
                  />
                </Pressable>
              ))}
            </HStack>
            <Text fontSize={'md'} color={'fontColors._72'}>
              {item.content}
            </Text>
          </View>
        </Box>
        <Divider h={2.5} bg="bg.f5" />
        <Box flex={1}>
          <Tab />
        </Box>
      </Box>
      <ChatBox
        pressCb={(data: commentProp) => {
          if (data.type === 'text') {
            comment(data, item.id);
          } else {
            onOpen();
          }
        }}
      />
    </DailyDetailContext.Provider>
  );
};
export default Index;
