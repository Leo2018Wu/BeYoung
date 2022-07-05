import React, {useLayoutEffect} from 'react';

import {Box} from 'native-base';
import {Pressable, useWindowDimensions} from 'react-native';
import CFastImage from '../../components/CFastImage';
import {BASE_DOWN_URL} from '../../util/config';

interface ItemProps {
  url: string;
}

const Index = ({...props}) => {
  const {title, album} = props.route.params;
  const {width} = useWindowDimensions();

  useLayoutEffect(() => {
    props.navigation.setOptions({
      title,
    });
  }, []);

  const IMG_WIDTH = (width - 74) / 3;
  const IMG_HEIGHT = IMG_WIDTH;

  const preview = (index: number) => {
    const imgUrls = album.map((ele: ItemProps) => {
      const temp = {url: `${BASE_DOWN_URL + ele.url}`};
      return temp;
    });
    props.navigation.navigate('Preview', {index, imgUrls});
  };

  return (
    <Box
      flex={1}
      flexDirection="row"
      flexWrap={'wrap'}
      style={{
        padding: 21,
      }}>
      {album &&
        album.map((item: ItemProps, index: number) => {
          return (
            <Pressable onPress={() => preview(index)} key={index}>
              <CFastImage
                url={item.url}
                styles={{
                  width: IMG_WIDTH,
                  height: IMG_HEIGHT,
                  borderRadius: 10,
                  marginRight: (index + 1) % 3 === 0 ? 0 : 15,
                  marginBottom: 15,
                }}
              />
            </Pressable>
          );
        })}
    </Box>
  );
};

export default Index;
