import React from 'react';
import {Box, HStack, Text, VStack} from 'native-base';
import CustomFuncFlatList from '../../components/CustomFuncFlatList';
import CFastImage from '../../components/CFastImage';
import {queryDynamic} from '../../api/daily';

const Index = () => {
  const Item = () => {
    return (
      <HStack mb={4} bg={'white'} px={4} py={2} alignItems="center">
        <CFastImage
          url=""
          styles={{
            width: 50,
            height: 50,
            borderRadius: 25,
          }}
        />
        <Text fontWeight={'bold'} ml={2} fontSize="md">
          张大大
        </Text>
        <VStack ml={'auto'}>
          <Text fontSize={'md'} style={{color: '#5F5E5E'}}>
            微信号：
            <Text selectable color={'primary.100'} fontWeight={'bold'}>
              11111
            </Text>
          </Text>
          <Text fontSize={'md'} style={{color: '#5F5E5E'}}>
            手机号：
            <Text selectable color={'primary.100'} fontWeight={'bold'}>
              11111
            </Text>
          </Text>
        </VStack>
      </HStack>
    );
  };

  return (
    <Box flex={1}>
      <CustomFuncFlatList
        renderItem={() => <Item />}
        url={queryDynamic.url}
        par={{}}
      />
    </Box>
  );
};
export default Index;
