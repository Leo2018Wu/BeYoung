import React from 'react';
import {
  HStack,
  Box,
  View,
  VStack,
  Text,
  Divider,
  ScrollView,
} from 'native-base';
import {useWindowDimensions} from 'react-native';
import Tab from './DailyTab';
import CFastImage from '../../components/CFastImage';
import DailyDetailContext from './context.js';
import ChatBox from '../../components/base/ChatBox';

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
  const {width} = useWindowDimensions();
  const IMG_ITEM_WIDTH = (width - 60) / 3;
  const IMG_ITEM_HEIGHT = IMG_ITEM_WIDTH;

  return (
    <DailyDetailContext.Provider value={item}>
      <ScrollView
        scrollEnabled={false}
        contentContainerStyle={{
          flex: 1,
        }}
        pt={4}
        bg="white">
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
            <VStack flex={1} mr={'auto'} ml={2} justifyContent={'space-around'}>
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
      <ChatBox />
    </DailyDetailContext.Provider>
  );
};
export default Index;
