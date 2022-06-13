import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  Platform,
  FlatList,
  Pressable,
} from 'react-native';
import useRequest from '../../hooks/useRequest';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import * as WeChat from 'react-native-wechat-lib';

import layout from '../../components/Layout';
import WalletItem from './WalletItem';
import {fetchBindAccount} from '../../api/wallet';

const Mine = (props: any) => {
  const {navigation} = props;
  const insets = useSafeAreaInsets();
  const {run: runBindAccount} = useRequest(fetchBindAccount.url);
  const [list, setList] = useState([
    {id: 0},
    {id: 1},
    {id: 2},
    {id: 3},
    {id: 3},
    {id: 4},
  ]);

  // 微信授权登录 提现
  const bindWechatCont = () => {
    WeChat.sendAuthRequest('snsapi_userinfo')
      .then(async res => {
        console.log('--res---', res);
        const {data, success} = await runChargeAli({
          accountType: 'ACCOUNT_TYPE_WX_PAY',
          accountNum: res.code,
          tradeType: 'APP',
        });
      })
      .catch(err => {
        console.log('--err---', err);
      });
  };

  const bindCount = () => {
    bindWechatCont();
  };

  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <View
        style={{backgroundColor: '#fff', height: '50%', position: 'relative'}}>
        <ImageBackground
          source={require('../assets/mineBg.png')}
          style={styles.banner}
          resizeMode="cover">
          <View
            style={{
              position: 'absolute',
              top: insets.top * 1.5,
              width: layout.width,
            }}>
            <Pressable
              style={{
                width: 24,
                height: 24,
                left: 20,
                position: 'absolute',
                zIndex: 10,
              }}
              onPress={() => {
                navigation.navigate('Mine');
              }}>
              <Icon name="arrow-back" size={24} color="#fff" />
            </Pressable>
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 18,
                textAlign: 'center',
              }}>
              钱包
            </Text>
          </View>
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
          <Pressable
            onPress={() => navigation.navigate('WithdrawalCards')}
            style={styles.item_inner}>
            <Image
              source={require('../assets/zhifubao.png')}
              style={{
                width: 50,
                height: 50,
              }}
              resizeMode="cover"
            />
            <Text style={{color: '#000', fontSize: 14, marginTop: 4}}>
              绑定支付宝
            </Text>
          </Pressable>
          <Pressable onPress={() => bindCount()} style={styles.item_inner}>
            <Image
              source={require('../assets/weixin.png')}
              style={{
                width: 50,
                height: 50,
              }}
              resizeMode="cover"
            />
            <Text style={{color: '#000', fontSize: 14, marginTop: 4}}>
              绑定微信
            </Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate('TransferDetail')}
            style={styles.item_inner}>
            <Image
              source={require('../assets/mingxi.png')}
              style={{
                width: 50,
                height: 50,
              }}
              resizeMode="cover"
            />
            <Text style={{color: '#000', fontSize: 14, marginTop: 4}}>
              交易明细
            </Text>
          </Pressable>
        </View>
        <Text style={styles.withdrawal}>提现记录</Text>
      </View>
      <FlatList
        data={list}
        onEndReachedThreshold={0.1}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => <WalletItem item={item} />}
        keyExtractor={item => item.id}
      />
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#D988FF', '#8B5CFF']}
        style={styles.linearGradient}>
        <Text style={styles.buttonText}>提现</Text>
      </LinearGradient>
    </View>
  );
};

export default Mine;

const styles = StyleSheet.create({
  banner: {
    width: layout.width,
    height: 280,
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
    top: '60%',
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
    top: '58%',
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
  linearGradient: {
    width: layout.width - 60,
    marginLeft: 30,
    marginTop: 20,
    height: 50,
    borderRadius: 28,
    marginBottom: '5%',
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
