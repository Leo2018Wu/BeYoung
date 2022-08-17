import React, {useState} from 'react';
import {
  Box,
  Button,
  Divider,
  HStack,
  Text,
  View,
  Actionsheet,
  useDisclose,
  Pressable,
} from 'native-base';
import CFastImage from '../../components/CFastImage';
import AsyncStorage from '@react-native-community/async-storage';
import {DeviceEventEmitter} from 'react-native';
import {connect} from 'react-redux';
import util from '../../util/util';
import AliyunPush from 'react-native-aliyun-push';
import IconNew from 'react-native-vector-icons/AntDesign';
import {cancelUser} from '../../api/common';
import useRequest from '../../hooks/useRequest';
import getStorage from '../../util/Storage';

const mapStateToProps = (state: any) => {
  return {
    userInfo: state.user.myUserInfo,
  };
};

const Index = ({...props}) => {
  const {userInfo} = props;
  const {isOpen, onOpen, onClose} = useDisclose();
  const [cancelFlag, setCancelFlag] = useState(false);
  const {run: runCancelUser} = useRequest(cancelUser.url);

  const goCancelUser = async () => {
    const {success} = await runCancelUser();
    if (success) {
      logOut();
    }
  };

  const logOut = () => {
    AliyunPush.unbindAccount()
      .then(result => {
        console.log('unbindAccount success');
        console.log(JSON.stringify(result));
      })
      .catch(error => {
        console.log('bindAccount error');
        console.log(JSON.stringify(error));
      });
    AsyncStorage.setItem('LOGIN_NAVIGAITON_NAME', '');
    AsyncStorage.setItem('USERINFO', '');
    DeviceEventEmitter.emit('LOGIN_EVENT', '');
  };

  const editUser = ({type = 'nickName', value = ''}) => {
    props.navigation.navigate('EditUser', {
      type,
      value,
    });
  };

  return (
    <Box flex={1}>
      {cancelFlag ? (
        <Actionsheet hideDragIndicator isOpen={isOpen} onClose={onClose}>
          <Actionsheet.Content
            style={{
              backgroundColor: '#fff',
              borderRadius: 40,
            }}>
            <Pressable
              onPress={() => {
                goCancelUser();
              }}
              px={6}
              w="full"
              h={10}
              mb={2}
              alignItems="center">
              <Box h={10} py={0} justifyContent={'center'} w="full">
                <Text color={'#E04955'} textAlign={'center'}>
                  注销
                </Text>
              </Box>
            </Pressable>
            <Box w="full" h={1} backgroundColor={'gray.200'} />
            <Pressable
              onPress={() => {
                onClose();
              }}
              w="full"
              h={10}
              alignItems="center">
              <Box h={10} py={0} justifyContent={'center'} w="full">
                <Text color={'#999'} textAlign={'center'}>
                  取消
                </Text>
              </Box>
            </Pressable>
          </Actionsheet.Content>
        </Actionsheet>
      ) : (
        <Actionsheet hideDragIndicator isOpen={isOpen} onClose={onClose}>
          <Actionsheet.Content
            style={{
              backgroundColor: '#fff',
              borderRadius: 40,
            }}>
            <Pressable
              onPress={() => {
                logOut();
              }}
              px={6}
              w="full"
              h={10}
              mb={2}
              alignItems="center">
              <Box h={10} py={0} justifyContent={'center'} w="full">
                <Text color={'#E04955'} textAlign={'center'}>
                  退出登录
                </Text>
              </Box>
            </Pressable>
            <Box w="full" h={1} backgroundColor={'gray.200'} />
            <Pressable
              onPress={() => {
                onClose();
              }}
              px={6}
              w="full"
              h={10}
              alignItems="center">
              <Box h={10} py={0} justifyContent={'center'} w="full">
                <Text color={'#999'} textAlign={'center'}>
                  取消
                </Text>
              </Box>
            </Pressable>
          </Actionsheet.Content>
        </Actionsheet>
      )}
      <Pressable
        onPress={() => editUser({type: 'headImg', value: userInfo?.headImg})}>
        <HStack
          py={1}
          px={4}
          bg={'white'}
          justifyContent={'space-between'}
          alignItems="center">
          <Text fontWeight={'bold'} fontSize={'md'} color={'fontColors.333'}>
            头像
          </Text>
          <CFastImage
            url={userInfo?.headImg}
            styles={{width: 44, height: 44, borderRadius: 22}}
          />
        </HStack>
      </Pressable>
      <Box px={2}>
        <Divider h={0.25} />
      </Box>
      <Pressable
        onPress={() => editUser({type: 'nickName', value: userInfo?.nickName})}>
        <HStack
          py={1}
          px={4}
          h={12}
          bg={'white'}
          justifyContent={'space-between'}
          alignItems="center">
          <Text fontWeight={'bold'} fontSize={'md'} color={'fontColors.333'}>
            昵称
          </Text>
          <Text fontSize={'md'} style={{color: '#A6A6A6'}}>
            {userInfo?.nickName || '请设置自己的昵称'}
          </Text>
        </HStack>
      </Pressable>
      <Box px={2}>
        <Divider h={0.25} />
      </Box>
      <HStack
        px={4}
        h={12}
        bg={'white'}
        justifyContent={'space-between'}
        alignItems="center">
        <Text fontWeight={'bold'} fontSize={'md'} color={'fontColors.333'}>
          手机号
        </Text>
        <Text fontSize={'md'} style={{color: '#A6A6A6'}}>
          {util.hidePhone(userInfo?.phone)}
        </Text>
      </HStack>
      <Box px={2}>
        <Divider h={0.25} />
      </Box>
      <Pressable onPress={() => props.navigation.navigate('About')}>
        <HStack
          py={1}
          px={4}
          h={12}
          bg={'white'}
          justifyContent={'space-between'}
          alignItems="center">
          <Text fontWeight={'bold'} fontSize={'md'} color={'fontColors.333'}>
            关于
          </Text>
          <View
            style={{
              justifyContent: 'flex-end',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <IconNew name="right" size={16} color="#919191" />
          </View>
        </HStack>
      </Pressable>
      <Box px={2}>
        <Divider h={0.25} />
      </Box>
      <Pressable
        onPress={() => {
          setCancelFlag(true);
          onOpen();
        }}>
        <HStack
          py={1}
          px={4}
          h={12}
          bg={'white'}
          justifyContent={'space-between'}
          alignItems="center">
          <Text fontWeight={'bold'} fontSize={'md'} color={'fontColors.333'}>
            注销账号
          </Text>
          <View
            style={{
              justifyContent: 'flex-end',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <IconNew name="right" size={16} color="#919191" />
          </View>
        </HStack>
      </Pressable>
      <Button
        onPress={() => {
          setCancelFlag(false);
          onOpen();
        }}
        mx={4}
        borderRadius={'full'}
        mt={'full'}
        style={{
          backgroundColor: '#EFEFEF',
        }}>
        <Text fontWeight={'bold'} fontSize={'md'} color="primary.100">
          退出登录
        </Text>
      </Button>
    </Box>
  );
};

export default connect(mapStateToProps)(Index);
