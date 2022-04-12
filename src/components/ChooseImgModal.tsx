import React from 'react';

import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  Platform,
  Alert,
  Linking,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {check, PERMISSIONS} from 'react-native-permissions';

import Layout from './Layout';

export default function Index({hideModal, imgCb, visible}) {
  const checkPermission = async type => {
    const granted = await check(type);
    console.log('granted', granted);
    return granted;
  };

  const showAlert = permissionName => {
    Alert.alert(permissionName, `${permissionName}已禁用，是否要去打开权限`, [
      {
        text: '取消',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: '确定',
        onPress: () => Linking.openURL('app-settings:'),
        style: 'destructive',
      },
    ]);
  };

  const openCamera = async () => {
    let granted;
    if (Platform.OS === 'ios') {
      granted = await checkPermission(PERMISSIONS.IOS.CAMERA);
    }
    if (granted === 'blocked') {
      showAlert('相机权限');
    } else {
      ImagePicker.openCamera({
        width: 400,
        height: 400,
        compressImageQuality: 0.5,
        compressImageMaxHeight: 1920,
        compressImageMaxWidth: 800,
        mediaType: 'photo',
      })
        .then(image => {
          hideModal();
          imgCb(image.path);
        })
        .catch(err => {
          hideModal();
          console.log('拍照失败', err);
        });
    }
  };
  const openPicker = async () => {
    let granted;
    if (Platform.OS === 'ios') {
      granted = await checkPermission(PERMISSIONS.IOS.PHOTO_LIBRARY);
    }
    if (granted === 'blocked') {
      showAlert('相册权限');
    } else {
      ImagePicker.openPicker({
        width: 400,
        height: 400,
        compressImageQuality: 0.5,
        mediaType: 'photo',
        compressImageMaxHeight: 1920,
        compressImageMaxWidth: 800,
      })
        .then(image => {
          hideModal();
          imgCb(image.path);
        })
        .catch(err => {
          hideModal();
          console.log('选择图片失败', err);
        });
    }
  };
  return (
    <Modal
      statusBarTranslucent={true}
      transparent={true}
      visible={visible}
      animationType="fade">
      <Pressable
        onPress={() => hideModal()}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={[styles.modalItem, styles.borderItem]}
            onPress={() => openCamera()}>
            <Text style={styles.textColor}>拍照</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.modalItem, styles.radiusItem]}
            onPress={() => openPicker()}>
            <Text style={styles.textColor}>从相册选择</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.modalItem, styles.marginItem]}
            onPress={() => hideModal()}>
            <Text style={styles.textColor}>取消</Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    width: Layout.width,
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingBottom: Layout.isIphoneX ? 34 : 20,
  },
  modalItem: {
    height: 56,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textColor: {
    color: '#4C90F2',
    fontSize: 20,
  },
  borderItem: {
    borderColor: '#ddd',
    borderBottomWidth: 1,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  radiusItem: {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  marginItem: {
    marginTop: 12,
    borderRadius: 8,
  },
});
