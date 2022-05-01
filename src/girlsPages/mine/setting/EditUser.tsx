import React, {useEffect, useState} from 'react';
import {Box, Button, HStack, Input, Text} from 'native-base';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {updateUserInfo} from '../../../api/common';
import useRequest from '../../../hooks/useRequest';

const Index = ({...props}) => {
  const params = props.route.params;
  const insets = useSafeAreaInsets();
  const [editType, setType] = useState('');
  const [inputValue, setValue] = useState(params.value);
  const [changeStatus, setStatus] = useState(false);
  const {run} = useRequest(updateUserInfo.url);

  useEffect(() => {
    setType(params.type);
  }, []);

  useEffect(() => {
    setStatus(inputValue !== params.value);
  }, [inputValue]);

  const edit = async () => {
    switch (params.type) {
      case '昵称':
        await run({nickName: inputValue});
        break;
      case '微信号':
        await run({weChat: inputValue});
        break;
      case 'QQ号':
        await run({qq: inputValue});
        break;
      default:
        break;
    }
    props.navigation.goBack();
  };

  return (
    <Box flex={1}>
      <HStack
        h={20}
        alignItems={'center'}
        justifyContent={'center'}
        style={{paddingTop: insets.top}}>
        <Text fontSize={'md'} fontWeight="bold">
          编辑{editType}
        </Text>
        {changeStatus && (
          <Button
            onPress={() => edit()}
            w={16}
            h={8}
            style={{
              backgroundColor: '#9650FF',
              position: 'absolute',
              right: 16,
              top: '25%',
              transform: [
                {
                  translateY: 28,
                },
              ],
            }}>
            <Text
              fontWeight={'bold'}
              color={'white'}
              fontSize="sm"
              lineHeight={16}>
              完成
            </Text>
          </Button>
        )}
      </HStack>
      {editType === '昵称' && (
        <HStack px={4} alignItems={'center'} h={16}>
          <Text fontWeight={'bold'} fontSize={'md'}>
            昵称：
          </Text>
          <Input
            clearButtonMode="while-editing"
            onChangeText={e => setValue(e)}
            flex={1}
            maxLength={13}
            fontSize={'md'}
            value={inputValue}
            placeholder="请输入昵称"
          />
        </HStack>
      )}
      {editType === '微信号' && (
        <HStack px={4} alignItems={'center'} h={16}>
          <Text fontWeight={'bold'} fontSize={'md'}>
            微信号：
          </Text>
          <Input
            clearButtonMode="while-editing"
            onChangeText={e => setValue(e)}
            keyboardType="phone-pad"
            flex={1}
            fontSize={'md'}
            value={inputValue}
            placeholder="请输入微信号"
          />
        </HStack>
      )}
      {editType === 'QQ号' && (
        <HStack px={4} alignItems={'center'} h={16}>
          <Text fontWeight={'bold'} fontSize={'md'}>
            QQ号：
          </Text>
          <Input
            clearButtonMode="while-editing"
            onChangeText={e => setValue(e)}
            keyboardType="phone-pad"
            flex={1}
            fontSize={'md'}
            value={inputValue}
            placeholder="请输入QQ号"
          />
        </HStack>
      )}
    </Box>
  );
};

export default Index;
