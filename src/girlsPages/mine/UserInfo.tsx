import React, {useCallback, useState} from 'react';
import {View, Text, Image, StyleSheet, Pressable} from 'react-native';
import IconNew from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import useRequest from '../../hooks/useRequest';
import {fetchMyInfo, fetchStatistic} from '../../api/common';
import {useFocusEffect} from '@react-navigation/native';
import CFastImage from '../../components/CFastImage';

const Index = () => {
  const navigation = useNavigation();
  const {result, run} = useRequest(fetchMyInfo.url);
  const {run: runFetchStatistic} = useRequest(fetchStatistic.url, {});
  const [myStatistic, setMyStatistic] = useState({});

  useFocusEffect(
    useCallback(() => {
      run();
      getMyStatistic();
    }, []),
  );

  const getMyStatistic = async () => {
    const {data, success} = await runFetchStatistic();
    if (success) {
      setMyStatistic(data);
    }
  };

  return (
    <View style={styles.userView}>
      <View>
        <Pressable
          onPress={() => navigation.navigate('UserInfoSetting')}
          style={{alignItems: 'center', marginVertical: 20}}>
          {/* <Image
            source={require('../assets/defaultAva.png')}
            style={{
              width: 85,
              height: 85,
            }}
          /> */}
          <CFastImage
            url={result?.headImg}
            styles={{width: 85, height: 85, borderRadius: 50}}
          />
          <View style={styles.editView}>
            <Text style={{color: '#fff', fontSize: 14, marginRight: 8}}>
              {result?.nickName || '请设置昵称'}
            </Text>
            <IconNew name="edit-3" size={14} color="#fff" />
          </View>
        </Pressable>
      </View>
      <View style={styles.itemView}>
        <Pressable
          onPress={() => navigation.navigate('Follow')}
          style={styles.item}>
          <Text style={styles.topText}>{myStatistic.fanNum || 0}</Text>
          <Text style={styles.btmText}>被关注</Text>
        </Pressable>
        <View style={styles.line} />
        <View style={styles.item}>
          <Text style={styles.topText}>{myStatistic.commentNum || 0}</Text>
          <Text style={styles.btmText}>评论</Text>
        </View>
        <View style={styles.line} />
        <Pressable
          onPress={() => navigation.navigate('MineGifts')}
          style={styles.item}>
          <Text style={styles.topText}>{myStatistic.giftNum || 0}</Text>
          <Text style={styles.btmText}>礼物</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  userView: {
    position: 'relative',
    height: '100%',
  },
  contain: {
    flexDirection: 'row',
    width: 60,
    height: 26,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    // top: '10%',
  },
  editView: {
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 10,
    alignItems: 'center',
  },
  itemView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  item: {
    flex: 1,
    alignItems: 'center',
  },
  topText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  btmText: {
    color: '#fff',
    fontSize: 12,
  },
  line: {
    width: 1,
    borderWidth: 0.4,
    height: 16,
    borderColor: '#fff',
    opacity: 0.3,
  },
});
