import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import TabNav from './TabNav';
import HomeDetail from '../../bossPages/home/detail/Detail';
import DailyDetail from '../../bossPages/daily/DailyDetail';
import Setting from '../../bossPages/setting/Index';
import EditUser from '../../bossPages/setting/EditUser';
import Service from '../../bossPages/customService/Index';
import WeChatNum from '../../bossPages/weChatNum/Index';
import Session from '../../bossPages/communication/Session';
import Wallet from '../../bossPages/wallet/Wallet';

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="HomeTab"
        component={TabNav}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          headerBackVisible: true,
        }}
        name="HomeDetail"
        component={HomeDetail}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          headerBackVisible: true,
        }}
        name="EditUser"
        component={EditUser}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Session"
        component={Session}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Wallet"
        component={Wallet}
      />
      <Stack.Screen
        options={{
          title: '动态详情',
          headerBackTitle: '动态',
        }}
        name="DailyDetail"
        component={DailyDetail}
      />
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: '#9650FF',
          },
          headerTintColor: '#fff',
          title: '设置',
          headerBackTitle: '我的',
        }}
        name="Setting"
        component={Setting}
      />
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: '#9650FF',
          },
          headerTintColor: '#fff',
          title: '女生联系方式',
          headerBackTitle: '我的',
        }}
        name="WeChatNum"
        component={WeChatNum}
      />
      <Stack.Screen
        options={{
          title: '客服',
          headerBackTitle: '我的',
        }}
        name="Service"
        component={Service}
      />
    </Stack.Navigator>
  );
};

export default MyStack;
