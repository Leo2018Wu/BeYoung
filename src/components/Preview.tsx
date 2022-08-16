import React, {useState} from 'react';
import ImageViewer from 'react-native-image-zoom-viewer';
import FastImage from 'react-native-fast-image';
import {View, Text} from 'native-base';
import CFastImage from './CFastImage';
import {useNavigation} from '@react-navigation/native';

export default function Index(props) {
  const navigation = useNavigation();
  const {imgUrls, index, watermark} = props.route.params;
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
          <View style={{position: 'relative'}}>
            {watermark ? (
              <Text
                fontSize={16}
                color={'#fff'}
                opacity={0.8}
                fontWeight={'bold'}
                style={{
                  position: 'absolute',
                  bottom: 10,
                  right: 12,
                  zIndex: 100,
                }}>
                青回APP
              </Text>
            ) : null}

            <CFastImage url={data.source.uri} styles={data.style} />
          </View>
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
