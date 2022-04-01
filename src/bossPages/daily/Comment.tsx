import React from 'react';
import {HStack, ScrollView, Box, Stack, Text, VStack, Image} from 'native-base';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Entypo';

const Index = () => {
  const insets = useSafeAreaInsets();
  return (
    <Box flex={1}>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 12,
          paddingBottom: insets.bottom + 64,
        }}>
        <Text mb={2} fontSize={'md'}>
          最新评论
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
              <HStack alignItems={'center'}>
                <Icon name="thumbs-up" size={18} color="#D4D4D4" />
                <Text fontSize={'md'} style={{color: '#D4D4D4'}}>
                  24
                </Text>
              </HStack>
            </HStack>
            <Text
              mt={2}
              fontSize={'md'}
              style={{color: '#323232', marginLeft: 56}}>
              怎么无法绑定银行卡?怎么无法绑定银行卡?
              怎么无法绑定银行卡?怎么无法绑定银行卡?
              怎么无法绑定银行卡?怎么无法绑定银行卡?
            </Text>
          </Box>
        </Stack>
      </ScrollView>
    </Box>
  );
};
export default Index;
