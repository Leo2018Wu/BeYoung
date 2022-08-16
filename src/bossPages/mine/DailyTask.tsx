import React from 'react';
import {Box, HStack, ScrollView, Text, VStack, Pressable} from 'native-base';
import {
  ImageBackground,
  Image,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import useRequest from '../../hooks/useRequest';
import {fetchMyTask} from '../../api/user';

const TASK_IMG_MAP = {
  browse: require('../../images/task_icon1.png'),
  like: require('../../images/task_icon2.png'),
  comment: require('../../images/task_icon3.png'),
  collect: require('../../images/task_icon4.png'),
  send: require('../../images/task_icon5.png'),
  relation: require('../../images/task_icon6.png'),
  intimacy: require('../../images/task_icon7.png'),
};

const Index = ({...props}) => {
  const {width} = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const {result: taskList} = useRequest(fetchMyTask.url, {}, {manual: false});

  return (
    <Box flex={1}>
      <Pressable
        h={16}
        onPress={() => props.navigation.goBack()}
        w={10}
        style={{
          zIndex: 9,
          position: 'absolute',
          top: 16,
          left: 10,
        }}
        justifyContent="center">
        <Feather name="chevron-left" color={'white'} size={32} />
      </Pressable>
      <ImageBackground
        style={[styles.imgWrapper, {width, paddingTop: insets.top}]}
        resizeMode="cover"
        source={require('../../images/daily_task_bg.png')}>
        <Image
          style={styles.img}
          source={require('../../images/daily_task_icon.png')}
          resizeMode="cover"
        />
        <ScrollView contentContainerStyle={styles.main}>
          <Box style={[styles.leftDec, styles.decView]} />
          <Box style={[styles.rightDec, styles.decView]} />
          <Text fontSize={'lg'} fontWeight={'bold'}>
            完成自动领取奖励
          </Text>
          {taskList &&
            taskList.map((item, index) => (
              <HStack
                key={index}
                w={'full'}
                py={3}
                justifyContent="flex-start"
                alignItems={'center'}>
                <Image
                  style={styles.taskItemIcon}
                  source={TASK_IMG_MAP[item.code]}
                />
                <VStack flex={1}>
                  <Text fontSize={'md'} color="fontColors.333">
                    {item.name}
                  </Text>
                  <Text color={'fontColors.b2'} fontSize={'xs'}>
                    奖励{item.reward}青币
                  </Text>
                </VStack>
                <Box
                  style={[
                    styles.taskStatus,
                    item.finished ? styles.taskStatusFinished : {},
                  ]}>
                  <Text fontSize={'xs'} color="white">
                    {item.finished ? '已完成' : '未完成'}
                  </Text>
                </Box>
              </HStack>
            ))}
        </ScrollView>
      </ImageBackground>
    </Box>
  );
};

export default Index;

const styles = StyleSheet.create({
  imgWrapper: {
    paddingHorizontal: 16,
  },
  img: {
    width: 132,
    height: 134,
    alignSelf: 'center',
    marginTop: 52,
  },
  main: {
    position: 'relative',
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 10,
    paddingVertical: 32,
    paddingHorizontal: 16,
    height: '84%',
    alignItems: 'center',
  },
  leftDec: {
    position: 'absolute',
    left: 36,
    top: -16,
  },
  decView: {
    width: 32,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#fff',
    borderWidth: 6,
    borderColor: 'rgba(250,201,25,1)',
  },
  rightDec: {
    position: 'absolute',
    right: 36,
    top: -16,
  },
  taskItemIcon: {
    width: 40,
    height: 40,
    marginRight: 8,
    flexShrink: 0,
  },
  taskStatus: {
    width: 80,
    height: 30,
    backgroundColor: '#999',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  taskStatusFinished: {
    backgroundColor: '#B83AF3',
  },
});
