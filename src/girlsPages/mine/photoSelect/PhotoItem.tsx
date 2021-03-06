import React, {useState, useEffect} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {View, Text} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {fetchCase, fetchMyMedia} from '../../../api/photoSelect';
import useRequest from '../../../hooks/useRequest';
import {BASE_DOWN_URL} from '../../../util/config';
import CFastImage from '../../../components/CFastImage';
import {useFocusEffect} from '@react-navigation/native';

const Login = ({...props}) => {
  const {item} = props;
  const {run: runFetchMyMedia} = useRequest(fetchMyMedia.url); // 获取我的媒体信息
  const {run: runFetchCase} = useRequest(fetchCase.url); // 获取案例图片
  const [caseImg, setCaseImg] = useState('');
  const [flag, setFlag] = useState(false);
  const [caseImgList, setCaseImgList] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      getMyMedia();
    }, []),
  );

  const getMyMedia = async () => {
    const {data} = await runFetchMyMedia({
      mediaType: 'MEDIA_TYPE_IMAGE', //媒体类型
      scene: item.code, //场景
    });
    if (data) {
      if (!data.length) {
        getFetchCase();
      } else {
        setCaseImgList(data);
        setCaseImg(data[0].url);
        setFlag(true);
      }
    }
  };

  const getFetchCase = async () => {
    const {data} = await runFetchCase({scene: item.code});
    if (data.length) {
      if (!data[0].delFlag) {
        const temp = JSON.parse(data[0].imgs)[0];
        setCaseImg(JSON.parse(JSON.stringify(temp)));
        setFlag(true);
      }
    }
  };

  const navigation = useNavigation();
  return (
    <>
      {flag ? (
        <Pressable
          onPress={() =>
            navigation.navigate('PhotoUpload', {
              item: item,
              caseImgList: caseImgList,
            })
          }>
          <View style={styles.banner}>
            <CFastImage
              url={`${BASE_DOWN_URL + caseImg}`}
              styles={{
                width: 158,
                height: 158,
                borderRadius: 15,
              }}
            />
            <View style={styles.topView}>
              <Text
                fontSize={'xs'}
                color={'#fff'}
                style={{textAlign: 'center'}}>
                {item.name}
              </Text>
            </View>
            <View style={styles.bottomView}>
              <Text fontSize={'sm'} color={'#fff'}>
                示例
              </Text>
            </View>
          </View>
          {/* <View style={{width: 100}}>
            <Text fontSize={'xs'}>完成此类别照片</Text>
            <Text fontSize={'xs'}>可获得10元红包</Text>
          </View> */}
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#D988FF', '#8B5CFF']}
            style={styles.linearGradient}>
            <Text style={styles.buttonText}>添加照片</Text>
          </LinearGradient>
        </Pressable>
      ) : null}
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  topView: {
    backgroundColor: '#11111840',
    position: 'absolute',
    top: 0,
    width: '100%',
    paddingHorizontal: 10,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  bottomView: {
    backgroundColor: '#11111840',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: 10,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  banner: {
    width: 158,
    height: 158,
    position: 'relative',
    marginBottom: 8,
  },
  linearGradient: {
    width: 70,
    marginTop: 10,
    height: 26,
    borderRadius: 24,
    marginBottom: 20,
  },
  buttonText: {
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    height: 26,
    lineHeight: 26,
    color: '#ffffff',
    fontSize: 10,
    backgroundColor: 'transparent',
  },
});
