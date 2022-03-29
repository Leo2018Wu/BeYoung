import React from 'react';
import {Box, Pressable, HStack, Text} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import {DeviceEventEmitter} from 'react-native';
import {updateUserInfo} from '../../api/common';
import AsyncStorage from '@react-native-community/async-storage';
import useRequest from '../../hooks/useRequest';

const Index = () => {
  const {run} = useRequest(updateUserInfo.url);
  const SEX_LIST = [
    {code: 'GENDER_MALE', iconName: 'male', value: '男', color: '#62DDFF'},
    {code: 'GENDER_FEMALE', iconName: 'female', value: '女', color: '#FF5FB0'},
  ];

  const chooseSex = (item: any) => {
    run({gender: item.code});
    if (item.code === 'GENDER_MALE') {
      AsyncStorage.setItem('LOGIN_NAVIGAITON_NAME', 'MALE_LOGIN');
      DeviceEventEmitter.emit('LOGIN_EVENT', 'MALE_LOGIN');
    } else if (item.code === 'GENDER_FEMALE') {
      AsyncStorage.setItem('LOGIN_NAVIGAITON_NAME', 'FEMALE_LOGIN');
      DeviceEventEmitter.emit('LOGIN_EVENT', 'FEMALE_LOGIN');
    }
  };

  return (
    <Box bg={'white'} flex={1} pt="30%" px={12}>
      <Text fontSize={'4xl'}>性别</Text>
      <Text fontSize={'md'} color="fontColors.gray">
        选择后不能更改哦～
      </Text>
      <HStack flex={1} pt={'40%'} justifyContent="space-between">
        {SEX_LIST.map(item => (
          <Box key={item.code} alignItems={'center'}>
            <Pressable
              onPress={() => chooseSex(item)}
              width={112}
              height={112}
              justifyContent="center"
              alignItems={'center'}
              borderRadius="full"
              bg={'bg.darkGray'}>
              <Icon name={item.iconName} size={38} color={item.color} />
            </Pressable>
            <Text mt={2} fontSize={'2xl'} style={{color: item.color}}>
              {item.value}
            </Text>
          </Box>
        ))}
      </HStack>
    </Box>
  );
};

export default Index;
