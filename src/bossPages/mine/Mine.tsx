/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Box,
  Divider,
  HStack,
  Image,
  Pressable,
  Text,
  VStack,
} from 'native-base';
import Svg, {Circle, Defs, LinearGradient, Stop} from 'react-native-svg';
import Icon from 'react-native-vector-icons/EvilIcons';
import CFastImage from '../../components/CFastImage';
import {StyleSheet, useWindowDimensions} from 'react-native';
import {connect} from 'react-redux';
import {fetchStatistic} from '../../api/common';
import useRequest from '../../hooks/useRequest';

const link_group1_list = [
  {
    name: '女生微信',
    icon: require('../../images/mine_link_icon1.png'),
    pageName: 'WeChatNum',
  },
  // {
  //   name: '帮助教程',
  //   icon: require('../../images/mine_link_icon3.png'),
  //   pageName: '',
  // },
];
const link_group2_list = [
  {
    name: '钱包',
    icon: require('../../images/mine_link_icon4.png'),
    pageName: 'Wallet',
  },
  {
    name: '联系客服',
    icon: require('../../images/mine_link_icon5.png'),
    pageName: 'Service',
  },
  // {
  //   name: '黑名单',
  //   icon: require('../../images/mine_link_icon2.png'),
  // },
  {
    name: '设置',
    icon: require('../../images/mine_link_icon6.png'),
    pageName: 'Setting',
  },
];

const mapStateToProps = (state: any) => {
  return {
    userInfo: state.user.myUserInfo,
  };
};

const Home = ({...props}) => {
  const {width} = useWindowDimensions();
  const userInfo = props.userInfo;

  const jumpPage = (routeName: String) => {
    props.navigation.navigate(routeName);
  };
  const {result: numInfo} = useRequest(
    fetchStatistic.url,
    {userId: userInfo.id},
    fetchStatistic.options,
  );

  return (
    <Box flex={1}>
      <Svg>
        <Defs>
          <LinearGradient id="g3" x1={0.5} y1={0.3} x2={0.5} y2={1}>
            <Stop offset={0} stopColor="#6950FB" stopOpacity={1} />
            <Stop offset={1} stopColor="#B83AF3" stopOpacity={1} />
          </LinearGradient>
        </Defs>
        <Circle
          cx={width / 2}
          cy={width / 2}
          x={0}
          y={-width / 1.2}
          r={width}
          fill="url(#g3)"
        />
      </Svg>
      <Pressable
        onPress={() => props.navigation.navigate('Setting')}
        mx={3}
        style={styles.avatar}>
        <CFastImage url={userInfo.headImg} styles={{flex: 1}} />
      </Pressable>
      <Box
        w={'full'}
        style={{position: 'absolute', top: 160, zIndex: 1}}
        px={4}>
        <Box
          alignItems={'center'}
          pt={12}
          pb={2}
          shadow={1}
          borderRadius={4}
          bg="white">
          <Text fontWeight={'bold'} mb={4} mt={2} fontSize={'2xl'}>
            {userInfo?.nickName || '暂无昵称'}
          </Text>
          <Divider my={4} />
          <HStack justifyContent={'space-around'}>
            <Pressable
              onPress={() => props.navigation.navigate('Collection')}
              flex={1}
              alignItems={'center'}>
              <Text color={'fontColors.gray'} fontSize="xs">
                收藏
              </Text>
              <Text fontSize={'xl'}>{numInfo?.collectDynamicNum}</Text>
            </Pressable>
            <Pressable
              onPress={() => props.navigation.navigate('MineComment')}
              flex={1}
              alignItems={'center'}>
              <Text color={'fontColors.gray'} fontSize="xs">
                评论
              </Text>
              <Text fontSize={'xl'}>{numInfo?.commentNum}</Text>
            </Pressable>
            <Pressable
              onPress={() => props.navigation.navigate('MineFollow')}
              flex={1}
              alignItems={'center'}>
              <Text color={'fontColors.gray'} fontSize="xs">
                关注
              </Text>
              <Text fontSize={'xl'}>{numInfo?.followNum}</Text>
            </Pressable>
          </HStack>
        </Box>
        <Box mt={5} shadow={1} borderRadius={4} bg="white">
          {link_group1_list.map((item, index) => (
            <Pressable
              onPress={() => jumpPage(item.pageName)}
              key={`key${index}`}>
              <HStack
                borderBottomColor={'bg.f5'}
                borderBottomWidth={index < 2 ? 1 : 0}
                px={2}
                py={2}
                alignItems={'center'}>
                <Image source={item.icon} alt="icon" style={styles.link_icon} />
                <Text ml={2} mr="auto" fontSize={'md'} color="fontColors.333">
                  {item.name}
                </Text>
                <Icon name="chevron-right" color="#C5C6C7" size={32} />
              </HStack>
            </Pressable>
          ))}
        </Box>
        <Box mt={5} shadow={1} borderRadius={4} bg="white">
          {link_group2_list.map((item, index) => (
            <Pressable
              onPress={() => jumpPage(item.pageName)}
              key={`key${index}`}>
              <HStack
                borderBottomColor={'bg.f5'}
                borderBottomWidth={index < 3 ? 1 : 0}
                px={2}
                py={2}
                alignItems={'center'}>
                <Image source={item.icon} alt="icon" style={styles.link_icon} />
                <Text ml={2} mr="auto" fontSize={'md'} color="fontColors.333">
                  {item.name}
                </Text>
                <Icon name="chevron-right" color="#C5C6C7" size={32} />
              </HStack>
            </Pressable>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default connect(mapStateToProps)(Home);

const styles = StyleSheet.create({
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    overflow: 'hidden',
    position: 'absolute',
    left: '50%',
    marginLeft: -48,
    top: 100,
    zIndex: 9,
  },
  link_icon: {
    width: 22,
    height: 22,
  },
});
