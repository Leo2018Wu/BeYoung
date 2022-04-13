import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  TextInput,
  Image,
  Modal,
  StatusBar,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {Box, Text, Center, Pressable, View} from 'native-base';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/AntDesign';
import CFastImage from '../../components/CFastImage';
import LinearGradient from 'react-native-linear-gradient';
import {openPicker} from '../../util/openPicker';
import {upload} from '../../util/upload';
import {addDynamic} from '../../api/daily';
import useRequest from '../../hooks/useRequest';

import layout from '../../components/Layout';

const Index = (props: any) => {
  const {navigation} = props;
  const insets = useSafeAreaInsets();
  const [textAreaValue, setTextAreaValue] = useState('');
  const [list, setList] = useState([]);
  const {run: runAddDynamic, result} = useRequest(addDynamic.url);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('result', result);
    if (result) {
      setLoading(false);
      setTextAreaValue('');
      setList([]);
      navigation.navigate('Home');
    }
  }, [result]);

  const chooseImg = async () => {
    try {
      const images = await openPicker(9 - list.length);
      const currentLength = images.length + list.length;
      if (currentLength > 9) {
        images.length = 9 - list.length;
      }
      images.forEach((item): any => {
        list.push(item.path);
      });
      setList(JSON.parse(JSON.stringify(list)));
      console.log('--list--', list);
    } catch (err) {
      console.log('--err--', err);
    }
  };

  const checkSubmit = () => {
    try {
      const filterUploadFiles = list.filter(
        item => item.substr(0, 3) !== 'img',
      );
      setLoading(true);
      if (filterUploadFiles.length > 0) {
        uploadDynamic(filterUploadFiles);
      } else {
        runAddDynamic({
          content: textAreaValue,
        });
      }
    } catch (err) {}
  };

  const uploadDynamic = files => {
    multiUpload(files).then(res => {
      const filterFiles = list.filter(item => item.substr(0, 3) === 'img');
      let arr = filterFiles.concat(res);
      runAddDynamic({
        content: textAreaValue,
        images: arr,
      });
    });
  };

  const multiUpload = files => {
    if (files.length <= 0) {
      return Promise.resolve([]);
    }
    return new Promise((reslove, reject) => {
      let arr = [];
      files.forEach((item, index) => {
        upload(item)
          .then(res => {
            arr.push(res);
            if (arr.length == files.length) {
              reslove(arr);
            }
          })
          .catch(() => {
            reject(new Errow('上传失败'));
          });
      });
    });
  };

  return (
    <Box flex={1} bg="white">
      <Modal animationType="fade" transparent visible={loading}>
        <View style={styles.toastViewer}>
          <View style={styles.iconView}>
            <ActivityIndicator size="large" color={'#fff'} />
          </View>
          <Text style={styles.toastText}>正在上传...</Text>
        </View>
      </Modal>
      <Box px={4} py={4}>
        <View
          style={{flexDirection: 'row', flexWrap: 'wrap', marginBottom: 30}}>
          {list &&
            list.map((item, index) => {
              return (
                <View style={{flexDirection: 'row'}}>
                  <CFastImage
                    url={item}
                    styles={{
                      width: 60,
                      height: 60,
                      margin: 8,
                    }}
                  />
                  <Pressable
                    style={{
                      width: 14,
                      height: 14,
                      position: 'absolute',
                      right: 0,
                      top: 0,
                    }}
                    onPress={() => {
                      if (index != 0) {
                        setList(list.splice(index, 1));
                      } else {
                        setList([]);
                      }
                    }}>
                    <Icon name="closecircle" size={14} color="#B2B2B2" />
                  </Pressable>
                </View>
              );
            })}
          <Pressable
            onPress={() => {
              chooseImg();
            }}
            style={styles.img_item}>
            <Image
              source={require('../assets/album_add_icon.png')}
              style={{
                width: 60,
                height: 60,
              }}
              resizeMode="cover"
            />
          </Pressable>
        </View>
      </Box>
      {/* <Box> */}
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#D988FF', '#8B5CFF']}
        style={styles.linearGradient}>
        <Text style={styles.buttonText}>保存</Text>
      </LinearGradient>
      {/* </Box> */}
    </Box>
  );
};
export default Index;

const styles = StyleSheet.create({
  img_item: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
  },
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
  linearGradient: {
    position: 'absolute',
    bottom: 10,
    width: '90%',
    marginLeft: '5%',
    marginVertical: 20,
    borderRadius: 28,
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
