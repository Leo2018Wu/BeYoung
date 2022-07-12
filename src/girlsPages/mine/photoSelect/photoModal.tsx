import React from 'react';
import {Modal, StyleSheet, ActivityIndicator} from 'react-native';
import {Text, View} from 'native-base';

const Index = () => {
  return (
    <Modal animationType="fade" transparent visible={true}>
      <View style={styles.toastViewer}>
        <View style={styles.iconView}>
          <ActivityIndicator size="large" color={'#fff'} />
        </View>
        <Text style={styles.toastText}>正在上传...</Text>
      </View>
    </Modal>
  );
};

export default Index;

const styles = StyleSheet.create({
  toastViewer: {
    width: 120,
    minHeight: 120,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -60,
    marginTop: -60,
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
    color: '#fff',
    fontSize: 14,
  },
});
