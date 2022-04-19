/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  Box,
  Pressable,
  Text,
  HStack,
  useDisclose,
  Actionsheet,
  FlatList,
  VStack,
} from 'native-base';
import {useFocusEffect} from '@react-navigation/native';

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CFastImage from '../../components/CFastImage';
import Icon from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import LinearGradient from 'react-native-linear-gradient';
import {StyleSheet, useWindowDimensions} from 'react-native';
import useRequest from '../../hooks/useRequest';
import {queryFemaleUser} from '../../api/user';
import {
  pageConstant,
  PageEmpty,
  PageError,
  PageLoadAll,
  PageLoading,
  PageLoadMore,
} from '../../components/base/Pagination';
import {querySysDic} from '../../api/common';
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

interface GradeProps {
  id: string;
  name: string;
  code: string;
}

const Home = ({...props}) => {
  const {width, height} = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const {isOpen, onOpen, onClose} = useDisclose();
  const [params, setParams] = useState({
    pageNum: 1, //分页页码
    pageSize: 10, //每页大小
    grade: '', //年级 即为选中的tab
    orders: [
      {
        column: 'createTime', //排序字段名称
        dir: 'desc', //排序方向，asc=顺序、desc=倒序，默认为顺序
        chinese: false, //是否为中文排序，默认为否
      },
    ], //排序参数列表
  });
  const [grades, setGrades] = useState([]); // 渲染的年纪列表
  const [queryList, setList] = useState([]); // 动态列表
  const [pageStatus, setPageStatus] = useState(IS_LOADDING); // 页面状态
  const [pagingStatus, setPagingStatus] = useState(''); // 分页状态
  const {result: gradeDicts} = useRequest(
    querySysDic.url,
    {
      pCode: 'GRADE',
    },
    querySysDic.options,
  );
  const {run: runFetchFemaleUser} = useRequest(queryFemaleUser.url);

  useEffect(() => {
    if (gradeDicts) {
      const renderGrades = gradeDicts.slice(1, 4);
      setParams({...params, grade: renderGrades[0].code});
      setGrades(renderGrades);
    }
  }, [gradeDicts]);

  useFocusEffect(
    React.useCallback(() => {
      _getList();
    }, [params]),
  );

  const _getList = async () => {
    try {
      const data = await runFetchFemaleUser(params);
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

  const goDetail = (item: any) => {
    props.navigation.navigate('HomeDetail', {item});
  };

  const _renderItem = ({item, index}: {item: any; index: any}) => {
    return (
      <Pressable
        onPress={() => goDetail(item)}
        style={{
          marginTop: 8,
          borderRadius: 8,
          marginRight: index % 2 === 0 ? 8 : 0,
          overflow: 'hidden',
          position: 'relative',
        }}>
        <CFastImage
          url={item.coverImg}
          styles={{
            width: (width - 24) / 2,
            height: height / 3,
          }}
        />
        <Box style={styles.item_cover}>
          <VStack flex={1} justifyContent={'space-between'}>
            <HStack alignItems={'center'} justifyContent="space-between">
              {/* 离线和热度Tip */}
              {/* {item.online && (
                <HStack
                  px={1.5}
                  borderTopLeftRadius={10}
                  borderBottomRightRadius={10}
                  borderTopRightRadius={2}
                  borderBottomLeftRadius={2}
                  alignItems={'center'}
                  style={{backgroundColor: '#00000060'}}>
                  <Box w={1} h={1} borderRadius="full" bg={'tip.badge'} />
                  <Text ml={1} color={'white'}>
                    在线
                  </Text>
                </HStack>
              )}
              <HStack
                borderWidth={0.5}
                borderColor="border.gray"
                borderRadius={'full'}
                ml="auto"
                px={1.5}
                py={0.5}
                alignItems={'center'}
                justifyContent="space-between">
                <Fontisto name="fire" size={12} color="white" />
                <Text color={'white'} fontSize="xs" ml={1}>
                  {item.hot}
                </Text>
              </HStack> */}
            </HStack>
            <Box
              style={{
                backgroundColor: '#00000030',
                padding: 6,
              }}
              pb={1}>
              <Text fontSize={'md'} color={'white'}>
                {item.nickName}
              </Text>
              <Text color={'white'}>爱好：{item.hobbies || '暂未填写'}</Text>
            </Box>
          </VStack>
        </Box>
      </Pressable>
    );
  };

  const renderList = () => {
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        onRefresh={() => _onRefresh()}
        data={queryList}
        numColumns={2}
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
    <Box flex={1}>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Actionsheet.Item>Delete</Actionsheet.Item>
          <Actionsheet.Item>Share</Actionsheet.Item>
          <Actionsheet.Item>Play</Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
      <LinearGradient
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 0.5}}
        colors={['#B83AF3', '#6950FB']}>
        <Box justifyContent="center" style={{paddingTop: insets.top}}>
          <HStack px={3} style={{height: 52}} alignItems="center">
            {grades &&
              grades.map((item: GradeProps) => (
                <Pressable
                  onPress={() => setParams({...params, grade: item.code})}
                  style={params.grade === item.code ? styles.gradeBg : {}}
                  alignItems={'center'}
                  ml={2}
                  key={item.id}
                  px={3}
                  py={0.5}>
                  <Text
                    color={'white'}
                    opacity={params.grade === item.code ? 1 : 0.5}
                    fontSize={params.grade === item.code ? 'lg' : 'md'}>
                    {item.name}
                  </Text>
                </Pressable>
              ))}
            <Pressable
              flexDirection={'row'}
              onPress={() => onOpen()}
              ml={'auto'}
              alignItems={'center'}>
              <Text color={'white'} fontSize={'md'}>
                全部
              </Text>
              <Icon name={'chevron-down'} size={20} color="#fff" />
            </Pressable>
          </HStack>
        </Box>
      </LinearGradient>
      <Box flex={1} px={2} pb={2}>
        {pageStatus === IS_EMPTY && <PageEmpty />}
        {pageStatus === IS_LIST && renderList()}
        {pageStatus === IS_LOADDING && <PageLoading />}
        {pageStatus === IS_NET_ERROR && <PageError />}
      </Box>
    </Box>
  );
};

export default Home;

const styles = StyleSheet.create({
  gradeBg: {
    backgroundColor: '#FFFFFF50',
    borderRadius: 100,
  },
  item_cover: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});
