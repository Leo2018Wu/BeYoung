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
  Button,
} from 'native-base';

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CFastImage from '../../components/CFastImage';
import Icon from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import LinearGradient from 'react-native-linear-gradient';
import {StyleSheet, useWindowDimensions} from 'react-native';
import useRequest from '../../hooks/useRequest';
import {getDictName} from '../../util/dictAnaly';
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

interface GradeProps {
  id: string;
  name: string;
  code: string;
}

const mergeList = (sourceList: any, nowList: any) => {
  if (sourceList) {
    nowList = sourceList.concat(nowList);
    return nowList;
  }
  return nowList;
};

const Home = ({...props}) => {
  const NAVLIST = [
    {
      name: '关注',
      key: 'NAV_FOLLOW',
    },
    {
      name: '发现',
      key: 'NAV_FOUND',
    },
  ];
  const {width, height} = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const {isOpen, onOpen, onClose} = useDisclose();
  const [params, setParams] = useState({
    pageNum: 1, //分页页码
    pageSize: 10, //每页大小
    followed: false,
    orders: [
      {
        column: 'createTime', //排序字段名称
        dir: 'desc', //排序方向，asc=顺序、desc=倒序，默认为顺序
        chinese: false, //是否为中文排序，默认为否
      },
    ], //排序参数列表
  });
  const [filterParams, setFilterParams] = useState({
    grade: '',
    profession: '',
  }); // 筛选参数条件
  const [grades, setGrades] = useState([]); // 渲染的年纪列表
  const [queryList, setList] = useState([]); // 动态列表
  const [pageStatus, setPageStatus] = useState(IS_LOADDING); // 页面状态
  const [pagingStatus, setPagingStatus] = useState(''); // 分页状态
  const [navKey, setNavKey] = useState('NAV_FOUND');
  const {result: gradeDicts} = useRequest(
    querySysDic.url,
    {
      pCode: 'GRADE',
    },
    querySysDic.options,
  );
  const {result: professions} = useRequest(
    querySysDic.url,
    {
      pcode: 'PROFESSION',
    },
    querySysDic.options,
  );
  const {run: runFetchFemaleUser} = useRequest(queryFemaleUser.url);

  useEffect(() => {
    if (gradeDicts) {
      const renderGrades = gradeDicts.filter(item => item.pCode !== item.code);
      // setParams({...params, grade: renderGrades[0].code});
      setGrades(renderGrades);
    }
  }, [gradeDicts]);

  useEffect(() => {
    _getList();
  }, [params]);

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

  const goDetail = (userId: string) => {
    props.navigation.navigate('HomeDetail', {userId});
  };

  const _renderItem = ({item, index}: {item: any; index: any}) => {
    return (
      <Pressable
        onPress={() => goDetail(item.id)}
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
              <Text color={'white'}>
                年级：{getDictName(grades, item.grade)}
              </Text>
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
      <Actionsheet hideDragIndicator isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Actionsheet.Item
            _text={{
              fontWeight: 'bold',
            }}
            style={{justifyContent: 'center'}}>
            筛选
          </Actionsheet.Item>
          <HStack w={'full'} mt={3} mb={5}>
            <Text
              w={'15%'}
              ml="auto"
              fontSize={'sm'}
              style={{color: '#484848'}}>
              年级：
            </Text>
            <HStack w={'80%'} flexWrap="wrap">
              {grades &&
                grades.map((item: GradeProps) => (
                  <Pressable
                    onPress={() => {
                      if (filterParams.grade === item.code) {
                        setFilterParams({...filterParams, grade: ''});
                      } else {
                        setFilterParams({...filterParams, grade: item.code});
                      }
                    }}
                    style={[
                      filterParams.grade === item.code
                        ? {backgroundColor: '#9650FF'}
                        : {backgroundColor: '#EEEEEE'},
                      styles.filterItem,
                    ]}
                    alignItems={'center'}
                    ml={2}
                    key={item.id}
                    px={4}
                    py={0.5}>
                    <Text
                      style={
                        filterParams.grade === item.code
                          ? {color: '#fff'}
                          : {color: '#292929'}
                      }
                      opacity={filterParams.grade === item.code ? 1 : 0.5}
                      fontSize="sm">
                      {item.name}
                    </Text>
                  </Pressable>
                ))}
            </HStack>
          </HStack>
          <HStack w={'full'} mb={5}>
            <Text
              w={'15%'}
              ml="auto"
              fontSize={'sm'}
              style={{color: '#484848'}}>
              专业：
            </Text>
            <HStack w={'80%'} flexWrap="wrap">
              {professions &&
                professions.map((item: GradeProps) => (
                  <Pressable
                    onPress={() => {
                      if (filterParams.profession === item.code) {
                        setFilterParams({...filterParams, profession: ''});
                      } else {
                        setFilterParams({
                          ...filterParams,
                          profession: item.code,
                        });
                      }
                    }}
                    style={[
                      filterParams.profession === item.code
                        ? {backgroundColor: '#9650FF'}
                        : {backgroundColor: '#EEEEEE'},
                      styles.filterItem,
                    ]}
                    alignItems={'center'}
                    ml={2}
                    key={item.id}
                    px={4}
                    py={0.5}>
                    <Text
                      style={
                        filterParams.profession === item.code
                          ? {color: '#fff'}
                          : {color: '#292929'}
                      }
                      opacity={filterParams.profession === item.code ? 1 : 0.5}
                      fontSize="sm">
                      {item.name}
                    </Text>
                  </Pressable>
                ))}
            </HStack>
          </HStack>
          <Button
            onPress={() => {
              onClose();
              setParams({...params, ...filterParams});
            }}
            mb={4}
            bgColor={'primary.100'}
            w={'50%'}>
            确定
          </Button>
        </Actionsheet.Content>
      </Actionsheet>
      <LinearGradient
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 0.5}}
        colors={['#B83AF3', '#6950FB']}>
        <Box justifyContent="center" style={{paddingTop: insets.top}}>
          <Box
            flexDirection={'row'}
            px={3}
            justifyContent="center"
            alignItems={'center'}
            w="full"
            style={{
              height: 52,
            }}>
            {NAVLIST.map((ele, idx) => (
              <Pressable
                onPress={() => {
                  setNavKey(ele.key);
                  setParams({...params, followed: idx === 0});
                }}
                px={3}
                key={idx}>
                <Text
                  opacity={navKey === ele.key ? 1 : 0.5}
                  color={'white'}
                  fontSize={navKey === ele.key ? 'lg' : 'md'}>
                  {ele.name}
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
          </Box>
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
  filterItem: {
    borderRadius: 100,
    marginBottom: 10,
  },
  item_cover: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});
