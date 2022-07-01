import React, {useState} from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';
import {Image, Text, Pressable} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomFuncFlatList from '../../components/CustomFuncFlatList';
import {queryFollowedMe, follow} from '../../api/common';
import CFastImage from '../../components/CFastImage';
import useRequest from '../../hooks/useRequest';

const App = () => {
  const [keyData, setKeyData] = useState(0);
  const {run: runFollow} = useRequest(follow.url);

  const goFollow = async item => {
    const {data, success} = await runFollow({
      relateUserId: item.id,
      cancel: item.hasFollowed,
    });
    if (success) {
      setKeyData(Math.random());
    }
  };

  const Item = ({item}) => {
    return (
      <View style={styles.item}>
        <CFastImage
          url={item.headImg}
          styles={{
            width: 52,
            height: 52,
            marginRight: 10,
          }}
        />
        <View style={styles.rightView}>
          <Text fontSize={'lg'} fontWeight={'bold'}>
            {item.nickName}
          </Text>
          {item.hasFollowed ? (
            <Pressable
              onPress={() => goFollow(item)}
              style={styles.followEdView}>
              <Image
                source={require('../assets/each.png')}
                style={{
                  width: 10,
                  height: 8,
                  marginRight: 4,
                }}
                alt="dairy"
              />
              <Text color={'#AAAAAA'}>互相关注</Text>
            </Pressable>
          ) : (
            <Pressable onPress={() => goFollow(item)} style={styles.followView}>
              <Icon name="add" size={20} color="#AF70FF" />
              <Text color={'#AF70FF'}>关注</Text>
            </Pressable>
          )}
        </View>
      </View>
    );
  };

  const renderItem = ({item}) => <Item item={item} />;

  return (
    <SafeAreaView style={styles.container}>
      <CustomFuncFlatList
        key={keyData}
        renderItem={renderItem}
        url={queryFollowedMe.url}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  title: {
    fontSize: 32,
  },
  rightView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#EDEDED',
    height: '100%',
    alignItems: 'center',
  },
  followView: {
    borderColor: '#AF70FF',
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  followEdView: {
    backgroundColor: '#DDDDDD',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default App;
