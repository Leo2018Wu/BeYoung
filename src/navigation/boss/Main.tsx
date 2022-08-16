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
import MyRelations from '../../bossPages/myRelations/Index';
import Session from '../../bossPages/communication/Session';
import Wallet from '../../bossPages/wallet/Wallet';
import TransferDetail from '../../bossPages/wallet/TransferDetail';
import Preview from '../../commonPages/PreviewImgs';
import Collection from '../../bossPages/mine/Collection';
import MineGifts from '../../bossPages/mine/MineGifts';
import MineComment from '../../bossPages/mine/MineComment';
import MineFollow from '../../bossPages/mine/FollowGirl';
import About from '../../commonPages/About';
import PrivateProtocol from '../../commonPages/PrivateProtocol';
import CommonUserProtocol from '../../commonPages/CommonUserProtocol';

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerBackTitle: '',
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
          headerStyle: {
            backgroundColor: '#9650FF',
          },
          headerTintColor: '#fff',
          title: '关系列表',
        }}
        name="MyRelations"
        component={MyRelations}
      />
      <Stack.Screen
        options={{
          title: '详情',
          headerBackTitle: '',
        }}
        name="DailyDetail"
        component={DailyDetail}
      />
      <Stack.Screen
        options={{
          title: '交易明细',
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
        }}
        name="Setting"
        component={Setting}
      />
      <Stack.Screen
        options={{
          title: '我的礼物',
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
        }}
        name="WeChatNum"
        component={WeChatNum}
      />
      <Stack.Screen
        options={{
          title: '客服',
        }}
        name="Service"
        component={Service}
      />
      <Stack.Screen
        options={{
          title: '关于',
          headerStyle: {backgroundColor: '#fff'},
        }}
        name="About"
        component={About}
      />
      <Stack.Screen
        options={{
          title: '隐私政策',
        }}
        name="PrivateProtocol"
        component={PrivateProtocol}
      />
      <Stack.Screen
        options={{
          title: '用户协议',
        }}
        name="CommonUserProtocol"
        component={CommonUserProtocol}
      />
    </Stack.Navigator>
  );
};

export default MyStack;
