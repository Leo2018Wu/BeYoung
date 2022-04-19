import React, {useContext, useEffect} from 'react';
import {HStack, ScrollView, Box} from 'native-base';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useWindowDimensions} from 'react-native';
import {queryMedia} from '../../../api/user';
import MyContext from './Context';
import useRequest from '../../../hooks/useRequest';
import CFastImage from '../../../components/CFastImage';
import {PageEmpty} from '../../../components/base/Pagination';

const Index = () => {
  const insets = useSafeAreaInsets();
  const {width} = useWindowDimensions();
  const IMG_ITEM_WIDTH = (width - 20) / 3;
  const IMG_ITEM_HEIGHT = 1.2 * IMG_ITEM_WIDTH;
  const context = useContext(MyContext);
  const {result: mediaInfo} = useRequest(
    queryMedia.url,
    {
      userId: context.id, //用户ID
      mediaType: 'MEDIA_TYPE_IMAGE', //媒体类型
      // "scene": "SCENE_DORMITORY", //场景
    },
    queryMedia.options,
  );

  if (!mediaInfo) {
    return <PageEmpty content="暂无照片" />;
  }

  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: insets.bottom + 60,
      }}>
      <HStack flexWrap={'wrap'} px={2} flex={1}>
        {mediaInfo &&
          mediaInfo.map((item: any, index: number) => (
            <Box
              borderRadius={3}
              bg={'primary.100'}
              key={item.id}
              style={{
                marginRight: (index + 1) % 3 === 0 ? 0 : 2,
                marginBottom: 2,
                height: IMG_ITEM_HEIGHT,
                width: IMG_ITEM_WIDTH,
                overflow: 'hidden',
              }}>
              <CFastImage
                url={item.url}
                styles={{
                  height: IMG_ITEM_HEIGHT,
                  width: IMG_ITEM_WIDTH,
                }}
              />
            </Box>
          ))}
      </HStack>
    </ScrollView>
  );
};
export default Index;
