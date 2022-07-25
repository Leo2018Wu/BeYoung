import React, {useState} from 'react';
import {
  Box,
  Text,
  Center,
  FlatList,
  Pressable,
  HStack,
  ScrollView,
} from 'native-base';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useFocusEffect} from '@react-navigation/native';
import useRequest from '../../hooks/useRequest';
import DailyItem from './DailyItem';
import {
  pageConstant,
  PageEmpty,
  PageError,
  PageLoadAll,
  PageLoading,
  PageLoadMore,
} from '../../components/base/Pagination';
import {queryDynamic, fetchDynamicLabels} from '../../api/daily';
import LinearGradient from 'react-native-linear-gradient';
import {StyleSheet} from 'react-native';

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
    labelType: '', // 标签大类
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
  const {run: runFetchDynamic} = useRequest(queryDynamic.url);
  const {result: labelList} = useRequest(
    fetchDynamicLabels.url,
    {},
    {manual: false},
  );

  useFocusEffect(
    React.useCallback(() => {
      _getList();
    }, [params]),
  );

  const _getList = async () => {
    try {
      const data = await runFetchDynamic(params);
      _dealData(data);
    } catch (error) {
      // 错误信息 比如网络错误
      setPagingStatus(IS_NET_ERROR);
    }
  };

  // 处理页面数据及状态
  const _dealData = (response: any) => {
    const {data, total} = response;
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
        return <PageLoadAll content="-已经到达底部了-" />;
      default:
        return null;
    }
  };

  const itemRefresh = async () => {
    _getList();
    console.log('itemRefresh');
  };

  const _renderItem = ({item, index}: {item: any; index: number}) => {
    return (
      <Box key={index} mb={4}>
        <DailyItem returnFunc={itemRefresh} item={item} />
      </Box>
    );
  };

  const renderList = () => {
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        onRefresh={() => _onRefresh()}
        data={queryList}
        renderItem={_renderItem}
        refreshing={pageStatus === IS_LOADDING}
        ListFooterComponent={renderFooter()}
        onEndReached={() => _onEndReached()}
        onEndReachedThreshold={0.01}
        keyExtractor={(item: any) => `key${item.id}`}
      />
    );
  };

  return (
    <Box flex={1} bg="white">
      <LinearGradient
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 0.5}}
        colors={['#B83AF3', '#6950FB']}>
        <Box justifyContent="center" style={{paddingTop: insets.top}}>
          <Center style={{height: 52}}>
            <Text color={'white'} fontSize="lg" fontWeight={'bold'}>
              学妹圈
            </Text>
          </Center>
        </Box>
      </LinearGradient>

      <Box flex={1} px={4} my={4}>
        <ScrollView
          horizontal
          mb={4}
          style={{display: 'flex', flexDirection: 'row', flexWrap: 'nowrap'}}>
          {labelList &&
            labelList.map((label, labelIndex) => (
              <Pressable
                style={[
                  styles.labelItem,
                  params.labelType === label.name ? styles.labelItemActive : {},
                ]}
                onPress={() => {
                  if (params.labelType === label.name) {
                    setParams({...params, labelType: ''});
                  } else {
                    setParams({...params, labelType: label.name});
                  }
                }}
                key={labelIndex}>
                <Text
                  fontSize={'xs'}
                  fontWeight="bold"
                  style={{
                    color:
                      params.labelType === label.name
                        ? 'primary.100'
                        : '#807D92',
                  }}>
                  {label.name}
                </Text>
              </Pressable>
            ))}
        </ScrollView>
        {pageStatus === IS_EMPTY && <PageEmpty />}
        {pageStatus === IS_LIST && renderList()}
        {pageStatus === IS_LOADDING && <PageLoading />}
        {pageStatus === IS_NET_ERROR && <PageError />}
      </Box>
    </Box>
  );
};
export default Index;

const styles = StyleSheet.create({
  labelItem: {
    paddingHorizontal: 12,
    height: 26,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 48,
    marginRight: 12,
    backgroundColor: '#F5F7F8',
  },
  labelItemActive: {
    backgroundColor: '#9650FF20',
  },
});
