import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {View, Text, Image} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import CFastImage from '../../components/CFastImage';

import layout from '../../components/Layout';

const Login = ({...props}) => {
  console.log('--s-s-s-1', props.item);
  const {item} = props;
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (item.images) {
      setImages(JSON.parse(item.images));
    }
  }, []);

  // const navigation = useNavigation();
  return (
    <View style={{marginBottom: 8}}>
      <Pressable style={styles.banner}>
        <CFastImage
          url={images[0]}
          styles={{
            width: (layout.width - 26) / 2,
            height: 210,
          }}
        />
        <View style={styles.optContain}>
          <View style={styles.optView}>
            <Image
              source={require('../assets/follow.png')}
              style={{
                width: 17,
                height: 16,
                marginRight: 3,
              }}
              alt="dairy"
            />
            <Text style={styles.optSize}>{item.likeNum}</Text>
          </View>
          <View style={styles.optView}>
            <Image
              source={require('../assets/home_message.png')}
              style={{
                width: 17,
                height: 16,
                marginRight: 3,
              }}
              alt="dairy"
            />
            <Text style={styles.optSize}>{item.commentNum}</Text>
          </View>
          <View style={styles.optView}>
            <Image
              source={require('../assets/gift.png')}
              style={{
                width: 17,
                height: 16,
                marginRight: 3,
              }}
              alt="dairy"
            />
            <Text style={styles.optSize}>{item.giftNum}</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  optContain: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 10,
    width: '100%',
    alignItems: 'center',
    height: 25,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  optView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optSize: {
    color: '#fff',
    fontSize: 10,
  },
  banner: {
    width: (layout.width - 26) / 2,
    height: 210,
    position: 'relative',
    justifyContent: 'center',
    borderRadius: 10,
  },
});