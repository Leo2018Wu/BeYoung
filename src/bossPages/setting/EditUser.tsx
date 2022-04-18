import React, {useEffect, useState} from 'react';
import {Box, Button, HStack, Input, Text} from 'native-base';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {updateUserInfo} from '../../api/common';
import useRequest from '../../hooks/useRequest';
import {getMyInfo} from '../../store/action/index.js';
import {useDispatch} from 'react-redux';

const Index = ({...props}) => {
  const params = props.route.params;
  const dispatch = useDispatch();
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
    const {success} = await run({nickName: inputValue});
    if (success) {
      dispatch(getMyInfo());
      props.navigation.goBack();
    }
  };

  return (
    <Box flex={1}>
      <HStack
        h={20}
        alignItems={'center'}
        justifyContent={'center'}
        style={{paddingTop: insets.top}}>
        <Text fontSize={'md'} fontWeight="bold">
          {editType === 'nickName' ? '编辑昵称' : '更换头像'}
        </Text>
        {changeStatus && (
          <Button
            onPress={() => edit()}
            w={12}
            h={8}
            style={{
              backgroundColor: '#9650FF',
              position: 'absolute',
              right: 16,
              top: '50%',
              transform: [
                {
                  translateY: 32,
                },
              ],
            }}>
            <Text fontWeight={'bold'} color={'white'} fontSize="sm">
              完成
            </Text>
          </Button>
        )}
      </HStack>
      {editType === 'nickName' && (
        <HStack px={4} alignItems={'center'} h={16}>
          <Text fontWeight={'bold'} fontSize={'md'}>
            昵称：
          </Text>
          <Input
            clearButtonMode="while-editing"
            onChangeText={e => setValue(e)}
            flex={1}
            fontSize={'md'}
            value={inputValue}
            placeholder="请输入昵称"
          />
        </HStack>
      )}
    </Box>
  );
};

export default Index;
