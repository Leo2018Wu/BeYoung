import React, {useState} from 'react';
import {Box, Text, FlatList, HStack, Pressable, VStack} from 'native-base';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useFocusEffect} from '@react-navigation/native';
import useRequest from '../../hooks/useRequest';
import {
  pageConstant,
  PageEmpty,
  PageError,
  PageLoadAll,
  PageLoading,
  PageLoadMore,
} from '../../components/base/Pagination';
import CFastImage from '../../components/CFastImage';
import Icon from 'react-native-vector-icons/Feather';
import {queryReply} from '../../api/daily';
import LinearGradient from 'react-native-linear-gradient';

const {
  PAGE_IS_LOADING,
  PAGE_IS_NEXTPAGE,
  PAGE_IS_END,
  IS_EMPTY,
  IS_LOADDING,
  IS_NET_ERROR,
  IS_LIST,
} = pageConstant;

const genImages = (imgs: string) => {
  if (!imgs) {
    return [];
  }
  return JSON.parse(imgs);
};

const mergeList = (sourceList: any, nowList: any) => {
  if (sourceList) {
    nowList = sourceList.concat(nowList);
    return nowList;
  }
  return nowList;
};

const CommentItem = ({item}) => {
  return (
    <HStack>
      <Box>
        <CFastImage
          url={item.headImg}
          styles={{
            width: 48,
            height: 48,
            borderRadius: 24,
          }}
        />
      </Box>
      <Box flex={1} ml={2}>
        <HStack>
          <VStack style={{height: 44}} flex={1} justifyContent="space-between">
            <Text fontSize={'md'} color={'fontColors.666'}>
              {item.nickName}
            </Text>
            <Text numberOfLines={1} fontSize={'xs'} style={{color: '#cccccc'}}>
              {item.content}
            </Text>
          </VStack>
          {genImages(item.images).map((ele: string) => (
            <CFastImage
              url={ele}
              styles={{
                width: 44,
                height: 44,
                borderRadius: 4,
              }}
            />
          ))}
        </HStack>
        <Box mt={2} p={2} borderRadius={4} bg="border.lightGray">
          <Text numberOfLines={1}>{item.repliedComment.content}</Text>
        </Box>
      </Box>
    </HStack>
  );
};

const Index = ({...props}) => {
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
  const {run: runQueryReply} = useRequest(queryReply.url);

  useFocusEffect(
    React.useCallback(() => {
      _getList();
    }, [params]),
  );

  const _getList = async () => {
    try {
      const data = await runQueryReply(params);
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

  const _renderItem = ({item, index}: {item: any; index: number}) => {
    return (
      <Pressable
        onPress={() =>
          props.navigation.navigate('DailyDetail', {
            dynamicId: item.userDynamicId,
          })
        }
        key={index}
        mb={4}>
        <CommentItem item={item} />
      </Pressable>
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
          <HStack
            px={4}
            style={{height: 52}}
            justifyContent="center"
            alignItems={'center'}>
            <Pressable
              h={'full'}
              onPress={() => props.navigation.goBack()}
              w={10}
              style={{
                position: 'absolute',
                left: 10,
              }}
              justifyContent="center">
              <Icon name="chevron-left" color={'white'} size={30} />
            </Pressable>
            <Box>
              <Text
                alignSelf={'center'}
                color={'white'}
                fontSize="lg"
                fontWeight={'bold'}>
                评论
              </Text>
            </Box>
          </HStack>
        </Box>
      </LinearGradient>

      <Box flex={1} px={4} my={4}>
        {pageStatus === IS_EMPTY && <PageEmpty />}
        {pageStatus === IS_LIST && renderList()}
        {pageStatus === IS_LOADDING && <PageLoading />}
        {pageStatus === IS_NET_ERROR && <PageError />}
      </Box>
    </Box>
  );
};
export default Index;
