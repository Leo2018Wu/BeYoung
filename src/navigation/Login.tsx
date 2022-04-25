import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from '../commonPages/login/Login';
import VerifyCode from '../commonPages/login/VerifyCode';
import ChooseSex from '../commonPages/login/ChooseSex';
import UserProtocol from '../commonPages/UserProtocol';

const Stack = createNativeStackNavigator();

const LoginStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        options={{
          title: '登录',
          headerShown: false,
        }}
        name="Login"
        component={Login}
      />
      <Stack.Screen
        options={{
          title: '用户协议',
        }}
        name="UserProtocol"
        component={UserProtocol}
      />
      <Stack.Screen
        options={{
          title: '验证码',
          headerShadowVisible: false,
          headerBackVisible: true,
          headerTransparent: true,
        }}
        name="VerifyCode"
        component={VerifyCode}
      />
      <Stack.Screen
        options={{
          title: '选择性别',
          headerShadowVisible: false,
        }}
        name="ChooseSex"
        component={ChooseSex}
      />
    </Stack.Navigator>
  );
};

export default LoginStack;
