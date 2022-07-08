import React, {useEffect, useState} from 'react';
import {
  Box,
  Text,
  HStack,
  VStack,
  Badge,
  Divider,
  Stack,
  Pressable,
  View,
  ScrollView,
  useToast,
} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import {StyleSheet, useWindowDimensions} from 'react-native';
import util from '../../../util/util';

import useRequest from '../../../hooks/useRequest';
import {
  fetchChatAccount,
  fetchStatistic,
  fetchUserInfo,
  follow,
} from '../../../api/common';
import CustomFuncFlatList from '../../../components/CustomFuncFlatList';
import {queryDynamic} from '../../../api/daily';
import {queryMedia, queryMyRelation, startRelation} from '../../../api/user';

import CFastImage from '../../../components/CFastImage';
import {useDispatch} from 'react-redux';
import {PageLoading} from '../../../components/base/Pagination';
import DailyItem from '../../daily/DailyItem';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface ItemProp {
  id: string | number;
  userId: string;
  headImg: string;
  nickName: string;
  createTime: string;
  content: string;
  score: number;
  likeNum: string;
  liked: boolean;
  images: string;
  commentNum: number;
  giftNum: number;
  hot: boolean;
  collected: boolean;
  collectNum: string | number;
  hotness: string | number;
}

const Index = ({...props}) => {
  const userId = props.route.params.userId;
  const insets = useSafeAreaInsets();
  const toast = useToast();
  const dispatch = useDispatch();
  const {height} = useWindowDimensions();
  const {run: runQueryMedia} = useRequest(queryMedia.url);
  const {run: runFollow} = useRequest(follow.url);
  const {result: myRelations} = useRequest(
    queryMyRelation.url,
    {
      pageSize: 40,
    },
    {manual: false},
  );
  const {run: runStartRela} = useRequest(startRelation.url);

  const [albumScenes, setScenes] = useState({}); // 图片场景列表

  const {result: chatAccountInfo} = useRequest(
    fetchChatAccount.url,
    {userId},
    fetchChatAccount.options,
  );
  const [isStartRelationFlag, setRelationFlag] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const {run: runFetchUesrInfo} = useRequest(fetchUserInfo.url);
  const {result: numInfo} = useRequest(
    fetchStatistic.url,
    {userId},
    fetchStatistic.options,
  );

  useEffect(() => {
    if (myRelations && myRelations.length > 0) {
      setRelationFlag(
        myRelations.findIndex(item => item.relateUserId === userId) !== -1,
      );
    }
  }, [myRelations]);
  useEffect(() => {
    getUserInfo();
    getAlbumScenes();
  }, []);

  const getAlbumScenes = async () => {
    try {
      const {data} = await runQueryMedia({
        userId, //用户ID
        mediaType: 'MEDIA_TYPE_IMAGE', //媒体类型
        // scene: 'SCENE_DORMITORY', //场景
      });
      const sceneNameGroup = data.reduce(
        (t, v) => (
          !t[v.sceneName] && (t[v.sceneName] = []), t[v.sceneName].push(v), t
        ),
        {},
      );
      setScenes(sceneNameGroup);
    } catch (error) {
      console.log(error);
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

  const getUserInfo = async () => {
    const {data} = await runFetchUesrInfo({userId});
    setUserInfo(data);
  };

  const handleFollow = async () => {
    try {
      const {success} = await runFollow({
        relateUserId: userId,
        cancel: userInfo.hasFollowed,
      });
      if (success) {
        getUserInfo();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const goChat = async () => {
    jumpChatPage();
  };

  const startRel = async () => {
    const {success} = await runStartRela({relateUserId: userId});
    if (success) {
      toast.show({
        description: '关系已开启，可通过赠送礼物、聊天等积累亲密度',
        placement: 'top',
        duration: 2500,
      });
      setRelationFlag(true);
    }
  };

  if (!userInfo) {
    return <PageLoading />;
  }

  const HeaderComponent = () => (
    <View p={4} bg="white">
      <HStack>
        <Box style={styles.avatar}>
          <CFastImage url={userInfo.headImg} styles={styles.headImg} />
        </Box>
        <VStack py={1} ml={2} justifyContent="space-around">
          <Text fontSize={'xl'} fontWeight="bold">
            {userInfo.nickName || '暂无昵称'}
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
        <Pressable
          onPress={() => handleFollow()}
          ml={'auto'}
          alignSelf="center"
          justifyContent={'center'}
          style={
            userInfo?.hasFollowed ? styles.followed_btn : styles.notfollowed_btn
          }>
          <Text
            style={{
              color: userInfo?.hasFollowed ? '#CCCCCC' : '#FF6309',
            }}>
            {userInfo?.hasFollowed ? '已关注' : '关注'}
          </Text>
        </Pressable>
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
        {/* <HStack>
              <Image
                style={styles.info_icon}
                source={require('../../../images/info_icon.png')}
                alt="icon"
              />
              <Text ml={2} fontSize={'lg'} fontWeight="bold">
                个人信息
              </Text>
            </HStack> */}
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
      <Divider my={2} />
      {Object.keys(albumScenes).length > 0 ? (
        <View>
          <Text fontSize={'md'} fontWeight="bold">
            照片精选
          </Text>
          <ScrollView mt={2} horizontal>
            {Object.keys(albumScenes).map((item, index) => (
              <Pressable
                key={index}
                onPress={() =>
                  props.navigation.navigate('SceneAlbum', {
                    title: item,
                    album: albumScenes[item],
                  })
                }
                position={'relative'}>
                <CFastImage
                  url={albumScenes[item][0].url}
                  styles={{
                    width: 70,
                    height: 70,
                    borderRadius: 8,
                    marginRight: 10,
                  }}
                />
                <View style={styles.cover_img_scene}>
                  <Text fontSize={'2xs'} color={'white'}>
                    {item}
                  </Text>
                </View>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      ) : null}
      <Text
        mt={Object.keys(albumScenes).length > 0 ? 2 : 0}
        fontSize={'md'}
        fontWeight="bold">
        动态
      </Text>
    </View>
  );

  return (
    <View flex={1}>
      <CFastImage
        url={userInfo.headImg}
        styles={{
          width: '100%',
          height: height / 3,
        }}
      />
      <CustomFuncFlatList
        url={queryDynamic.url}
        par={{userId}}
        renderItem={({item}: {item: ItemProp}) => (
          <Box px={3} pb={3} borderRadius={4} bg="white">
            <DailyItem item={item} />
          </Box>
        )}
        listHeader={<HeaderComponent />}
      />
      <HStack
        px={4}
        style={{
          height: 80 + insets.bottom,
          paddingBottom: insets.bottom,
        }}
        alignItems="center">
        {isStartRelationFlag ? (
          <Pressable
            onPress={() => goChat()}
            shadow={2}
            bg="primary.100"
            style={styles.btn}>
            <Text color={'white'} fontSize={'md'}>
              聊天
            </Text>
          </Pressable>
        ) : (
          <>
            <Pressable
              onPress={() => goChat()}
              shadow={2}
              style={[styles.btn, styles.chat_btn]}>
              <Text fontSize={'md'}>聊天</Text>
            </Pressable>
            <Pressable
              onPress={() => startRel()}
              bg={'primary.100'}
              style={[styles.btn, styles.relation_btn]}>
              <Text fontSize={'md'} color={'white'}>
                开启关系
              </Text>
            </Pressable>
          </>
        )}
      </HStack>
    </View>
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
  notfollowed_btn: {
    height: 26,
    borderColor: '#FF6309',
    borderWidth: 0.5,
    borderRadius: 26,
    paddingHorizontal: 14,
  },
  followed_btn: {
    backgroundColor: '#F4F4F4',
    height: 26,
    borderRadius: 26,
    paddingHorizontal: 14,
  },
  cover_img_scene: {
    position: 'absolute',
    width: 70,
    left: 0,
    bottom: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    alignItems: 'center',
    paddingVertical: 4,
    backgroundColor: '#00000080',
  },
  btn: {
    flex: 1,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
  },
  chat_btn: {
    backgroundColor: '#fff',
    marginRight: 20,
  },
  relation_btn: {},
});
