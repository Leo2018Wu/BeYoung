import React, {useState} from 'react';
import {Box, HStack, Input, Text, Button} from 'native-base';
import CRadio from '../../components/base/CRadio';

const Login = ({navigation}: any) => {
  const [active, setActive] = useState(false); // radio激活状态
  const [phone, setPhone] = useState(''); // 输入的电话号码

  const sumbit = () => {
    navigation.navigate('VerifyCode', {phone});
  };

  return (
    <Box bg={'bg.f9'} px={'8'} flex={1} pt={'50%'}>
      <Text fontSize={'3xl'} color={'fontColors.333'}>
        欢迎来到青回
      </Text>
      <HStack
        borderWidth={1}
        borderRadius={'full'}
        borderColor="border.gray"
        mt={10}
        pl={4}
        alignItems={'center'}>
        <Text fontSize={20}>+86</Text>
        <Box mx={2} w={'px'} h="50%" bg={'border.gray'} />
        <Input
          keyboardType="numeric"
          placeholder="请输入手机号码"
          onChangeText={e => setPhone(e)}
          h={12}
          variant={'none'}
          flex={1}
          fontSize="lg"
          maxLength={11}
        />
      </HStack>
      <HStack mt={3} alignItems="center">
        <CRadio onPress={(e: any) => setActive(e)} focus={active} />
        <Text ml={2} fontSize={'xs'} color="#8E8895">
          注册表示同意
          <Text
            onPress={() => navigation.navigate('UserProtocol')}
            color={'primary.100'}>
            《用户协议》
          </Text>
        </Text>
      </HStack>
      <Button
        mt={6}
        disabled={!active || phone.length !== 11}
        onPress={() => sumbit()}
        borderRadius={'3xl'}
        height={12}
        bg={'primary.100'}
        _text={{color: '#fff'}}>
        登录/注册
      </Button>
    </Box>
  );
};

export default Login;
