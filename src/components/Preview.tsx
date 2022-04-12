import React, {useState} from 'react';
import ImageViewer from 'react-native-image-zoom-viewer';
import FastImage from 'react-native-fast-image';
import CFastImage from './CFastImage';
import {useNavigation} from '@react-navigation/native';

export default function Index(props) {
  const navigation = useNavigation();
  const {imgUrls, index} = props.route.params;
  return (
    <ImageViewer
      style={{
        flex: 1,
      }}
      renderImage={data => {
        if (!data.source.uri) {
          return null;
        }
        return (
          <CFastImage url={data.source.uri} styles={data.style} />
          // <FastImage
          //   style={data.style}
          //   source={{
          //     uri: data.source.uri,
          //     headers: {Authorization: 'someAuthToken'},
          //     priority: FastImage.priority.normal,
          //   }}
          //   resizeMode={FastImage.resizeMode.contain}
          // />
        );
      }}
      onClick={() => navigation.goBack()}
      enablePreload={true}
      useNativeDriver={true}
      index={index}
      saveToLocalByLongPress={false}
      imageUrls={imgUrls}
    />
  );
}
