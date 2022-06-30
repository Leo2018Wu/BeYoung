import React from 'react';
import {
  HStack,
  Box,
  View,
  VStack,
  Text,
  Button,
  Stack,
  Pressable,
  Image,
} from 'native-base';
import CFastImage from '../../components/CFastImage';
import Icon from 'react-native-vector-icons/AntDesign';
import {likeDynamic, collectDynamic} from '../../api/daily';

import {useWindowDimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {BASE_DOWN_URL} from '../../util/config';
import useRequest from '../../hooks/useRequest';

const genImages = (imgs: string) => {
  if (!imgs) {
    return [];
  } else {
    return JSON.parse(imgs);
  }
};

interface ItemProp {
  id: string | number;
  userId: string;
  headImg: string;
  nickName: string;
  createTime: string;
  content: string;
  score: number;
  liked: boolean;
  collected: boolean;
  likeNum: string | number;
  commentNum: string | number;
  collectNum: string | number;
  giftNum: string | number;
  images: string;
  hotness: number | string;
}

const isEqual = (pre: any, next: any) => {
  // 优化无关渲染
  // JSON.stringify(pre.item) === JSON.stringify(next.item);
  return (
    pre.item.score === next.item.score &&
    pre.item.liked === next.item.liked &&
    pre.item.likeNum === next.item.likeNum &&
    pre.item.commentNum === next.item.commentNum &&
    pre.item.giftNum === next.item.giftNum &&
    pre.item.collectNum === next.item.collectNum &&
    pre.item.collected === next.item.collected
  );
};

const Index = ({item, returnFunc}: {item: ItemProp; returnFunc?: Function}) => {
  const {run: runLikeDynamic} = useRequest(likeDynamic.url);
  const {run: runCollectDynamic} = useRequest(collectDynamic.url);

  const navigation = useNavigation();
  const {width} = useWindowDimensions();
  const IMG_ITEM_WIDTH = (width - 104) / 3;
  const IMG_ITEM_HEIGHT = IMG_ITEM_WIDTH;

  const preview = (index: number) => {
    const imgUrls = genImages(item.images).map((img: string) => {
      const temp = {url: `${BASE_DOWN_URL + img}`};
      return temp;
    });
    navigation.navigate('Preview', {index, imgUrls});
  };

  const likeClick = async ({
    id,
    liked,
  }: {
    id: string | number;
    liked: boolean;
  }) => {
    try {
      const {success, data} = await runLikeDynamic({
        dynamicId: id,
        cancel: liked,
      });
      if (success) {
        returnFunc && returnFunc(data);
      }
    } catch (error) {}
  };

  const collectClick = async ({
    id,
    collected,
  }: {
    id: string | number;
    collected: boolean;
  }) => {
    try {
      const {success, data} = await runCollectDynamic({
        dynamicId: id,
        cancel: collected,
      });
      if (success) {
        returnFunc && returnFunc(data);
      }
    } catch (error) {}
  };

  return (
    <Box bg="white">
      <Pressable
        onPress={() => {
          navigation.navigate('DailyDetail', {item: item});
        }}>
        <HStack alignItems="center">
          <Pressable
            onPress={() =>
              navigation.navigate('HomeDetail', {userId: item.userId})
            }>
            <CFastImage
              url={item.headImg}
              styles={{
                width: 48,
                height: 48,
                borderRadius: 24,
              }}
            />
          </Pressable>
          <VStack flex={1} mr={'auto'} ml={2} justifyContent={'space-around'}>
            <Text
              fontSize={'lg'}
              style={{
                color: '#8E8895',
              }}>
              {item.nickName || '青回'}
            </Text>
            <Text
              fontSize={'xs'}
              style={{
                color: '#C7C4CC',
              }}>
              {item.createTime}
            </Text>
          </VStack>
          {item.hotness ? (
            <Image
              alt="fire_icon"
              source={require('../../images/fire_icon.png')}
              w={4}
              h={5}
            />
          ) : null}
          {item.hotness ? (
            <Text style={{color: '#FF6035', marginTop: 4, marginLeft: 4}}>
              {item.hotness}
            </Text>
          ) : null}
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
        <View
          style={{
            marginLeft: 56,
          }}
          pt={4}>
          <HStack mb={2} flexWrap={'wrap'}>
            {genImages(item.images).map((ele: string, index: number) => (
              <Pressable onPress={() => preview(index)} key={index}>
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
          <Text numberOfLines={3} fontSize={'md'} color={'fontColors._72'}>
            {item.content}
          </Text>
        </View>
        <Stack
          space={2}
          pt={2}
          style={{
            marginLeft: 56,
          }}
          direction={'row'}
          alignItems={'center'}>
          <Pressable
            onPress={() => collectClick(item)}
            flexDirection={'row'}
            alignItems={'center'}>
            {item.collected ? (
              <Icon name="star" size={18} color="#FDE220" />
            ) : (
              <Icon name="staro" size={18} color="#C7C4CC" />
            )}
            <Text ml={1} fontSize={'xs'} style={{color: '#C7C4CC'}}>
              {item.collectNum}
            </Text>
          </Pressable>
          <Pressable
            onPress={() => likeClick(item)}
            flexDirection={'row'}
            alignItems={'center'}>
            {item.liked ? (
              <Icon name="heart" size={18} color="#9650FF" />
            ) : (
              <Icon name="hearto" size={18} color="#C7C4CC" />
            )}
            <Text ml={1} fontSize={'xs'} style={{color: '#C7C4CC'}}>
              {item.likeNum}
            </Text>
          </Pressable>
          <HStack alignItems={'center'}>
            <Icon name="message1" size={18} color="#C7C4CC" />
            <Text ml={1} fontSize={'xs'} style={{color: '#C7C4CC'}}>
              {item.commentNum}
            </Text>
          </HStack>
          <HStack alignItems={'center'}>
            <Icon name="gift" size={18} color="#C7C4CC" />
            <Text ml={1} fontSize={'xs'} style={{color: '#C7C4CC'}}>
              {item.giftNum}
            </Text>
          </HStack>
        </Stack>
      </Pressable>
    </Box>
  );
};
export default React.memo(Index, isEqual);
