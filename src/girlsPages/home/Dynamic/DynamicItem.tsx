import React, {useState, useEffect} from 'react';
import {Pressable, StyleSheet, Image} from 'react-native';
import {View, Text} from 'native-base';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import {BASE_DOWN_URL} from '../../../util/config';

import layout from '../../common/Layout';

const Login = ({...props}) => {
  const navigation = useNavigation();
  const {item} = props;
  const [imgList, setImgList] = useState([]);
  const [time, setTime] = useState('');

  useEffect(() => {
    if (item.images && JSON.parse(item.images).length) {
      setImgList(JSON.parse(item.images));
    }
    console.log('-sd-s-d-d-s', imgList);
    let tempTime = Math.ceil(
      (new Date().getTime() - new Date(item.createTime).getTime()) / 1000,
    );
    if (tempTime < 60) {
      setTime(tempTime + '秒之前');
    } else if (tempTime >= 60 && tempTime < 3600) {
      setTime(Math.ceil(tempTime / 60) + '分钟之前');
    } else if (tempTime >= 3600 && tempTime < 86400) {
      setTime(Math.ceil(tempTime / 3600) + '小时之前');
    } else if (tempTime >= 86400) {
      setTime(Math.ceil(tempTime / 86400) + '天之前');
    }
  }, []);

  return (
    <Pressable
      onPress={() => navigation.navigate('DynamicItemDetail')}
      style={{
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical: 10,
      }}>
      <Image
        source={require('../../assets/defaultAva.png')}
        style={{
          width: 50,
          height: 50,
        }}
      />
      <View style={styles.itemContain}>
        <Text style={{color: '#8E8895', fontSize: 14}}>啦啦啦</Text>
        <Text style={{color: '#c7c7c7', fontSize: 10}}>{time}</Text>
        <Text style={{color: '#554C5F', fontSize: 14}}>{item.content}</Text>
        <View
          style={{
            marginVertical: 10,
            flexDirection: 'row',
          }}>
          {imgList &&
            imgList.map((item, index) => {
              return (
                <FastImage
                  style={{
                    width: 85,
                    height: 85,
                    borderRadius: 10,
                  }}
                  source={{
                    uri:
                      item.substr(0, 3) !== 'img' ? item : BASE_DOWN_URL + item,
                    headers: {Authorization: 'someAuthToken'},
                    priority: FastImage.priority.normal,
                  }}
                  resizeMode={FastImage.resizeMode.cover}
                />
              );
            })}
        </View>
        <View style={styles.optContain}>
          <Text style={styles.optSize}>评分{item.score}</Text>
          <View style={styles.optView}>
            <Image
              source={require('../../assets/home_linke.png')}
              style={{
                width: 18,
                height: 18,
                marginRight: 3,
              }}
            />
            <Text style={styles.optSize}>{item.likeNum}</Text>
          </View>
          <View style={styles.optView}>
            <Image
              source={require('../../assets/home_message.png')}
              style={{
                width: 18,
                height: 18,
                marginRight: 3,
              }}
            />
            <Text style={styles.optSize}>{item.commentNum}</Text>
          </View>
          <View style={styles.optView}>
            <Image
              source={require('../../assets/home_gift.png')}
              style={{
                width: 18,
                height: 18,
                marginRight: 3,
              }}
            />
            <Text style={styles.optSize}>{item.giftNum}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default Login;

const styles = StyleSheet.create({
  itemContain: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    width: layout.width - 80,
  },
  optContain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  optView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optSize: {
    color: '#C7C4CC',
    fontSize: 12,
  },
});
