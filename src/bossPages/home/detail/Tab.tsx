// import * as React from 'react';
// import {Animated, StyleSheet, Pressable} from 'react-native';
// import {Box, HStack, Text} from 'native-base';
// import {
//   TabView,
//   SceneMap,
//   NavigationState,
//   SceneRendererProps,
// } from 'react-native-tab-view';
// import Album from './TabAlbum';
// import Daily from './TabDaily';

// type Route = {
//   key: string;
//   title: string;
// };

// type State = NavigationState<Route>;

// export default class CustomTabBarExample extends React.Component<{}, State> {
//   state: State = {
//     index: 0,
//     routes: [
//       {key: 'album', title: '照片精选'},
//       {key: 'daily', title: '她的动态'},
//     ],
//   };

//   private handleIndexChange = (index: number) =>
//     this.setState({
//       index,
//     });

//   private renderItem =
//     ({
//       navigationState,
//       position,
//     }: {
//       navigationState: State;
//       position: Animated.AnimatedInterpolation;
//     }) =>
//     ({route, index}: {route: Route; index: number}) => {
//       const inputRange = navigationState.routes.map((_, i) => i);

//       const activeOpacity = position.interpolate({
//         inputRange,
//         outputRange: inputRange.map((i: number) => (i === index ? 1 : 0)),
//       });
//       const inactiveOpacity = position.interpolate({
//         inputRange,
//         outputRange: inputRange.map((i: number) => (i === index ? 0 : 1)),
//       });

//       return (
//         <Box w={'full'} h={10}>
//           <Animated.View
//             style={[
//               styles.item,
//               styles.inactiveItem,
//               {opacity: inactiveOpacity},
//             ]}>
//             <Text fontWeight="bold" fontSize="md" color="fontColors.999">
//               {route.title}
//             </Text>
//           </Animated.View>
//           <Animated.View
//             style={[styles.item, styles.activeItem, {opacity: activeOpacity}]}>
//             <Box style={styles.activeBlock} />
//             <Text fontWeight="bold" fontSize="md" color="fontColors.333">
//               {route.title}
//             </Text>
//           </Animated.View>
//         </Box>
//       );
//     };

//   private renderTabBar = (
//     props: SceneRendererProps & {navigationState: State},
//   ) => (
//     <HStack justifyContent={'center'}>
//       {props.navigationState.routes.map((route: Route, index: number) => {
//         return (
//           <Pressable key={route.key} onPress={() => props.jumpTo(route.key)}>
//             {this.renderItem(props)({route, index})}
//           </Pressable>
//         );
//       })}
//     </HStack>
//   );

//   private renderScene = SceneMap({
//     album: Album,
//     daily: Daily,
//   });

//   render() {
//     return (
//       <TabView
//         navigationState={this.state}
//         renderScene={this.renderScene}
//         renderTabBar={this.renderTabBar}
//         onIndexChange={this.handleIndexChange}
//       />
//     );
//   }
// }

// const styles = StyleSheet.create({
//   item: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     position: 'relative',
//     borderRadius: 2,
//     paddingHorizontal: 10,
//   },
//   inactiveItem: {},
//   activeBlock: {
//     width: 40,
//     height: 4,
//     borderRadius: 2,
//     backgroundColor: '#9650FF',
//     position: 'absolute',
//     bottom: 12,
//     left: '32%',
//   },
//   activeItem: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//   },
// });
