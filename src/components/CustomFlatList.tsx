import React from 'react';
import {Box, Center, Spinner, Text} from 'native-base';
import {FlatList} from 'react-native';
import fetchData from '../util/request';

const DEFAULT_SIZE = 10;
//分页
const PAGE_IS_LOADING = 'pageIsLoading';
const PAGE_IS_NEXTPAGE = 'pageIsNextPage';
const PAGE_IS_END = 'pageIsEnd';
//页面
const IS_EMPTY = 'isEmpty';
const IS_LOADDING = 'isLoadding';
const IS_NET_ERROR = 'isNetError';
const IS_LIST = 'isList';

const mergeList = (sourceList: any, nowList: any) => {
  if (sourceList) {
    nowList = sourceList.concat(nowList);
    return nowList;
  }
  return nowList;
};

export default class CustomFlatList extends React.Component<any, any> {
  state = {
    pageNum: 1,
    pageSize: DEFAULT_SIZE,
    isPage: true, // 是否分页
    // total: 0, // 列表总数
    pagingStatus: '', //
    pageStatus: IS_LOADDING, // 页面状态
    // position: 0,
    refreshing: false,
    queryList: [], // 获取到的列表
  };

  async componentDidMount() {
    await this._getList();
  }
  // 获取列表数据
  _getList = async () => {
    try {
      let isPage = this.props.isPage || this.state.isPage;
      const {api} = this.props;
      let req; // 传入请求的body参数
      if (isPage) {
        // 分页时请求额外带上书分页相关参数
        const {pageNum, pageSize} = this.state;
        req = Object.assign(api.params, {pageNum, pageSize});
        console.log('req', req);
        const data = await fetchData(api.url, api.params);
        this._dealData(data);
      } else {
        // 不分页时
      }
    } catch (error) {
      // 错误信息 比如网络错误
      this.setState({pageStatus: IS_NET_ERROR});
    }
  };

  // 处理页面数据及状态
  _dealData = async (result: any) => {
    const {data, total} = result;
    const {queryList, pageNum} = this.state;
    console.log('[][[]][', total, data);
    if (data.length === 0) {
      this.setState({
        pageStatus: IS_EMPTY,
      });
      return;
    }
    let isPage = this.props.isPage || this.state.isPage;
    if (isPage) {
      const isNextPage = data.length < total; // 是否有下一页
      this.setState({
        pagingStatus: isNextPage ? PAGE_IS_NEXTPAGE : PAGE_IS_END,
      });
      this.setState({
        queryList: pageNum <= 1 ? data : mergeList(queryList, data),
        pageStatus: IS_LIST,
      });
    }
  };

  _onRefresh = async () => {
    this.setState(
      {
        pageNum: 1,
      },
      () => {
        this._getList();
      },
    );
  };

  _loadMore = async () => {
    // 此时加载下一页数据 合并前一页数据
  };

  renderEmpty = () => {
    return (
      <Center my={4} flex={1}>
        <Text>暂无数据</Text>
      </Center>
    );
  };

  renderLoadAll = () => {
    return (
      <Box my={4} alignItems={'center'}>
        <Text>已全部加载</Text>
      </Box>
    );
  };
  renderLoadMore = () => {
    return (
      <Box my={4} alignItems={'center'}>
        <Text>加载更多</Text>
      </Box>
    );
  };

  renderError = () => {
    return <Text>网络错误</Text>;
  };

  renderLoading = () => {
    return (
      <Center flex={1}>
        <Spinner color="primary.100" size={'lg'} />
      </Center>
    );
  };

  renderFooter = () => {
    // 区分分页和不分页
    const {pagingStatus} = this.state;
    let isPage = this.props.isPage || this.state.isPage;
    if (!isPage) {
      // 不分页时展示已加载全部
      return this.renderLoadAll();
    }
    switch (pagingStatus) {
      case PAGE_IS_LOADING:
        return this.renderLoading();
      case PAGE_IS_NEXTPAGE:
        return this.renderLoadMore();
      case PAGE_IS_END:
        return this.renderLoadAll();
      default:
        return null;
    }
  };

  renderList = () => {
    const {renderItem, contianerStyle} = this.props;
    const {queryList, refreshing} = this.state;
    return (
      <FlatList
        contentContainerStyle={contianerStyle}
        onRefresh={this._onRefresh}
        data={queryList}
        ListEmptyComponent={this.renderEmpty}
        refreshing={refreshing}
        renderItem={renderItem}
        ListFooterComponent={this.renderFooter}
        keyExtractor={(item, index) => `key${index}`}
        onEndReached={this._onEndReached}
        onEndReachedThreshold={0.2}
      />
    );
  };
  _onEndReached = () => {
    const {pagingStatus} = this.state;
    if (pagingStatus === PAGE_IS_NEXTPAGE) {
      this._loadMore();
    }
  };

  render() {
    const {pageStatus} = this.state;
    return (
      <Box flex={1}>
        {pageStatus === IS_EMPTY && this.renderEmpty()}
        {pageStatus === IS_LIST && this.renderList()}
        {pageStatus === IS_LOADDING && this.renderLoading()}
        {pageStatus === IS_NET_ERROR && this.renderError()}
      </Box>
    );
  }
}
