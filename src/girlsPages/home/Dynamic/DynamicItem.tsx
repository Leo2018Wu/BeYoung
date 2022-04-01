import React, {useState, useEffect} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {View, Text, Image} from 'native-base';

import layout from '../../common/Layout';

const Login = ({...props}) => {
  console.log('----props---', props);
  const {item} = props;
  const [imgList, setImgList] = useState([{id: 0}, {id: 1}, {id: 2}]);
  const [time, setTime] = useState('');

  useEffect(() => {
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
      onPress={() => props.navigation.navigate('DynamicItemDetail')}
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
        <View
          style={{
            marginVertical: 10,
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          {imgList &&
            imgList.map((item, index) => {
              return (
                <Image
                  source={require('../../assets/IMG_2728.png')}
                  style={{
                    width: 85,
                    height: 85,
                    borderRadius: 10,
                  }}
                />
              );
            })}
        </View>
        <Text style={{color: '#554C5F', fontSize: 14}}>{item.content}</Text>
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
