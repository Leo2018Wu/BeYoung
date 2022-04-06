import React, {useCallback} from 'react';
import {Box, Button, Divider, HStack, Text} from 'native-base';
import useRequest from '../../hooks/useRequest';
import {fetchMyInfo} from '../../api/common';
import CFastImage from '../../components/CFastImage';
import AsyncStorage from '@react-native-community/async-storage';
import {DeviceEventEmitter, Pressable} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

const Index = ({...props}) => {
  const {result, run} = useRequest(fetchMyInfo.url);

  useFocusEffect(
    useCallback(() => {
      run();
    }, []),
  );

  const logOut = () => {
    AsyncStorage.setItem('LOGIN_NAVIGAITON_NAME', '');
    AsyncStorage.setItem('USER_INFO', '');
    DeviceEventEmitter.emit('LOGIN_EVENT', '');
  };

  const editUser = () => {
    props.navigation.navigate('EditUser', {
      type: 'nickName',
      value: result?.nickName,
    });
  };

  return (
    <Box flex={1} bg="bg.f5">
      <HStack
        py={1}
        px={4}
        bg={'white'}
        justifyContent={'space-between'}
        alignItems="center">
        <Text fontWeight={'bold'} fontSize={'md'} color={'fontColors.333'}>
          头像
        </Text>
        <CFastImage
          url={result?.headImg}
          styles={{width: 44, height: 44, borderRadius: 22}}
        />
      </HStack>
      <Box px={2}>
        <Divider h={0.25} />
      </Box>
      <Pressable onPress={() => editUser()}>
        <HStack
          py={1}
          px={4}
          h={12}
          bg={'white'}
          justifyContent={'space-between'}
          alignItems="center">
          <Text fontWeight={'bold'} fontSize={'md'} color={'fontColors.333'}>
            昵称
          </Text>
          <Text fontSize={'md'} style={{color: '#A6A6A6'}}>
            {result?.nickName || '请设置自己的昵称'}
          </Text>
        </HStack>
      </Pressable>
      <Box px={2}>
        <Divider h={0.25} />
      </Box>
      <HStack
        px={4}
        h={12}
        bg={'white'}
        justifyContent={'space-between'}
        alignItems="center">
        <Text fontWeight={'bold'} fontSize={'md'} color={'fontColors.333'}>
          手机号
        </Text>
        <Text fontSize={'md'} style={{color: '#A6A6A6'}}>
          {result?.phone}
        </Text>
      </HStack>
      <Button
        onPress={() => logOut()}
        mx={4}
        borderRadius={'full'}
        mt="full"
        style={{backgroundColor: '#EFEFEF'}}>
        <Text fontWeight={'bold'} fontSize={'md'} color="primary.100">
          退出登录
        </Text>
      </Button>
    </Box>
  );
};

export default Index;
