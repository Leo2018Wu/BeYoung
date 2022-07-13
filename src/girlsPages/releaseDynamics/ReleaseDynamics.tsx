import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  TextInput,
  StatusBar,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {
  Box,
  Text,
  Pressable,
  Modal,
  View,
  HStack,
  Actionsheet,
  useDisclose,
  ScrollView,
  useToast,
} from 'native-base';
import {useFocusEffect} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/AntDesign';
import IconNew from 'react-native-vector-icons/FontAwesome';
import CFastImage from '../../components/CFastImage';
import LinearGradient from 'react-native-linear-gradient';
import {openPicker} from '../../util/openPicker';
import {openCamera} from '../../util/cameraPhoto';
import {upload} from '../../util/newUploadOSS';
import {addDynamic, fetchDynamicLabels} from '../../api/daily';
import useRequest from '../../hooks/useRequest';
import util from '../../util/util';
import {getSoftInputModule} from '../../util/getSoftInputModule';

import layout from '../../components/Layout';
import PhotoModal from '../mine/photoSelect/photoModal';

const Index = (props: any) => {
  const {navigation} = props;
  const toast = useToast();
  const insets = useSafeAreaInsets();
  const [textAreaValue, setTextAreaValue] = useState('');
  const [list, setList] = useState([]);
  const {run: runAddDynamic, result} = useRequest(addDynamic.url);
  const {run: runFetchDynamicLabels} = useRequest(fetchDynamicLabels.url);
  const [loading, setLoading] = useState(false);
  const {isOpen, onOpen, onClose} = useDisclose();
  const [labelFlag, setLabelFLag] = useState(false);
  const [tipsClassList, setTipsClassList] = useState([]);
  const [actIndex, setActIndex] = useState(0);
  const [atvedIndex, setAtvedIndex] = useState(0);
  const [labelType, setLabelType] = useState('');
  const [labelDetail, setLabelDetail] = useState('');
  const [tipsFlag, setTipsFlag] = useState(false);
  const [flag, setFlag] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      if (Platform.OS === 'android') {
        getSoftInputModule(1);
      }
    }, []),
  );

  useEffect(() => {
    if ((textAreaValue || list.length) && labelDetail) {
      setFlag(true);
    } else {
      setFlag(false);
    }
  }, [textAreaValue, list, labelDetail]);

  useEffect(() => {
    if (result) {
      setLoading(false);
      setTextAreaValue('');
      setList([]);
      setLabelType('');
      setLabelDetail('');
      navigation.navigate('Home');
    }
  }, [result]);

  const getDynamicLabels = async () => {
    const {data, success} = await runFetchDynamicLabels();
    if (success) {
      setTipsClassList(data);
      setLabelType(data[0].name);
    }
  };

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
    if (!flag) {
      return;
    }
    if (!labelDetail) {
      toast.show({
        description: '请添加标签',
        placement: 'top',
        duration: 1000,
      });
      return;
    }
    try {
      if (list && list.length) {
        const filterUploadFiles = list.filter(
          item => item.substr(0, 3) !== 'img',
        );
        setLoading(true);
        if (filterUploadFiles.length > 0) {
          uploadDynamic(filterUploadFiles);
        }
      } else if (textAreaValue) {
        runAddDynamic({
          content: textAreaValue,
          labelType: labelType,
          labelDetail: labelDetail,
        });
      } else {
        toast.show({
          description: '请输入帖子内容',
          placement: 'top',
          duration: 1000,
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
        labelType: labelType,
        labelDetail: labelDetail,
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
    <ScrollView h={'100%'} _contentContainerStyle={{flex: 1}}>
      <Box flex={1}>
        <StatusBar backgroundColor="transparent" translucent />
        <Modal
          isOpen={tipsFlag}
          onClose={() => {
            setTipsFlag(false);
          }}>
          <Modal.Content style={{width: '90%'}}>
            <Modal.Body>
              <Text
                color={'#404040'}
                fontSize={18}
                fontWeight={'bold'}
                textAlign={'center'}
                marginBottom={2}>
                学妹圈发布内容规则
              </Text>
              <Text>
                信息发布规则适用于在青回平台上发布信息的所有用户，用户需遵守该规则发布信息内容。
              </Text>
              <Text fontWeight={'bold'}>一、发布文案规则</Text>
              <Text>1.不得在文案中发布广告</Text>
              <Text>
                2.不得在文案中使用多音字、片假字、拆分字或外语等来表达黄赌毒及政治
              </Text>
              <Text>
                3.不得在文案中恶意炒作负面信息、辱骂他人及抱怨、讨论敏感社会事件
              </Text>
              <Text>
                4.不得在文案中出现个人信息微信号、QQ号、手机号及一切其他社交平台软件账号且不能以其他如英文、多音字等其他形式进行发送
              </Text>
              <Text>5.不得在文案中出现引流信息</Text>
              <Text fontWeight={'bold'}>二、发布图片规则</Text>
              <Text>1.不得在照片中发布广告</Text>
              <Text>2.不得在照片中展现其他方式的引流手段</Text>
              <Text>3.不得在照片中展示危险行为及动作</Text>
              <Text>
                4.不得在照片中展示惊悚奇葩类内容：军装、低俗奇葩服装、扮鬼吓人、血腥恐怖妆容等
              </Text>
              <Text>5.不得在照片中展示封建迷信内容（算命算卦、跳大神等）</Text>
              <Text>6.不得在照片中展现敏感或私密部位</Text>
              <Text>7.不得在照片中出现非法场景及背景</Text>
            </Modal.Body>
          </Modal.Content>
        </Modal>
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
            <Actionsheet.Item
              onPress={() => onClose()}
              justifyContent={'center'}>
              取消
            </Actionsheet.Item>
          </Actionsheet.Footer>
        </Actionsheet>
        <Actionsheet
          hideDragIndicator
          isOpen={labelFlag}
          onClose={() => setLabelFLag(false)}>
          <Actionsheet.Content>
            <Actionsheet.Item justifyContent={'center'}>
              <Text fontSize={16} color="#232323">
                选择内容分类
              </Text>
            </Actionsheet.Item>
            <Actionsheet.Item justifyContent={'center'}>
              <View
                style={{
                  flexDirection: 'row',
                  width: layout.width,
                  height: layout.height / 3,
                }}>
                <ScrollView
                  w={'50%'}
                  _contentContainerStyle={{
                    px: '0',
                    mb: '4',
                  }}>
                  {tipsClassList &&
                    tipsClassList.map((item, index) => {
                      return (
                        <Pressable
                          onPress={() => {
                            setActIndex(index);
                            setAtvedIndex(0);
                            setLabelType(item.name);
                          }}
                          style={[
                            {
                              paddingVertical: 12,
                              width: '100%',
                              alignItems: 'center',
                            },
                            actIndex == index
                              ? {backgroundColor: '#fff'}
                              : {backgroundColor: '#F3F3F3'},
                          ]}>
                          <Text>{item.name}</Text>
                        </Pressable>
                      );
                    })}
                </ScrollView>
                <ScrollView
                  w={'50%'}
                  _contentContainerStyle={{
                    px: '0',
                    mb: '4',
                  }}>
                  {tipsClassList[actIndex] &&
                    tipsClassList[actIndex].subLabels.map((item, index) => {
                      return (
                        <Pressable
                          onPress={() => {
                            setAtvedIndex(index);
                            setLabelFLag(false);
                            setLabelDetail(item.name);
                          }}
                          style={{
                            paddingVertical: 12,
                            width: '100%',
                            alignItems: 'center',
                            backgroundColor: '#fff',
                          }}>
                          <Text
                            style={[
                              atvedIndex == index
                                ? {color: '#8B5CFF'}
                                : {color: '#232323'},
                            ]}>
                            {item.name}
                          </Text>
                        </Pressable>
                      );
                    })}
                </ScrollView>
              </View>
            </Actionsheet.Item>
          </Actionsheet.Content>
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
                发贴
              </Text>
              <Text
                onPress={() => {
                  setTipsFlag(true);
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
                规则
              </Text>
            </HStack>
          </LinearGradient>
        </Box>
        {loading ? <PhotoModal /> : null}
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
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              marginBottom: 30,
            }}>
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
          <Pressable
            onPress={() => {
              setLabelFLag(true);
              getDynamicLabels();
            }}
            style={styles.titleView}>
            <Text fontSize={'sm'} color={'#727272'}>
              添加标签
            </Text>
            <View style={styles.rightView}>
              <Text>{labelType || '请选择'}</Text>
              <Icon name="right" size={16} color="#999" />
            </View>
          </Pressable>
          <View style={styles.btnView}>
            <Text fontSize={'sm'} color={'#727272'}>
              对应气质
            </Text>
            <Text fontSize={'sm'}>{labelDetail || '请选择'}</Text>
          </View>
        </Box>
        {flag && (
          <TouchableOpacity
            onPress={() => checkSubmit()}
            style={{
              width: '100%',
              marginTop: 10,
              position: 'absolute',
              bottom: '5%',
            }}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#D988FF', '#8B5CFF']}
              style={[styles.linearGradient, {width: '90%', marginLeft: '5%'}]}>
              <Text style={styles.buttonText}>发布</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </Box>
    </ScrollView>
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
  titleView: {
    marginTop: 30,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rightView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  linearGradient: {
    width: layout.width - 60,
    marginLeft: 30,
    marginTop: 20,
    height: 50,
    borderRadius: 28,
    marginBottom: '5%',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    lineHeight: 50,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});
