import React from 'react';
import {Text, HStack} from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import {Image} from 'react-native';

const Index = ({num}: {num: number | string}) => {
  if (num >= 100) {
    return (
      <HStack alignItems={'center'}>
        <Icon name="heart" size={20} color="#d81e06" />
        <Text
          ml={1}
          style={{color: '#d81e06'}}
          fontSize="md"
          fontWeight={'bold'}>
          {num}
        </Text>
      </HStack>
    );
  } else if (num >= 76) {
    return (
      <HStack alignItems={'center'}>
        <Image
          style={{width: 20, height: 20}}
          source={require('../../images/heart1.jpeg')}
        />
        <Text
          ml={1}
          style={{color: 'orange'}}
          fontSize="md"
          fontWeight={'bold'}>
          {num}
        </Text>
      </HStack>
    );
  } else if (num >= 36) {
    return (
      <HStack alignItems={'center'}>
        {/* <Icon name="heart" size={20} color="orange" /> */}
        <Image
          style={{width: 20, height: 20}}
          source={require('../../images/heart1.jpeg')}
        />
        <Text
          ml={1}
          style={{color: 'orange'}}
          fontSize="md"
          fontWeight={'bold'}>
          {num}
        </Text>
      </HStack>
    );
  } else {
    return (
      <HStack alignItems={'center'}>
        <Image
          style={{width: 20, height: 20}}
          source={require('../../images/heart2.jpeg')}
        />
        <Icon name="heart" size={20} color="yellow" />
        <Text
          ml={1}
          style={{color: 'yellow'}}
          fontSize="md"
          fontWeight={'bold'}>
          {num}
        </Text>
      </HStack>
    );
  }
};

export default Index;

{
  /* <LinearGradient
      style={{borderRadius: 40}}
      start={{x: 0, y: 0.5}}
      end={{x: 1, y: 0.5}}
      colors={['#FF82C1', '#FF4288']}>
      <Box px={2} py={1}>
        <Text color={'white'} fontSize="sm">
          亲密度<Text fontWeight={'bold'}>{num}</Text>
        </Text>
      </Box>
    </LinearGradient> */
}
