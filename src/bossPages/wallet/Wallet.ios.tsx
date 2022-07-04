import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {Text, Box, HStack, Pressable, Button, View} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import {
  ImageBackground,
  StyleSheet,
  useWindowDimensions,
  Platform,
  Alert,
  Modal,
  ActivityIndicator,
} from 'react-native';

import useRequest from '../../hooks/useRequest';
import RNIap, {
  finishTransaction,
  purchaseErrorListener,
  purchaseUpdatedListener,
  clearProductsIOS,
} from 'react-native-iap';
import {
  fetchRechargeItems,
  rechargeApplyByIos,
  verifyApplePayResult,
} from '../../api/wallet';
import util from '../../util/util';
import Iap from '../../iap/iosIap';
import {connect} from 'react-redux';
import {getMyWallet} from '../../store/action';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import getStorage from '../../util/Storage';

interface ItemProps {
  id: string;
  coinNum: string | number;
  rmbAmount: string | number;
}

const Bar = ({title = '充值项目'}) => {
  return (
    <Box pl={2}>
      <Box style={styles.bar} />
      <Text fontSize={'md'} color="fontColors.666">
        {title}
      </Text>
    </Box>
  );
};

const mapStateToProps = (state: any) => {
  return {
    walletInfo: state.user.myWallet,
  };
};

