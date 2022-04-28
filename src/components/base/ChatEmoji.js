import React, {useEffect, useState} from 'react';
import {Box, HStack, ScrollView, Text} from 'native-base';

import emojiObj from '../../res/emoji';
import {TouchableOpacity, Image} from 'react-native';

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

const Index = ({onSelectEmoji}) => {
  const [emojisMap, setEmojisMap] = useState([]);

  useEffect(() => {
    setEmojisMap(genEmojiList('emoji', emojiObj.emojiList));
  }, []);

  const selectEmoji = key => {
    onSelectEmoji(key);
  };

  return (
    <Box flex={1}>
      <ScrollView bg={'bg.f5'} showsVerticalScrollIndicator px={4}>
        <HStack justifyContent={'space-between'} flexWrap={'wrap'}>
          {Object.keys(emojisMap).map(name => {
            const emojis = emojisMap[name].list;
            return (
              emojis &&
              emojis.map(item => (
                <TouchableOpacity
                  onPress={() => selectEmoji(item.key)}
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
        </HStack>
      </ScrollView>
    </Box>
  );
};

export default Index;
