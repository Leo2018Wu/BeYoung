import React from 'react';
import {View, Image, Text, StyleSheet, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';

export default function Index({navigation}) {
  return (
    <View style={styles.container}>
      <Image
        style={{width: 60, height: 60}}
        source={require('../girlsPages/assets/logo.png')}
      />
      <Text style={{paddingTop: 7, color: '#202020', fontSize: 16}}>青回</Text>
      <Text style={{paddingTop: 7, color: '#202020', fontSize: 14}}>
        Version 1.0.0
      </Text>
      <View style={{marginTop: 40, width: '100%'}}>
        <Pressable style={styles.update}>
          <Text style={styles.li_text}>版本更新</Text>
          <Icon name="chevron-right" color="#C5C6C7" size={30} />
        </Pressable>
        <Pressable style={styles.update}>
          <Text style={styles.li_text}>功能介绍</Text>
          <Icon name="chevron-right" color="#C5C6C7" size={30} />
        </Pressable>
      </View>
      <View style={{position: 'absolute', bottom: 25}}>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Text
            onPress={() => {
              navigation.navigate('Protocol');
            }}
            style={{color: '#5C6F98', fontSize: 10}}>
            《用户协议》
          </Text>
          <Text
            onPress={() => {
              navigation.navigate('Protocol');
            }}
            style={{color: '#5C6F98', fontSize: 10}}>
            《隐私政策》
          </Text>
        </View>
        <Text style={{color: '#777777', fontSize: 15, marginBottom: 5}}>
          Copyright©2020-2024
        </Text>
        <Text style={{color: '#777777', fontSize: 15}}>
          淮安做壹休叁版权所有
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 54,
    alignItems: 'center',
    paddingTop: 46,
    flex: 1,
  },
  update: {
    paddingBottom: 13,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  li_text: {
    fontSize: 14,
    color: '#1A1A1A',
  },
});
