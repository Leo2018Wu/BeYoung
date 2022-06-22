import React, {useState, useEffect} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text, Box, Pressable, Modal, Image, useToast} from 'native-base';
import {useFocusEffect} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {SwipeListView, SwipeRow} from 'react-native-swipe-list-view';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import layout from '../../components/Layout';
import util from '../../util/util';
import {querySysDic} from '../../api/common';
import {
  fetchAccountList,
  fetchAlipayAuthInfo,
  fetchBindAccount,
  deleteAccount,
} from '../../api/wallet';
import useRequest from '../../hooks/useRequest';
import Alipay from 'react-native-alipay-latest';
import * as WeChat from '@shm-open/react-native-wechat';
import QueryString from 'query-string';

const Index = ({...props}) => {
  const {navigation} = props;
  const toast = useToast();
  const [payWayModal, setPayWayModal] = useState(false);
  const [delAccountModal, setDelAccountModal] = useState(false);
  const [delItem, setDelItem] = useState({});
  const [dictList, setDictList] = useState(null);
  const [wechatFlag, setWechatFlag] = useState(false);
  const [alipayFlag, setAlipayFlag] = useState(false);
  const {result: accountTypeList} = useRequest(
    querySysDic.url,
    {
      pCode: 'ACCOUNT_TYPE',
    },
    querySysDic.options,
  );
  const {run: runFetchAccountList} = useRequest(fetchAccountList.url);
  const {run: runFetchAlipayAuthInfo} = useRequest(fetchAlipayAuthInfo.url);
  const {run: runBindAccount} = useRequest(fetchBindAccount.url);
  const {run: runDeleteAccount} = useRequest(deleteAccount.url);
  const PAY_WAYS = [
    {
      icon: require('../../images/wx_icon.png'),
      name: '微信',
      code: 'WX',
    },
    {
      icon: require('../../images/ali_icon.png'),
      name: '支付宝',
      code: 'ALI',
    },
  ];
  const [accountList, setAccountList] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      getAccountList();
    }, []),
  );

  useEffect(() => {
    if (accountTypeList) {
      console.log('--accountTypeList--', accountTypeList);
      const renderGrades = accountTypeList.filter(
        item => item.pCode !== item.code,
      );
      setDictList(renderGrades);
      console.log('--dictList--', dictList);
    }
  }, [accountTypeList]);

  // 获取账号列表
  const getAccountList = async () => {
    try {
      const {data, success} = await runFetchAccountList({
        tradeType: 'APP',
      });
      setAccountList(data);
      setAlipayFlag(false);
      setWechatFlag(false);
      if (success && data.length) {
        data.forEach(e => {
          if (e.accountType === 'ACCOUNT_TYPE_ALI_PAY') {
            setAlipayFlag(true);
          } else {
            setWechatFlag(true);
          }
        });
      }
    } catch (error) {
      console.log('error-->>>', error);
    }
  };

  // 账号绑定弹窗
  const charge = async () => {
    setPayWayModal(true);
  };

  // 绑定账号为支付宝
  const alipay = async () => {
    try {
      const {data, success} = await runFetchAlipayAuthInfo({platform: 'IOS'});
      if (success) {
        let {app_id} = QueryString.parse(data);
        Alipay.setAlipayScheme('alipay' + app_id);
        let response = await Alipay.authInfo(data);
        let {resultStatus, result, memo} = response;
        let {success, result_code, auth_code, user_id} =
          QueryString.parse(result);
        getBindAccount('ACCOUNT_TYPE_ALI_PAY', user_id);
      }
    } catch (error) {
      console.log('---error---', error);
    }
  };

  // 绑定账号为微信
  const wxPay = async () => {
    WeChat.sendAuthRequest('snsapi_userinfo')
      .then(async res => {
        console.log('--res---', res);
        getBindAccount('ACCOUNT_TYPE_WX_PAY', res.code);
      })
      .catch(err => {
        console.log('--err---', err);
      });
  };

  //绑定账号
  const getBindAccount = async (type, accountNum) => {
    const {data, success} = await runBindAccount({
      accountType: type,
      accountNum: accountNum,
      tradeType: 'APP',
    });
    if (success) {
      setPayWayModal(false);
      getAccountList();
    }
  };

  // 删除账号
  const delCard = async delItem => {
    const {data, success} = await runDeleteAccount({
      walletAccountId: delItem.id,
    });
    if (success) {
      setDelAccountModal(false);
      getAccountList();
    }
  };

  const renderItem = (data, index) => {
    return (
      <SwipeRow
        disableRightSwipe
        disableLeftSwipe={!data.item.id}
        leftOpenValue={0}
        rightOpenValue={-50}
        previewRowKey={'0'}
        previewOpenValue={-100}
        previewOpenDelay={3000}
        style={{marginVertical: 10}}>
        <View style={styles.hiddenBox}>
          <Pressable
            onPress={() => {
              setDelItem(data.item);
              setDelAccountModal(true);
            }}
            style={styles.del_container}>
            <Image
              source={require('../assets/cardDel.png')}
              style={{width: 50, height: 50}}
              alt="dairy"
            />
          </Pressable>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Wallet', {
              data: data.item,
            });
          }}>
          <LinearGradient
            colors={
              data.item.accountType === 'ACCOUNT_TYPE_ALI_PAY'
                ? ['#5EB6F3', '#5FC1EA']
                : ['#85F475', '#46BB36']
            }
            style={styles.showBox}>
            {data.item.accountType === 'ACCOUNT_TYPE_ALI_PAY' ? (
              <Image
                resizeMode="contain"
                source={require('../assets/zhifubao_bind.png')}
                style={{
                  width: 90,
                  height: 95,
                  position: 'absolute',
                  bottom: 0,
                  right: -4,
                }}
                alt="dairy"
              />
            ) : (
              <Image
                resizeMode="contain"
                source={require('../assets/wx_bind.png')}
                style={{
                  width: 90,
                  height: 95,
                  position: 'absolute',
                  bottom: 0,
                  right: -4,
                }}
                alt="dairy"
              />
            )}
            <View style={styles.cardInfoBox}>
              <View
                style={{
                  width: 36,
                  height: 36,
                  backgroundColor: 'white',
                  borderRadius: 18,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {data.item.accountType === 'ACCOUNT_TYPE_ALI_PAY' ? (
                  <Image
                    source={require('../assets/zhifubao_circle.png')}
                    style={{width: 26, height: 26}}
                    alt="dairy"
                  />
                ) : (
                  <Image
                    source={require('../assets/wx_circle.png')}
                    style={{width: 26, height: 26}}
                    alt="dairy"
                  />
                )}
              </View>
              <View style={{flex: 1, paddingHorizontal: 10}}>
                <View
                  style={{
                    height: 40,
                    marginBottom: 'auto',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{color: 'white', fontSize: 14, fontWeight: 'bold'}}>
                    {/* {getDictName(dictList, data.item.accountType)} */}
                  </Text>
                  <Text style={{color: 'white', fontSize: 12}}>
                    {/* {data.item.owner} */}
                  </Text>
                </View>
                <View style={styles.circleList}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 22,
                      fontWeight: 'bold',
                      letterSpacing: 1,
                    }}>
                    {/* {data.item.accountNum} */}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                height: 40,
                width: 40,
              }}
            />
          </LinearGradient>
        </TouchableOpacity>
      </SwipeRow>
    );
  };

  return (
    <Box flex={1}>
      <Modal isOpen={payWayModal} onClose={() => setPayWayModal(false)}>
        <Modal.Content p={4} alignItems="center">
          <Text fontSize={'md'} mb={1} style={{color: '#222'}}>
            请选择账号类型
          </Text>
          {PAY_WAYS.map((ele, idx) => (
            <Pressable
              onPress={() => {
                if (ele.code === 'ALI' && !alipayFlag) {
                  alipay();
                } else if (ele.code === 'WX' && !wechatFlag) {
                  wxPay();
                } else {
                  toast.show({
                    description: '已存在该账户类型或交易类型的账户',
                    placement: 'top',
                    duration: 1000,
                  });
                }
              }}
              py={2}
              w={'full'}
              flexDirection={'row'}
              key={idx}>
              <Image
                alt="pay_icon"
                style={{
                  width: 25,
                  height: 25,
                  marginRight: 6,
                }}
                source={ele.icon}
              />
              <Text style={{color: '#2A2B2A'}} fontSize={'sm'} mr="auto">
                {ele.name}
              </Text>
              <EvilIcons name="chevron-right" color="#C5C6C7" size={32} />
            </Pressable>
          ))}
        </Modal.Content>
      </Modal>
      <Modal isOpen={delAccountModal} onClose={() => setDelAccountModal(false)}>
        <Modal.Content p={4} alignItems="center">
          <Text fontSize={'lg'} mb={1} style={{color: '#222'}}>
            提示
          </Text>
          <Text fontSize={'md'} mb={1} style={{color: '#222', marginTop: 10}}>
            确定要删除该绑定账号吗
          </Text>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              marginTop: 20,
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
              }}>
              <Text onPress={() => delCard(delItem)}>确定</Text>
            </View>
            <View style={{flex: 1, alignItems: 'center'}}>
              <Text onPress={() => setDelAccountModal(false)}>取消</Text>
            </View>
          </View>
        </Modal.Content>
      </Modal>
      <Box style={{paddingBottom: '20%'}}>
        <SwipeListView data={accountList} renderItem={renderItem} />
      </Box>
      <TouchableOpacity
        onPress={() => util.throttle(charge(), 2000)}
        style={styles.btnView}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#D988FF', '#8B5CFF']}
          style={styles.linearGradient}>
          <Text style={styles.buttonText}>添加账号</Text>
        </LinearGradient>
      </TouchableOpacity>
    </Box>
  );
};

const styles = StyleSheet.create({
  btnView: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    height: 70,
    backgroundColor: '#fff',
  },
  linearGradient: {
    width: layout.width - 60,
    marginLeft: 30,
    marginTop: 15,
    height: 50,
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
  hiddenBox: {
    width: '100%',
    height: 125,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  del_container: {
    height: 125,
    width: '100%',
    backgroundColor: '#F35E5E',
    borderRadius: 10,
    justifyContent: 'center',
    paddingLeft: 10,
    alignItems: 'flex-end',
  },
  showBox: {
    width: '100%',
    height: 125,
    paddingHorizontal: 24,
    borderRadius: 10,
    flexDirection: 'row',
    position: 'relative',
  },
  cardInfoBox: {
    flex: 1,
    paddingVertical: 17,
    flexDirection: 'row',
  },
  circleList: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
});

export default Index;
