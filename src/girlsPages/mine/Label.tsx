import React, {useState, useEffect} from 'react';
import {StyleSheet, ActivityIndicator} from 'react-native';
import {
  View,
  FlatList,
  HStack,
  Pressable,
  Text,
  Box,
  ScrollView,
} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import useRequest from '../../hooks/useRequest';
import {fetchLabels, attachLabels} from '../../api/label';
import Layout from '../../components/Layout';

const Login = ({...props}) => {
  const {navigation, route} = props;
  const insets = useSafeAreaInsets();
  const [tabIndex, setTabIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [value, setValue] = useState('');
  const [labelList, setLabelList] = useState([]); // 需要提交的标签
  const [labelListFlag, setLabelListFlag] = useState(false);
  const [tabsList, setTabsList] = useState([]); // 标签类别名列表
  const [tabsLabelList, setTabsLabelList] = useState([]); // 标签类别名中的列表
  const [subLabelIndex, setSubLabelIndex] = useState(0); // 标签页码
  const [countIndex, setCountIndex] = useState(12); // 每次展示标签数量

  const {run: runFetchLabels, result} = useRequest(fetchLabels.url);
  const {run: runAttachLabels} = useRequest(attachLabels.url);

  useEffect(() => {
    setLabelList(route.params.labelList);
    runFetchLabels();
  }, []);

  useEffect(() => {
    if (result) {
      setTabsList(result);
      getSubLabels(result[0].subLabels, route.params.labelList, subLabelIndex);
    }
  }, [result]);

  // 获取标签栏下面的具体标签
  const getSubLabels = (data, data1, index) => {
    let labelsList = [];
    let j = 0;
    for (let i = index * countIndex; i < data.length; i++) {
      if (j < countIndex) {
        labelsList.push(data[i]);
        j++;
      } else {
        break;
      }
    }
    // 如果是最后一页则回到第一页 否则就跳下一页
    if (subLabelIndex + 1 >= data.length / countIndex) {
      setSubLabelIndex(0);
    } else {
      setSubLabelIndex(subLabelIndex + 1);
    }
    for (let i = 0; i < data1.length; i++) {
      for (let k = 0; k < labelsList.length; k++) {
        if (data1[i].labelId == labelsList[k].id) {
          labelsList[k].flag = true;
        }
      }
    }
    setTabsLabelList(JSON.parse(JSON.stringify(labelsList)));
  };

  // 删除标签
  const delLabel = index => {
    setLabelListFlag(true);
    let index1 = tabsLabelList.findIndex(item => {
      return item.id == labelList[index].id;
    });
    if (index1 != -1) {
      tabsLabelList[index1].flag = false;
      setTabsLabelList([...tabsLabelList]);
    }
    labelList.splice(index, 1);
    setLabelList([...labelList]);
  };

  // 选择具体标签
  const changeItem = index => {
    setLabelListFlag(true);
    tabsLabelList[index].flag = !tabsLabelList[index].flag;
    setTabsLabelList([...tabsLabelList]);
    if (tabsLabelList[index].flag) {
      labelList.push(tabsLabelList[index]);
      setLabelList([...labelList]);
    } else {
      let index1 = labelList.findIndex(item => {
        return item.id == tabsLabelList[index].id;
      });
      delLabel(index1);
    }
  };

  const subAttachLabels = async () => {
    let labelIds = [];
    if (labelList.length) {
      labelList.map(item => {
        if (item.labelId) {
          labelIds.push(item.labelId);
        } else if (item.id) {
          labelIds.push(item.id);
        }
      });
    }
    const {success} = await runAttachLabels({labelIds: labelIds});
    if (success) {
      navigation.goBack();
    }
  };

  const returnLabelList =
    labelList.length &&
    labelList.map((item, index) => {
      return (
        <Pressable
          key={item.id + '0'}
          onPress={() => delLabel(index)}
          style={styles.labelContainView}>
          {item.labelName ? (
            <Text style={styles.labelContainText}>{item.labelName}</Text>
          ) : (
            <Text style={styles.labelContainText}>{item.name}</Text>
          )}
          <Text style={{color: '#FC8308', opacity: 0.5}}> | </Text>
          <Text style={{color: '#FC8308'}}> x </Text>
        </Pressable>
      );
    });

  const returnTabsList =
    tabsList.length &&
    tabsList.map((item, index) => {
      return (
        <Pressable
          key={item.id + '01'}
          onPress={() => {
            setTabIndex(index);
            setSubLabelIndex(0);
            getSubLabels(item.subLabels, labelList, 0);
          }}
          style={styles.tabsItemView}>
          <Text
            style={
              tabIndex == index ? styles.tabsItemTexted : styles.tabsItemText
            }>
            {item.name}
          </Text>
          {tabIndex == index ? (
            <View
              style={{
                width: 20,
                height: 2.5,
                backgroundColor: '#F57882',
              }}
            />
          ) : null}
        </Pressable>
      );
    });

  const returnTabsLabelList =
    tabsLabelList.length &&
    tabsLabelList.map((item, index) => {
      return (
        <>
          <Pressable
            key={item.id + '02'}
            onPress={() => changeItem(index)}
            style={[
              styles.labelContainView,
              item.flag
                ? {backgroundColor: '#FEF1EB'}
                : {backgroundColor: '#F7F7F7'},
            ]}>
            <Text
              style={[
                styles.labelContainText,
                item.flag ? {color: '#FC8308'} : {color: '#282828'},
              ]}>
              {item.name}
            </Text>
          </Pressable>
        </>
      );
    });

  return (
    <>
      {tabsLabelList.length ? (
        <>
          <View style={{backgroundColor: 'white', height: '100%'}}>
            <Box style={{padding: 15}}>
              <HStack
                h={20}
                alignItems={'center'}
                justifyContent={'center'}
                style={{paddingTop: insets.top - 20}}>
                <Pressable
                  style={{
                    width: 24,
                    height: 24,
                    left: 20,
                    top: 35,
                    position: 'absolute',
                    zIndex: 10,
                  }}
                  onPress={() => {
                    navigation.goBack();
                  }}>
                  <Icon name="arrow-back" size={24} color="#000" />
                </Pressable>
                <Text fontSize={'md'} fontWeight="bold">
                  个性标签
                </Text>
                {labelListFlag ? (
                  <Text
                    onPress={() => {
                      subAttachLabels();
                    }}
                    fontWeight={'bold'}
                    color={'#000'}
                    fontSize="sm"
                    lineHeight={16}
                    style={{
                      position: 'absolute',
                      top: 40,
                      right: 16,
                    }}>
                    完成
                  </Text>
                ) : null}
              </HStack>
            </Box>
            <View style={{height: 220}}>
              <View style={styles.labelContain}>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  style={{maxHeight: 250}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                    }}>
                    {labelList.length ? returnLabelList : null}
                  </View>
                </ScrollView>
              </View>
            </View>
            <View>
              <ScrollView
                overScrollMode="always"
                horizontal={true}
                style={styles.tabsView}>
                {tabsList.length ? returnTabsList : null}
              </ScrollView>
              <View
                style={{
                  borderColor: '#E7E7E7',
                  borderWidth: 0.5,
                  width: Layout.width,
                }}
              />
            </View>
            <View style={styles.tabsLabelListContain}>
              <View style={styles.tabsLabelListView}>
                {tabsLabelList.length ? returnTabsLabelList : null}
              </View>
              <Pressable
                onPress={() => {
                  getSubLabels(
                    tabsList[tabIndex].subLabels,
                    labelList,
                    subLabelIndex,
                  );
                }}
                style={styles.refresh}>
                <Icon name="refresh" size={22} color="#F67983" />
                <Text style={{color: '#F67983', fontSize: 14}}>换一批</Text>
              </Pressable>
            </View>
          </View>
        </>
      ) : (
        <ActivityIndicator
          size="large"
          color={'#333'}
          style={{flex: 1, justifyContent: 'center'}}
        />
      )}
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  main: {
    padding: 0,
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: '30%',
  },
  labelContain: {
    borderWidth: 1,
    borderColor: '#E7E7E7',
    width: Layout.width - 30,
    height: 220,
    marginLeft: 15,
    borderRadius: 10,
    padding: 15,
  },
  labelContainView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEF1EB',
    marginBottom: 8,
    paddingHorizontal: 15,
    height: 30,
    borderRadius: 15,
    marginRight: 4,
  },
  labelContainText: {
    color: '#FC8308',
    fontSize: 14,
  },
  tabsView: {
    width: Layout.width - 30,
    marginLeft: 15,
    marginTop: 30,
    height: 30,
  },
  tabsItemView: {
    marginRight: 22,
    alignItems: 'center',
  },
  tabsItemText: {
    color: '#262628',
    fontSize: 16,
  },
  tabsItemTexted: {
    color: '#262628',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tabsLabelListContain: {
    width: Layout.width - 30,
    marginLeft: 15,
    marginTop: 15,
  },
  tabsLabelListView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  creatBtn: {
    position: 'absolute',
    bottom: 20,
    width: Layout.width - 40,
    left: 20,
    borderRadius: 6,
    height: 50,
    backgroundColor: '#F77B85',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: Layout.width - 40,
    backgroundColor: '#fff',
    minHeight: 160,
    borderRadius: 10,
    paddingTop: 28,
    alignItems: 'center',
  },
  textNum: {
    position: 'absolute',
    right: 0,
    top: 15,
    color: '#DDDDDD',
  },
  btnPrimary: {
    width: '100%',
    height: 51,
    lineHeight: 51,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    color: '#F67882',
  },
  btnWarn: {
    width: '100%',
    height: 51,
    lineHeight: 51,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
  },
  btnBox: {
    width: '100%',
    borderColor: '#E0E0E0',
    borderTopWidth: 0.8,
    paddingBottom: 0.8,
    height: 52,
    lineHeight: 52,
  },
  btnTwo: {
    width: '50%',
    height: 51,
  },
  modalContent: {
    color: '#000',
    fontSize: 16,
    width: '100%',
    lineHeight: 24,
    marginBottom: 28,
    borderColor: '#DDDDDD',
    borderBottomWidth: 1,
  },
  modalTitle: {
    color: '#000000',
    fontSize: 20,
  },
  refresh: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
    alignItems: 'center',
  },
});
