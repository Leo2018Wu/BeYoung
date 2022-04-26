import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {View, Text, Image} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import CFastImage from '../../components/CFastImage';
import {BASE_DOWN_URL} from '../../util/config';

import layout from '../../components/Layout';

const Login = ({...props}) => {
  const {item} = props;
  const navigation = useNavigation();

  const [images, setImages] = useState([]);

  useEffect(() => {
    if (item.imgs) {
      setImages(JSON.parse(item.imgs));
    }
  }, []);

  const preview = (index = 0) => {
    const imgUrls = images.map((img: string) => {
      const temp = {url: `${BASE_DOWN_URL + img}`};
      return temp;
    });
    navigation.navigate('Preview', {index, imgUrls});
  };

  return (
    <View>
      <Pressable onPress={() => preview()} style={styles.banner}>
        <CFastImage
          url={`${BASE_DOWN_URL + images[0]}`}
          styles={{
            width: '100%',
            height: 210,
            borderRadius: 10,
          }}
        />
        {/* <View style={styles.optContain}>
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
        </View> */}
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
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    height: 25,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
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
    width: (layout.width - 50) / 2,
    position: 'relative',
    borderRadius: 10,
    marginHorizontal: 5,
    marginBottom: 8,
  },
});
