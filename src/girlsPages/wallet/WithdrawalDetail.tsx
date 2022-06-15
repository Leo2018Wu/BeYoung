// 提现详情

import React from 'react';
import {View, Text, Image, ImageBackground, StyleSheet} from 'react-native';

import layout from '../../components/Layout';
import util from '../../util/util';

export default function Index({...props}) {
  const {route} = props;
  console.log('----s-s-s', route.params);

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
      }}>
      <ImageBackground
        resizeMode="stretch"
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
          {/* <Text style={{color: '#000000', fontSize: 18, marginRight: 10}}>
            钱包到账
          </Text> */}
          <Text style={styles.amount}>
            {util.formateMoney(route.params.item.coinNum)}
          </Text>
        </View>
        <View style={styles.bottom_container}>
          <View style={styles.bottom_item}>
            <Text style={styles.bottom_item_title}>收支类型</Text>
            <Text style={styles.bottom_item_content}>
              {route.params.item.revenueTypeName}
            </Text>
          </View>
          <View style={styles.bottom_item}>
            <Text style={styles.bottom_item_title}>创建时间</Text>
            <Text style={styles.bottom_item_content}>
              {route.params.item.createTime}
            </Text>
          </View>
          <View style={styles.bottom_item}>
            <Text style={styles.bottom_item_title}>当前余额</Text>
            <Text style={styles.bottom_item_content}>
              {util.formateMoney(route.params.item.coinBalance)}
            </Text>
          </View>
          <View style={styles.bottom_item}>
            <Text style={styles.bottom_item_title}>交易单号</Text>
            <Text style={styles.bottom_item_content}>
              {route.params.item.tradeNo}
            </Text>
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
