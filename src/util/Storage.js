import AsyncStorage from '@react-native-community/async-storage';

const getStorage = async params => {
  let values;
  try {
    if (params.length === 1) {
      values = await AsyncStorage.getItem(params[0]);
    } else {
      values = await AsyncStorage.multiGet(params);
    }
  } catch (e) {
    // read error
    console.log('getStorage Fail', e);
  }
  return values;
};

export default getStorage;
