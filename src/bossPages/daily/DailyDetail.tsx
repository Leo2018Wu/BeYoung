import React, {useEffect, useRef, useState} from 'react';
import {
  Box,
  Divider,
  Actionsheet,
  useDisclose,
  AlertDialog,
  Button,
  HStack,
  Text,
  VStack,
  ScrollView,
  Image,
  Pressable,
} from 'native-base';
import {DeviceEventEmitter, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import DailyDetailContext from './context.js';
import ChatBox from '../../components/base/ChatBox';
import Gifts from '../../components/base/Gifts';
import CFastImage from '../../components/CFastImage';
import useRequest from '../../hooks/useRequest';
import {commentDynamic, fetchDynamic} from '../../api/daily';
import {giveGift, queryDynamicGiftRank} from '../../api/gift';
import DailyItem from './DailyItem';
import Comment from './Comment';
import Gift from './Gift';

interface commentProp {
  type: string;
  value: string;
}

const Index = ({...props}) => {
  const {dynamicId} = props.route.params;
  const [dynamicInfo, setDynamic] = useState({});
  const {run: runCommentDymaic} = useRequest(commentDynamic.url);
  const {run: runGetDynamic} = useRequest(fetchDynamic.url);
  const [giftRankList, setGiftRankList] = useState([]);
  const {run: runGiftRankList} = useRequest(
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
  const {run: runGiveGift} = useRequest(giveGift.url);
  const {isOpen, onOpen, onClose} = useDisclose();
  const [dialogVisible, setIsDialogShow] = useState(false);
  const [replyFlag, setReplyFlag] = useState(false);
  const [isFlag, setIsFlag] = useState(true);

  const cancelRef = useRef(null);

  useEffect(() => {
    getDynamic();
    getGiftRankList();
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
    } catch (error) {
      console.error(error);
    }
  };

  const getGiftRankList = async () => {
    try {
      const {data} = await runGiftRankList();
      setGiftRankList(data);
    } catch (error) {
      console.log(err);
    }
  };

  //回复
  const comment = async (data: Object, dynamicId: string, replyId: string) => {
    if (data.type === 'text') {
      const {success} = await runCommentDymaic({
        dynamicId,
        replyId,
        content: data.content,
      });
      if (success) {
        setReplyFlag(false);
        DeviceEventEmitter.emit('REPLY_REFRESH', Math.random());
      }
    }
  };

  //评论动态
  const commentDy = async (comment: commentProp, dynamicId: string) => {
    if (comment.type === 'text') {
      const {data, success} = await runCommentDymaic({
        dynamicId,
        content: comment.content,
      });
      if (success) {
        setDynamic(data);
        DeviceEventEmitter.emit('REPLY_REFRESH', Math.random());
      }
    }
  };

  // 动态点赞回调函数
  const itemClick = async (data: any) => {
    setDynamic(data);
  };

  // 赠送礼物
  const presentGift = async (
    giftItem: object,
    receiveUserId: string,
    userDynamicId: string,
  ) => {
    try {
      const {data, success, code} = await runGiveGift({
        giftId: giftItem?.id,
        num: 1,
        receiveUserId,
        userDynamicId,
      });
      if (code === 50001) {
        setIsDialogShow(true);
        // 余额不足情况
        return;
      }
      if (success) {
        setDynamic(data);
        DeviceEventEmitter.emit('PRESENT_GIFT', Math.random());
        getGiftRankList();
        onClose();
      }
    } catch (error) {
      console.log('presentGift', error);
    }
  };

  return (
    <DailyDetailContext.Provider value={dynamicId}>
      <ScrollView showsVerticalScrollIndicator={false} py={4} bg="white">
        <AlertDialog
          leastDestructiveRef={cancelRef}
          isOpen={dialogVisible}
          onClose={() => setIsDialogShow(false)}>
          <AlertDialog.Content>
            <AlertDialog.CloseButton />
            <AlertDialog.Header>提示</AlertDialog.Header>
            <AlertDialog.Body
              justifyContent={'center'}
              alignItems={'center'}
              minHeight={98}>
              您的余额不足，需要去充值吗？
            </AlertDialog.Body>
            <AlertDialog.Footer justifyContent={'center'}>
              <Button
                colorScheme="blue"
                onPress={() => {
                  setIsDialogShow(false);
                  props.navigation.navigate('Wallet');
                }}>
                去充值
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog>
        <Actionsheet hideDragIndicator isOpen={isOpen} onClose={onClose}>
          {isFlag ? (
            <Actionsheet.Content
              style={{
                backgroundColor: '#1f2937',
                borderRadius: 40,
              }}>
              <Gifts
                clickItem={(giftItem: object) => {
                  onClose();
                  presentGift(giftItem, dynamicInfo.userId, dynamicInfo.id);
                }}
              />
            </Actionsheet.Content>
          ) : (
            <Actionsheet.Content>
              <Box w={'100%'} h={500} py={4}>
                <Gift />
              </Box>
            </Actionsheet.Content>
          )}
        </Actionsheet>
        <Box flex={1} pt={0} bg="white">
          <Box p={4}>
            <DailyItem returnFunc={itemClick} item={dynamicInfo} />
          </Box>
          <Divider h={2.5} bg="bg.f5" />
          <Box flex={1}>
            {giftRankList && giftRankList.length > 0 && (
              <Box p={4}>
                <HStack justifyContent={'space-between'} alignItems="center">
                  <Text style={{color: '#323232'}} fontWeight="bold">
                    礼物榜
                  </Text>
                  <Pressable
                    onPress={() => {
                      setIsFlag(false);
                      onOpen();
                    }}
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
        </Box>
      </ScrollView>

      {replyFlag ? (
        <ChatBox
          pressCb={(data: Object) => {
            comment(data, dynamicInfo.id, replyFlag.id);
          }}
        />
      ) : (
        <ChatBox
          pressCb={(data: commentProp) => {
            if (data.type === 'text') {
              commentDy(data, dynamicInfo.id);
            } else {
              setIsFlag(true);
              onOpen();
            }
          }}
        />
      )}
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
