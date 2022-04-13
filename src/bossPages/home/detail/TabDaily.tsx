import React, {useContext} from 'react';
import {HStack, Box, Image, View, VStack, Text, Pressable} from 'native-base';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CFastImage from '../../../components/CFastImage';

import Icon from 'react-native-vector-icons/AntDesign';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import {useWindowDimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CustomFuncFlatList from '../../../components/CustomFuncFlatList';
import {queryDynamic} from '../../../api/daily';
import MyContext from './Context';

const Index = () => {
  const userInfo = useContext(MyContext); // 共享的用户信息

  const insets = useSafeAreaInsets();
  const {width} = useWindowDimensions();
  const IMG_ITEM_WIDTH = (width - 32) / 3;
  const IMG_ITEM_HEIGHT = 1.2 * IMG_ITEM_WIDTH;
  const navigation = useNavigation();

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

  interface ItemProp {
    headImg: string;
    nickName: string;
    createTime: string;
    content: string;
    likeNum: string;
    liked: boolean;
  }

  const Item = ({item}: {item: ItemProp}) => {
    return (
      <Pressable
        onPress={() => navigation.navigate('DailyDetail', {item: item})}>
        <Box p={3} borderRadius={4} bg="white">
          {/* 动态用户信息 */}
          <HStack h={10}>
            <View
              w={10}
              h={10}
              borderRadius="full"
              style={{
                overflow: 'hidden',
              }}>
              <CFastImage
                url={item.headImg}
                styles={{
                  flex: 1,
                }}
              />
            </View>
            <VStack ml={2} justifyContent={'space-around'}>
              <Text fontSize={'md'} color={'fontColors._72'}>
                {item.nickName}
              </Text>
              <Text fontSize={'sm'} color="fontColors.b2">
                {item.createTime}
              </Text>
            </VStack>
          </HStack>
          <View pt={2}>
            <Text numberOfLines={3} fontSize={'md'} color={'fontColors._72'}>
              {item.content}
            </Text>
            <HStack mt={2} flexWrap={'wrap'}>
              {IMGS &&
                IMGS.map((item, index) => (
                  <Image
                    key={index}
                    mb={0.5}
                    alt="dairy"
                    borderRadius={4}
                    style={{
                      marginRight: (index + 1) % 3 === 0 ? 0 : 4,
                      width: IMG_ITEM_WIDTH,
                      height: IMG_ITEM_HEIGHT,
                    }}
                    source={item.url}
                  />
                ))}
            </HStack>
          </View>
          <HStack pt={2} alignItems={'center'} justifyContent="space-between">
            <HStack alignItems={'center'}>
              <EvilIcon name="location" size={18} color="#b2b2b2" />
              <Text fontSize={'xs'} color="fontColors.b2">
                上海
              </Text>
            </HStack>
            <HStack alignItems={'center'}>
              {item.liked ? (
                <Icon name="heart" size={18} color="#9650FF" />
              ) : (
                <Icon name="hearto" size={18} color="#C7C4CC" />
              )}

              <Text ml={1} fontSize={'md'} color="primary.100">
                {item.likeNum}
              </Text>
            </HStack>
          </HStack>
        </Box>
      </Pressable>
    );
  };

  return (
    <Box
      flex={1}
      bg="white"
      style={{
        paddingBottom: insets.bottom + 60,
      }}>
      <CustomFuncFlatList
        url={queryDynamic.url}
        par={{
          userId: userInfo.id,
        }}
        renderItem={({item}: {item: ItemProp}) => <Item item={item} />}
      />
    </Box>
  );
};
export default Index;
