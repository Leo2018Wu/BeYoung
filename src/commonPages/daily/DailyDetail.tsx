import React, {useState, useEffect} from 'react';
import {
  HStack,
  Box,
  Image,
  View,
  VStack,
  Text,
  Button,
  Divider,
  ScrollView,
} from 'native-base';
import {useWindowDimensions} from 'react-native';
import Tab from './DailyTab';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import getStorage from '../../util/Storage';
import {BASE_DOWN_URL} from '../../util/config';
import CFastImage from '../../components/CFastImage';
import AsyncStorage from '@react-native-community/async-storage';

const Index = ({...props}) => {
  const {item} = props.route.params;
  console.log('-1-props-1-', props, item.id);
  const insets = useSafeAreaInsets();
  const {width} = useWindowDimensions();
  const IMG_ITEM_WIDTH = (width - 60) / 3;
  const IMG_ITEM_HEIGHT = IMG_ITEM_WIDTH;
  const [imgList, setImgList] = useState([]);
  const [isBoss, setIsBoss] = useState('MALE_LOGIN');

  useEffect(async () => {
    AsyncStorage.setItem('DynamicId', item.id); // 存储动态id
    const boss = await getStorage(['LOGIN_NAVIGAITON_NAME']);
    setIsBoss(boss);
    if (item.images && JSON.parse(item.images).length) {
      setImgList(JSON.parse(item.images));
    }
  }, []);

  return (
    <Box flex={1}>
      <ScrollView contentContainerStyle={{flex: 1}} py={4} bg="white">
        <Box px={5} pb={4}>
          <HStack alignItems="center">
            <CFastImage
              url={item.headImg}
              styles={{width: 50, height: 50, borderRadius: 50}}
            />
            <VStack flex={1} mr={'auto'} ml={2} justifyContent={'space-around'}>
              <Text
                fontSize={'lg'}
                style={{
                  color: '#8E8895',
                }}>
                {item.nickName}
              </Text>
              <Text
                fontSize={'xs'}
                style={{
                  color: '#C7C4CC',
                }}>
                {item.createTime}
              </Text>
            </VStack>
            {isBoss == 'MALE_LOGIN' ? (
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
            ) : null}
          </HStack>
          <View pt={4}>
            <HStack mb={2} flexWrap={'wrap'}>
              {imgList &&
                imgList.map((item, index) => (
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
                    source={{uri: BASE_DOWN_URL + item}}
                  />
                ))}
            </HStack>
            <Text fontSize={'md'} color={'fontColors._72'}>
              {item.content}
            </Text>
          </View>
        </Box>
        <Divider h={2.5} bg="bg.f5" />
        <Box flex={1}>
          <Tab />
        </Box>
      </ScrollView>
    </Box>
  );
};
export default Index;
