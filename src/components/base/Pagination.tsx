import React from 'react';
import {Box, Center, Spinner, Text} from 'native-base';

export const pageConstant = {
  PAGE_IS_LOADING: 'pageIsLoading',
  PAGE_IS_NEXTPAGE: 'pageIsNextPage',
  PAGE_IS_END: 'pageIsEnd',
  //页面
  IS_EMPTY: 'isEmpty',
  IS_LOADDING: 'isLoadding',
  IS_NET_ERROR: 'isNetError',
  IS_LIST: 'isList',
};

export const PageEmpty = ({content = '暂无数据'}) => {
  return (
    <Center my={4} flex={1}>
      <Text>{content}</Text>
    </Center>
  );
};

export const PageLoadAll = ({content = '-已经是我的底线了-'}) => {
  return (
    <Box my={4} alignItems={'center'}>
      <Text>{content}</Text>
    </Box>
  );
};

export const PageLoadMore = () => {
  return (
    <Box my={4} alignItems={'center'}>
      <Spinner size={'sm'} color="primary.100" />
    </Box>
  );
};

export const PageError = ({content = '网络错误'}) => {
  return (
    <Center my={4} flex={1}>
      <Text>{content}</Text>
    </Center>
  );
};

export const PageLoading = () => {
  return (
    <Center flex={1}>
      <Spinner color="primary.100" size={'lg'} />
    </Center>
  );
};
