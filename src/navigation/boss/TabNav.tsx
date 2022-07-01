import React, {useState, useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Center, HStack, Image, Pressable, Text, View} from 'native-base';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import HomeScreen from '../../bossPages/home/Home';
import DailyScreen from '../../bossPages/daily/Index';
import CommunicateScreen from '../../bossPages/communication/Index';
import MineScreen from '../../bossPages/mine/Mine';
import {connect} from 'react-redux';

const Tab = createBottomTabNavigator();

interface routeItem {
  key: string;
  name: string;
}

const mapStateToProps = (state: any) => {
  return {
    unreadMsgNum: state.session.sessionList.reduce((t, v) => t + v.unread, 0),
  };
};

const MyTabs = ({...props}) => {
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

  const MyTabBar = (propsItem: any) => {
    const {state, descriptors, navigation} = propsItem;
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
              {index === 2 && props.unreadMsgNum ? (
                <View
                  style={{
                    position: 'absolute',
                    right: 20,
                    top: 4,
                    backgroundColor: 'red',
                    borderRadius: 100,
                    minWidth: 14,
                    minHeight: 14,
                    zIndex: 100,
                  }}>
                  <Text textAlign={'center'} fontSize={10} color={'#fff'}>
                    {props.unreadMsgNum <= 99 ? props.unreadMsgNum : '...'}
                  </Text>
                </View>
              ) : null}
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
          tabBarLabel: '学妹圈',
        }}
        name="Daily"
        component={DailyScreen}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabel: '消息',
        }}
        name="CommunicateScreen"
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

export default connect(mapStateToProps)(MyTabs);
