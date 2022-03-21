import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import TabNav from './TabNav';

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
    </Stack.Navigator>
  );
};

export default MyStack;
