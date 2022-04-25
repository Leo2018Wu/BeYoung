import React, {useRef, useState} from 'react';
import {
  Box,
  Text,
  Image,
  HStack,
  VStack,
  Badge,
  Divider,
  Stack,
  Pressable,
  View,
  Actionsheet,
  useDisclose,
  AlertDialog,
  Button,
} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import {StyleSheet, useWindowDimensions} from 'react-native';
import Tab from './Tab';
import util from '../../../util/util';
import useRequest from '../../../hooks/useRequest';
import {
  fetchChatAccount,
  fetchStatistic,
  fetchUserInfo,
} from '../../../api/common';
import {fetchRelation} from '../../../api/user';

import CFastImage from '../../../components/CFastImage';
import {useDispatch} from 'react-redux';
import MyContext from './Context';
import {PageLoading} from '../../../components/base/Pagination';
import Gifts from '../../../components/base/Gifts';
import {giveGift} from '../../../api/gift';

const Index = ({...props}) => {
  const userId = props.route.params.userId;
  const dispatch = useDispatch();
  const {height, width} = useWindowDimensions();
  const {isOpen, onOpen, onClose} = useDisclose();
  const [dialogVisible, setIsDialogShow] = useState(false);

  const cancelRef = useRef(null);

  const {result: chatAccountInfo} = useRequest(
    fetchChatAccount.url,
    {userId},
    fetchChatAccount.options,
  );
  const {run: runFetchRelation} = useRequest(fetchRelation.url);
  const {run: runGiveGift} = useRequest(giveGift.url);
  const {result: userInfo} = useRequest(
    fetchUserInfo.url,
    {
      userId,
    },
    fetchUserInfo.options,
  );
  const {result: numInfo} = useRequest(
    fetchStatistic.url,
    {userId},
    fetchStatistic.options,
  );

  const presentGift = async (item: object) => {
    try {
      const {success, code} = await runGiveGift({
        giftId: item.id,
        num: 1,
        receiveUserId: userId,
      });

      if (code === 50001) {
        // 余额不足情况
        setIsDialogShow(true);
        return;
      }
      if (success) {
        goChat();
      }
    } catch (error) {
      console.log('presentGift', error);
    }
  };

  const jumpChatPage = () => {
    // 可以开启聊天
    dispatch({
      type: 'SESSIONID',
      currentSessionId: `p2p-${chatAccountInfo.account}`,
    });
    props.navigation.navigate('Session', {
      chatUserId: chatAccountInfo.account,
    });
  };

  const goChat = async () => {
    const {data: userRelation} = await runFetchRelation({
      relateUserId: userId,
    });
    if (userRelation.canChat) {
      jumpChatPage();
    } else {
      onOpen();
    }
  };

  if (!userInfo) {
    return <PageLoading />;
  }

  return (
    <MyContext.Provider value={userInfo}>
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
            clickItem={(item: object) => {
              onClose();
              presentGift(item);
            }}
          />
        </Actionsheet.Content>
      </Actionsheet>
      <View flex={1}>
        <CFastImage
          url={userInfo.headImg}
          styles={{
            width: '100%',
            height: height / 3,
          }}
        />
        <Box
          mt={-10}
          shadow={2}
          w="full"
          px={4}
          pt={4}
          bg="white"
          borderRadius={10}>
          <HStack>
            <Box style={styles.avatar}>
              <CFastImage url={userInfo.headImg} styles={styles.headImg} />
            </Box>

            <VStack py={1} ml={2} justifyContent="space-around">
              <Text fontSize={'xl'} fontWeight="bold">
                {userInfo.nickName}
              </Text>
              <HStack>
                <Badge flexDirection={'row'} mr={2} style={styles.badge_age}>
                  <Icon name="ios-female" size={10} color="white" />
                  <Text color={'white'}>
                    {util.getAge(util.getBirthday(userInfo.cardNum)) || '18'}
                  </Text>
                </Badge>
                <Badge px={3} style={styles.badge_sign}>
                  <Text color={'white'}>
                    {util.getSign(util.getBirthday(userInfo.cardNum)) || '双鱼'}
                  </Text>
                </Badge>
              </HStack>
            </VStack>
          </HStack>
          <HStack mt={2} alignItems={'center'}>
            <Text color={'fontColors._6f'} fontSize={'md'} mr={1}>
              点赞
            </Text>
            <Text color={'fontColors._6f'} fontSize={'lg'} mr={3}>
              {numInfo?.likeNum}
            </Text>
            <Text color={'fontColors._6f'} fontSize={'md'} mr={1}>
              评论
            </Text>
            <Text color={'fontColors._6f'} fontSize={'lg'} mr={3}>
              {numInfo?.commentNum}
            </Text>
            <Text color={'fontColors._6f'} fontSize={'md'} mr={1}>
              礼物
            </Text>
            <Text color={'fontColors._6f'} fontSize={'lg'} mr={3}>
              {numInfo?.giftNum}
            </Text>
          </HStack>
          <Divider my={2} />
          <Stack space={1} pb={2}>
            <HStack>
              <Image
                style={styles.info_icon}
                source={require('../../../images/info_icon.png')}
                alt="icon"
              />
              <Text ml={2} fontSize={'lg'} fontWeight="bold">
                个人信息
              </Text>
            </HStack>
            <HStack alignItems={'center'}>
              <Text fontSize={'md'} color="fontColors.999">
                年纪：
              </Text>
              <Text fontSize={'md'} color="fontColors.333">
                {userInfo.gradeName}
              </Text>
            </HStack>
            <HStack alignItems={'center'}>
              <Text fontSize={'md'} color="fontColors.999">
                爱好：
              </Text>
              <Text fontSize={'md'} color="fontColors.333">
                {userInfo.hobbies || '暂未填写'}
              </Text>
            </HStack>
          </Stack>
        </Box>
        <Tab />
        <HStack
          safeArea
          alignItems={'center'}
          px={10}
          style={[
            styles.footer,
            {
              width,
            },
          ]}>
          <Pressable
            onPress={() => goChat()}
            justifyContent={'center'}
            alignItems="center"
            shadow={2}
            bg="white"
            borderRadius="full"
            h={10}
            mr={4}
            flex={1}>
            <Text fontSize="md">聊天</Text>
          </Pressable>
          <Pressable
            shadow={2}
            justifyContent={'center'}
            alignItems="center"
            bg={'primary.100'}
            h={10}
            borderRadius="full"
            flex={1}>
            <Text color={'white'} fontSize="md">
              联系方式
            </Text>
          </Pressable>
        </HStack>
      </View>
    </MyContext.Provider>
  );
};

export default Index;

const styles = StyleSheet.create({
  avatar: {
    borderWidth: 2,
    borderColor: '#FE91B7',
    borderRadius: 34,
    overflow: 'hidden',
    width: 68,
    height: 68,
  },
  headImg: {
    flex: 1,
    borderRadius: 32,
  },
  badge_age: {
    minWidth: 40,
    borderRadius: 20,
    backgroundColor: 'pink',
  },
  badge_sign: {
    borderRadius: 20,
    backgroundColor: '#B83AF3',
  },
  info_icon: {
    width: 24,
    height: 24,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
});
