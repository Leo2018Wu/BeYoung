import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, Pressable, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import DashLine from '../../components/DashLine';

const Login = () => {
  const navigation = useNavigation();
  const [list, setList] = useState([
    {id: 0},
    {id: 1},
    {id: 2},
    {id: 3},
    {id: 3},
    {id: 4},
  ]);

  const Item = item => {
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
        onPress={() => {
          navigation.navigate('WithdrawalDetail');
        }}>
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
              <Text style={{color: '#5B5959', fontSize: 16}}>提现</Text>
            </View>
          </View>
          <View
            style={{
              flex: 2,
              alignSelf: 'center',
              justifyContent: 'center',
              height: 50,
            }}>
            <Text style={[styles.amountText, styles.color1]}>+1200.00币</Text>
            {/* <Text style={[styles.amountText, item.amount > 0 ? styles.color1 : styles.color2]}>{item.amount > 0 ? <Text>+</Text> : null}{formateMoney(item.amount)}</Text> */}
          </View>
        </View>
        <View>
          <DashLine />
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', height: 40}}>
          <Text style={{fontSize: 14, color: '#666666'}}>
            到账时间：2020-07-11 14:00-17:00
          </Text>
        </View>
      </Pressable>
    );
  };
  return (
    <FlatList
      contentContainerStyle={styles.main}
      data={list}
      onEndReachedThreshold={0.1}
      showsVerticalScrollIndicator={false}
      renderItem={({item}) => <Item item={item} />}
      keyExtractor={item => item.id}
    />
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
    color: '#000',
  },
  color1: {
    color: '#EEB026',
  },
});
