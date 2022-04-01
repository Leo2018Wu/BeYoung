import React, {useState} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {View, Text, Image} from 'native-base';
import {useNavigation} from '@react-navigation/native';

import layout from '../common/Layout';

const Login = () => {
  const navigation = useNavigation();
  const [imgList, setImgList] = useState([{id: 0}, {id: 1}, {id: 2}]);
  return (
    <Pressable
      onPress={() => navigation.navigate('DynamicItemDetail')}
      style={{
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical: 10,
      }}>
      <Image
        source={require('../assets/defaultAva.png')}
        style={{
          width: 50,
          height: 50,
        }}
      />
      <View style={styles.itemContain}>
        <Text style={{color: '#8E8895', fontSize: 14}}>啦啦啦</Text>
        <Text style={{color: '#c7c7c7', fontSize: 10}}>40分钟之前</Text>
        <Text style={{color: '#554C5F', fontSize: 14}}>
          快乐和烦恼都是自己给的,快乐和烦恼都是自己给的
        </Text>
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
