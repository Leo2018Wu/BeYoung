import React, {useState, useEffect} from 'react';
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
import {BASE_DOWN_URL} from '../../util/config';
import getStorage from '../../util/Storage';
import CFastImage from '../../components/CFastImage';

const Index = ({...props}) => {
  const navigation = useNavigation();
  const {item} = props;
  const [imgList, setImgList] = useState([]);
  const {width} = useWindowDimensions();
  const IMG_ITEM_WIDTH = (width - 104) / 3;
  const IMG_ITEM_HEIGHT = IMG_ITEM_WIDTH;
  const [isBoss, setIsBoss] = useState('MALE_LOGIN');

  useEffect(async () => {
    const boss = await getStorage(['LOGIN_NAVIGAITON_NAME']);
    setIsBoss(boss);
    if (item.images && JSON.parse(item.images).length) {
      setImgList(JSON.parse(item.images));
    }
  }, []);

  return (
    <>
      {!item.delFlag ? (
        <Box bg="white" marginBottom={10}>
          <View>
            <HStack alignItems="center">
              <CFastImage
                url={item.headImg}
                styles={{width: 50, height: 50, borderRadius: 50}}
              />
              <VStack
                flex={1}
                mr={'auto'}
                ml={2}
                justifyContent={'space-around'}>
                <Text
                  fontSize={'sm'}
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
            <Pressable
              onPress={() => {
                navigation.navigate('DailyDetail', {
                  dynamicId: item.id,
                });
              }}
              style={{
                marginLeft: 56,
              }}
              pt={0}>
              <HStack mb={2} flexWrap={'wrap'}>
                {imgList.length === 1 ? (
                  <Image
                    alt="dairy"
                    borderRadius={10}
                    style={{
                      marginRight: 8,
                      width: IMG_ITEM_WIDTH * 2,
                      height: IMG_ITEM_HEIGHT * 3,
                    }}
                    source={{uri: BASE_DOWN_URL + imgList}}
                  />
                ) : (
                  imgList &&
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
                  ))
                )}
              </HStack>
              <Text fontSize={'sm'} color={'fontColors._72'}>
                {item.content}
              </Text>
            </Pressable>
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
                <Icon
                  name="hearto"
                  size={18}
                  color={false ? '#9650FF' : '#C7C4CC'}
                />
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
          </View>
        </Box>
      ) : null}
    </>
  );
};
export default Index;
