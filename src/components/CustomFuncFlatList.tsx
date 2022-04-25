/* eslint-disable react-hooks/exhaustive-deps */
import React, {forwardRef, useState} from 'react';
import {Box, FlatList} from 'native-base';
import useRequest from '../hooks/useRequest';
import {useFocusEffect} from '@react-navigation/native';

import {
  pageConstant,
  PageEmpty,
  PageError,
  PageLoadAll,
  PageLoading,
  PageLoadMore,
} from './base/Pagination';
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

const Index = forwardRef(
  (
    {
      url,
      par = {},
      renderItem,
      horizontal = false,
      numColumns = 1,
    }: {
      url: string;
      par?: object;
      renderItem: any;
      horizontal?: boolean;
      numColumns?: number;
    },
    refParams,
  ) => {
    const [params, setParams] = useState(
      Object.assign(
        {
          pageNum: 1, //分页页码
          pageSize: 10, //每页大小
          orders: [
            {
              column: 'createTime', //排序字段名称
              dir: 'desc', //排序方向，asc=顺序、desc=倒序，默认为顺序
              chinese: false, //是否为中文排序，默认为否
            },
          ], //排序参数列表
        },
        par,
      ),
    );
    const [queryList, setList] = useState([]); // 动态列表
    const [pageStatus, setPageStatus] = useState(IS_LOADDING); // 页面状态
    const [pagingStatus, setPagingStatus] = useState(''); // 分页状态

    const {run: runGetList} = useRequest(url);

    useFocusEffect(
      React.useCallback(() => {
        _getList();
      }, [params]),
    );

    const _getList = async () => {
      try {
        const data = await runGetList(params);
        _dealData(data);
      } catch (error) {
        // 错误信息 比如网络错误
        setPagingStatus(IS_NET_ERROR);
      }
    };

    // 处理页面数据及状态
    const _dealData = (response: any) => {
      const {data, total} = response;
      if (parseInt(total, 10) === 0) {
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
          ref={refParams}
          horizontal={horizontal}
          numColumns={numColumns}
          removeClippedSubviews={true}
          showsVerticalScrollIndicator={false}
          onRefresh={() => _onRefresh()}
          data={queryList}
          refreshing={pageStatus === IS_LOADDING}
          renderItem={renderItem}
          // ListEmptyComponent={<PageEmpty />}
          ListFooterComponent={renderFooter()}
          keyExtractor={(item, index) => `key${index}`}
          onEndReached={() => _onEndReached()}
          onEndReachedThreshold={0.01}
        />
      );
    };

    return (
      <Box flex={1}>
        {pageStatus === IS_EMPTY && <PageEmpty />}
        {pageStatus === IS_LIST && renderList()}
        {pageStatus === IS_LOADDING && <PageLoading />}
        {pageStatus === IS_NET_ERROR && <PageError />}
      </Box>
    );
  },
);
export default Index;
