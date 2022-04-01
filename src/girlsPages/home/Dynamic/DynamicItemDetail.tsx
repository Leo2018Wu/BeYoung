import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {View, Text, Image} from 'native-base';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import layout from '../../common/Layout';

import Gift from '../Gift';

const DynamicRoute = () => <Gift />;

const renderScene = SceneMap({
  dynamic: DynamicRoute,
  gift: DynamicRoute,
  like: DynamicRoute,
});

const Login = ({navigation}: any) => {
  const [routes] = useState([
    {key: 'dynamic', title: '评论'},
    {key: 'gift', title: '礼物'},
    {key: 'like', title: '评分'},
  ]);
  const [index, setIndex] = React.useState(0);

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: '#8B5CFF'}}
      labelStyle={{color: '#000000', width: 50}}
      style={{backgroundColor: 'white'}}
    />
  );
  const [imgList, setImgList] = useState([{id: 0}, {id: 1}, {id: 2}]);
  return (
    <>
      <View
        style={{
          paddingHorizontal: 15,
          paddingVertical: 20,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={require('../../assets/defaultAva.png')}
            style={{
              width: 50,
              height: 50,
            }}
          />
          <View style={{marginLeft: 10}}>
            <Text style={{color: '#8E8895', fontSize: 14}}>啦啦啦</Text>
            <Text style={{color: '#c7c7c7', fontSize: 10}}>40分钟之前</Text>
          </View>
        </View>
        <View style={styles.itemContain}>
          <View
            style={{
              marginVertical: 10,
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            {imgList &&
              imgList.map((item, index) => {
                return (
                  <Image
                    source={require('../../assets/IMG_2728.png')}
                    style={{
                      width: 85,
                      height: 85,
                      borderRadius: 10,
                    }}
                  />
                );
              })}
          </View>
          <Text style={{color: '#554C5F', fontSize: 14}}>
            快乐和烦恼都是自己给的,快乐和烦恼都是自己给的
          </Text>
          <View style={styles.optContain}>
            <View style={styles.optView}>
              <Image
                source={require('../../assets/home_linke.png')}
                style={{
                  width: 18,
                  height: 18,
                  marginRight: 3,
                }}
              />
              <Text style={styles.optSize}>71k</Text>
            </View>
            <View style={styles.optView}>
              <Image
                source={require('../../assets/home_message.png')}
                style={{
                  width: 18,
                  height: 18,
                  marginRight: 3,
                }}
              />
              <Text style={styles.optSize}>71k</Text>
            </View>
            <View style={styles.optView}>
              <Image
                source={require('../../assets/home_gift.png')}
                style={{
                  width: 18,
                  height: 18,
                  marginRight: 3,
                }}
              />
              <Text style={styles.optSize}>71k</Text>
            </View>
          </View>
        </View>
      </View>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
      />
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  itemContain: {
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  optContain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  optView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optSize: {
    color: '#C7C4CC',
    fontSize: 12,
  },
});
