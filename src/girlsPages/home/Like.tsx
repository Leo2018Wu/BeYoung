import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

const Login = () => {
  const [changedIndex, setChangedIndex] = useState(0);
  const list = [
    {id: 0, name: '动态'},
    {id: 1, name: '礼物'},
    {id: 2, name: '喜欢'},
    {id: 3, name: '评论'},
  ];
  return (
    <View
      style={{
        flexDirection: 'row',
        paddingHorizontal: 15,
        height: 30,
        alignItems: 'center',
      }}>
      {list &&
        list.map((item, index) => (
          <Pressable
            onPress={() => setChangedIndex(index)}
            style={{marginHorizontal: 15, justifyContent: 'center'}}>
            <View>
              <Text style={changedIndex == index ? styles.texted : styles.text}>
                {item.name}
              </Text>
            </View>
            {changedIndex == index ? (
              <View
                style={{
                  borderColor: '#8B5CFF',
                  borderWidth: 1,
                  width: 18,
                  justifyContent: 'center',
                  alignSelf: 'center',
                }}
              />
            ) : null}
          </Pressable>
        ))}
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  text: {
    color: '#554C5F',
    fontSize: 16,
  },
  texted: {
    color: '#554C5F',
    fontSize: 20,
  },
  changed: {},
});
