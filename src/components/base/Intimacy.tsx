import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Text, Box} from 'native-base';

const Index = ({num}: {num: number | string}) => {
  return (
    <LinearGradient
      style={{borderRadius: 40}}
      start={{x: 0, y: 0.5}}
      end={{x: 1, y: 0.5}}
      colors={['#FF82C1', '#FF4288']}>
      <Box px={2} py={1}>
        <Text color={'white'} fontSize="sm">
          亲密度<Text fontWeight={'bold'}>{num}</Text>
        </Text>
      </Box>
    </LinearGradient>
  );
};

export default Index;
