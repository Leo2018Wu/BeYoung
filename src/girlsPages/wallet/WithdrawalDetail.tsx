// 提现详情

import React from 'react';
import {View, Text, Image, ImageBackground, StyleSheet} from 'react-native';

import DashLine from '../common/DashLine';
import layout from '../common/Layout';

export default function Index(props) {
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
      }}>
      <ImageBackground
        resizeMode="cover"
        source={require('../assets/record_detail_bg.png')}
        style={styles.container}>
        <Image
          resizeMode="cover"
          style={styles.status_icon}
          source={require('../assets/detail_success.png')}
        />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            marginTop: 16,
          }}>
          <Text style={{color: '#000000', fontSize: 18, marginRight: 10}}>
            钱包到账
          </Text>
          <Text style={styles.amount}>1300</Text>
        </View>
        <View style={styles.bottom_container}>
          <View style={styles.bottom_item}>
            <Text style={styles.bottom_item_title}>收支类型</Text>
            <Text style={styles.bottom_item_content}>提现</Text>
          </View>
          <View style={styles.bottom_item}>
            <Text style={styles.bottom_item_title}>提现时间</Text>
            <Text style={styles.bottom_item_content}>2020-07-05 17:04:23</Text>
          </View>
          <View style={styles.bottom_item}>
            <Text style={styles.bottom_item_title}>当前余额</Text>
            <Text style={styles.bottom_item_content}>1244.00币</Text>
          </View>
          <View style={styles.bottom_item}>
            <Text style={styles.bottom_item_title}>交易单号</Text>
            <Text style={styles.bottom_item_content}>176****8280</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: layout.width - 32,
    minHeight: 344,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 21,
    paddingVertical: 27,
  },
  status_icon: {
    width: 84,
    height: 84,
  },
  amount: {
    color: '#FFB048',
    fontSize: 26,
    fontWeight: 'bold',
  },
  bottom_container: {
    width: '80%',
    marginTop: 40,
  },
  bottom_item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  bottom_item_title: {
    fontSize: 14,
    color: '#999',
  },
  bottom_item_content: {
    color: '#333333',
    fontSize: 14,
  },
});
