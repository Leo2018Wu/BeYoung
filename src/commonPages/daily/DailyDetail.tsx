import React, {useState, useEffect} from 'react';
import {
  HStack,
  Box,
  Image,
  View,
  VStack,
  Text,
  Stack,
  Divider,
  ScrollView,
  Pressable,
  Actionsheet,
  useDisclose,
} from 'native-base';
import {
  useWindowDimensions,
  DeviceEventEmitter,
  StyleSheet,
  Platform,
} from 'react-native';
import {BASE_DOWN_URL} from '../../util/config';
import CFastImage from '../../components/CFastImage';
import DailyDetailContext from './context.js';
import ChatBox from '../../components/base/ChatBox';
import useRequest from '../../hooks/useRequest';
import {commentDynamic, fetchDynamic} from '../../api/daily';
import {queryDynamicGiftRank} from '../../api/gift';
import Icon from 'react-native-vector-icons/AntDesign';
import Comment from '../../commonPages/daily/Comment';
import Gifts from '../../commonPages/daily/Gift';
import {getSoftInputModule} from '../../util/getSoftInputModule';

const Index = ({...props}) => {
  const {dynamicId} = props.route.params;
  const [dynamicInfo, setDynamic] = useState({});
  const {isOpen, onOpen, onClose} = useDisclose();
  const {width} = useWindowDimensions();
  const IMG_ITEM_WIDTH = (width - 60) / 3;
  const IMG_ITEM_HEIGHT = IMG_ITEM_WIDTH;
  const [imgList, setImgList] = useState([]);
  const [replyFlag, setReplyFlag] = useState(false);
  const {run: runGetDynamic} = useRequest(fetchDynamic.url);
  const {run: runCommentDymaic} = useRequest(commentDynamic.url);
  const {result: giftRankList} = useRequest(
    queryDynamicGiftRank.url,
    {
      dynamicId, //动态ID
      pageNum: 1,
      pageSize: 10, //每页大小
      orders: [
        {
          column: 'totalCoin',
          dir: 'desc',
          chinese: false,
        },
      ],
    },
    {manual: false},
  );

  useEffect(() => {
    if (Platform.OS === 'android') {
      getSoftInputModule(0);
    }
    getDynamic();
    DeviceEventEmitter.addListener('REPLY_FLAG', res => {
      setReplyFlag(res);
      setTimeout(() => {
        DeviceEventEmitter.emit('KEYBOARD', true);
      }, 500);
      DeviceEventEmitter.removeListener('REPLY_FLAG', () => {});
    });
  }, []);

  const getDynamic = async () => {
    try {
      const {data} = await runGetDynamic({dynamicId});
      setDynamic(data);
      if (data.images && JSON.parse(data.images).length) {
        setImgList(JSON.parse(data.images));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const comment = async (data: Object, dynamicId: string, replyId: string) => {
    if (data.type === 'text') {
      const {success} = await runCommentDymaic({
        dynamicId,
        replyId,
        content: data.content,
        images: data.images,
      });
      if (success) {
        DeviceEventEmitter.emit('REPLY_REFRESH', Math.random());
      }
    }
  };

  const preview = (index: number) => {
    const imgUrls = imgList.map((img: string) => {
      const temp = {url: `${BASE_DOWN_URL + img}`};
      return temp;
    });
    props.navigation.navigate('Preview', {index, imgUrls});
  };

  return (
    <DailyDetailContext.Provider value={dynamicId}>
      <ScrollView showsVerticalScrollIndicator={false} py={4} bg="white">
        <Box px={5} pb={4}>
          <HStack alignItems="center">
            <CFastImage
              url={dynamicInfo.headImg}
              styles={{width: 50, height: 50, borderRadius: 50}}
            />
            <VStack flex={1} mr={'auto'} ml={2} justifyContent={'space-around'}>
              <Text
                fontSize={'lg'}
                style={{
                  color: '#8E8895',
                }}>
                {dynamicInfo.nickName}
              </Text>
              <Text
                fontSize={'xs'}
                style={{
                  color: '#C7C4CC',
                }}>
                {dynamicInfo.createTime}
              </Text>
            </VStack>
          </HStack>
          <View pt={4} pb={4}>
            <HStack mb={2} flexWrap={'wrap'}>
              {imgList &&
                imgList.map((item, index) => (
                  <Pressable onPress={() => preview(index)}>
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
                  </Pressable>
                ))}
            </HStack>
            <Text fontSize={'md'} color={'fontColors._72'}>
              {dynamicInfo.content}
            </Text>
          </View>
          <Stack space={2} pt={2} direction={'row'} alignItems={'center'}>
            <HStack alignItems={'center'}>
              <Icon
                name="hearto"
                size={18}
                color={false ? '#9650FF' : '#C7C4CC'}
              />
              <Text ml={1} fontSize={'xs'} style={{color: '#C7C4CC'}}>
                {dynamicInfo.likeNum}
              </Text>
            </HStack>
            <HStack alignItems={'center'}>
              <Icon
                name="message1"
                size={18}
                color={false ? '#9650FF' : '#C7C4CC'}
              />
              <Text ml={1} fontSize={'xs'} style={{color: '#C7C4CC'}}>
                {dynamicInfo.commentNum}
              </Text>
            </HStack>
            <HStack alignItems={'center'}>
              <Icon
                name="gift"
                size={18}
                color={false ? '#9650FF' : '#C7C4CC'}
              />
              <Text ml={1} fontSize={'xs'} style={{color: '#C7C4CC'}}>
                {dynamicInfo.giftNum}
              </Text>
            </HStack>
          </Stack>
        </Box>
        <Divider h={2.5} bg="bg.f5" />
        <Actionsheet hideDragIndicator isOpen={isOpen} onClose={onClose}>
          <Actionsheet.Content>
            <Box w={'100%'} h={500} py={4}>
              <Gifts dynamicId={dynamicId} />
            </Box>
          </Actionsheet.Content>
        </Actionsheet>
        <Box flex={1}>
          {giftRankList && giftRankList.length > 0 && (
            <Box p={4}>
              <HStack justifyContent={'space-between'} alignItems="center">
                <Text style={{color: '#323232'}} fontWeight="bold">
                  礼物榜
                </Text>
                <Pressable
                  onPress={() => onOpen()}
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{color: '#474747'}}>礼物列表</Text>
                  <Icon name="right" size={16} color="#000" />
                </Pressable>
              </HStack>
              <ScrollView
                horizontal
                contentContainerStyle={{
                  paddingVertical: 20,
                }}>
                {giftRankList.map((giftItem: object, giftIndex: number) => (
                  <VStack key={giftIndex} alignItems={'center'} mr={4}>
                    <CFastImage
                      url={giftItem.giveHeadImg}
                      styles={{
                        width: 46,
                        height: 46,
                        borderRadius: 46,
                      }}
                    />
                    <HStack mt={2} alignItems="center">
                      {giftIndex === 0 ? (
                        <Image
                          style={styles.rankIcon}
                          alt="rank_ico"
                          source={require('../../images/rank_first.png')}
                        />
                      ) : null}
                      {giftIndex === 1 ? (
                        <Image
                          style={styles.rankIcon}
                          alt="rank_ico"
                          source={require('../../images/rank_second.png')}
                        />
                      ) : null}
                      {giftIndex === 2 ? (
                        <Image
                          style={styles.rankIcon}
                          alt="rank_ico"
                          source={require('../../images/rank_third.png')}
                        />
                      ) : null}
                      <Text fontSize={'sm'} style={{color: '#4E4E4E'}}>
                        {giftItem.giveNickName}
                      </Text>
                    </HStack>
                  </VStack>
                ))}
              </ScrollView>
            </Box>
          )}
        </Box>
        <Divider h={2.5} bg="bg.f5" />
        <Box flex={1} my={4}>
          <Comment dynamicId={dynamicId} />
        </Box>
      </ScrollView>
      {replyFlag ? (
        <ChatBox
          pressCb={(data: Object) => {
            comment(data, dynamicInfo.id, replyFlag.id);
          }}
        />
      ) : null}
    </DailyDetailContext.Provider>
  );
};
export default Index;

const styles = StyleSheet.create({
  rankIcon: {
    width: 16,
    height: 22,
    marginRight: 4,
  },
});
