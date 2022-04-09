import React, {useEffect, useState} from 'react';
import {HStack, ScrollView, Box, Image, View, VStack, Text} from 'native-base';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useWindowDimensions} from 'react-native';
import useRequest from '../../../hooks/useRequest';
import {queryGiftGiving} from '../../../api/gift';
import getStorage from '../../../util/Storage';

const Index = () => {
  const insets = useSafeAreaInsets();
  const {width} = useWindowDimensions();
  const IMG_ITEM_WIDTH = (width - 32) / 3;
  const IMG_ITEM_HEIGHT = 1.2 * IMG_ITEM_WIDTH;
  const {run: runGiftList, result} = useRequest(queryGiftGiving.url);

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    let tempId = await getStorage(['DynamicId']);
    await runGiftList({
      dynamicId: tempId,
    });
    console.log('----', result);
  };

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
        paddingBottom: insets.bottom,
      }}>
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
      </Box>
    </ScrollView>
  );
};
export default Index;
