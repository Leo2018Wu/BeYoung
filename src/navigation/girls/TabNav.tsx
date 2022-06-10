import React, {useState, useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Center, HStack, Pressable, Text, Image, View} from 'native-base';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import HomeScreen from '../../girlsPages/home/Home';
import CaseScreen from '../../girlsPages/case/Case';
import CommunicateScreen from '../../bossPages/communication/Index';
import MineScreen from '../../girlsPages/mine/Mine';
import ReleaseDynamics from '../../girlsPages/releaseDynamics/ReleaseDynamics';
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
      name: 'Home',
      icon: require('../../girlsPages/assets/tab_home.png'),
      icon_active: require('../../girlsPages/assets/tab_home_ed.png'),
    },
    {
      name: 'Case',
      icon: require('../../girlsPages/assets/tab_case.png'),
      icon_active: require('../../girlsPages/assets/tab_case_ed.png'),
    },
    {
      name: 'ReleaseDynamics',
      icon: require('../../girlsPages/assets/tab_post_ed.png'),
      icon_active: require('../../girlsPages/assets/tab_post_ed.png'),
    },
    {
      name: 'CommunicateScreen',
      icon: require('../../girlsPages/assets/tab_message.png'),
      icon_active: require('../../girlsPages/assets/tab_message_ed.png'),
    },
    {
      name: 'Mine',
      icon: require('../../girlsPages/assets/tab_mine.png'),
      icon_active: require('../../girlsPages/assets/tab_mine_ed.png'),
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
              bg={'#fff'}
              pb={INSET_BOTTOM / 2}>
              {index === 3 && props.unreadMsgNum ? (
                <View
                  style={{
                    position: 'absolute',
                    right: 15,
                    top: 0,
                    backgroundColor: 'red',
                    borderRadius: 50,
                    minWidth: 18,
                    minHeight: 18,
                    zIndex: 100,
                  }}>
                  <Text textAlign={'center'} fontSize={'xs'} color={'#fff'}>
                    {props.unreadMsgNum <= 99 ? props.unreadMsgNum : '...'}
                  </Text>
                </View>
              ) : null}
              <Center h="full">
                {index != 2 ? (
                  <View>
                    {!isFocused ? (
                      <Image
                        source={list[index].icon}
                        alt="dairy"
                        style={{
                          width: 25,
                          height: 25,
                        }}
                      />
                    ) : (
                      <Image
                        source={list[index].icon_active}
                        alt="dairy"
                        style={{
                          width: 25,
                          height: 25,
                        }}
                      />
                    )}

                    <Text
                      style={{
                        color: isFocused ? '#8B5CFF' : '#999',
                        fontSize: 11,
                        textAlign: 'center',
                        height: 14,
                        lineHeight: 14,
                      }}>
                      {label}
                    </Text>
                  </View>
                ) : (
                  <Image
                    source={list[index].icon_active}
                    alt="dairy"
                    style={{
                      width: 55,
                      height: 55,
                      marginBottom: 10,
                    }}
                  />
                )}
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
          tabBarLabel: '动态',
        }}
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          title: '案例',
          tabBarLabel: '案例',
          headerTitleAlign: 'center',
          tabBarItemStyle: {borderRadius: 10},
        }}
        name="Case"
        component={CaseScreen}
      />
      <Tab.Screen
        options={{
          headerShown: false,
        }}
        name="ReleaseDynamics"
        component={ReleaseDynamics}
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
