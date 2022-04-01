import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  ImageBackground,
  Platform,
  FlatList,
  Pressable,
} from 'react-native';

import layout from '../common/Layout';
import WalletItem from './WalletItem';

const Mine = (props: any) => {
  const {navigation} = props;
  const [list, setList] = useState([
    {id: 0},
    {id: 1},
    {id: 2},
    {id: 3},
    {id: 3},
    {id: 4},
  ]);

  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <StatusBar backgroundColor="transparent" translucent />
      <View
        style={{backgroundColor: '#fff', height: '40%', position: 'relative'}}>
        <ImageBackground
          source={require('../assets/mineBg.png')}
          style={styles.banner}
          resizeMode="cover">
          <View style={styles.walletContain}>
            <View style={styles.contain_text}>
              <Text style={{color: '#fff', fontSize: 16}}>青回币</Text>
              <Image
                source={require('../assets/mineBg.png')}
                style={{
                  width: 16,
                  height: 16,
                }}
                resizeMode="cover"
              />
            </View>
            <Text style={{color: '#fff', fontSize: 34}}>753,256,00</Text>
          </View>
        </ImageBackground>
        <View style={styles.contain_inner}>
          <View style={styles.item_inner}>
            <Image
              source={require('../assets/mineBg.png')}
              style={{
                width: 50,
                height: 50,
              }}
              resizeMode="cover"
            />
            <Text style={{color: '#000', fontSize: 14}}>绑定支付宝</Text>
          </View>
          <View style={styles.item_inner}>
            <Image
              source={require('../assets/mineBg.png')}
              style={{
                width: 50,
                height: 50,
              }}
              resizeMode="cover"
            />
            <Text style={{color: '#000', fontSize: 14}}>绑定微信</Text>
          </View>
          <Pressable
            onPress={() => navigation.navigate('TransferDetail')}
            style={styles.item_inner}>
            <Image
              source={require('../assets/mineBg.png')}
              style={{
                width: 50,
                height: 50,
              }}
              resizeMode="cover"
            />
            <Text style={{color: '#000', fontSize: 14}}>交易明细</Text>
          </Pressable>
        </View>
        <Text style={styles.withdrawal}>提现记录</Text>
      </View>
      <FlatList
        contentContainerStyle={styles.main}
        data={list}
        onEndReachedThreshold={0.1}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => <WalletItem item={item} />}
        keyExtractor={item => item.id}
      />
      <View style={styles.btnView}>
        <Text style={styles.btnTextView}>提交</Text>
      </View>
    </View>
  );
};

export default Mine;

const styles = StyleSheet.create({
  banner: {
    width: layout.width,
    height: 180,
    ...Platform.select({
      ios: {
        paddingTop: 28 + 40,
      },
      android: {
        paddingTop: layout.STATUSBAR_HEIGHT + 20,
      },
    }),
    position: 'relative',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  walletContain: {
    position: 'absolute',
    top: '40%',
    left: 30,
  },
  contain_text: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contain_inner: {
    width: '90%',
    backgroundColor: '#fff',
    position: 'absolute',
    top: '45%',
    left: '5%',
    flex: 1,
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-around',
    borderRadius: 10,
  },
  item_inner: {
    alignItems: 'center',
  },
  withdrawal: {
    position: 'absolute',
    bottom: '5%',
    paddingLeft: 20,
    color: '#554C5F',
    fontSize: 14,
  },
  main: {},
  btnView: {
    width: layout.width - 60,
    marginLeft: 30,
    marginTop: 20,
    height: 50,
    backgroundColor: '#D988FF',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '5%',
  },
  btnTextView: {
    color: '#fff',
    fontSize: 16,
  },
});
