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
} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import IconNew from 'react-native-vector-icons/AntDesign';
import {useFocusEffect} from '@react-navigation/native';
import useRequest from '../../hooks/useRequest';
import {fetchMyInfo} from '../../api/common';
import CFastImage from '../../components/CFastImage';

import layout from '../../components/Layout';

const Setting = ({...props}) => {
  const [service, setService] = useState('');
  const [list, setList] = useState([
    {id: 0},
    {id: 1},
    {id: 2},
    {id: 3},
    {id: 4},
  ]);

  const {result, run} = useRequest(fetchMyInfo.url);

  useFocusEffect(
    useCallback(() => {
      run();
    }, []),
  );

  useEffect(() => {
    if (result) {
      AsyncStorage.setItem('USERINFO', JSON.stringify(result));
    }
  }, [result]);

  const editUser = (type, value) => {
    props.navigation.navigate('EditUser', {
      type: type,
      value: value,
    });
  };

  return (
    <NativeBaseProvider>
      <ScrollView style={styles.userInfoContain}>
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
        <Pressable
          onPress={() => editUser('姓名', result?.name)}
          style={styles.itemView}>
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
        <Pressable
          onPress={() => editUser('身份证号', result?.cardNum)}
          style={styles.itemView}>
          <Text>身份证号</Text>
          <View
            style={{
              justifyContent: 'flex-end',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={{color: '#919191', marginRight: 4}}>
              {result?.cardNum || '请设置身份证号'}
            </Text>
            <IconNew name="right" size={16} color="#919191" />
          </View>
        </Pressable>
        <View style={styles.itemView}>
          <Text>手机号</Text>
          <View
            style={{
              justifyContent: 'flex-end',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={{color: '#919191', marginRight: 4}}>
              {result?.phone}
            </Text>
            {/* <IconNew name="right" size={16} color="#919191" /> */}
          </View>
        </View>
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
              {result?.weChat || '请设置微信号'}
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
              {result?.qq || '请设置QQ号'}
            </Text>
            <IconNew name="right" size={16} color="#919191" />
          </View>
        </Pressable>
        <View style={styles.itemView}>
          <Text>年纪</Text>
          <Select
            selectedValue={service}
            width={40}
            height={35}
            borderRadius={4}
            borderWidth={0}
            textAlign={'right'}
            accessibilityLabel="大一"
            placeholder="大一"
            _selectedItem={{
              endIcon: <CheckIcon size="5" />,
            }}
            onValueChange={itemValue => setService(itemValue)}>
            <Select.Item label="大一" value="ux" />
            <Select.Item label="大二" value="web" />
            <Select.Item label="大三" value="cross" />
          </Select>
        </View>
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
          {list &&
            list.map((item, index) => {
              return (
                <View style={styles.labelView}>
                  <Text style={styles.labelText}>话题王者</Text>
                </View>
              );
            })}
        </View>
        <View style={styles.itemView}>
          <Text>爱好</Text>
          <View
            style={{
              justifyContent: 'flex-end',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={{color: '#919191', marginRight: 4}}>
              No surprise原则
            </Text>
            <IconNew name="right" size={16} color="#919191" />
          </View>
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
