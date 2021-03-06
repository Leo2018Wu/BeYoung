import React, {useEffect, useState} from 'react';
import {StyleSheet, Image, ActivityIndicator} from 'react-native';
import {Box, Text, Pressable, View, Modal, ScrollView} from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import CFastImage from '../../../components/CFastImage';
import FastImage from 'react-native-fast-image';
import {openPicker} from '../../../util/openPicker';
import {upload} from '../../../util/newUploadOSS';
import {
  fetchCase,
  fetchAddMedia,
  fetchDelMedia,
  fetchMyMedia,
} from '../../../api/photoSelect';
import useRequest from '../../../hooks/useRequest';
import {BASE_DOWN_URL} from '../../../util/config';

import PhotoModal from './photoModal';
interface ItemProps {
  url: string;
}

const Index = ({...props}) => {
  const {item, caseImgList} = props.route.params;
  const [list, setList] = useState([]); // 照片列表
  const [loading, setLoading] = useState(false);
  const [lookOpintion, setLookOpintion] = useState(false);
  const {run: runAddMedia} = useRequest(fetchAddMedia.url);
  const {run: runFetchCase, result} = useRequest(fetchCase.url);
  const {run: runFetchDelMedia} = useRequest(fetchDelMedia.url); // 删除媒体信息
  const [caseList, setCaseList] = useState([]); // 案例列表
  const {run: runFetchMyMedia} = useRequest(fetchMyMedia.url); // 获取我的媒体信息

  useEffect(() => {
    runFetchCase({scene: item.code});
    if (caseImgList.length) {
      setList(caseImgList);
    }
    getMyMedia();
  }, []);

  useEffect(() => {
    if (result) {
      if (result.length && result[0].imgs) {
        const temp = JSON.parse(result[0].imgs);
        setCaseList(JSON.parse(JSON.stringify(temp)));
      }
    }
  }, [result]);

  const getMyMedia = async () => {
    const {data} = await runFetchMyMedia({
      mediaType: 'MEDIA_TYPE_IMAGE',
      scene: item.code,
    });
    setList(data);
  };

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
          mediaType: 'MEDIA_TYPE_IMAGE',
          name: '',
          scene: item.code,
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
        uploadPhoto(filterUploadFiles, imgList);
      }
    } catch (err) {}
  };

  const uploadPhoto = async (files, imgList) => {
    multiUpload(files).then(async res => {
      const {data, success} = await runAddMedia({
        userId: null,
        medias: res,
      });
      if (success) {
        getMyMedia();
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
              mediaType: 'MEDIA_TYPE_IMAGE',
              name: '',
              scene: item.code,
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
    const imgUrls = list.map((ele: ItemProps) => {
      const temp = {url: `${BASE_DOWN_URL + ele.url}`};
      return temp;
    });
    props.navigation.navigate('Preview', {index, imgUrls});
  };

  return (
    <Box flex={1} bg="white">
      <ScrollView>
        {loading ? <PhotoModal /> : null}

        <Box px={4} py={4}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={styles.title}>我的{item.name}照片</Text>
          </View>
          <View
            style={{flexDirection: 'row', flexWrap: 'wrap', marginBottom: 30}}>
            {list &&
              list.map((item1: ItemProps, index: number) => {
                return (
                  <View style={{marginTop: 10}} key={index}>
                    <Modal
                      isOpen={lookOpintion}
                      onClose={() => setLookOpintion(false)}>
                      <Modal.Content>
                        <Modal.Header>审核未通过原因</Modal.Header>
                        <Modal.Body>
                          <Text>{item1.auditOpinion}</Text>
                        </Modal.Body>
                      </Modal.Content>
                    </Modal>
                    <View style={{flexDirection: 'row'}}>
                      <Pressable onPress={() => preview(index)}>
                        <CFastImage
                          url={item1.url}
                          styles={{
                            width: 100,
                            height: 100,
                            marginTop: 10,
                            marginRight: 12,
                            marginBottom: 8,
                          }}
                        />
                      </Pressable>
                      <Pressable
                        style={{
                          width: 20,
                          height: 20,
                          position: 'absolute',
                          right: 2,
                          top: 0,
                        }}
                        onPress={() => {
                          const newData = [...list];
                          newData.splice(index, 1);
                          setList(JSON.parse(JSON.stringify(newData)));
                          delMedia(item1.id);
                        }}>
                        <Icon name="closecircle" size={18} color="#B2B2B2" />
                      </Pressable>
                    </View>
                    {item1.auditStatus === 'AUDIT_STATUS_DENY' && (
                      <Pressable
                        onPress={() => setLookOpintion(true)}
                        style={{marginLeft: 10}}>
                        <Text color={'#F94B4B'}>审核未通过</Text>
                      </Pressable>
                    )}
                  </View>
                );
              })}
            <Pressable
              onPress={() => {
                chooseImg();
              }}
              style={styles.img_item}>
              <Image
                source={require('../../assets/album_add_icon.png')}
                style={{
                  width: 100,
                  height: 100,
                }}
                resizeMode="cover"
              />
            </Pressable>
          </View>
          {caseList && caseList.length ? (
            <View>
              <Text style={styles.title}>参考案例</Text>
              <View
                style={{
                  justifyContent: 'center',
                  flex: 1,
                  marginTop: 10,
                }}>
                {caseList &&
                  caseList.map((item1, index) => (
                    <FastImage
                      style={{
                        height: 450,
                      }}
                      source={{
                        uri: `${BASE_DOWN_URL + item1}`,
                        headers: {Authorization: 'someAuthToken'},
                        priority: FastImage.priority.normal,
                      }}
                      resizeMode={FastImage.resizeMode.contain}
                      key={item1.id}
                    />
                  ))}
              </View>
            </View>
          ) : null}
        </Box>
      </ScrollView>
    </Box>
  );
};
export default Index;

const styles = StyleSheet.create({
  img_item: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    marginBottom: 8,
    marginTop: 20,
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
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
