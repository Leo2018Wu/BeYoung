import * as React from 'react';
import {
  View,
  Text,
  useWindowDimensions,
  StatusBar,
  StyleSheet,
  Platform,
  Pressable,
} from 'react-native';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';

import Dynamic from './Dynamic/Dynamic';
import Mine from './Dynamic/Mine';
import Like from './Like';
import Comment from './Comment';

import layout from '../../components/Layout';

const DynamicRoute = () => <Dynamic />;

const MineRoute = () => <Mine />;
const LikeRoute = () => <Like />;
const CommentRoute = () => <Comment />;

const renderScene = SceneMap({
  dynamic: DynamicRoute,
  mine: MineRoute,
  like: LikeRoute,
  comment: CommentRoute,
});

export default function TabViewExample() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'dynamic', title: '学妹圈'},
    {key: 'mine', title: '我的'},
    // {key: 'like', title: '喜欢'},
    // {key: 'comment', title: '评论'},
  ]);

  const renderTabBar = (props: any) => (
    <View
      style={{
        flexDirection: 'row',
        paddingHorizontal: 15,
        height: 30,
        alignItems: 'center',
      }}>
      {routes &&
        routes.map((item, index1) => (
          <Pressable
            onPress={() => setIndex(index1)}
            style={{marginHorizontal: 15, justifyContent: 'center'}}>
            <View>
              <Text style={index == index1 ? styles.texted : styles.text}>
                {item.title}
              </Text>
            </View>
            {index == index1 ? (
              <View
                style={{
                  borderColor: '#8B5CFF',
                  borderWidth: 1,
                  width: 18,
                  justifyContent: 'center',
                  alignSelf: 'center',
                }}
              />
            ) : null}
          </Pressable>
        ))}
    </View>
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
    backgroundColor: '#fff',
    flex: 1,
    ...Platform.select({
      ios: {
        paddingTop: 28 + 40,
      },
      android: {
        paddingTop: layout.STATUSBAR_HEIGHT + 20,
      },
    }),
  },
  text: {
    color: '#554C5F',
    fontSize: 14,
  },
  texted: {
    color: '#554C5F',
    fontSize: 18,
  },
});
