import React, {useState} from 'react';
import {Box, HStack, ScrollView, View, Pressable, Text} from 'native-base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icons from 'react-native-vector-icons/AntDesign';
import ReplyEmoj from './ReplyEmoj';

import {emojiList} from '../../util/emoji';
import {TouchableOpacity, StyleSheet, useWindowDimensions} from 'react-native';
import {useSelector} from 'react-redux';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Index = ({onSelectEmoji, onSelectPackage}) => {
  const {width} = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const EMOJI_WIDTH = (width - 24) / 8;
  const EMOJI_HEIGHT = EMOJI_WIDTH;
  const [activitIndex, setActivitIndex] = useState(0);
  const userInfo = useSelector(state => state.user.myUserInfo);

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
      <ScrollView
        contentContainerStyle={{paddingBottom: insets.bottom}}
        bg={'bg.f5'}
        showsVerticalScrollIndicator
        px={3}>
        <HStack flexWrap={'wrap'}>
          {activitIndex === 0 &&
            emojiList &&
            emojiList.map((item, index) => (
              <TouchableOpacity
                onPress={() => onSelectEmoji(item)}
                key={`emoji${index}`}
                style={{
                  width: EMOJI_WIDTH,
                  height: EMOJI_HEIGHT,
                }}>
                <Text fontSize={'2xl'}>{item}</Text>
              </TouchableOpacity>
            ))}
          {activitIndex === 1 ? (
            <ReplyEmoj
              clickItem={(item: object) => {
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
