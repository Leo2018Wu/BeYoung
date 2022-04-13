import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {View, FlatList} from 'native-base';
import CaseItem from './CaseItem';
// import {queryDynamicCase} from '../../api/daily';

const Login = () => {
  const [list, setList] = useState([
    {id: 0},
    {id: 1},
    {id: 2},
    {id: 3},
    {id: 4},
  ]);
  return (
    <View style={{padding: 8}}>
      <FlatList
        contentContainerStyle={styles.main}
        data={list}
        onEndReachedThreshold={0.1}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => <CaseItem item={item} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  main: {
    padding: 0,
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
