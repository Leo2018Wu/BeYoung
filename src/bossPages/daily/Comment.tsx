import React, {useEffect, useState} from 'react';
import {DeviceEventEmitter, Image} from 'react-native';
import {HStack, Box, Text, VStack} from 'native-base';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/AntDesign';
import CFastImage from '../../components/CFastImage';
import CustomFuncFlatList from '../../components/CustomFuncFlatList';
import {queryComment} from '../../api/daily';
import DailyDetailContext from './context';
import {useSelector} from 'react-redux';
import emojiObj from '../../res/emoji';

interface ItemProps {
  content: string;
  delFlag: boolean;
  headImg: string;
  nickName: string;
  createTime: string;
  userId: string;
}

const GenContent = ({...props}) => {
  const {emoji} = emojiObj.emojiList;
  let {showText} = props;
  const showTextArray = [];
  if (/\[[^\]]+\]/.test(showText)) {
    const emojiItems = showText.match(/\[[^\]]+\]/g);
    emojiItems.forEach((item: string) => {
      const wordIndex = showText.indexOf(item);
      if (wordIndex > 0) {
        showTextArray.push(showText.substr(0, wordIndex));
        showText = showText.substr(wordIndex);
      }
      showTextArray.push(item);
      showText = showText.substr(item.length);
    });
  }
  if (showText.length > 0) {
    showTextArray.push(showText);
  }
  return (
    <HStack my={3} mx={4} alignItems={'center'}>
      {showTextArray.map((item, index) => {
        const id = `${item}${index}`;
        if (emoji[item]) {
          return (
            <Image
              key={id}
              source={emoji[item].img}
              style={{width: 5 * 5, height: 5 * 5}}
            />
          );
        }
        return (
          <Text key={id} fontSize={'sm'}>
            {item}
          </Text>
        );
      })}
    </HStack>
  );
};

const areEqual = (pre: any, next: any) => {
  // 优化无关渲染
  return JSON.stringify(pre.item) === JSON.stringify(next.item);
};

const Item = React.memo(({item}: {item: ItemProps}) => {
  const userInfo = useSelector(state => state.user.myUserInfo);
  if (item.delFlag) {
    return null;
  }
  return (
    <Box mb={4}>
      <HStack mb={2} alignItems="center">
        <CFastImage
          url={item.headImg}
          styles={{
            width: 40,
            height: 40,
            borderRadius: 20,
          }}
        />
        <VStack flex={1} mr={'auto'} ml={2} justifyContent={'space-between'}>
          <HStack>
            <Text
              fontSize={'md'}
              style={{
                color: '#8E8895',
              }}>
              {item.nickName || '青回'}
            </Text>
            {item.userId === userInfo.id && (
              <Box
                borderRadius={3}
                px={1.5}
                alignSelf={'center'}
                py={0.5}
                bg="primary.100">
                <Text fontSize={'2xs'} color="white">
                  自己
                </Text>
              </Box>
            )}
          </HStack>
          <Text
            fontSize={'xs'}
            style={{
              color: '#C7C4CC',
            }}>
            {item.createTime}
          </Text>
        </VStack>
        {/* 暂时不支持点赞评论 */}
        {/* <HStack alignItems={'center'}>
          {false ? (
            <Icon name="heart" size={18} color="#9650FF" />
          ) : (
            <Icon name="hearto" size={18} color="#C7C4CC" />
          )}
          <Text ml={1} fontSize={'md'} style={{color: '#D4D4D4'}}>
            24
          </Text>
        </HStack> */}
      </HStack>
      <GenContent showText={item.content} />
      {/* <Text fontSize={'md'} color={'fontColors.333'} style={{marginLeft: 48}}>
        {item.content}

      </Text> */}
    </Box>
  );
}, areEqual);

const Index = () => {
  const insets = useSafeAreaInsets();
  const [keyData, setKeyData] = useState(0);
  useEffect(() => {
    DeviceEventEmitter.addListener('REPLY_REFRESH', res => {
      setKeyData(res);
      DeviceEventEmitter.removeListener('REPLY_REFRESH', () => {});
    });
  }, []);

  return (
    <Box flex={1}>
      <Box
        px={3}
        flex={1}
        style={
          {
            // paddingBottom: insets.bottom + 64,
          }
        }>
        {/* <Text mb={2} fontSize={'md'}>
          最新评论
        </Text> */}
        <DailyDetailContext.Consumer>
          {value => {
            return (
              <CustomFuncFlatList
                key={keyData}
                url={queryComment.url}
                par={{
                  dynamicId: value?.id,
                }}
                renderItem={({item}: {item: ItemProps}) => <Item item={item} />}
              />
            );
          }}
        </DailyDetailContext.Consumer>
      </Box>
    </Box>
  );
};
export default Index;
