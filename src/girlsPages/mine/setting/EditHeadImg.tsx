import React, {useEffect, useState} from 'react';
import {Box, Button, HStack, Text, Image, Pressable} from 'native-base';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {updateUserInfo} from '../../../api/common';
import {upload} from '../../../util/upload';
import useRequest from '../../../hooks/useRequest';
import ChooseImgModal from '../../../components/ChooseImgModal';
import ImageViewer from 'react-native-image-zoom-viewer';
import CFastImage from '../../../components/CFastImage';
import {BASE_DOWN_URL} from '../../../util/config';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

import Layout from '../../../components/Layout';
const Index = ({...props}) => {
  const {headImg} = props.route.params;
  const [showMdal, setShowModal] = useState(false);
  const [showImg, setShowImg] = useState('');
  const insets = useSafeAreaInsets();
  const {run: runUpdateUserInfo} = useRequest(updateUserInfo.url);

  useEffect(() => {
    console.log('----ss-', headImg);
  }, []);

  const edit = async () => {
    // props.navigation.goBack();
    upload(showImg)
      .then(res => {
        runUpdateUserInfo({
          headImg: res,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <Box flex={1}>
      <HStack
        h={20}
        alignItems={'center'}
        justifyContent={'center'}
        style={{paddingTop: insets.top}}>
        <Pressable
          style={{
            width: 24,
            height: 24,
            left: 20,
            top: 45,
            position: 'absolute',
            zIndex: 10,
          }}
          onPress={() => {
            props.navigation.goBack();
          }}>
          <Icon name="arrow-back" size={24} color="#000" />
        </Pressable>
        <Text fontSize={'md'} fontWeight="bold">
          编辑头像
        </Text>
        {showImg ? (
          <Button
            onPress={() => edit()}
            w={16}
            h={8}
            style={{
              backgroundColor: '#9650FF',
              position: 'absolute',
              right: 16,
              top: '25%',
              transform: [
                {
                  translateY: 28,
                },
              ],
            }}>
            <Text
              fontWeight={'bold'}
              color={'white'}
              fontSize="sm"
              lineHeight={16}>
              完成
            </Text>
          </Button>
        ) : null}
      </HStack>
      <ChooseImgModal
        visible={showMdal}
        hideModal={() => setShowModal(false)}
        imgCb={value => {
          console.log('value', value);
          setShowImg(value);
        }}
      />
      {showImg || headImg ? (
        <ImageViewer
          style={{width: Layout.width}}
          renderImage={data => {
            if (!data.source.uri) {
              return null;
            }
            return (
              <CFastImage
                url={data.source.uri}
                styles={{
                  width: Layout.width - 60,
                  height: Layout.height - 300,
                  marginLeft: 15,
                  marginTop: 100,
                  borderRadius: 20,
                }}
              />
            );
          }}
          saveToLocalByLongPress={false}
          imageUrls={[
            {
              url: showImg ? showImg : BASE_DOWN_URL + headImg,
            },
          ]}
        />
      ) : (
        <Image
          source={require('../../../images/default_avatar.jpg')}
          style={{
            width: Layout.width - 60,
            height: Layout.height - 200,
            margin: 30,
            borderRadius: 20,
          }}
          alt="img"
        />
      )}
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#D988FF', '#8B5CFF']}
        style={{
          width: Layout.width - 60,
          marginLeft: 30,
          marginBottom: '5%',
          position: 'absolute',
          bottom: 0,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 28,
          height: 50,
        }}>
        <Text
          onPress={() => setShowModal(true)}
          style={{
            width: '100%',
            color: '#fff',
            fontSize: 18,
            textAlign: 'center',
          }}>
          更换
        </Text>
      </LinearGradient>
    </Box>
  );
};

export default Index;
