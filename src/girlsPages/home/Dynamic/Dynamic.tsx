import React, {useState, useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import {View, FlatList} from 'native-base';
import DynamicItem from './DynamicItem';
import {queryMyDynamic} from '../../api/dynamic';
import useRequest from '../../../hooks/useRequest';
import {useCountdown} from '../../../hooks/useTimeDown';

const Login = ({navigation}: any) => {
  const [showLoading, setLoading] = useState(false);
  const [listData, setList] = useState([
    {id: 0},
    {id: 1},
    {id: 2},
    {id: 3},
    {id: 3},
    {id: 4},
  ]);
  const [total, setTotal] = useState(null);
  const [params, setParams] = useState({
    pageNum: 1,
    pageSize: 10,
    orders: [
      {
        column: 'createTime',
        dir: 'desc',
        chinese: false,
      },
    ],
  });

  // const {run: runQueryMyDynamic, result} = useRequest(
  //   queryMyDynamic.url,
  //   params,
  // );

  // useFocusEffect(
  //   React.useCallback(() => {
  //     runQueryMyDynamic();
  //   }, [runQueryMyDynamic]),
  // );

  // useEffect(() => {
  //   runQueryMyDynamic();
  //   if (result) {
  //     setList(result);
  //     console.log('--result--', result);
  //   }
  // }, []);

  return (
    <View>
      <FlatList
        contentContainerStyle={styles.main}
        data={listData}
        onEndReachedThreshold={0.1}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => <DynamicItem item={item} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  main: {},
});
