import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {View, FlatList, Box} from 'native-base';
import CaseItem from './CaseItem';
import CustomFuncFlatList from '../../components/CustomFuncFlatList';
import {queryDynamicCase} from '../../api/daily';

const Login = () => {
  return (
    <Box flex={1} bg="white">
      <Box my={4} px={4} flex={1}>
        <CustomFuncFlatList
          renderItem={({item}: any) => <CaseItem item={item} />}
          url={queryDynamicCase.url}
          par={{caseScene: 'CASE_SCENE_FAIR'}}
        />
      </Box>
    </Box>
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
