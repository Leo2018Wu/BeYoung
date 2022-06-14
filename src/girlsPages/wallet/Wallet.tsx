import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  ImageBackground,
  Platform,
  Pressable,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {Box, Modal, Text, useToast} from 'native-base';
import useRequest from '../../hooks/useRequest';
import {useFocusEffect} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import IconNew from 'react-native-vector-icons/AntDesign';
import {queryMyWithdraws, fetchWithdraw} from '../../api/wallet';
import {connect} from 'react-redux';
import {getMyWallet} from '../../store/action';
import util from '../../util/util';
import CustomFuncFlatList from '../../components/CustomFuncFlatList';

import layout from '../../components/Layout';
import WalletItem from './WalletItem';

const mapStateToProps = (state: any) => {
  return {
    walletInfo: state.user.myWallet,
  };
};

const Index = ({...props}) => {
  const {navigation, walletInfo, route} = props;
  const toast = useToast();
  const insets = useSafeAreaInsets();
  const [coinAmount, setCoinAmount] = useState(0);

  const {run: runFetchWithdraw} = useRequest(fetchWithdraw.url);
  const [withdrawalFlag, setWithdrawalFlag] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      props.dispatch(getMyWallet());
    }, []),
  );

  const goWithdraw = () => {
    if (!coinAmount) {
      toast.show({
        description: '提现青回币不能为0',
        placement: 'top',
        duration: 1000,
      });
      return;
    }
    if (!route.params) {
      toast.show({
        description: '请选择提现账号',
        placement: 'top',
        duration: 1000,
      });
      return;
    }
    getWithdraw();
  };

  // 提现
  const getWithdraw = async () => {
    const {data, success} = await runFetchWithdraw({
      walletAccountId: route.params.data.id,
      amount: coinAmount / 10,
      coinAmount: coinAmount,
    });
    if (success) {
      setWithdrawalFlag(false);
      props.dispatch(getMyWallet());
    }
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
              <Text fontSize="md" color={'#fff'}>
                青回币
              </Text>
              <Image
                source={require('../assets/gold.png')}
                style={{
                  width: 16,
                  height: 16,
                }}
                resizeMode="cover"
              />
            </View>
            <Text fontSize="3xl" color={'#fff'}>
              {util.formateMoney(walletInfo.coinBalance)}
            </Text>
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
          <Pressable
            onPress={() => navigation.navigate('WithdrawalCards')}
            style={styles.item_inner}>
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
      <CustomFuncFlatList
        renderItem={({item}: any) => <WalletItem item={item} />}
        url={queryMyWithdraws.url}
      />
      <TouchableOpacity onPress={() => setWithdrawalFlag(true)}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#D988FF', '#8B5CFF']}
          style={styles.linearGradient}>
          <Text style={styles.buttonText}>提现</Text>
        </LinearGradient>
      </TouchableOpacity>
      <Modal
        isOpen={withdrawalFlag}
        onClose={() => {
          setWithdrawalFlag(false);
          setCoinAmount(0);
        }}>
        <Modal.Content p={4} alignItems="center">
          <View style={{justifyContent: 'flex-start', width: '100%'}}>
            <Text fontSize={'lg'} mb={1} style={{color: '#606060'}}>
              提现青回币
            </Text>
          </View>
          <View style={styles.withdrawalView}>
            <Image
              source={require('../assets/gold.png')}
              style={{
                width: 22,
                height: 22,
                marginRight: 10,
              }}
              resizeMode="cover"
            />
            <TextInput
              value={coinAmount}
              keyboardType="numeric"
              placeholder=""
              onChangeText={text => setCoinAmount(text)}
              flex={1}
              style={{fontSize: 16}}
              maxLength={11}
            />
            <Text
              onPress={() => {
                setCoinAmount(walletInfo.coinBalance);
              }}
              fontSize="md"
              color={'#8B5CFF'}>
              全部提现
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <Text color="#606060">提现至</Text>
            <Pressable
              onPress={() => navigation.navigate('WithdrawalCards')}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              {route.params ? (
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  {route.params.data.accountType === 'ACCOUNT_TYPE_WX_PAY' ? (
                    <Image
                      source={require('../assets/wx_circle.png')}
                      style={{
                        width: 14,
                        height: 14,
                        marginRight: 5,
                      }}
                      resizeMode="cover"
                    />
                  ) : (
                    <Image
                      source={require('../assets/zhifubao_circle.png')}
                      style={{
                        width: 14,
                        height: 14,
                        marginRight: 5,
                      }}
                      resizeMode="cover"
                    />
                  )}
                  <Text color="#606060">
                    {route.params.data.accountType === 'ACCOUNT_TYPE_WX_PAY'
                      ? '微信'
                      : '支付宝'}
                  </Text>
                </View>
              ) : (
                <Text color="#606060">请选择</Text>
              )}

              <IconNew name="right" size={16} color="#000" />
            </Pressable>
          </View>
          <TouchableOpacity
            onPress={() => util.throttle(goWithdraw(), 2000)}
            style={{width: '100%', marginTop: 10}}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#D988FF', '#8B5CFF']}
              style={[styles.linearGradient, {width: '90%', marginLeft: '5%'}]}>
              <Text style={styles.buttonText}>提现</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Modal.Content>
      </Modal>
    </View>
  );
};

export default connect(mapStateToProps)(Index);

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
    top: '55%',
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
    lineHeight: 50,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  withdrawalView: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#DEDEDE',
    borderBottomWidth: 1,
    marginBottom: 20,
  },
});
