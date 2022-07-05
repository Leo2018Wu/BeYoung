import React, {useState} from 'react';
import {Box, Text, FlatList, HStack, Pressable, View, Image} from 'native-base';
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
import Icon from 'react-native-vector-icons/Ionicons';
import {queryFollowedMe, follow} from '../../api/common';
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
interface ItemProps {
  id: string | number;
  hasFollowed: boolean;
  headImg: string;
  nickName: string;
}

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
  const {run: runQueryFollowMe} = useRequest(queryFollowedMe.url);
  const {run: runFollow} = useRequest(follow.url);

  const FollowItem = ({item}: {item: ItemProps}) => {
    return (
      <View style={styles.item}>
        <CFastImage
          url={item.headImg}
          styles={{
            width: 52,
            height: 52,
            marginRight: 10,
            borderRadius: 52,
          }}
        />
        <View style={styles.rightView}>
          <Text fontSize={'lg'} fontWeight={'bold'}>
            {item.nickName}
          </Text>
          {item.hasFollowed ? (
            <Pressable
              onPress={() => goFollow(item)}
              style={styles.followEdView}>
              <Image
                source={require('../../images/transfer.png')}
                style={{
                  width: 10,
                  height: 8,
                  marginRight: 4,
                }}
                alt="dairy"
              />
              <Text color={'#AAAAAA'}>互相关注</Text>
            </Pressable>
          ) : (
            <Pressable onPress={() => goFollow(item)} style={styles.followView}>
              <Icon name="add" size={20} color="#AF70FF" />
              <Text color={'#AF70FF'}>关注</Text>
            </Pressable>
          )}
        </View>
      </View>
    );
  };

  useFocusEffect(
    React.useCallback(() => {
      _getList();
    }, [params]),
  );

  const goFollow = async (item: ItemProps) => {
    const {success} = await runFollow({
      relateUserId: item.id,
      cancel: item.hasFollowed,
    });
    if (success) {
      _getList();
    }
  };

  const _getList = async () => {
    try {
      const data = await runQueryFollowMe(params);
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
        <FollowItem item={item} />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
  },
  rightView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#EDEDED',
    height: '100%',
    alignItems: 'center',
  },
  followView: {
    borderColor: '#AF70FF',
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  followEdView: {
    backgroundColor: '#DDDDDD',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
