import ImagePicker from 'react-native-image-crop-picker';
import {Alert, Linking, Platform} from 'react-native';
import {check, PERMISSIONS} from 'react-native-permissions';

const openPicker = async (maxFiles = 9, multiple = true) => {
  let granted;
  if (Platform.OS === 'ios') {
    granted = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);
    console.log('granted', granted);
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
      maxFiles,
      mediaType: 'photo',
      compressImageMaxHeight: 1920,
      compressImageMaxWidth: 800,
    });
    return data;
  }
};

module.exports = {
  openPicker,
};
