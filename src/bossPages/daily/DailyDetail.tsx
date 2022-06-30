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
} from 'native-base';
import {DeviceEventEmitter, StyleSheet} from 'react-native';
import Tab from './DailyTab';
import DailyDetailContext from './context.js';
import ChatBox from '../../components/base/ChatBox';
import Gifts from '../../components/base/Gifts';
import CFastImage from '../../components/CFastImage';
import useRequest from '../../hooks/useRequest';
import {commentDynamic} from '../../api/daily';
import {giveGift, queryDynamicGiftRank} from '../../api/gift';
import DailyItem from './DailyItem';

interface commentProp {
  type: string;
  value: string;
}

const Index = ({...props}) => {
  const {item} = props.route.params;
  const [dynamicInfo, setDynamic] = useState(item || {});
  const {run: runCommentDymaic} = useRequest(commentDynamic.url);
  const {result: giftRankList} = useRequest(
    queryDynamicGiftRank.url,
    {
      dynamicId: item.id, //动态ID
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

  const cancelRef = useRef(null);

  //评论动态
  const commentDy = async (comment: commentProp, dynamicId: string) => {
    if (comment.type === 'text') {
      const {data, success} = await runCommentDymaic({
        dynamicId,
        content: comment.value,
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
        onClose();
      }
    } catch (error) {
      console.log('presentGift', error);
    }
  };

  return (
    <DailyDetailContext.Provider value={item}>
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
      </Actionsheet>
      <Box flex={1} pt={4} bg="white">
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
                <Text style={{color: '#474747'}}>
                  <Text fontSize={'md'} color="primary.100">
                    {giftRankList.length}
                  </Text>
                  个礼物
                </Text>
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
          <Tab />
        </Box>
      </Box>
      <ChatBox
        pressCb={(data: commentProp) => {
          if (data.type === 'text') {
            commentDy(data, dynamicInfo.id);
          } else {
            onOpen();
          }
        }}
      />
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
