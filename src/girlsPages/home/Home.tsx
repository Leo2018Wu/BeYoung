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
import {TabView, SceneMap} from 'react-native-tab-view';

import Dynamic from './Dynamic/Dynamic';
import Mine from './Dynamic/Mine';

import layout from '../../components/Layout';

const DynamicRoute = () => <Dynamic />;
const MineRoute = () => <Mine />;

const renderScene = SceneMap({
  dynamic: DynamicRoute,
  mine: MineRoute,
});

export default function TabViewExample() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'dynamic', title: '学妹圈'},
    {key: 'mine', title: '我的'},
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
            style={{
              marginHorizontal: 8,
              justifyContent: 'center',
              minWidth: 60,
            }}>
            <View
              style={{
                height: '100%',
                flex: 1,
                justifyContent: 'center',
              }}>
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
    textAlign: 'center',
  },
  texted: {
    color: '#554C5F',
    fontSize: 18,
    textAlign: 'center',
  },
});
