import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import TabNav from './TabNav';
// import DynamicItemDetail from '../../girlsPages/home/Dynamic/DynamicItemDetail';
import DailyDetail from '../../commonPages/daily/DailyDetail';
import UserInfoSetting from '../../girlsPages/mine/UserInfoSetting';
import QuickReply from '../../girlsPages/mine/QuickReply';
import ReplyExpPackage from '../../girlsPages/mine/ReplyExpPackage';
import PhotoSelection from '../../girlsPages/mine/photoSelect/PhotoSelection';
import PhotoUpload from '../../girlsPages/mine/photoSelect/PhotoUpload';
import RepairHelp from '../../girlsPages/mine/photoSelect/RepairHelp';
import Wallet from '../../girlsPages/wallet/Wallet';
import TransferDetail from '../../girlsPages/wallet/TransferDetail';
import WithdrawalDetail from '../../girlsPages/wallet/WithdrawalDetail';
import Preview from '../../components/Preview';
import EditUser from '../../girlsPages/mine/setting/EditUser';
import EditStudentCard from '../../girlsPages/mine/setting/EditStudentCard';
import EditHeadImg from '../../girlsPages/mine/setting/EditHeadImg';
import Session from '../../girlsPages/communication/Session';
import Label from '../../girlsPages/mine/Label';

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
          title: '动态详情',
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
          headerShown: false,
          headerBackVisible: true,
        })}
      />
      <Stack.Screen
        options={{
          title: '修图帮助',
          headerStyle: {backgroundColor: '#fff'},
        }}
        name="RepairHelp"
        component={RepairHelp}
      />
      <Stack.Screen
        name="PhotoUpload"
        component={PhotoUpload}
        options={() => ({
          title: '添加照片',
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
          title: '',
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
        options={{
          headerBackVisible: true,
        }}
        name="EditHeadImg"
        component={EditHeadImg}
      />
      <Stack.Screen
        options={() => ({
          title: '编辑学生证',
          headerStyle: {backgroundColor: '#fff'},
        })}
        name="EditStudentCard"
        component={EditStudentCard}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Session"
        component={Session}
      />
      <Stack.Screen
        name="Label"
        component={Label}
        options={() => ({
          headerShown: false,
          headerBackVisible: true,
        })}
      />
    </Stack.Navigator>
  );
};

export default MyStack;
