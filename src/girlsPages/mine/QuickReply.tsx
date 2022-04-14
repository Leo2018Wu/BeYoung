import React, {useState, useEffect} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {
  View,
  Text,
  Input,
  ScrollView,
  NativeBaseProvider,
  useToast,
} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import {querySysDic} from '../../api/common';
import {addQuickReply, fetchQuickReply} from '../../api/quickReply';
import useRequest from '../../hooks/useRequest';

import layout from '../../components/Layout';

const Login = () => {
  const Toast = useToast();
  const [goodsName, setGoodsName] = useState('');
  const [list, setList] = useState([]);

  const {run: runQuerySysDic, result} = useRequest(querySysDic.url, {
    pCode: 'QUICK_REPLY_SCENE',
  });
  const {run: runAddQuickReply} = useRequest(addQuickReply.url);
  const {run: runFetchQuickReply} = useRequest(fetchQuickReply.url);

  useEffect(() => {
    runQuerySysDic();
  }, []);

  useEffect(() => {
    if (result) {
      console.log('-快捷-result--', result);
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

  const submit = async () => {
    let index = list.findIndex(e => {
      return e.content;
    });
    console.log(list, index);
    if (index != -1) {
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
        Toast.show({
          description: data,
          duration: 3000,
          placement: 'top',
        });
      }
    } else {
      Toast.show({
        description: '请添加快捷回复',
        placement: 'top',
      });
    }
  };

  return (
    <NativeBaseProvider>
      <ScrollView style={styles.quickContain}>
        <View
          style={{
            paddingBottom: 20,
            height: layout.height - 160,
            backgroundColor: '#fff',
          }}>
          {list &&
            list.map((item, index) => {
              return (
                <View>
                  <Text style={styles.quickTitle}>{item.name}</Text>
                  <Input
                    value={item.content}
                    onChangeText={text => {
                      list[index].content = text;
                      setList(JSON.parse(JSON.stringify(list)));
                    }}
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
        <View style={styles.btnView}>
          <Pressable onPress={() => submit()}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#D988FF', '#8B5CFF']}
              style={styles.linearGradient}>
              <Text style={styles.buttonText}>保存</Text>
            </LinearGradient>
          </Pressable>
        </View>
      </ScrollView>
    </NativeBaseProvider>
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
  linearGradient: {
    width: '90%',
    marginLeft: '5%',
    marginVertical: 20,
    borderRadius: 28,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    height: 56,
    lineHeight: 56,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});
