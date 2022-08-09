import React, {useEffect, useState} from 'react';
import {StyleSheet, Image} from 'react-native';
import {Box, Pressable, View} from 'native-base';
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
import PhotoModal from '../mine/photoSelect/photoModal';
import Layout from '../../components/Layout';
import {BASE_DOWN_URL} from '../../util/config';

const Index = ({...props}) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const {run: runAddMedia} = useRequest(fetchAddMedia.url);
  const {run: runFetchMyMedia, result} = useRequest(fetchMyMedia.url); // 获取我的媒体信息
  const {run: runFetchDelMedia} = useRequest(fetchDelMedia.url); // 删除媒体信息

  useEffect(() => {
    runFetchMyMedia({
      mediaType: 'MEDIA_TYPE_EMOGI', //媒体类型
      pageNum: 1,
      pageSize: 100,
      orders: [
        {
          column: 'createTime',
          dir: 'desc',
          chinese: false,
        },
      ],
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
      const images = await openPicker(99 - list.length);
      const currentLength = images.length + list.length;
      if (currentLength > 99) {
        images.length = 99 - list.length;
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
          pageNum: 1,
          pageSize: 100,
          orders: [
            {
              column: 'createTime',
              dir: 'desc',
              chinese: false,
            },
          ],
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

  const preview = (index: number) => {
    const imgUrls = list.map((img: string) => {
      const temp = {url: `${BASE_DOWN_URL + img.url}`};
      return temp;
    });
    props.navigation.navigate('Preview', {index, imgUrls});
  };

  return (
    <Box flex={1} bg="white">
      {loading ? <PhotoModal /> : null}
      <Box px={2} py={4}>
        <View
          style={{flexDirection: 'row', flexWrap: 'wrap', marginBottom: 30}}>
          {list &&
            list.map((item, index) => {
              return (
                <View style={{flexDirection: 'row'}}>
                  <Pressable onPress={() => preview(index)}>
                    <CFastImage
                      url={item.url}
                      styles={{
                        width: (Layout.width - 100) / 4,
                        height: (Layout.width - 100) / 4,
                        margin: 10,
                      }}
                    />
                  </Pressable>
                  <Pressable
                    style={{
                      width: 14,
                      height: 14,
                      position: 'absolute',
                      right: 2,
                      top: 2,
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
                width: (Layout.width - 100) / 4,
                height: (Layout.width - 100) / 4,
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
    width: (Layout.width - 100) / 4,
    height: (Layout.width - 100) / 4,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
});
