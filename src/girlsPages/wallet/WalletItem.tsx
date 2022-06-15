import React, {useState, useEffect} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {View, Text, Image} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import util from '../../util/util';

import layout from '../../components/Layout';

const Login = ({...props}) => {
  const navigation = useNavigation();
  const {item} = props;

  return (
    <Pressable
      style={{
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        source={require('../assets/count.png')}
        style={{
          width: 50,
          height: 50,
        }}
        alt="dairy"
      />
      <View style={styles.itemContain}>
        <View>
          <Text style={{color: '#554C5F', fontSize: 16}}>
            提现到 {item.accountTypeName}
          </Text>
          <Text style={{color: '#c7c7c7', fontSize: 12}}>{item.applyTime}</Text>
        </View>
        <View
          style={{
            marginVertical: 10,
          }}>
          {/* <Text style={{color: '#554C5F', fontSize: 12, alignSelf: 'flex-end'}}>
            RMB
          </Text> */}
          <Text style={{color: '#554C5F', fontSize: 20, fontWeight: 'bold'}}>
            -{util.formateMoney(item.coinAmount)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default Login;

const styles = StyleSheet.create({
  itemContain: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    width: layout.width - 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
