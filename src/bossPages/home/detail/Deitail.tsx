import React from 'react';
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
} from 'native-base';
import {StyleSheet, useWindowDimensions} from 'react-native';
import Tab from './Tab';

const Index = ({...props}) => {
  console.log('props', props);
  const {height, width} = useWindowDimensions();
  const userInfo = props.route.params.item;

  return (
    <View flex={1}>
      <Image
        w={'full'}
        height={height / 3}
        alt="avatar"
        source={userInfo.url}
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
          <Image
            style={styles.avatar}
            w={16}
            height={16}
            alt="avatar"
            borderRadius="full"
            source={userInfo.url}
          />
          <VStack py={1} ml={2} justifyContent="space-around">
            <Text fontSize={'xl'} fontWeight="bold">
              {userInfo.name}
            </Text>
            <Badge style={styles.badge}>
              <Text color={'white'}>巨蟹座</Text>
            </Badge>
          </VStack>
        </HStack>
        <HStack mt={2} alignItems={'center'}>
          <Text color={'fontColors._6f'} fontSize={'md'} mr={1}>
            关注
          </Text>
          <Text color={'fontColors._6f'} fontSize={'lg'} mr={3}>
            {134}
          </Text>
          <Text color={'fontColors._6f'} fontSize={'md'} mr={1}>
            点赞
          </Text>
          <Text color={'fontColors._6f'} fontSize={'lg'} mr={3}>
            {134}
          </Text>
          <Text color={'fontColors._6f'} fontSize={'md'} mr={1}>
            评论
          </Text>
          <Text color={'fontColors._6f'} fontSize={'lg'} mr={3}>
            {134}
          </Text>
          <Text color={'fontColors._6f'} fontSize={'md'} mr={1}>
            礼物
          </Text>
          <Text color={'fontColors._6f'} fontSize={'lg'} mr={3}>
            {134}
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
              大二
            </Text>
          </HStack>
          <HStack alignItems={'center'}>
            <Text fontSize={'md'} color="fontColors.999">
              爱好：
            </Text>
            <Text fontSize={'md'} color="fontColors.333">
              唱、跳、rap
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
  );
};

export default Index;

const styles = StyleSheet.create({
  avatar: {
    borderWidth: 2,
    borderColor: '#FE91B7',
  },
  badge: {
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
