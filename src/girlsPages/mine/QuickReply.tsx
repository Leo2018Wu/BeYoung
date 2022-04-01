import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {View, Text, Input} from 'native-base';

import layout from '../common/Layout';

const Login = () => {
  const [goodsName, setGoodsName] = useState('');
  const [list, setList] = useState([
    {id: 0},
    {id: 1},
    {id: 2},
    {id: 3},
    {id: 3},
    {id: 4},
  ]);

  return (
    <View style={styles.quickContain}>
      {list &&
        list.map((item, index) => {
          return (
            <View>
              <Text style={styles.quickTitle}>花小钱开启聊天场景</Text>
              <Input
                value={goodsName}
                onChangeText={text => setGoodsName(text)}
                variant="outline"
                placeholder="请输入货物名称"
                fontSize={14}
                borderRadius={10}
                borderColor={'#C7C4CC'}
              />
            </View>
          );
        })}
    </View>
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
});
