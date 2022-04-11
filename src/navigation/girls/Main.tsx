import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import TabNav from './TabNav';
// import DynamicItemDetail from '../../girlsPages/home/Dynamic/DynamicItemDetail';
import DailyDetail from '../../commonPages/daily/DailyDetail';
import UserInfoSetting from '../../girlsPages/mine/UserInfoSetting';
import QuickReply from '../../girlsPages/mine/QuickReply';
import ReplyExpPackage from '../../girlsPages/mine/ReplyExpPackage';
import PhotoSelection from '../../girlsPages/mine/photoSelect/PhotoSelection';
import Wallet from '../../girlsPages/wallet/Wallet';
import TransferDetail from '../../girlsPages/wallet/TransferDetail';
import WithdrawalDetail from '../../girlsPages/wallet/WithdrawalDetail';
import Preview from '../../girlsPages/common/Preview';
import EditUser from '../../girlsPages/mine/setting/EditUser';
import StudentCard from '../../girlsPages/mine/setting/StudentCard';
import Session from '../../bossPages/communication/Session';

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
        name="DailyDetail"
        component={DailyDetail}
        options={() => ({
          title: '帖子详情',
          headerStyle: {backgroundColor: '#fff'},
        })}
      />
      <Stack.Screen
        name="UserInfoSetting"
        component={UserInfoSetting}
        options={() => ({
          title: '个人信息',
          headerStyle: {backgroundColor: '#fff'},
        })}
      />
      <Stack.Screen
        name="QuickReply"
        component={QuickReply}
        options={() => ({
          title: '快捷回复',
          headerStyle: {backgroundColor: '#fff'},
        })}
      />
      <Stack.Screen
        name="ReplyExpPackage"
        component={ReplyExpPackage}
        options={() => ({
          title: '回复表情包',
          headerStyle: {backgroundColor: '#fff'},
        })}
      />
      <Stack.Screen
        name="PhotoSelection"
        component={PhotoSelection}
        options={() => ({
          title: '精选照片',
          headerStyle: {backgroundColor: '#fff'},
        })}
      />
      <Stack.Screen
        name="Wallet"
        component={Wallet}
        options={() => ({
          title: '',
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="TransferDetail"
        component={TransferDetail}
        options={() => ({
          title: '交易明细',
          headerStyle: {backgroundColor: '#fff'},
        })}
      />
      <Stack.Screen
        name="WithdrawalDetail"
        component={WithdrawalDetail}
        options={() => ({
          title: '提现详情',
          headerStyle: {backgroundColor: '#fff'},
        })}
      />
      <Stack.Screen
        name="Preview"
        component={Preview}
        options={{
          headerTitle: '',
          headerTransparent: true,
        }}
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
        options={() => ({
          title: '学生证上传',
          headerStyle: {backgroundColor: '#fff'},
        })}
        name="StudentCard"
        component={StudentCard}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Session"
        component={Session}
      />
    </Stack.Navigator>
  );
};

export default MyStack;
