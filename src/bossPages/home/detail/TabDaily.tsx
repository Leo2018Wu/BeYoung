import React from 'react';
import {
  HStack,
  ScrollView,
  Box,
  Image,
  View,
  VStack,
  Text,
  Pressable,
} from 'native-base';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Entypo';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import {useWindowDimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Index = () => {
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

  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: insets.bottom + 60,
      }}>
      <Pressable onPress={() => navigation.navigate('DailyDetail')}>
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
              <Image
                w={'full'}
                h={'full'}
                alt="avatar"
                source={{
                  uri: 'https://picsum.photos/200/180?random=8',
                }}
              />
            </View>
            <VStack ml={2} justifyContent={'space-around'}>
              <Text fontSize={'md'} color={'fontColors._72'}>
                闫有筠
              </Text>
              <Text fontSize={'sm'} color="fontColors.b2">
                2022.10.21 19:03
              </Text>
            </VStack>
          </HStack>
          <View pt={2}>
            <Text fontSize={'md'} color={'fontColors._72'}>
              蔡蒙是安徽人，来上海两年多，和许多“漂漂”们一样，他也想落脚上海，在上海能有一套属于自己的房子。
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
              <Icon name="thumbs-up" size={18} color="#9650FF" />
              <Text fontSize={'md'} color="primary.100">
                24
              </Text>
            </HStack>
          </HStack>
        </Box>
      </Pressable>
    </ScrollView>
  );
};
export default Index;
