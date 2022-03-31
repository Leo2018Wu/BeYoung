import React from 'react';
import {HStack, ScrollView, Box} from 'native-base';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useWindowDimensions} from 'react-native';

const Index = () => {
  const insets = useSafeAreaInsets();
  const {width} = useWindowDimensions();
  const IMG_ITEM_WIDTH = (width - 20) / 3;
  const IMG_ITEM_HEIGHT = 1.2 * IMG_ITEM_WIDTH;
  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: insets.bottom + 60,
      }}>
      <HStack flexWrap={'wrap'} px={2} flex={1}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
          <Box
            borderRadius={2}
            bg={'primary.100'}
            key={index}
            style={{
              marginRight: (index + 1) % 3 === 0 ? 0 : 2,
              marginBottom: 2,
              height: IMG_ITEM_HEIGHT,
              width: IMG_ITEM_WIDTH,
            }}
          />
        ))}
      </HStack>
    </ScrollView>
  );
};
export default Index;
