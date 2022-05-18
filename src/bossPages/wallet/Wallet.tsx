import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Text, Box, HStack, Pressable, Button} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  ImageBackground,
  StyleSheet,
  useWindowDimensions,
  Platform,
} from 'react-native';
import useRequest from '../../hooks/useRequest';
import {fetchRechargeItems, rechargeApplyAli} from '../../api/wallet';
import Alipay from '@uiw/react-native-alipay';
import util from '../../util/util';
import {connect} from 'react-redux';
import {getMyWallet} from '../../store/action';

interface ItemProps {
  id: string;
  coinNum: string | number;
  rmbAmount: string | number;
}

const ALI_APPID = 2021003129620044;

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
  const [activeItem, setItem] = useState(''); // 选中的充值项目id
  const {result: chargeList} = useRequest(
    fetchRechargeItems.url,
    {
      platform: Platform.OS === 'ios' ? 'IOS' : 'ANDROID',
    },
    fetchRechargeItems.options,
  );
  const {run: runChargeAli} = useRequest(rechargeApplyAli.url);

  useEffect(() => {
    Alipay.setAlipayScheme(`alipay${ALI_APPID}`);
    props.dispatch(getMyWallet());
  }, []);

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

  const alipay = async () => {
    try {
      const {data, success} = await runChargeAli({
        rechargeItemId: activeItem,
        platform: Platform.OS === 'android' ? 'ANDROID' : 'IOS',
      });
      if (success) {
        const {resultStatus} = await Alipay.alipay(data);
        if (resultStatus === '9000') {
          props.dispatch(getMyWallet());
        }
      }
    } catch (error) {
      console.log('alipay:error-->>>', error);
    }
  };

  const charge = async () => {
    alipay();
  };

  const goDetail = () => {
    props.navigation.navigate('TransferDetail');
  };

  return (
    <Box flex={1}>
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
        <Bar />
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
    backgroundColor: '#fff4db',
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
});
