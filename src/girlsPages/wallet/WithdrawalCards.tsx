import React, {useState} from 'react';
import {Text, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import layout from '../../components/Layout';

const Index = () => {
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={['#D988FF', '#8B5CFF']}
      style={styles.linearGradient}>
      <Text style={styles.buttonText}>添加账号</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    width: layout.width - 60,
    marginLeft: 30,
    marginTop: 20,
    height: 50,
    borderRadius: 28,
    marginBottom: '5%',
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
});

export default Index;
