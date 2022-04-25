import React, {useEffect, useState} from 'react';
import {Box, Button, HStack, Input, Text, useToast} from 'native-base';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {updateUserInfo} from '../../../api/common';
import useRequest from '../../../hooks/useRequest';

const Index = ({...props}) => {
  const params = props.route.params;
  const insets = useSafeAreaInsets();
  const Toast = useToast();
  const [nameValue, setNameValue] = useState(params.value.name);
  const [cardValue, setCardValue] = useState(params.value.cardNum);
  const [phoneValue, setPhoneValue] = useState(params.value.phone);
  const [changeStatus, setStatus] = useState(false);
  const {run} = useRequest(updateUserInfo.url);

  useEffect(() => {
    setStatus(
      nameValue !== params.value.name || cardValue !== params.value.cardNum,
    );
  }, [nameValue, cardValue]);

  const edit = async () => {
    const {data, success} = await run({name: nameValue, cardNum: cardValue});
    if (success) {
      props.navigation.goBack();
    } else {
      Toast.show({
        description: data,
        placement: 'top',
        duration: 1500,
      });
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
          编辑信息
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
      <HStack px={4} alignItems={'center'} h={16}>
        <Text w={85} textAlign={'right'} fontWeight={'bold'} fontSize={'md'}>
          姓名：
        </Text>
        <Input
          clearButtonMode="while-editing"
          onChangeText={e => setNameValue(e)}
          flex={1}
          fontSize={'md'}
          value={nameValue}
          placeholder="请输入姓名"
        />
      </HStack>
      <HStack px={4} alignItems={'center'} h={16}>
        <Text w={85} textAlign={'right'} fontWeight={'bold'} fontSize={'md'}>
          身份证号：
        </Text>
        <Input
          clearButtonMode="while-editing"
          onChangeText={e => setCardValue(e)}
          keyboardType="phone-pad"
          flex={1}
          fontSize={'md'}
          maxLength={18}
          value={cardValue}
          placeholder="请输入身份证号"
        />
      </HStack>
      <HStack px={4} alignItems={'center'} h={16}>
        <Text w={85} textAlign={'right'} fontWeight={'bold'} fontSize={'md'}>
          手机号：
        </Text>
        <Input
          clearButtonMode="while-editing"
          editable={false}
          keyboardType="phone-pad"
          flex={1}
          fontSize={'md'}
          value={phoneValue}
          placeholder="请输入手机号"
        />
      </HStack>
    </Box>
  );
};

export default Index;
