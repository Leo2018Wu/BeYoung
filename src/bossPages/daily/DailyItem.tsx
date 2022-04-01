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
import Icon from 'react-native-vector-icons/AntDesign';
import {Pressable, useWindowDimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Index = () => {
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
          <Image
            w={12}
            h={12}
            borderRadius="full"
            alt="avatar"
            source={{
              uri: 'https://picsum.photos/200/180?random=8',
            }}
          />
          <VStack flex={1} mr={'auto'} ml={2} justifyContent={'space-around'}>
            <Text
              fontSize={'lg'}
              style={{
                color: '#8E8895',
              }}>
              闫有筠
            </Text>
            <Text
              fontSize={'xs'}
              style={{
                color: '#C7C4CC',
              }}>
              2022.10.21 19:03
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
            蔡蒙是安徽人，来上海两年多，和许多“漂漂”们一样，他也想落脚上海，在上海能有一套属于自己的房子。蔡蒙是安徽人，来上海两年多，和许多“漂漂”们一样，他也想落脚上海，在上海能有一套属于自己的房子。
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
              24
            </Text>
          </HStack>
          <HStack alignItems={'center'}>
            <Icon
              name="hearto"
              size={18}
              color={false ? '#9650FF' : '#C7C4CC'}
            />
            <Text ml={1} fontSize={'xs'} style={{color: '#C7C4CC'}}>
              72
            </Text>
          </HStack>
          <HStack alignItems={'center'}>
            <Icon name="message1" size={18} color="#C7C4CC" />
            <Text ml={1} fontSize={'xs'} style={{color: '#C7C4CC'}}>
              13
            </Text>
          </HStack>
          <HStack alignItems={'center'}>
            <Icon name="gift" size={18} color="#C7C4CC" />
            <Text ml={1} fontSize={'xs'} style={{color: '#C7C4CC'}}>
              4
            </Text>
          </HStack>
        </Stack>
      </Pressable>
    </Box>
  );
};
export default Index;
