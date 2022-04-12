import React from 'react';
import {Box, Text, Center} from 'native-base';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import DailyItem from './DailyItem';
import CustomFlatList from '../../components/CustomFlatList';
import {queryDynamic} from '../../api/daily';

const Index = () => {
  const insets = useSafeAreaInsets();

  return (
    <Box flex={1} bg="white">
      <Box justifyContent="center" style={{paddingTop: insets.top}}>
        <Center px={3} h={16} alignItems="center">
          <Text color={'fontColors.333'} fontSize={'xl'}>
            动态
          </Text>
        </Center>
      </Box>
      <Box my={4} px={4} flex={1}>
        <CustomFlatList
          renderItem={() => (
            <Box mb={4}>
              <DailyItem />
            </Box>
          )}
          isPage={true}
          api={{
            url: queryDynamic.url,
            params: {},
          }}
        />
      </Box>
    </Box>
  );
};
export default Index;
