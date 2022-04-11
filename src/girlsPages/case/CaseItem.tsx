import React, {useState} from 'react';
import {Pressable, StyleSheet, ImageBackground} from 'react-native';
import {View, Text, Image} from 'native-base';
import {useNavigation} from '@react-navigation/native';

import layout from '../common/Layout';

const Login = () => {
  const navigation = useNavigation();
  return (
    <Pressable>
      <ImageBackground
        source={require('../assets/IMG_2729.png')}
        borderRadius={4}
        style={styles.banner}
        resizeMode="cover">
        <View style={styles.optContain}>
          <View style={styles.optView}>
            <Image
              source={require('../assets/follow.png')}
              style={{
                width: 17,
                height: 16,
                marginRight: 3,
              }}
              alt="dairy"
            />
            <Text style={styles.optSize}>71k</Text>
          </View>
          <View style={styles.optView}>
            <Image
              source={require('../assets/home_message.png')}
              style={{
                width: 17,
                height: 16,
                marginRight: 3,
              }}
              alt="dairy"
            />
            <Text style={styles.optSize}>71k</Text>
          </View>
          <View style={styles.optView}>
            <Image
              source={require('../assets/gift.png')}
              style={{
                width: 17,
                height: 16,
                marginRight: 3,
              }}
              alt="dairy"
            />
            <Text style={styles.optSize}>71k</Text>
          </View>
        </View>
      </ImageBackground>
    </Pressable>
  );
};

export default Login;

const styles = StyleSheet.create({
  optContain: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 6,
    width: '100%',
    paddingHorizontal: 10,
  },
  optView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optSize: {
    color: '#C7C4CC',
    fontSize: 9,
  },
  banner: {
    width: (layout.width - 26) / 2,
    height: 210,
    position: 'relative',
    justifyContent: 'center',
    marginBottom: 8,
  },
});
