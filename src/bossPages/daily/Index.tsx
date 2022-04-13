import React, {useState} from 'react';
import {Box, Text, Center, FlatList} from 'native-base';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import DailyItem from './DailyItem';
import {queryDynamic} from '../../api/daily';
import useRequest from '../../hooks/useRequest';
import {useFocusEffect} from '@react-navigation/native';

import {
  pageConstant,
  PageEmpty,
  PageError,
  PageLoadAll,
  PageLoading,
  PageLoadMore,
} from '../../components/base/Pagination';
const {
  PAGE_IS_LOADING,
  PAGE_IS_NEXTPAGE,
  PAGE_IS_END,
  IS_EMPTY,
  IS_LOADDING,
  IS_NET_ERROR,
  IS_LIST,
} = pageConstant;

const mergeList = (sourceList: any, nowList: any) => {
  if (sourceList) {
    nowList = sourceList.concat(nowList);
    return nowList;
  }
  return nowList;
};

const Index = () => {
  const insets = useSafeAreaInsets();
  const [params, setParams] = useState({
    pageNum: 1, //分页页码
    pageSize: 10, //每页大小
    orders: [
      {
        column: 'createTime', //排序字段名称
        dir: 'desc', //排序方向，asc=顺序、desc=倒序，默认为顺序
        chinese: false, //是否为中文排序，默认为否
      },
    ], //排序参数列表
  });
  const [queryList, setList] = useState([]); // 动态列表
  const [pageStatus, setPageStatus] = useState(IS_LOADDING); // 页面状态
  const [pagingStatus, setPagingStatus] = useState(''); // 分页状态

  const {run: runQueryDynamic} = useRequest(queryDynamic.url);

  useFocusEffect(
    React.useCallback(() => {
      _getList();
    }, [params]),
  );

  const _getList = async () => {
    try {
      const data = await runQueryDynamic(params);
      console.log('data', data);
      _dealData(data);
    } catch (error) {
      // 错误信息 比如网络错误
      setPagingStatus(IS_NET_ERROR);
    }
  };

  // 处理页面数据及状态
  const _dealData = (response: any) => {
    const {data, total} = response;
    console.log('response', response);
    if (total === 0) {
      setPageStatus(IS_EMPTY);
      return;
    }
    if (data instanceof Array) {
      const isNextPage = data.length < total - queryList.length;
      setPagingStatus(isNextPage ? PAGE_IS_NEXTPAGE : PAGE_IS_END);
      setPageStatus(IS_LIST);
      setList(params.pageNum <= 1 ? data : mergeList(queryList, data));
    }
  };

  const _onRefresh = async () => {
    setPageStatus(IS_LOADDING);
    setParams({...params, pageNum: 1}); //改变param自动刷新数据
  };

  const _loadMore = async () => {
    setParams({...params, pageNum: ++params.pageNum});
  };

  const _onEndReached = () => {
    if (pagingStatus === PAGE_IS_NEXTPAGE) {
      _loadMore();
    }
  };

  const renderFooter = () => {
    switch (pagingStatus) {
      case PAGE_IS_LOADING:
        return <PageLoading />;
      case PAGE_IS_NEXTPAGE:
        return <PageLoadMore />;
      case PAGE_IS_END:
        return <PageLoadAll />;
      default:
        return null;
    }
  };

  const renderList = () => {
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        onRefresh={() => _onRefresh()}
        data={queryList}
        refreshing={pageStatus === IS_LOADDING}
        renderItem={({item}) => (
          <Box mb={4}>
            <DailyItem item={item} />
          </Box>
        )}
        ListFooterComponent={renderFooter()}
        keyExtractor={(item, index) => `key${index}`}
        onEndReached={() => _onEndReached()}
        onEndReachedThreshold={0.01}
      />
    );
  };

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
        {pageStatus === IS_EMPTY && <PageEmpty />}
        {pageStatus === IS_LIST && renderList()}
        {pageStatus === IS_LOADDING && <PageLoading />}
        {pageStatus === IS_NET_ERROR && <PageError />}
      </Box>
    </Box>
  );
};
export default Index;
