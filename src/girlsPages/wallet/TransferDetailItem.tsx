import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, Pressable, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import DashLine from '../../components/DashLine';
import util from '../../util/util';

const Login = ({...props}) => {
  const navigation = useNavigation();
  const {item} = props;

  return (
    <Pressable
      style={{
        backgroundColor: 'white',
        width: '100%',
        height: 120,
        paddingTop: 0,
        paddingLeft: 15,
        paddingRight: 15,
        marginBottom: 10,
      }}
      onPress={() => navigation.navigate('WithdrawalDetail', {item: item})}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}>
        <View style={{marginRight: 10}}>
          <Image
            style={{width: 50, height: 50}}
            source={require('../assets/money.png')}
          />
        </View>
        <View
          style={{
            flex: 3,
            justifyContent: 'center',
            height: 50,
          }}>
          <View>
            <Text style={{color: '#5B5959', fontSize: 16}}>
              {item.revenueTypeName}
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 2,
            alignSelf: 'center',
            justifyContent: 'center',
            height: 50,
          }}>
          <Text
            style={[
              styles.amountText,
              item.coinNum > 0 ? styles.color1 : styles.color2,
            ]}>
            {item.coinNum > 0 ? <Text>+</Text> : null}
            {util.formateMoney(item.coinNum)}
          </Text>
        </View>
      </View>
      <View>
        <DashLine />
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center', height: 40}}>
        <Text style={{fontSize: 14, color: '#666666'}}>
          创建时间：{item.createTime}
        </Text>
      </View>
    </Pressable>
  );
};

export default Login;

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flexDirection: 'column',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
    paddingBottom: 5,
    marginBottom: 10,
  },
  topView: {
    flexDirection: 'row',
  },
  viewContain: {
    flex: 1,
    width: '100%',
    height: '100%',
    paddingBottom: 5,
    paddingTop: 5,
  },
  titleStyle: {
    flex: 1,
    textAlign: 'left',
    fontSize: 15,
    color: '#525050',
    fontWeight: 'bold',
  },
  moneyStyle: {
    flex: 1,
    textAlign: 'right',
    fontSize: 14,
  },
  positiveColor: {
    color: '#33C74C',
  },
  negativeColor: {
    color: '#F47680',
  },
  timeStyle: {
    textAlign: 'left',
    flex: 1,
    fontSize: 15,
    color: '#7B7B7B',
  },
  balanceStyle: {
    textAlign: 'right',
    flex: 1,
    fontSize: 14,
    color: '#777777',
  },
  amountText: {
    fontSize: 20,
    textAlign: 'right',
  },
  color2: {
    color: '#F55050',
  },
  color1: {
    color: '#78D186',
  },
});
