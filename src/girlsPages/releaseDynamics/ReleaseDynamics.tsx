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
import {
  Box,
  Text,
  Center,
  Pressable,
  View,
  HStack,
  Actionsheet,
  useDisclose,
} from 'native-base';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/AntDesign';
import IconNew from 'react-native-vector-icons/FontAwesome';
import CFastImage from '../../components/CFastImage';
import LinearGradient from 'react-native-linear-gradient';
import {openPicker} from '../../util/openPicker';
import {openCamera} from '../../util/cameraPhoto';
import {upload} from '../../util/newUploadOSS';
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
  const {isOpen, onOpen, onClose} = useDisclose();

  useEffect(() => {
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
      onClose();
    } catch (err) {
      console.log('--err--', err);
    }
  };

  const checkSubmit = () => {
    try {
      if (list && list.length) {
        const filterUploadFiles = list.filter(
          item => item.substr(0, 3) !== 'img',
        );
        setLoading(true);
        if (filterUploadFiles.length > 0) {
          uploadDynamic(filterUploadFiles);
        }
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
        upload({path: item})
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

  const cameraPhoto = async () => {
    try {
      const {path} = await openCamera();
      list.push(path);
      setList(JSON.parse(JSON.stringify(list)));
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box flex={1}>
      <StatusBar backgroundColor="transparent" translucent />
      <Actionsheet hideDragIndicator isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Actionsheet.Item
            onPress={() => cameraPhoto()}
            justifyContent={'center'}>
            拍照
          </Actionsheet.Item>
          <Actionsheet.Item
            onPress={() => chooseImg()}
            justifyContent={'center'}>
            从相册选择
          </Actionsheet.Item>
        </Actionsheet.Content>
        <Actionsheet.Footer
          mt={2}
          borderRadius={0}
          style={{
            paddingBottom: insets.bottom,
          }}>
          <Actionsheet.Item onPress={() => onClose()} justifyContent={'center'}>
            取消
          </Actionsheet.Item>
        </Actionsheet.Footer>
      </Actionsheet>
      <Box justifyContent="center" style={styles.banner}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          colors={['#D988FF', '#8B5CFF']}>
          <HStack
            h={20}
            alignItems={'center'}
            justifyContent={'center'}
            style={{paddingTop: insets.top}}>
            <Text fontSize={'md'} fontWeight="bold" color={'#fff'}>
              发布动态
            </Text>
            <Text
              onPress={() => {
                checkSubmit();
              }}
              fontWeight={'bold'}
              color={'#fff'}
              fontSize="sm"
              lineHeight={16}
              style={{
                position: 'absolute',
                top: 50,
                right: 16,
              }}>
              发送
            </Text>
          </HStack>
        </LinearGradient>
      </Box>
      <Modal animationType="fade" transparent visible={loading}>
        <View style={styles.toastViewer}>
          <View style={styles.iconView}>
            <ActivityIndicator size="large" color={'#fff'} />
          </View>
          <Text style={styles.toastText}>正在上传...</Text>
        </View>
      </Modal>
      <Box my={0} px={4} py={4} bg="white">
        <TextInput
          style={{
            minHeight: 100,
            textAlignVertical: 'top',
            paddingBottom: 20,
            paddingTop: 0,
            marginBottom: 20,
          }}
          multiline={true}
          onChangeText={text => setTextAreaValue(text)}
          value={textAreaValue}
          placeholder="记录生活，分享给懂你的人"
        />
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
                      const newData = [...list];
                      newData.splice(index, 1);
                      setList(JSON.parse(JSON.stringify(newData)));
                    }}>
                    <Icon name="closecircle" size={14} color="#B2B2B2" />
                  </Pressable>
                </View>
              );
            })}
          {/* <Pressable
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
          </Pressable> */}
        </View>
        <Pressable
          onPress={() => {
            // chooseImg();
            onOpen();
          }}
          style={styles.addImg}>
          <IconNew name="image" size={20} color="#B2B2B2" />
          <Text style={{marginLeft: 4, fontSize: 14}}>拍照/添加图片</Text>
        </Pressable>
      </Box>
    </Box>
  );
};
export default Index;

const styles = StyleSheet.create({
  banner: {
    ...Platform.select({
      ios: {
        // paddingTop: 28 + 40,
      },
      android: {
        // paddingTop: layout.STATUSBAR_HEIGHT + 0,
      },
    }),
  },
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
  addImg: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
