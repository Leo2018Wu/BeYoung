import React, {useState, useCallback, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {
  View,
  Text,
  Image,
  Select,
  CheckIcon,
  ScrollView,
  Pressable,
  NativeBaseProvider,
  Actionsheet,
  useDisclose,
  Box,
} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import {DeviceEventEmitter} from 'react-native';
import IconNew from 'react-native-vector-icons/AntDesign';
import {useFocusEffect} from '@react-navigation/native';
import useRequest from '../../hooks/useRequest';
import {fetchMyInfo, cancelUser} from '../../api/common';
import {fetchMyLabels} from '../../api/label';
import CFastImage from '../../components/CFastImage';
import {querySysDic, updateUserInfo} from '../../api/common';
import util from '../../util/util';
import AliyunPush from 'react-native-aliyun-push';

import layout from '../../components/Layout';

const Setting = ({...props}) => {
  const [service, setService] = useState('');
  const [labelList, setLabelList] = useState([]);
  const [grades, setGrades] = useState([]); // 渲染的年级列表
  const {run: runUpdate} = useRequest(updateUserInfo.url);
  const {isOpen, onOpen, onClose} = useDisclose();
  const [cancelFlag, setCancelFlag] = useState(false);

  const {result: gradeDicts} = useRequest(
    querySysDic.url,
    {
      pCode: 'GRADE',
    },
    querySysDic.options,
  );
  const {result, run} = useRequest(fetchMyInfo.url);
  const {run: runFetchMyLabels} = useRequest(fetchMyLabels.url);
  const {run: runCancelUser} = useRequest(cancelUser.url);

  useFocusEffect(
    useCallback(() => {
      run();
      getMyLabels();
    }, []),
  );

  useEffect(() => {
    if (gradeDicts) {
      console.log('--renderGrades--', gradeDicts);

      const renderGrades = gradeDicts.filter(item => item.pCode !== item.code);
      setGrades(renderGrades);
    }
  }, [gradeDicts]);

  useEffect(() => {
    if (result) {
      AsyncStorage.setItem('USERINFO', JSON.stringify(result));
      console.log('-------', result);

      setService(result.grade);
    }
  }, [result]);

  const getMyLabels = async () => {
    const {data} = await runFetchMyLabels({});
    setLabelList(data);
  };

  const editUser = (type, value) => {
    props.navigation.navigate('EditUser', {
      type: type,
      value: value,
    });
  };

  const editInfo = value => {
    props.navigation.navigate('EditName', {
      value: value,
    });
  };

  const goCancelUser = async () => {
    const {success} = await runCancelUser();
    if (success) {
      logout();
    }
  };

  const logout = () => {
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

  return (
    <NativeBaseProvider>
      <ScrollView style={styles.userInfoContain}>
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
                <Box flex={1} py={0} justifyContent={'center'} w="full">
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
                px={6}
                w="full"
                h={10}
                alignItems="center">
                <Box flex={1} py={0} justifyContent={'center'} w="full">
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
                  logout();
                }}
                px={6}
                w="full"
                h={10}
                mb={2}
                alignItems="center">
                <Box flex={1} py={0} justifyContent={'center'} w="full">
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
                <Box flex={1} py={0} justifyContent={'center'} w="full">
                  <Text color={'#999'} textAlign={'center'}>
                    取消
                  </Text>
                </Box>
              </Pressable>
            </Actionsheet.Content>
          </Actionsheet>
        )}
        <View style={{paddingBottom: '30%'}}>
          <Pressable
            onPress={() =>
              props.navigation.navigate('EditHeadImg', {
                value: result?.headImg,
              })
            }
            style={styles.itemView}>
            <Text style={styles.userInfo_item_text}>头像</Text>
            <CFastImage
              url={result?.headImg}
              styles={{width: 45, height: 45, borderRadius: 50}}
            />
          </Pressable>
          <Pressable
            onPress={() => props.navigation.navigate('EditStudentCard')}
            style={styles.itemView}>
            <Text>学生证</Text>
            <View
              style={{
                justifyContent: 'flex-end',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              {result?.studentCard ? (
                <CFastImage
                  url={result?.studentCard}
                  styles={{width: 45, height: 45}}
                />
              ) : (
                <Image
                  source={require('../assets/defaultAva.png')}
                  style={{
                    width: 45,
                    height: 45,
                  }}
                  alt="dairy"
                />
              )}
              <IconNew
                name="right"
                size={16}
                color="#919191"
                style={{marginLeft: 4}}
              />
            </View>
          </Pressable>
          <Pressable
            onPress={() => editUser('昵称', result?.nickName)}
            style={styles.itemView}>
            <Text>昵称</Text>
            <View
              style={{
                justifyContent: 'flex-end',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={{color: '#919191', marginRight: 4}}>
                {result?.nickName || '请设置昵称'}
              </Text>
              <IconNew name="right" size={16} color="#919191" />
            </View>
          </Pressable>
          <Pressable onPress={() => editInfo(result)} style={styles.itemView}>
            <Text>姓名</Text>
            <View
              style={{
                justifyContent: 'flex-end',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={{color: '#919191', marginRight: 4}}>
                {result?.name || '请设置姓名'}
              </Text>
              <IconNew name="right" size={16} color="#919191" />
            </View>
          </Pressable>
          <Pressable onPress={() => editInfo(result)} style={styles.itemView}>
            <Text>身份证号</Text>
            <View
              style={{
                justifyContent: 'flex-end',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={{color: '#919191', marginRight: 4}}>
                {util.hidePhone(result?.cardNum) || '请设置身份证号'}
              </Text>
              <IconNew name="right" size={16} color="#919191" />
            </View>
          </Pressable>
          <Pressable onPress={() => editInfo(result)} style={styles.itemView}>
            <Text>手机号</Text>
            <View
              style={{
                justifyContent: 'flex-end',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={{color: '#919191', marginRight: 4}}>
                {util.hidePhone(result?.phone)}
              </Text>
              <IconNew name="right" size={16} color="#919191" />
            </View>
          </Pressable>
          <Pressable
            onPress={() => editUser('微信号', result?.weChat)}
            style={styles.itemView}>
            <Text>微信号</Text>
            <View
              style={{
                justifyContent: 'flex-end',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={{color: '#919191', marginRight: 4}}>
                {util.hidePhone(result?.weChat) || '请设置微信号'}
              </Text>
              <IconNew name="right" size={16} color="#919191" />
            </View>
          </Pressable>
          <Pressable
            onPress={() => editUser('QQ号', result?.qq)}
            style={styles.itemView}>
            <Text>QQ号</Text>
            <View
              style={{
                justifyContent: 'flex-end',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={{color: '#919191', marginRight: 4}}>
                {util.hidePhone(result?.qq) || '请设置QQ号'}
              </Text>
              <IconNew name="right" size={16} color="#919191" />
            </View>
          </Pressable>
          <View style={styles.itemView}>
            <Text>年级</Text>
            <Select
              selectedValue={service}
              width={40}
              height={35}
              borderRadius={4}
              borderWidth={0}
              textAlign={'right'}
              accessibilityLabel="请选择"
              placeholder="请选择"
              _selectedItem={{
                endIcon: <CheckIcon size="5" />,
              }}
              onValueChange={itemValue => {
                setService(itemValue);
                runUpdate({grade: itemValue});
              }}>
              {grades &&
                grades.map((item, index) => {
                  return (
                    <Select.Item
                      key={item.code}
                      label={item.name}
                      value={item.code}
                    />
                  );
                })}
            </Select>
          </View>
          <Pressable
            onPress={() => props.navigation.navigate('Label', {labelList})}>
            <View style={styles.itemView}>
              <Text>个性标签</Text>
              <View
                style={{
                  justifyContent: 'flex-end',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text style={{color: '#919191', marginRight: 4}}>修改</Text>
                <IconNew name="right" size={16} color="#919191" />
              </View>
            </View>
            <View style={styles.labelContain}>
              {labelList &&
                labelList.map((item, index) => {
                  return (
                    <View key={index} style={styles.labelView}>
                      <Text style={styles.labelText}>{item.labelName}</Text>
                    </View>
                  );
                })}
            </View>
          </Pressable>
          <Pressable
            onPress={() => props.navigation.navigate('About')}
            style={styles.itemView}>
            <Text>关于</Text>
            <View
              style={{
                justifyContent: 'flex-end',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <IconNew name="right" size={16} color="#919191" />
            </View>
          </Pressable>
          <Pressable
            onPress={() => {
              setCancelFlag(true);
              onOpen();
            }}
            style={styles.itemView}>
            <Text>注销账号</Text>
            <View
              style={{
                justifyContent: 'flex-end',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <IconNew name="right" size={16} color="#919191" />
            </View>
          </Pressable>
          <Pressable
            onPress={() => {
              setCancelFlag(false);
              onOpen();
            }}
            style={styles.itemView}>
            <Text>退出登录</Text>
            <View
              style={{
                justifyContent: 'flex-end',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <IconNew name="right" size={16} color="#919191" />
            </View>
          </Pressable>
        </View>
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default Setting;

const styles = StyleSheet.create({
  userInfoContain: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  itemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  userInfo_item_text: {
    fontSize: 14,
    color: '#111118',
  },
  labelContain: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: '5%',
  },
  labelView: {
    borderColor: '#8861FF',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderWidth: 1,
    borderRadius: 6,
    backgroundColor: '#F0ECFF',
    margin: 4,
  },
  labelText: {
    color: '#8861FF',
    fontSize: 14,
  },
  btnView: {
    width: layout.width - 60,
    marginLeft: 15,
    marginTop: 20,
    height: 50,
    backgroundColor: '#D988FF',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '40%',
  },
  btnTextView: {
    color: '#fff',
    fontSize: 16,
  },
});
