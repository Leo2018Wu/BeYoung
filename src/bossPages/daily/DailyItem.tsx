import React from 'react';
import {
  HStack,
  Box,
  Image,
  View,
  VStack,
  Text,
  Button,
  Stack,
} from 'native-base';
import CFastImage from '../../components/CFastImage';
import Icon from 'react-native-vector-icons/AntDesign';
import {Pressable, useWindowDimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Index = ({item}: {item: any}) => {
  const navigation = useNavigation();
  const {width} = useWindowDimensions();
  const IMG_ITEM_WIDTH = (width - 104) / 3;
  const IMG_ITEM_HEIGHT = IMG_ITEM_WIDTH;

  const IMGS = [
    {
      id: 0,
      url: {
        uri: 'https://picsum.photos/200/180?random=8',
      },
    },
    {
      id: 1,
      url: {uri: 'https://picsum.photos/200/200?random=1'},
    },
    {
      id: 2,
      url: {uri: 'https://picsum.photos/200/200?random=2'},
    },
  ];

  return (
    <Box bg="white">
      <Pressable
        onPress={() => {
          navigation.navigate('DailyDetail');
        }}>
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
          <Button
            disabled
            py={1}
            borderRadius={'full'}
            borderColor="#9650FF"
            borderWidth={0.5}
            bg={'transparent'}>
            <Text fontSize={'xs'} color={'primary.100'}>
              关注
            </Text>
          </Button>
        </HStack>
        <View
          style={{
            marginLeft: 56,
          }}
          pt={4}>
          <HStack mb={2} flexWrap={'wrap'}>
            {IMGS &&
              IMGS.map((item, index) => (
                <Image
                  key={index}
                  mb={2}
                  alt="dairy"
                  borderRadius={10}
                  style={{
                    marginRight: (index + 1) % 3 === 0 ? 0 : 8,
                    width: IMG_ITEM_WIDTH,
                    height: IMG_ITEM_HEIGHT,
                  }}
                  source={item.url}
                />
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
          <HStack alignItems={'center'}>
            {item.liked ? (
              <Icon name="heart" size={18} color="#9650FF" />
            ) : (
              <Icon name="hearto" size={18} color="#C7C4CC" />
            )}
            <Text ml={1} fontSize={'xs'} style={{color: '#C7C4CC'}}>
              {item.likeNum}
            </Text>
          </HStack>
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
export default Index;