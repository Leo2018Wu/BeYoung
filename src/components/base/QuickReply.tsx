import React, {useEffect, useState} from 'react';
import {Box, Center, HStack, Pressable, Text} from 'native-base';
import {connect} from 'react-redux';
import useRequest from '../../hooks/useRequest';
import {fetchQuickReply} from '../../api/quickReply';
import {useNavigation} from '@react-navigation/native';

const Index = ({...props}) => {
  const navigation = useNavigation();

  const [replyList, setReplyList] = useState([]);

  const {run: runFetchQuickReply, result} = useRequest(fetchQuickReply.url);

  useEffect(() => {
    runFetchQuickReply();
  }, []);

  useEffect(() => {
    if (result) {
      setReplyList(result);
    }
  }, [result]);

  const present = (item: object) => {
    props.clickItem(item);
  };

  const closeItem = () => {
    props.closeItem();
  };

  return (
    <Box pb={0} w={'full'}>
      <HStack px={2} py={4} justifyContent="space-between">
        <HStack>
          <Text ml={1} fontSize={'md'} color="#000" fontWeight={'bold'}>
            快捷回复
          </Text>
        </HStack>
      </HStack>
      <HStack flexWrap={'wrap'}>
        {replyList.length ? (
          replyList.map((item: any) => (
            <Pressable
              key={item.id}
              onPress={() => {
                present(item);
              }}
              px={6}
              w="full"
              h={10}
              alignItems="center">
              <Box flex={1} py={0} justifyContent={'space-around'} w="full">
                <Text>{item.content}</Text>
              </Box>
            </Pressable>
          ))
        ) : (
          <Box
            pb={4}
            w={'full'}
            h={'full'}
            flex={1}
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text fontSize={'md'} color={'#000'}>
              暂无快捷回复，请先
            </Text>
            <Text
              onPress={() => {
                closeItem();
                navigation.navigate('QuickReply');
              }}
              fontSize={'md'}
              color={'#8B5CFF'}>
              添加
            </Text>
          </Box>
        )}
      </HStack>
    </Box>
  );
};

export default connect()(Index);
