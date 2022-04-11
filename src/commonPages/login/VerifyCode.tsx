/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {DeviceEventEmitter} from 'react-native';
import {Box, Input, Text} from 'native-base';
import {sendCode, verifyCode} from '../../api/common.js';
import useRequest from '../../hooks/useRequest';
import {useCountdown} from '../../hooks/useTimeDown';
import AsyncStorage from '@react-native-community/async-storage';
import {fetchChatAccount} from '../../api/common';
import {login} from '../../nim/link.js';

const SEND_CODE_DURATION = 60 * 1000; // 发送验证码倒计时秒数
const Index = ({...props}) => {
  const {route} = props;
  const {run: runSendCode} = useRequest(sendCode.url, {
    phone: route.params.phone,
  });
  const {run: runVerifyCode, result} = useRequest(verifyCode.url);
  const {count, reset} = useCountdown(SEND_CODE_DURATION);
  const {run: runChatAccount} = useRequest(fetchChatAccount.url);

  useEffect(() => {
    runSendCode();
  }, []);

  useEffect(() => {
    if (result) {
      AsyncStorage.setItem('USERINFO', JSON.stringify(result)); // 存储登录信息
      if (!result.gender) {
        // 没有选择过性别进入性别选择页面
        props.navigation.navigate('ChooseSex');
      } else {
        // 否则直接进入主页
        if (result.gender === 'GENDER_MALE') {
          AsyncStorage.setItem('LOGIN_NAVIGAITON_NAME', 'MALE_LOGIN');
          DeviceEventEmitter.emit('LOGIN_EVENT', 'MALE_LOGIN');
        } else if (result.gender === 'GENDER_FEMALE') {
          AsyncStorage.setItem('LOGIN_NAVIGAITON_NAME', 'FEMALE_LOGIN');
          DeviceEventEmitter.emit('LOGIN_EVENT', 'FEMALE_LOGIN');
        }
      }
    }
  }, [result]);

  const checkCode = async (code: any) => {
    if (code.length === 4) {
      try {
        const chatAccount = await runChatAccount();
        if (chatAccount.account) {
          // 拿到了聊天账号
          AsyncStorage.setItem(
            'chatAccount',
            JSON.stringify(chatAccount),
            () => {
              login(chatAccount.account, chatAccount.token); // 初始化聊天账号
              runVerifyCode({phone: route.params.phone, code});
            },
          );
        }
      } catch (error) {
        console.log('error', error);
      }
    }
  };

  return (
    <Box flex={1} pt="30%" px={12}>
      <Text fontSize={'4xl'}>输入验证码</Text>
      <Text mt={1} fontSize={'md'} color="fontColors.gray">
        已发送到{route.params.phone}
      </Text>
      <Input
        keyboardType="numeric"
        maxLength={4}
        variant={'underlined'}
        autoFocus
        onChangeText={e => checkCode(e)}
        fontSize={'2xl'}
      />
      {count !== null && count > 0 && (
        <Text mt={5} color={'primary.100'} fontSize="md">
          {count / 1000}秒后重新发送
        </Text>
      )}
      {count !== null && count <= 0 && (
        <Text
          onPress={() => {
            runSendCode();
            reset();
          }}
          fontSize="md"
          mt={5}
          color={'primary.100'}>
          重新发送
        </Text>
      )}
    </Box>
  );
};

export default Index;
