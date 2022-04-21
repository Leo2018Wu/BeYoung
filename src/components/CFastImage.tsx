import {Image, Spinner} from 'native-base';
import React from 'react';

import FastImage from 'react-native-fast-image';
import {BASE_DOWN_URL} from '../util/config';

const DEFAULT_AVATAR = require('../images/default_avatar.png');
const Index = ({styles, url}: {styles: any; url: string}) => {
  if (!url) {
    return <Image source={DEFAULT_AVATAR} style={styles} alt="img" />;
  }
  return (
    <FastImage
      style={styles}
      onLoadStart={() => <Spinner size={'sm'} />}
      onError={() => <Image source={DEFAULT_AVATAR} style={styles} alt="img" />}
      source={{
        uri: url.substring(0, 3) !== 'img' ? url : BASE_DOWN_URL + url,
        headers: {Authorization: 'someAuthToken'},
        priority: FastImage.priority.normal,
      }}
      resizeMode={FastImage.resizeMode.cover}
    />
  );
};

export default Index;
