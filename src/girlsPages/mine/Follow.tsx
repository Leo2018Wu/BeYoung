import React from 'react';
import {SafeAreaView, View, FlatList, StyleSheet} from 'react-native';
import {Image, Text} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
    flag: true,
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
    flag: true,
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    flag: false,
  },
];

const Item = ({item}) => {
  return (
    <View style={styles.item}>
      <Image
        source={require('../assets/defaultAva.png')}
        style={{
          width: 52,
          height: 52,
          marginRight: 10,
        }}
        alt="dairy"
      />
      <View style={styles.rightView}>
        <Text fontSize={'lg'} fontWeight={'bold'}>
          {item.title}
        </Text>
        {item.flag ? (
          <View style={styles.followEdView}>
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
          </View>
        ) : (
          <View style={styles.followView}>
            <Icon name="add" size={20} color="#AF70FF" />
            <Text color={'#AF70FF'}>关注</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const App = () => {
  const renderItem = ({item}) => <Item item={item} />;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
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
