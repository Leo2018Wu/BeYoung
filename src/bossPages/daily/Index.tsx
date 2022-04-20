import React, {useState} from 'react';
import {Box, Text, Center} from 'native-base';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import DailyItem from './DailyItem';
import {queryDynamic} from '../../api/daily';

import CustomFuncFlatList from '../../components/CustomFuncFlatList';
import LinearGradient from 'react-native-linear-gradient';

const Index = () => {
  const insets = useSafeAreaInsets();

  return (
    <Box flex={1} bg="white">
      <LinearGradient
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 0.5}}
        colors={['#B83AF3', '#6950FB']}>
        <Box justifyContent="center" style={{paddingTop: insets.top}}>
          <Center style={{height: 52}}>
            <Text color={'white'} fontSize="lg" fontWeight={'bold'}>
              动态
            </Text>
          </Center>
        </Box>
      </LinearGradient>

      <Box my={4} px={4} flex={1}>
        <CustomFuncFlatList
          url={queryDynamic.url}
          par={{}}
          renderItem={({item, index}: {item: any; index: number}) => {
            return (
              <Box key={index} mb={4}>
                <DailyItem item={item} />
              </Box>
            );
          }}
        />
      </Box>
    </Box>
  );
};
export default Index;
