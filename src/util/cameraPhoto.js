import ImagePicker from 'react-native-image-crop-picker';
import {Alert, Linking, Platform} from 'react-native';
import {check, PERMISSIONS} from 'react-native-permissions';

const checkPermission = async type => {
  const granted = await check(type);
  return granted;
};

export const openPicker = async (options = {}) => {
  const {maxLength = 9, multiple = false} = options;
  let granted;
  if (Platform.OS === 'ios') {
    granted = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);
  }
  if (granted === 'blocked') {
    Alert.alert('相册权限', '相册权限已禁用，是否要去打开权限', [
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
  } else {
    const data = await ImagePicker.openPicker({
      compressImageQuality: 0.8,
      multiple,
      maxFiles: maxLength,
      mediaType: 'photo',
      compressImageMaxHeight: 1920,
      compressImageMaxWidth: 800,
    });
    return data;
  }
};

export const openCamera = async () => {
  let granted;
  if (Platform.OS === 'ios') {
    granted = await checkPermission(PERMISSIONS.IOS.CAMERA);
  }
  if (granted === 'blocked') {
    Alert.alert('相机权限', '相机权限已禁用，是否要去打开权限', [
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
  } else {
    const data = await ImagePicker.openCamera({
      width: 400,
      height: 400,
      compressImageQuality: 0.5,
      compressImageMaxHeight: 1920,
      compressImageMaxWidth: 800,
      mediaType: 'photo',
    });
    return data;
  }
};
