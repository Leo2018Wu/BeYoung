import React, {useState} from 'react';
import {
  HStack,
  ScrollView,
  Box,
  Stack,
  Text,
  VStack,
  Image,
  Input,
  Pressable,
} from 'native-base';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import Icon from 'react-native-vector-icons/Entypo';

const Index = () => {
  const insets = useSafeAreaInsets();
  const [reply, setReply] = useState(false);

  return (
    <Box flex={1}>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 12,
          paddingBottom: insets.bottom + 64,
        }}>
        <Text mb={2} fontSize={'md'}>
          评论
        </Text>
        <Stack flex={1} space={2}>
          <Box>
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
              {/* <HStack alignItems={'center'}>
                <Icon name="thumbs-up" size={18} color="#D4D4D4" />
                <Text fontSize={'md'} style={{color: '#D4D4D4'}}>
                  24
                </Text>
              </HStack> */}
            </HStack>
            <Text
              mt={2}
              fontSize={'md'}
              style={{color: '#323232', marginHorizontal: 56, marginRight: 20}}>
              怎么无法绑定银行卡?怎么无法绑定银行卡?
            </Text>
            <Pressable
              onPress={() => setReply(true)}
              style={{marginLeft: 56, width: 30, marginTop: 10}}>
              <Text fontSize={'sm'} style={{color: '#8B5CFF'}}>
                回复
              </Text>
            </Pressable>
          </Box>
        </Stack>
      </ScrollView>
      {reply ? (
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
      ) : null}
    </Box>
  );
};
export default Index;
