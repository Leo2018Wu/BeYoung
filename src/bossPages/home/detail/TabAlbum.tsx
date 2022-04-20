import React, {useContext} from 'react';
import {HStack, ScrollView, Pressable} from 'native-base';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useWindowDimensions} from 'react-native';
import {queryMedia} from '../../../api/user';
import MyContext from './Context';
import useRequest from '../../../hooks/useRequest';
import CFastImage from '../../../components/CFastImage';
import {PageEmpty} from '../../../components/base/Pagination';
import {useNavigation} from '@react-navigation/native';
import {BASE_DOWN_URL} from '../../../util/config';

const Index = () => {
  const navigation = useNavigation();
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

  const preview = (index: number) => {
    const imgUrls =
      mediaInfo &&
      mediaInfo.map((item: any) => {
        const temp = {url: `${BASE_DOWN_URL + item.url}`};
        return temp;
      });
    navigation.navigate('Preview', {
      index,
      imgUrls,
    });
  };

  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: insets.bottom + 60,
      }}>
      <HStack flexWrap={'wrap'} px={2} flex={1}>
        {mediaInfo &&
          mediaInfo.map((item: any, index: number) => (
            <Pressable
              onPress={() => preview(index)}
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
            </Pressable>
          ))}
      </HStack>
    </ScrollView>
  );
};
export default Index;
