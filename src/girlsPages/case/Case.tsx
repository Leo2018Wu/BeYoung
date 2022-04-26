import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {View, Box, Pressable, Text, HStack} from 'native-base';
import CaseItem from './CaseItem';
import CustomFuncFlatList from '../../components/CustomFuncFlatList';
import {queryCase} from '../../api/daily';
import useRequest from '../../hooks/useRequest';
import {querySysDic} from '../../api/common';

const Login = () => {
  const [caseList, setCaseList] = useState([]);
  const [caseScene, setCaseScene] = useState({});
  const [activeCase, setCase] = useState(0);
  const [keyData, setKeyData] = useState(0);
  const {result: sysDicts} = useRequest(
    querySysDic.url,
    {
      pCode: 'CASE_SCENE',
    },
    querySysDic.options,
  );

  useEffect(() => {
    if (sysDicts) {
      let data = [];
      sysDicts.forEach(element => {
        if (element.code != 'CASE_SCENE') {
          data.push(element);
        }
      });
      setCaseList(data);
    }
  }, [sysDicts]);

  useEffect(() => {
    if (sysDicts && caseList) {
      setCaseScene(
        JSON.parse(JSON.stringify({caseScene: caseList[activeCase].code})),
      );
      setKeyData(Math.random());
    }
  }, [activeCase]);

  return (
    <Box flex={1} bg="white">
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 15,
          height: 30,
          alignItems: 'center',
        }}>
        {caseList &&
          caseList.map((item, index1) => (
            <Pressable
              onPress={() => setCase(index1)}
              style={{marginHorizontal: 15, justifyContent: 'center'}}>
              <View>
                <Text
                  style={activeCase == index1 ? styles.texted : styles.text}>
                  {item.name}
                </Text>
              </View>
              {activeCase == index1 ? (
                <View
                  style={{
                    borderColor: '#8B5CFF',
                    borderWidth: 1,
                    width: 20,
                    justifyContent: 'center',
                    alignSelf: 'center',
                  }}
                />
              ) : null}
            </Pressable>
          ))}
      </View>
      <Box my={4} px={4} flex={1}>
        <CustomFuncFlatList
          key={keyData}
          horizontal={false}
          numColumns={2}
          renderItem={({item}: any) => <CaseItem item={item} />}
          url={queryCase.url}
          par={caseScene}
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
  gradeBg: {
    backgroundColor: '#FFFFFF50',
    borderRadius: 100,
  },
  text: {
    color: '#554C5F',
    fontSize: 14,
  },
  texted: {
    color: '#554C5F',
    fontSize: 18,
  },
});
