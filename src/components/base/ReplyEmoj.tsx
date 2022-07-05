import React, {useEffect, useState} from 'react';
import {ActivityIndicator} from 'react-native';
import {Box, Center, HStack, Pressable, Text, ScrollView} from 'native-base';
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
  const [flag, setFlag] = useState(true);

  const {run: runFetchMyMedia, result} = useRequest(fetchMyMedia.url);

  useEffect(() => {
    runFetchMyMedia({
      mediaType: 'MEDIA_TYPE_EMOGI', //媒体类型
      pageNum: 1,
      pageSize: 100,
      orders: [
        {
          column: 'createTime',
          dir: 'desc',
          chinese: false,
        },
      ],
    });
  }, []);

  useEffect(() => {
    if (result) {
      setMyMedia(result);
      setFlag(false);
    }
  }, [result]);

  const present = (item: object) => {
    props.clickItem(item);
  };

  const closeItem = () => {
    props.closeItem();
  };

  if (flag) {
    return (
      <ActivityIndicator
        size="large"
        color="#0000ff"
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '30%',
        }}
      />
    );
  }

  return (
    <>
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
                    borderRadius: 10,
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
          <Text fontSize={'md'} color={'#000'}>
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
    </>
  );
};

export default connect()(Index);
