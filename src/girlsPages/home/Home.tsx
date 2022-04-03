import * as React from 'react';
import {
  View,
  useWindowDimensions,
  StatusBar,
  StyleSheet,
  Platform,
} from 'react-native';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';

import Dynamic from './Dynamic/Dynamic';
import Gift from './Gift';
import Like from './Like';
import Comment from './Comment';

import layout from '../common/Layout';

const DynamicRoute = () => <Dynamic />;

const GiftRoute = () => <Gift />;
const LikeRoute = () => <Like />;
const CommentRoute = () => <Comment />;

const renderScene = SceneMap({
  dynamic: DynamicRoute,
  gift: GiftRoute,
  like: LikeRoute,
  comment: CommentRoute,
});

export default function TabViewExample() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'dynamic', title: '动态'},
    {key: 'gift', title: '礼物'},
    {key: 'like', title: '喜欢'},
    {key: 'comment', title: '评论'},
  ]);

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: '#8B5CFF'}}
      labelStyle={{color: '#000000', width: 50}}
      style={{backgroundColor: 'white'}}
    />
  );

  return (
    <View style={styles.contain}>
      <StatusBar barStyle="dark-content" backgroundColor="white" translucent />

      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    ...Platform.select({
      ios: {
        paddingTop: 28 + 40,
      },
      android: {
        paddingTop: layout.STATUSBAR_HEIGHT,
      },
    }),
  },
});
