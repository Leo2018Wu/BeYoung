import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import TabNav from './TabNav';
import HomeDetail from '../../bossPages/home/detail/Detail';
import DailyDetail from '../../bossPages/daily/DailyDetail';
import Setting from '../../bossPages/setting/Index';
import EditUser from '../../bossPages/setting/EditUser';
import Service from '../../bossPages/customService/Index';
import WeChatNum from '../../bossPages/weChatNum/Index';
import SceneAlbum from '../../bossPages/sceneAlbum/Index';
import Session from '../../bossPages/communication/Session';
import Wallet from '../../bossPages/wallet/Wallet';
import TransferDetail from '../../bossPages/wallet/TransferDetail';
import Preview from '../../commonPages/PreviewImgs';
import Collection from '../../bossPages/mine/Collection';
import MineGifts from '../../bossPages/mine/MineGifts';
import MineComment from '../../bossPages/mine/MineComment';
import MineFollow from '../../bossPages/mine/FollowGirl';

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
        name="Collection"
        component={Collection}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          headerBackVisible: true,
        }}
        name="MineComment"
        component={MineComment}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          headerBackVisible: true,
        }}
        name="MineFollow"
        component={MineFollow}
      />
      <Stack.Screen
        name="EditUser"
        options={{
          headerShadowVisible: false,
        }}
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
          title: '钱包',
          headerBackTitle: '我的',
        }}
        name="Wallet"
        component={Wallet}
      />
      <Stack.Screen
        options={{
          title: '',
        }}
        name="SceneAlbum"
        component={SceneAlbum}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Preview"
        component={Preview}
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
          title: '交易明细',
          headerBackTitle: '钱包',
        }}
        name="TransferDetail"
        component={TransferDetail}
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
          title: '我的礼物',
          headerBackTitle: '我的',
        }}
        name="MineGifts"
        component={MineGifts}
      />
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: '#9650FF',
          },
          headerTintColor: '#fff',
          title: '女生微信',
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
