import React, {useState, useEffect} from 'react';
import {Pressable, StyleSheet, ImageBackground} from 'react-native';
import {View, Text} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {fetchCase} from '../../../api/photoSelect';
import useRequest from '../../../hooks/useRequest';
import CFastImage from '../../../components/CFastImage';

import layout from '../../../components/Layout';

const Login = ({...props}) => {
  const {item} = props;
  console.log(item);

  // const {run: runFetchCase, result} = useRequest(fetchCase.url);
  // const [caseList, setCaseList] = useState([]);

  // useEffect(() => {
  //   runFetchCase({scene: item.code});
  // }, []);

  // useEffect(() => {
  //   if (result && result.length) {
  //     if (result[0].imgs) {
  //       const data = JSON.parse(result[0].imgs);
  //       console.log('---result---', data[0]);
  //     }
  //   }
  // }, [result]);

  const navigation = useNavigation();
  return (
    <Pressable onPress={() => navigation.navigate('PhotoUpload', {item: item})}>
      <View>
        {/* <CFastImage
          url={caseList[0] || ''}
          styles={{
            width: (layout.width - 26) / 2,
            height: 210,
          }}
        /> */}
      </View>
      <ImageBackground
        source={require('../../assets/IMG_2728.png')}
        borderRadius={15}
        style={styles.banner}
        resizeMode="cover">
        <View style={styles.topView}>
          <Text fontSize={'xs'} color={'#fff'} style={{textAlign: 'center'}}>
            {item.name}
          </Text>
        </View>
        <View style={styles.bottomView}>
          <Text fontSize={'sm'} color={'#fff'}>
            示例
          </Text>
        </View>
      </ImageBackground>
      <View style={{width: 100}}>
        <Text fontSize={'xs'}>完成此类别照片</Text>
        <Text fontSize={'xs'}>可获得10元红包</Text>
      </View>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#D988FF', '#8B5CFF']}
        style={styles.linearGradient}>
        <Text style={styles.buttonText}>添加照片</Text>
      </LinearGradient>
    </Pressable>
  );
};

export default Login;

const styles = StyleSheet.create({
  topView: {
    backgroundColor: '#11111840',
    position: 'absolute',
    top: 0,
    width: '100%',
    paddingHorizontal: 10,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  bottomView: {
    backgroundColor: '#11111840',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: 10,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  banner: {
    width: 158,
    height: 158,
    position: 'relative',
    marginBottom: 8,
  },
  linearGradient: {
    width: 70,
    marginTop: 10,
    height: 26,
    borderRadius: 24,
    marginBottom: 20,
  },
  buttonText: {
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    height: 26,
    lineHeight: 26,
    color: '#ffffff',
    fontSize: 10,
    backgroundColor: 'transparent',
  },
});
