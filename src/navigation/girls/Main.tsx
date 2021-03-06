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
import WithdrawalCards from '../../girlsPages/wallet/WithdrawalCards';
import Preview from '../../components/Preview';
import EditUser from '../../girlsPages/mine/setting/EditUser';
import EditName from '../../girlsPages/mine/setting/EditName';
import EditStudentCard from '../../girlsPages/mine/setting/EditStudentCard';
import EditHeadImg from '../../girlsPages/mine/setting/EditHeadImg';
import Session from '../../girlsPages/communication/Session';
import Label from '../../girlsPages/mine/Label';
import Service from '../../bossPages/customService/Index';
import MineGifts from '../../girlsPages/mine/MineGifts';
import Follow from '../../girlsPages/mine/Follow';
import About from '../../commonPages/About';
import PrivateProtocol from '../../commonPages/PrivateProtocol';
import CommonUserProtocol from '../../commonPages/CommonUserProtocol';
import MineComment from '../../girlsPages/mine/MineComment';

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
          title: '??????',
          headerStyle: {backgroundColor: '#fff'},
        })}
      />
      <Stack.Screen
        name="UserInfoSetting"
        component={UserInfoSetting}
        options={() => ({
          title: '????????????',
          headerStyle: {backgroundColor: '#fff'},
        })}
      />
      <Stack.Screen
        name="QuickReply"
        component={QuickReply}
        options={() => ({
          headerShown: false,
          headerBackVisible: true,
        })}
      />
      <Stack.Screen
        name="ReplyExpPackage"
        component={ReplyExpPackage}
        options={() => ({
          title: '???????????????',
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
          title: '????????????',
          headerStyle: {backgroundColor: '#fff'},
        }}
        name="RepairHelp"
        component={RepairHelp}
      />
      <Stack.Screen
        name="PhotoUpload"
        component={PhotoUpload}
        options={() => ({
          title: '????????????',
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
          title: '????????????',
          headerStyle: {backgroundColor: '#fff'},
        })}
      />
      <Stack.Screen
        name="WithdrawalDetail"
        component={WithdrawalDetail}
        options={() => ({
          title: '????????????',
          headerStyle: {backgroundColor: '#fff'},
        })}
      />
      <Stack.Screen
        name="WithdrawalCards"
        component={WithdrawalCards}
        options={() => ({
          title: '????????????',
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
          headerShown: false,
          headerBackVisible: true,
        }}
        name="EditName"
        component={EditName}
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
          title: '???????????????',
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
      <Stack.Screen
        options={{
          title: '??????',
          headerBackTitle: '??????',
        }}
        name="Service"
        component={Service}
      />
      <Stack.Screen
        options={{
          title: '????????????',
          headerBackTitle: '??????',
        }}
        name="MineGifts"
        component={MineGifts}
      />
      <Stack.Screen
        options={{
          title: '?????????',
          headerStyle: {backgroundColor: '#fff'},
        }}
        name="Follow"
        component={Follow}
      />
      <Stack.Screen
        options={{
          title: '??????',
          headerStyle: {backgroundColor: '#fff'},
        }}
        name="About"
        component={About}
      />
      <Stack.Screen
        options={{
          title: '????????????',
        }}
        name="PrivateProtocol"
        component={PrivateProtocol}
      />
      <Stack.Screen
        options={{
          title: '????????????',
        }}
        name="CommonUserProtocol"
        component={CommonUserProtocol}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          headerBackVisible: true,
        }}
        name="MineComment"
        component={MineComment}
      />
    </Stack.Navigator>
  );
};

export default MyStack;
