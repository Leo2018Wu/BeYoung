import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import TabNav from './TabNav';
import HomeDetail from '../../bossPages/home/detail/Detail';
import DailyDetail from '../../bossPages/daily/DailyDetail';

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
          headerTitle: '详情',
          headerBackTitle: '动态',
        }}
        name="DailyDetail"
        component={DailyDetail}
      />
    </Stack.Navigator>
  );
};

export default MyStack;
