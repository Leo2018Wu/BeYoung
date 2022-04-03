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
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Index = () => {
  const insets = useSafeAreaInsets();
  const {width} = useWindowDimensions();
  const IMG_ITEM_WIDTH = (width - 60) / 3;
  const IMG_ITEM_HEIGHT = IMG_ITEM_WIDTH;

  const IMGS = [
    {
      id: 0,
      url: {
        uri: 'https://picsum.photos/200/180?random=8',
      },
    },
    {
      id: 1,
      url: {uri: 'https://picsum.photos/200/200?random=1'},
    },
    {
      id: 2,
      url: {uri: 'https://picsum.photos/200/200?random=2'},
    },
  ];

  return (
    <Box flex={1}>
      <ScrollView contentContainerStyle={{flex: 1}} py={4} bg="white">
        <Box px={5} pb={4}>
          <HStack alignItems="center">
            <Image
              w={12}
              h={12}
              borderRadius="full"
              alt="avatar"
              source={{
                uri: 'https://picsum.photos/200/180?random=8',
              }}
            />
            <VStack flex={1} mr={'auto'} ml={2} justifyContent={'space-around'}>
              <Text
                fontSize={'lg'}
                style={{
                  color: '#8E8895',
                }}>
                闫有筠
              </Text>
              <Text
                fontSize={'xs'}
                style={{
                  color: '#C7C4CC',
                }}>
                2022.10.21 19:03
              </Text>
            </VStack>
            <Button
              disabled
              py={1}
              borderRadius={'full'}
              borderColor="#9650FF"
              borderWidth={0.5}
              bg={'transparent'}>
              <Text fontSize={'xs'} color={'primary.100'}>
                关注
              </Text>
            </Button>
          </HStack>
          <View pt={4}>
            <HStack mb={2} flexWrap={'wrap'}>
              {IMGS &&
                IMGS.map((item, index) => (
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
                    source={item.url}
                  />
                ))}
            </HStack>
            <Text fontSize={'md'} color={'fontColors._72'}>
              蔡蒙是安徽人，来上海两年多，和许多“漂漂”们一样，他也想落脚上海，在上海能有一套属于自己的房子。蔡蒙是安徽人，来上海两年多，和许多“漂漂”们一样，他也想落脚上海，在上海能有一套属于自己的房子。
            </Text>
          </View>
          {/* <Stack space={2} pt={2} direction={'row'} alignItems={'center'}>
          <HStack mr={'auto'} alignItems={'center'}>
            <Text fontSize={'xs'} style={{color: '#C7C4CC'}}>
              评分
            </Text>
            <Text fontSize={'xs'} style={{color: '#C7C4CC'}}>
              24
            </Text>
          </HStack>
          <HStack alignItems={'center'}>
            <Icon name="hearto" size={18} color={false ? '#9650FF' : '#C7C4CC'} />
            <Text ml={1} fontSize={'xs'} style={{color: '#C7C4CC'}}>
              72
            </Text>
          </HStack>
          <HStack alignItems={'center'}>
            <Icon name="message1" size={18} color="#C7C4CC" />
            <Text ml={1} fontSize={'xs'} style={{color: '#C7C4CC'}}>
              13
            </Text>
          </HStack>
          <HStack alignItems={'center'}>
            <Icon name="gift" size={18} color="#C7C4CC" />
            <Text ml={1} fontSize={'xs'} style={{color: '#C7C4CC'}}>
              4
            </Text>
          </HStack>
        </Stack> */}
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
  );
};
export default Index;
