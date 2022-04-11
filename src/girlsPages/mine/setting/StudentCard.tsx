import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Image,
  Pressable,
  TouchableOpacity,
  Platform,
  DeviceEventEmitter,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import layout from '../../common/Layout';
import {upload} from '../../../util/upload';
import FillModal from '../../common/ChooseImgModal';
import fetchData from '../../../util/request';
import {updateUserInfo, fetchMyInfo} from '../../../api/common';
import useRequest from '../../../hooks/useRequest';
import {BASE_DOWN_URL} from '../../../util/config';
import IconNew from 'react-native-vector-icons/AntDesign';

export default function name({navigation, route}) {
  const [showFillModal, setShowModal] = useState(false); //学生证选择弹窗显示状态
  const [studentCard, setStudentCard] = useState();
  const {run: runUpdateUserInfo, result} = useRequest(updateUserInfo.url);
  const [flag, setFlag] = useState(true);

  useEffect(() => {
    if (result) {
      console.log('-----s-s--s', result);
      setFlag(false);
      getMyInfo();
    }
  }, [result]);

  const loginForm = () => {
    upload(studentCard)
      .then(res => {
        runUpdateUserInfo({
          studentCard: res,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  const getMyInfo = async () => {
    const {data, success} = await fetchData('cgi/core/user/fetchMyInfo', {});
    if (success) {
      AsyncStorage.setItem('USERINFO', JSON.stringify(data));
    }
  };

  return (
    <View style={{flex: 1}}>
      <FillModal
        visible={showFillModal}
        hideModal={() => setShowModal(false)}
        imgCb={value => {
          setStudentCard(value);
        }}
      />
      <ImageBackground
        source={require('../../assets/mineBg.png')}
        style={styles.banner}
      />
      <View style={styles.container}>
        <Text style={styles.studentText}>示例</Text>
        <Image
          source={require('../../assets/studentsCode.png')}
          style={styles.list__item_img}
        />
        <Pressable
          onPress={() => {
            setShowModal(true);
          }}>
          <Text style={styles.studentText}>上传</Text>
          {studentCard ? (
            <Image source={{uri: studentCard}} style={styles.list__item_img} />
          ) : (
            <Image
              source={require('../../assets/studentsCode1.png')}
              style={styles.list__item_img}
            />
          )}
        </Pressable>
      </View>

      {flag ? (
        <TouchableOpacity
          onPress={() => {
            loginForm();
          }}
          style={[
            styles.loginBtn,
            studentCard ? styles.loginBtnScs : styles.loginBtnDef,
          ]}>
          <Text style={{fontSize: 18, color: '#fff'}}>上传</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    width: layout.width,
    height: 200,
    ...Platform.select({
      ios: {
        paddingTop: 28 + 40,
      },
      android: {
        paddingTop: layout.STATUSBAR_HEIGHT + 40,
      },
    }),
    position: 'relative',
    justifyContent: 'center',
  },
  container: {
    width: layout.width - 32,
    position: 'absolute',
    top: 30,
    left: 16,
    minHeight: 500,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  studentText: {
    color: '#9F9F9F',
    fontSize: 14,
  },
  list__item_img: {
    width: '100%',
    height: 183,
    borderRadius: 10,
    marginVertical: 10,
  },
  loginBtn: {
    position: 'absolute',
    bottom: 20,
    width: layout.width - 40,
    left: 20,
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginBtnScs: {
    backgroundColor: '#F77B85',
  },
  loginBtnDef: {
    backgroundColor: '#DDDDDD',
  },
});
