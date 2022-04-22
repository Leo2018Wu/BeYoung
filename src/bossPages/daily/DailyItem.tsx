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
} from 'native-base';
import CFastImage from '../../components/CFastImage';
import Icon from 'react-native-vector-icons/AntDesign';
import {useWindowDimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {BASE_DOWN_URL} from '../../util/config';

const genImages = (imgs: string) => {
  if (!imgs) {
    return [];
  } else {
    return JSON.parse(imgs);
  }
};

interface ItemProp {
  headImg: string;
  nickName: '青回';
  createTime: string;
  content: string;
  score: number;
  liked: boolean;
  likeNum: number;
  commentNum: number;
  giftNum: number;
  images: string;
}

const isEqual = (pre: any, next: any) => {
  // 优化无关渲染
  // JSON.stringify(pre.item) === JSON.stringify(next.item);
  return (
    pre.item.score === next.item.score &&
    pre.item.liked === next.item.liked &&
    pre.item.likeNum === next.item.likeNum &&
    pre.item.commentNum === next.item.commentNum &&
    pre.item.giftNum === next.item.giftNum
  );
};

const Index = ({item}: {item: ItemProp}) => {
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
          <HStack mr={'auto'} alignItems={'center'}>
            <Text fontSize={'xs'} style={{color: '#C7C4CC'}}>
              评分
            </Text>
            <Text fontSize={'xs'} style={{color: '#C7C4CC'}}>
              {item.score}
            </Text>
          </HStack>
          <Pressable flexDirection={'row'} alignItems={'center'}>
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
