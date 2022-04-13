import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {View, FlatList, HStack, Pressable, Button, Text} from 'native-base';
import PhotoItem from './PhotoItem';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Login = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [list, setList] = useState([
    {id: 0},
    {id: 1},
    {id: 2},
    {id: 3},
    {id: 4},
  ]);
  return (
    <View style={{padding: 15}}>
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
          精选照片
        </Text>
        <Text
          onPress={() => {
            navigation.navigate('RepairHelp');
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
          修图帮助
        </Text>
      </HStack>
      <FlatList
        contentContainerStyle={styles.main}
        data={list}
        onEndReachedThreshold={0.1}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => <PhotoItem item={item} />}
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
