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

  const preview = index => {
    const imgUrls = images.map((img: string) => {
      const temp = {url: `${BASE_DOWN_URL + img}`};
      return temp;
    });
    navigation.navigate('Preview', {index, imgUrls});
  };

  return (
    <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
      {images.map((item, index) => {
        return (
          <Pressable onPress={() => preview(index)} style={styles.banner}>
            <CFastImage
              url={`${BASE_DOWN_URL + item}`}
              styles={{
                width: '100%',
                height: 210,
                borderRadius: 10,
              }}
            />
          </Pressable>
        );
      })}
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  banner: {
    width: (layout.width - 55) / 2,
    position: 'relative',
    borderRadius: 10,
    marginHorizontal: 5,
    marginBottom: 8,
  },
});
