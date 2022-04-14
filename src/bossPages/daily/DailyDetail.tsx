import React from 'react';
import {
  HStack,
  Box,
  Image,
  View,
  VStack,
  Text,
  Button,
  Stack,
  Divider,
  ScrollView,
  Input,
} from 'native-base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useWindowDimensions} from 'react-native';
import Tab from './DailyTab';
import CFastImage from '../../components/CFastImage';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import DailyDetailContext from './context.js';

const genImages = (imgs: string) => {
  if (!imgs) {
    return [];
  } else {
    return JSON.parse(imgs);
  }
};

const Index = ({...props}) => {
  console.log('prs', props);
  const {item} = props.route.params;
  const insets = useSafeAreaInsets();
  const {width} = useWindowDimensions();
  const IMG_ITEM_WIDTH = (width - 60) / 3;
  const IMG_ITEM_HEIGHT = IMG_ITEM_WIDTH;

  return (
    <DailyDetailContext.Provider value={item}>
      <Box flex={1}>
        <ScrollView contentContainerStyle={{flex: 1}} py={4} bg="white">
          <Box px={5} pb={4}>
            <HStack alignItems="center">
              <CFastImage
                url={item.headImg}
                styles={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                }}
              />
              <VStack
                flex={1}
                mr={'auto'}
                ml={2}
                justifyContent={'space-around'}>
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
              {/* <Button
              disabled
              py={1}
              borderRadius={'full'}
              borderColor="#9650FF"
              borderWidth={0.5}
              bg={'transparent'}>
              <Text fontSize={'xs'} color={'primary.100'}>
                关注
              </Text>
            </Button> */}
            </HStack>
            <View pt={4}>
              <HStack mb={2} flexWrap={'wrap'}>
                {genImages(item.images).map((ele: string, index: number) => (
                  <CFastImage
                    key={index}
                    url={ele}
                    styles={{
                      marginRight: (index + 1) % 3 === 0 ? 0 : 8,
                      width: IMG_ITEM_WIDTH,
                      height: IMG_ITEM_HEIGHT,
                      borderRadius: 40,
                      marginBottom: 8,
                    }}
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
        <HStack
          shadow={2}
          alignItems="center"
          w={'full'}
          px={4}
          py={4}
          style={{
            position: 'absolute',
            left: 0,
            bottom: 0,
            paddingBottom: insets.bottom,
            backgroundColor: '#fff',
          }}>
          <FontAwesome5 name="smile" size={28} color="#C1C0C9" />
          <Input
            fontSize={'md'}
            variant="filled"
            py={2}
            mx={4}
            maxLength={300}
            placeholder="输入你的消息..."
            placeholderTextColor={'tip.placeholder'}
            flex={1}
          />
          <Ionicons
            style={{
              marginRight: 16,
            }}
            name="gift"
            size={26}
            color="#9650FF"
          />
          <FontAwesome name="send" size={24} color="#9650FF" />
        </HStack>
      </Box>
    </DailyDetailContext.Provider>
  );
};
export default Index;
