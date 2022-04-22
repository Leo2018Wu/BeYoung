import React, {useEffect, useState} from 'react';
import {Box, Center, HStack, Pressable, Text} from 'native-base';
import {connect} from 'react-redux';
import useRequest from '../../hooks/useRequest';
import {fetchMyMedia} from '../../api/photoSelect';
import {useWindowDimensions} from 'react-native';
import {BASE_DOWN_URL} from '../../util/config';
import CFastImage from '../CFastImage';
import {useNavigation} from '@react-navigation/native';

const Index = ({...props}) => {
  const navigation = useNavigation();

  const {width} = useWindowDimensions();
  const GIFT_ITEM_WiIDTH = (width - 16) / 4;
  const [myMedia, setMyMedia] = useState([]);

  const {run: runFetchMyMedia, result} = useRequest(fetchMyMedia.url);

  useEffect(() => {
    runFetchMyMedia({
      mediaType: 'MEDIA_TYPE_EMOGI', //媒体类型
    });
  }, []);

  useEffect(() => {
    if (result) {
      setMyMedia(result);
    }
  }, [result]);

  const present = (item: object) => {
    props.clickItem(item);
  };

  const closeItem = () => {
    props.closeItem();
  };

  return (
    <Box pb={0} w={'full'}>
      <HStack minHeight={20} flexWrap={'wrap'}>
        {myMedia.length ? (
          myMedia.map((item: any) => (
            <Pressable
              key={item.id}
              onPress={() => {
                present(item);
              }}
              alignItems="center"
              style={{
                width: GIFT_ITEM_WiIDTH,
                height: GIFT_ITEM_WiIDTH,
              }}>
              <Box flex={1} py={0} justifyContent={'space-around'} w="full">
                <Center flex={1}>
                  <CFastImage
                    url={`${BASE_DOWN_URL + item.url}`}
                    styles={{
                      width: GIFT_ITEM_WiIDTH / 1.5,
                      height: GIFT_ITEM_WiIDTH / 1.5,
                    }}
                  />
                </Center>
              </Box>
            </Pressable>
          ))
        ) : (
          <Box
            pb={4}
            w={'full'}
            h={'full'}
            flex={1}
            style={{
              alignItems: 'center',
              paddingTop: '5%',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text fontSize={'md'} color={'#fff'}>
              暂无自定义表情，请先
            </Text>
            <Text
              onPress={() => {
                closeItem();
                navigation.navigate('ReplyExpPackage');
              }}
              fontSize={'md'}
              color={'#8B5CFF'}>
              添加
            </Text>
          </Box>
        )}
      </HStack>
    </Box>
  );
};

export default connect()(Index);
