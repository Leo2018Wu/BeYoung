import React, {useState, useEffect} from 'react';
import {Pressable, StyleSheet, Platform} from 'react-native';
import {
  View,
  Text,
  Box,
  HStack,
  Input,
  ScrollView,
  useToast,
  Button,
} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import {querySysDic} from '../../api/common';
import {addQuickReply, fetchQuickReply} from '../../api/quickReply';
import useRequest from '../../hooks/useRequest';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {getSoftInputModule} from '../../util/getSoftInputModule';

import layout from '../../components/Layout';

const Login = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const Toast = useToast();
  const [list, setList] = useState([]);

  const {run: runQuerySysDic, result} = useRequest(querySysDic.url, {
    pCode: 'QUICK_REPLY_SCENE',
  });
  const {run: runAddQuickReply} = useRequest(addQuickReply.url);
  const {run: runFetchQuickReply} = useRequest(fetchQuickReply.url);

  useEffect(() => {
    if (Platform.OS === 'android') {
      getSoftInputModule(0);
    }
    runQuerySysDic();
  }, []);

  useEffect(() => {
    if (result) {
      let data = [];
      result.forEach((e, index) => {
        if (e.code != 'QUICK_REPLY_SCENE') {
          data.push({
            code: e.code,
            name: e.name,
            content: '',
          });
        }
      });
      setList(data);
      getMyQueryReply(data); // 获取我的快捷回复
    }
  }, [result]);

  const getMyQueryReply = async temp => {
    const {data, success} = await runFetchQuickReply();
    if (data) {
      data.forEach((e, index) => {
        temp[index].content = e.content;
      });
      setList(JSON.parse(JSON.stringify(temp)));
    }
  };

  const change = (text, index) => {
    list[index].content = text;
    setList(JSON.parse(JSON.stringify(list)));
  };

  const submit = async () => {
    const quickReplies = [];
    list.forEach((e, index) => {
      quickReplies.push({
        quickReplyScene: e.code,
        content: e.content,
      });
    });
    const {data, success} = await runAddQuickReply({
      quickReplies,
    });
    if (success) {
      // navigation.goBack();
      Toast.show({
        description: '保存成功',
        placement: 'top',
        duration: 1500,
      });
    }
  };

  return (
    <Box flex={1}>
      <HStack
        h={20}
        alignItems={'center'}
        justifyContent={'center'}
        style={{
          paddingTop: Platform.OS === 'android' ? insets.top : insets.top - 10,
        }}>
        <Pressable
          style={{
            width: 24,
            height: 24,
            left: 20,
            top: 45,
            position: 'absolute',
            zIndex: 10,
          }}
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name="arrow-back" size={24} color="#000" />
        </Pressable>
        <Text fontSize={'md'} fontWeight="bold">
          快捷回复
        </Text>
        <Button
          onPress={() => submit()}
          style={{
            backgroundColor: '#9650FF',
            position: 'absolute',
            right: 16,
            top: '25%',
            transform: [
              {
                translateY: 28,
              },
            ],
          }}>
          <Text fontWeight={'bold'} color={'white'} fontSize="xs">
            保存
          </Text>
        </Button>
      </HStack>
      <ScrollView style={styles.quickContain}>
        <View
          style={{
            paddingBottom: 20,
            backgroundColor: '#fff',
          }}>
          {list &&
            list.map((item, index) => {
              return (
                <View key={index}>
                  <Text style={styles.quickTitle}>{item.name}</Text>
                  <Input
                    value={item.content}
                    height={38}
                    onChangeText={text => change(text, index)}
                    variant="outline"
                    placeholder="添加你的回复..."
                    fontSize={14}
                    borderRadius={10}
                    borderColor={'#C7C4CC'}
                  />
                </View>
              );
            })}
        </View>
      </ScrollView>
    </Box>
  );
};

export default Login;

const styles = StyleSheet.create({
  quickContain: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 30,
  },
  quickTitle: {
    fontWeight: 'bold',
    color: '#252222',
    fontSize: 18,
    marginBottom: 15,
    marginVertical: 20,
  },
});
