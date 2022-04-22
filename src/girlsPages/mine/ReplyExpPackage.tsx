import React, {useEffect, useState} from 'react';
import {StyleSheet, Image, Modal, ActivityIndicator} from 'react-native';
import {Box, Text, Pressable, View} from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import CFastImage from '../../components/CFastImage';
import {openPicker} from '../../util/openPicker';
import {upload} from '../../util/newUploadOSS';
import useRequest from '../../hooks/useRequest';
import {
  fetchMyMedia,
  fetchAddMedia,
  fetchDelMedia,
} from '../../api/photoSelect';

const Index = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const {run: runAddMedia} = useRequest(fetchAddMedia.url);
  const {run: runFetchMyMedia, result} = useRequest(fetchMyMedia.url); // 获取我的媒体信息
  const {run: runFetchDelMedia} = useRequest(fetchDelMedia.url); // 删除媒体信息

  useEffect(() => {
    runFetchMyMedia({
      mediaType: 'MEDIA_TYPE_EMOGI', //媒体类型
    });
  }, []);

  useEffect(() => {
    if (result) {
      if (result.length) {
        setList(result);
      }
    }
  }, [result]);

  const chooseImg = async () => {
    try {
      const images = await openPicker(9 - list.length);
      const currentLength = images.length + list.length;
      if (currentLength > 9) {
        images.length = 9 - list.length;
      }
      let arr = [];
      images.forEach((item1): any => {
        let par = {
          mediaType: 'MEDIA_TYPE_EMOGI',
          name: '',
          scene: null,
          url: item1.path,
        };
        arr.push(par);
      });
      checkSubmit(list.concat(arr));
      setList(JSON.parse(JSON.stringify(list.concat(arr))));
    } catch (err) {
      console.log('--err--', err);
    }
  };

  const checkSubmit = imgList => {
    try {
      const filterUploadFiles = imgList.filter(
        item1 => item1.url.substr(0, 3) !== 'img',
      );
      setLoading(true);
      if (filterUploadFiles.length > 0) {
        uploadPackage(filterUploadFiles, imgList);
      }
    } catch (err) {}
  };

  const uploadPackage = files => {
    multiUpload(files).then(async res => {
      const {data, success} = await runAddMedia({
        userId: null,
        medias: res,
      });
      if (success) {
        runFetchMyMedia({
          mediaType: 'MEDIA_TYPE_EMOGI', //媒体类型
        });
        setLoading(false);
      }
    });
  };

  const multiUpload = files => {
    if (files.length <= 0) {
      return Promise.resolve([]);
    }
    return new Promise((reslove, reject) => {
      let arr = [];
      files.forEach((item1, index) => {
        upload({path: item1.url})
          .then(res => {
            let par = {
              mediaType: 'MEDIA_TYPE_EMOGI',
              name: '',
              scene: null,
              url: res,
            };
            arr.push(par);
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

  const delMedia = async mediaId => {
    let mediaIds = [];
    mediaIds.push(mediaId);
    await runFetchDelMedia({
      mediaIds: mediaIds,
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
                    url={item.url}
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
                      delMedia(item.id);
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
});
