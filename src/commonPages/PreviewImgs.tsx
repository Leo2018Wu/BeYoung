import React from 'react';
import ImageViewer from 'react-native-image-zoom-viewer';
import Icon from 'react-native-vector-icons/Feather';
import CFastImage from '../components/CFastImage';
import {Spinner, View, Text, Box, Center, Pressable} from 'native-base';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

// 必须传入正确地址 此处拼接无效
export default function Index({...props}) {
  const {imgUrls, index, watermark} = props.route.params;

  const Header = ({currentIndex}: {currentIndex: number | undefined}) => {
    if (!currentIndex) {
      currentIndex = 0;
    }
    const insets = useSafeAreaInsets();
    return (
      <Box
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          zIndex: 1,
          paddingTop: insets.top,
          backgroundColor: '#00000050',
        }}>
        <Center
          style={{
            height: 52,
          }}>
          <Pressable
            h={'full'}
            style={{
              position: 'absolute',
              left: 12,
              top: 0,
            }}
            onPress={() => props.navigation.goBack()}
            w={10}
            justifyContent="center">
            <Icon name="chevron-left" color={'white'} size={32} />
          </Pressable>
          <Text fontWeight={'bold'} fontSize={'lg'} color={'white'}>
            {Number(currentIndex) + 1}/{imgUrls.length}
          </Text>
        </Center>
      </Box>
    );
  };

  return (
    <ImageViewer
      style={{
        flex: 1,
      }}
      // failImageSource={{url:''}}
      renderIndicator={() => <></>}
      renderHeader={(currentIndex?: number) => (
        <Header currentIndex={currentIndex} />
      )}
      loadingRender={() => <Spinner size={'lg'} color={'primary.100'} />}
      renderImage={({source, style}) => {
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
            <CFastImage url={source.uri} styles={style} />
          </View>
        );
      }}
      pageAnimateTime={600}
      enablePreload={true}
      useNativeDriver={true}
      index={index}
      saveToLocalByLongPress={false}
      imageUrls={imgUrls}
    />
  );
}
