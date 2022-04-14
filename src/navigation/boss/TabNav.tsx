import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Center, HStack, Image, Pressable, Text} from 'native-base';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import HomeScreen from '../../bossPages/home/Home';
import DailyScreen from '../../bossPages/daily/Index';
import CommunicateScreen from '../../bossPages/communication/Index';
import MineScreen from '../../bossPages/mine/Mine';

const Tab = createBottomTabNavigator();

interface routeItem {
  key: string;
  name: string;
}

const MyTabs = () => {
  const insets = useSafeAreaInsets(); // 安全区域边界信息
  const INSET_BOTTOM = insets.bottom; // 安全区域额底部高度
  const TABBAR_HEIGHT = 48; // 底部tab高度

  const list = [
    {
      icon: require('../../images/tabs/tab1.png'),
      icon_active: require('../../images/tabs/tab1_active.png'),
    },
    {
      icon: require('../../images/tabs/tab2.png'),
      icon_active: require('../../images/tabs/tab2_active.png'),
    },
    {
      icon: require('../../images/tabs/tab3.png'),
      icon_active: require('../../images/tabs/tab3_active.png'),
    },
    {
      icon: require('../../images/tabs/tab4.png'),
      icon_active: require('../../images/tabs/tab4_active.png'),
    },
  ];

  const MyTabBar = (props: any) => {
    const {state, descriptors, navigation} = props;

    return (
      <HStack
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          height: TABBAR_HEIGHT + INSET_BOTTOM / 2,
          backgroundColor: '#fff',
        }}>
        {state.routes.map((route: routeItem, index: number) => {
          const {options} = descriptors[route.key];
          console.log('route', options);
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <Pressable
              flex={1}
              key={route.key}
              onPress={onPress}
              pb={INSET_BOTTOM / 2}>
              <Center h="full">
                <Image
                  alt="tab_icon"
                  source={
                    isFocused ? list[index].icon_active : list[index].icon
                  }
                  w={6}
                  h={6}
                />
                <Text style={{color: isFocused ? '#9650FF' : '#999'}}>
                  {label}
                </Text>
              </Center>
            </Pressable>
          );
        })}
      </HStack>
    );
  };

  return (
    <Tab.Navigator
      tabBar={props => <MyTabBar {...props} />}
      backBehavior="history"
      initialRouteName="Home">
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabel: '首页',
        }}
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabel: '动态',
        }}
        name="Daily"
        component={DailyScreen}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabel: '消息',
        }}
        name="Order"
        component={CommunicateScreen}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabel: '我的',
        }}
        name="Mine"
        component={MineScreen}
      />
    </Tab.Navigator>
  );
};

export default MyTabs;
