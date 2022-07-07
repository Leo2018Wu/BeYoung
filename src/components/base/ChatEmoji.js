import React, {useEffect, useState} from 'react';
import {Box, HStack, ScrollView, View, Pressable} from 'native-base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icons from 'react-native-vector-icons/AntDesign';
import ReplyEmoj from './ReplyEmoj';

import emojiObj from '../../res/emoji';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

const genEmojiList = (type, emojiList) => {
  const result = {};
  Object.keys(emojiList).forEach(name => {
    const emojiMap = emojiList[name];
    const list = [];
    Object.keys(emojiMap).forEach(key => {
      list.push({
        type,
        name,
        key,
        img: emojiMap[key].img,
      });
    });
    if (list.length > 0) {
      result[name] = {
        type,
        name,
        list,
        album: list[0].img,
      };
    }
  });

  return result;
};

const Index = ({onSelectEmoji, onSelectPackage}) => {
  const [emojisMap, setEmojisMap] = useState([]);
  const [activitIndex, setActivitIndex] = useState(0);
  const userInfo = useSelector(state => state.user.myUserInfo);

  useEffect(() => {
    setEmojisMap(genEmojiList('emoji', emojiObj.emojiList));
  }, []);

  return (
    <Box flex={1}>
      <View
        flexDirection={'row'}
        padding={2}
        style={{backgroundColor: '#F7F7F9'}}>
        <Pressable
          onPress={() => setActivitIndex(0)}
          style={[
            styles.defStyle,
            activitIndex === 0
              ? {backgroundColor: '#fff'}
              : {backgroundColor: '#F7F7F9'},
          ]}>
          <FontAwesome5 name="smile" size={28} color="#000000" />
        </Pressable>
        {userInfo.gender === 'GENDER_MALE' ? null : (
          <>
            <Pressable
              onPress={() => setActivitIndex(1)}
              style={[
                styles.defStyle,
                activitIndex === 1
                  ? {backgroundColor: '#fff'}
                  : {backgroundColor: '#F7F7F9'},
              ]}>
              <Icons name="hearto" size={26} color="#000000" />
            </Pressable>
            <Pressable
              onPress={() => setActivitIndex(2)}
              style={[
                styles.defStyle,
                activitIndex === 2
                  ? {backgroundColor: '#fff'}
                  : {backgroundColor: '#F7F7F9'},
              ]}>
              <Icons name="staro" size={28} color="#000000" />
            </Pressable>
          </>
        )}
      </View>
      <ScrollView bg={'bg.f5'} showsVerticalScrollIndicator px={2}>
        <HStack justifyContent={'space-between'} flexWrap={'wrap'}>
          {activitIndex === 0 &&
            Object.keys(emojisMap).map(name => {
              const emojis = emojisMap[name].list;
              return (
                emojis &&
                emojis.map(item => (
                  <TouchableOpacity
                    onPress={() => onSelectEmoji(item.key)}
                    key={item.img}
                    style={{
                      width: 40,
                      height: 40,
                      marginHorizontal: 4,
                      marginVertical: 4,
                    }}>
                    <Image
                      source={item.img}
                      style={{width: 6 * 6, height: 6 * 6}}
                    />
                  </TouchableOpacity>
                ))
              );
            })}
          {activitIndex === 1 ? (
            <ReplyEmoj
              clickItem={(item: object) => {
                console.log('---s-s-s-', item);
                onSelectPackage(item.url);
              }}
            />
          ) : null}
        </HStack>
      </ScrollView>
    </Box>
  );
};

export default Index;

const styles = StyleSheet.create({
  defStyle: {
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginRight: 10,
  },
});
