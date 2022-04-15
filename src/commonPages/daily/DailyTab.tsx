import * as React from 'react';
import {Animated, StyleSheet, DeviceEventEmitter} from 'react-native';
import {Box, HStack, Text, Pressable} from 'native-base';
import {
  TabView,
  SceneMap,
  NavigationState,
  SceneRendererProps,
} from 'react-native-tab-view';
import GirlsComment from '../../girlsPages/home/Dynamic/Comment';
import GirlsGift from '../../girlsPages/home/Dynamic/Gift';

type Route = {
  key: string;
  title: string;
};

type State = NavigationState<Route>;

export default class CustomTabBarExample extends React.Component<{}, State> {
  state: State = {
    index: 0,
    routes: [
      {key: 'comment', title: '评论'},
      {key: 'gift', title: '礼物'},
    ],
  };

  private handleIndexChange = (index: number) =>
    this.setState({
      index,
    });

  private renderItem =
    ({
      navigationState,
      position,
    }: {
      navigationState: State;
      position: Animated.AnimatedInterpolation;
    }) =>
    ({route, index}: {route: Route; index: number}) => {
      const inputRange = navigationState.routes.map((_, i) => i);

      const activeOpacity = position.interpolate({
        inputRange,
        outputRange: inputRange.map((i: number) => (i === index ? 1 : 0)),
      });
      const inactiveOpacity = position.interpolate({
        inputRange,
        outputRange: inputRange.map((i: number) => (i === index ? 0 : 1)),
      });

      return (
        <Box bg={'bg.darkGray'} w={'full'} h={10}>
          <Animated.View
            style={[
              styles.item,
              styles.inactiveItem,
              {opacity: inactiveOpacity},
            ]}>
            <Text fontWeight="bold" fontSize="md" color="fontColors.333">
              {route.title}
            </Text>
          </Animated.View>
          <Animated.View
            style={[styles.item, styles.activeItem, {opacity: activeOpacity}]}>
            <Text fontWeight="bold" fontSize="md" color="white">
              {route.title}
            </Text>
          </Animated.View>
        </Box>
      );
    };

  private renderTabBar = (
    props: SceneRendererProps & {navigationState: State},
  ) => (
    <HStack h={16} px={16} alignItems={'center'}>
      {props.navigationState.routes.map((route: Route, index: number) => {
        return (
          <Pressable
            flex={1}
            key={route.key}
            onPress={() => {
              props.jumpTo(route.key);
              DeviceEventEmitter.emit('REPLY_FLAG', false);
            }}>
            {this.renderItem(props)({route, index})}
          </Pressable>
        );
      })}
    </HStack>
  );

  private renderScene = SceneMap({
    comment: GirlsComment,
    gift: GirlsGift,
  });

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={this.renderScene}
        renderTabBar={this.renderTabBar}
        onIndexChange={this.handleIndexChange}
      />
    );
  }
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  inactiveItem: {},

  activeItem: {
    backgroundColor: '#9650FF',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
