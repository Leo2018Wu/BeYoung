import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from '../../bossPages/login/Login';

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
    </Stack.Navigator>
  );
};

export default LoginStack;