const Index = ({...props}) => {
  const {walletInfo} = props;
  const {width} = useWindowDimensions();
  const ITEM_WIDTH = (width - 32 - 8) / 2;
  const purchaseUpdateCallback = useRef(null); // 监听支付请求回调
  const purchaseErrorCallback = useRef(null); // 监听支付请求错误回调
  const IapRef = useRef(new Iap()); // Iap 内购ref
  const chargeApplyInfo = useRef(null); //发起IAP充值申请返回信息
  const [payFlag, setPayFlag] = useState(false); // 拉起苹果支付弹窗
  const [activeItem, setItem] = useState(''); // 选中的充值项目id
  const {result: chargeList} = useRequest(
    fetchRechargeItems.url,
    {
      platform: Platform.OS === 'ios' ? 'IOS' : 'ANDROID',
    },
    fetchRechargeItems.options,
  ); // 充值项列表
  const {run: runRechargeApplyByIos} = useRequest(rechargeApplyByIos.url);
  const {run: runVerifyApplePayResult} = useRequest(verifyApplePayResult.url);

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => {
        return (
          <Pressable onPress={() => goDetail()}>
            <Text fontWeight={'bold'} fontSize={'md'}>
              交易明细
            </Text>
          </Pressable>
        );
      },
    });
  }, []);

  useEffect(() => {
    props.dispatch(getMyWallet());
    return () => {
      if (purchaseUpdateCallback.current) {
        purchaseUpdateCallback.current.remove();
        purchaseUpdateCallback.current = null;
      }
      if (purchaseErrorCallback.current) {
        purchaseErrorCallback.current.remove();
        purchaseErrorCallback.current = null;
      }
    };
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      checkUnFinishTrans();
    }, []),
  );

  /**
   * 检查已支付但未写入数据库的情况
   */
  const checkUnFinishTrans = async () => {
    const rechargeId = await getStorage(['RECHARGE_ID']);
    await RNIap.initConnection();
    const purchases = await RNIap.getAvailablePurchases();
    if (purchases && purchases.length > 0 && rechargeId) {
      const params = Object.assign(purchases[0], {rechargeId});
      vertifyPay(params);
    }
  };

  const vertifyPay = async (params: any) => {
    const {data} = await runVerifyApplePayResult(params);
    if (data === '校验成功' || data === '已充值成功') {
      AsyncStorage.removeItem('RECHARGE_ID');
      props.dispatch(getMyWallet());
    }
  };

  /**
   *
   * @param {IAP商品code} param0
   * @param {发起充值订单返回的订单ID} param1
   */
  const initPurchase = async () => {
    const {iapProductCode, rechargeRecordId} = chargeApplyInfo.current;
    await IapRef.current.init([iapProductCode], rechargeRecordId);
    purchaseUpdateCallback.current = purchaseUpdatedListener(async purchase => {
      const receipt = purchase.transactionReceipt
        ? purchase.transactionReceipt
        : purchase.originalJson;
      if (receipt) {
        console.log('receipt', receipt);

        try {
          await vertifyPay(Object.assign(purchase, {rechargeRecordId}));
          await finishTransaction(purchase);
        } catch (ackErr) {
          console.warn('ackErr', ackErr);
        }
      } else {
        Alert.alert('苹果支付处理中', [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
          ,
        ]);
      }
    });
    purchaseErrorCallback.current = purchaseErrorListener(error => {
      console.log('purchaseErrorListener', error);
    });
  };

  const charge = async () => {
    if (!activeItem) {
      return;
    }
    try {
      const {data} = await runRechargeApplyByIos({
        rechargeItemId: activeItem,
      });
      AsyncStorage.setItem('RECHARGE_ID', data.rechargeRecordId);
      setPayFlag(true);
      chargeApplyInfo.current = data;
      await initPurchase();
      await clearProductsIOS();
      await IapRef.current.getProducts();
      await IapRef.current.requestPurchase();
      setPayFlag(false);
    } catch (error) {
      setPayFlag(false);
      console.log('chargeError', error);
    }
  };

  const goDetail = () => {
    props.navigation.navigate('TransferDetail');
  };

  return (
    <Box flex={1}>
      <Modal animationType="fade" transparent visible={payFlag}>
        <View style={[styles.toastViewer, {left: (width - 140) / 2}]}>
          <View style={styles.iconView}>
            <ActivityIndicator size="large" color={'white'} />
          </View>
          <Text style={styles.toastText}>支付处理中...</Text>
        </View>
      </Modal>
      <Box style={styles.top_section}>
        <ImageBackground
          style={styles.top_inner}
          resizeMode="center"
          source={require('../../images/charge_bg.png')}>
          {/* <HStack> */}
          <Text fontSize={'2xl'} color="white">
            青贝：{walletInfo.coinBalance}
          </Text>
          {/* </HStack> */}
        </ImageBackground>
      </Box>
      <Box shadow={2} p={4} flex={1} bg={'white'} style={styles.main}>
        <HStack alignItems={'center'} justifyContent="space-between">
          <Bar />
          <Pressable
            onPress={() => props.navigation.navigate('MineGifts')}
            flexDirection={'row'}
            alignItems="center">
            <Text fontSize={'md'} color={'primary.100'}>
              我的礼物
            </Text>
            <EvilIcons name="chevron-right" color="#9650FF" size={32} />
          </Pressable>
        </HStack>
        <HStack flexWrap={'wrap'} mt={4}>
          {chargeList &&
            chargeList.map((item: ItemProps, index: number) => (
              <Pressable
                key={index}
                onPress={() => setItem(item.id)}
                borderRadius={5}
                py={2.5}
                mb={1.5}
                px={4}
                borderWidth={0.5}
                borderColor={
                  activeItem === item.id ? 'primary.100' : 'border.gray'
                }
                style={{
                  backgroundColor:
                    activeItem === item.id ? '#9650FF50' : 'white',
                  width: ITEM_WIDTH,
                  marginRight: index % 2 === 0 ? 8 : 0,
                }}>
                <HStack mb={1} alignItems={'center'}>
                  <Icon name="diamond" color={'#9650FF'} size={20} />
                  <Text
                    ml={1}
                    fontSize={'lg'}
                    color={
                      activeItem === item.id ? 'primary.100' : 'fontColors.333'
                    }
                    fontWeight="bold">
                    {item.coinNum}青贝
                  </Text>
                </HStack>
                <Text ml={7} fontSize={'md'} color="fontColors.gray">
                  ¥{item.rmbAmount}
                </Text>
              </Pressable>
            ))}
        </HStack>
        <Button
          onPress={() => util.throttle(charge(), 2000)}
          borderRadius={'full'}
          py={3}
          bg={'primary.100'}
          _text={{color: '#fff', fontSize: 'md'}}
          style={{marginTop: 'auto', marginBottom: 80}}>
          立即购买
        </Button>
      </Box>
    </Box>
  );
};

export default connect(mapStateToProps)(Index);

const styles = StyleSheet.create({
  top_section: {
    minHeight: 136,
    paddingHorizontal: 16,
  },
  top_inner: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  main: {
    marginTop: -30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  bar: {
    position: 'absolute',
    backgroundColor: '#9650FF',
    width: 4,
    height: 14,
    borderRadius: 2,
    top: '50%',
    left: 0,
    transform: [{translateY: -7}],
  },
  toastViewer: {
    width: 144,
    minHeight: 120,
    position: 'absolute',
    top: '40%',
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  iconView: {
    flex: 0.7,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  toastText: {
    flex: 0.3,
    textAlign: 'center',
    color: 'white',
    fontSize: 14,
  },
});
