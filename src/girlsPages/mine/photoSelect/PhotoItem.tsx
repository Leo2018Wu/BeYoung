import React, {useState} from 'react';
import {Pressable, StyleSheet, ImageBackground} from 'react-native';
import {View, Text, Image} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

import layout from '../../../components/Layout';

const Login = () => {
  const navigation = useNavigation();
  return (
    <Pressable>
      <ImageBackground
        source={require('../../assets/IMG_2728.png')}
        borderRadius={15}
        style={styles.banner}
        resizeMode="cover">
        <View style={styles.topView}>
          <Text fontSize={'xs'} color={'#fff'} style={{textAlign: 'center'}}>
            教学楼
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
    justifyContent: 'center',
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
