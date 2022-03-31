/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Box,
  Pressable,
  Text,
  HStack,
  useDisclose,
  Actionsheet,
  FlatList,
  VStack,
  View,
} from 'native-base';

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import LinearGradient from 'react-native-linear-gradient';
import {ImageBackground, StyleSheet, useWindowDimensions} from 'react-native';

const Home = ({...props}) => {
  const {width, height} = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const GRADES = ['大一', '大二', '大三'];
  const [activeGrade, setGrade] = useState(0); // 选中的年纪tab index
  const {isOpen, onOpen, onClose} = useDisclose();

  const DATA = [
    {
      id: 0,
      name: '李妮娜',
      hobbies: '跑步、看电影',
      hot: 109,
      online: true,
      url: {
        uri: 'https://picsum.photos/200/180?random=8',
      },
    },
    {
      id: 1,
      name: '扎扎',
      hobbies: '冲浪',
      hot: 234,
      online: true,
      url: {uri: 'https://picsum.photos/200/200?random=1'},
    },
    {
      id: 2,
      name: '小兰',
      hobbies: '唱歌',
      hot: 99,
      online: true,
      url: {uri: 'https://picsum.photos/200/200?random=2'},
    },
    // {
    //   id: 3,
    //   name: '张张',
    //   hobbies: '跑步、游泳',
    //   hot: 19,
    //   online: false,
    //   url: {uri: 'https://picsum.photos/200/200?random=3'},
    // },
  ];

  const goDetail = (item: any) => {
    props.navigation.navigate('HomeDetail', {item});
  };

  const _renderItem = ({item, index}) => {
    return (
      <Pressable
        onPress={() => goDetail(item)}
        style={{
          width: (width - 24) / 2,
          marginTop: 8,
          borderRadius: 8,
          marginRight: index % 2 === 0 ? 8 : 0,
          overflow: 'hidden',
          height: height / 3,
        }}>
        <ImageBackground style={styles.item_bg} source={item.url}>
          <VStack flex={1} justifyContent={'space-between'}>
            <HStack alignItems={'center'} justifyContent="space-between">
              {item.online && (
                <HStack
                  px={1.5}
                  borderTopLeftRadius={10}
                  borderBottomRightRadius={10}
                  borderTopRightRadius={2}
                  borderBottomLeftRadius={2}
                  alignItems={'center'}
                  style={{backgroundColor: '#00000060'}}>
                  <View w={1} h={1} borderRadius="full" bg={'tip.badge'} />
                  <Text ml={1} color={'white'}>
                    在线
                  </Text>
                </HStack>
              )}
              <HStack
                borderWidth={0.5}
                borderColor="border.gray"
                borderRadius={'full'}
                ml="auto"
                px={1.5}
                py={0.5}
                alignItems={'center'}
                justifyContent="space-between">
                <Fontisto name="fire" size={12} color="white" />
                <Text color={'white'} fontSize="xs" ml={1}>
                  {item.hot}
                </Text>
              </HStack>
            </HStack>
            <Box pb={1}>
              <Text fontSize={'md'} color={'white'}>
                {item.name}
              </Text>
              <Text color={'white'}>爱好：{item.hobbies}</Text>
            </Box>
          </VStack>
        </ImageBackground>
      </Pressable>
    );
  };

  return (
    <Box flex={1}>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Actionsheet.Item>Delete</Actionsheet.Item>
          <Actionsheet.Item>Share</Actionsheet.Item>
          <Actionsheet.Item>Play</Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
      <LinearGradient
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 0.5}}
        colors={['#B83AF3', '#6950FB']}>
        <Box justifyContent="center" style={{paddingTop: insets.top}}>
          <HStack px={3} h={16} alignItems="center">
            {GRADES.map((item, index) => (
              <Pressable
                onPress={() => setGrade(index)}
                style={activeGrade === index ? styles.gradeBg : {}}
                alignItems={'center'}
                ml={2}
                key={item}
                px={3}
                py={0.5}>
                <Text
                  color={'white'}
                  opacity={activeGrade === index ? 1 : 0.5}
                  fontSize={activeGrade === index ? 'lg' : 'md'}>
                  {item}
                </Text>
              </Pressable>
            ))}
            <Pressable
              flexDirection={'row'}
              onPress={() => onOpen()}
              ml={'auto'}
              alignItems={'center'}>
              <Text color={'white'} fontSize={'md'}>
                全部
              </Text>
              <Icon name={'chevron-down'} size={20} color="#fff" />
            </Pressable>
          </HStack>
        </Box>
      </LinearGradient>
      <Box flex={1} px={2} pb={2}>
        <FlatList
          key={(item: any) => `key${item.id}`}
          data={DATA}
          numColumns={2}
          renderItem={_renderItem}
        />
      </Box>
    </Box>
  );
};

export default Home;

const styles = StyleSheet.create({
  gradeBg: {
    backgroundColor: '#FFFFFF50',
    borderRadius: 100,
  },
  item_bg: {
    flex: 1,
    resizeMode: 'cover',
    padding: 6,
  },
});
