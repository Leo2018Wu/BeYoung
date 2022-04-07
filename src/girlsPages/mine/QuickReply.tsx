import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {View, Text, Input, ScrollView, NativeBaseProvider} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';

import layout from '../common/Layout';

const Login = () => {
  const [goodsName, setGoodsName] = useState('');
  const [list, setList] = useState([
    {id: 0, title: '花大钱开启聊天'},
    {id: 1, title: '花大钱开启聊天'},
    {id: 2, title: '聊天后收到礼物'},
    {id: 3, title: '聊天后连续或收到高额礼物'},
  ]);

  return (
    <NativeBaseProvider>
      <ScrollView style={styles.quickContain}>
        <View style={{paddingBottom: 20}}>
          {list &&
            list.map((item, index) => {
              return (
                <View>
                  <Text style={styles.quickTitle}>
                    {index + 1}、{item.title}
                  </Text>
                  <Input
                    value={goodsName}
                    onChangeText={text => setGoodsName(text)}
                    variant="outline"
                    placeholder="添加你的回复..."
                    fontSize={14}
                    borderRadius={10}
                    borderColor={'#C7C4CC'}
                  />
                </View>
              );
            })}
        </View>
      </ScrollView>
      <View style={{backgroundColor: '#fff'}}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#D988FF', '#8B5CFF']}
          style={styles.linearGradient}>
          <Text style={styles.buttonText}>保存</Text>
        </LinearGradient>
      </View>
    </NativeBaseProvider>
  );
};

export default Login;

const styles = StyleSheet.create({
  quickContain: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 30,
  },
  quickTitle: {
    fontWeight: 'bold',
    color: '#252222',
    fontSize: 18,
    marginBottom: 15,
    marginVertical: 20,
  },
  linearGradient: {
    width: '90%',
    marginLeft: '5%',
    marginVertical: 20,
    borderRadius: 28,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    height: 56,
    lineHeight: 56,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});
