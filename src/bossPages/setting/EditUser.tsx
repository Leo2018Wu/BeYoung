import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  Actionsheet,
  Box,
  HStack,
  Input,
  Pressable,
  StatusBar,
  Text,
  useDisclose,
} from 'native-base';
import {updateUserInfo} from '../../api/common';
import useRequest from '../../hooks/useRequest';
import CFastImage from '../../components/CFastImage';
import Icon from 'react-native-vector-icons/Feather';
import {getMyInfo} from '../../store/action/index';
import {useDispatch} from 'react-redux';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useWindowDimensions} from 'react-native';
import {openPicker, openCamera} from '../../util/cameraPhoto';
import {upload} from '../../util/newUploadOSS';

const Index = ({...props}) => {
  const params = props.route.params;
  const insets = useSafeAreaInsets();
  const {width} = useWindowDimensions();
  const dispatch = useDispatch();
  const [inputValue, setValue] = useState(params.value);
  const [changeStatus, setStatus] = useState(false);
  const {run} = useRequest(updateUserInfo.url);
  const [selectImg, setImg] = useState(''); // 选中的图片地址
  const {isOpen, onOpen, onClose} = useDisclose();

  const HeaderRight = () => {
    if (params.type === 'headImg') {
      return (
        <Pressable
          onPress={() => onOpen()}
          w={12}
          h={8}
          borderRadius={4}
          justifyContent="center"
          alignItems={'center'}>
          <Icon name="more-horizontal" size={24} color="#b2b2b2" />
        </Pressable>
      );
    }
    if (!changeStatus) {
      return <Box w={12} />;
    }
    return (
      <Pressable
        onPress={() => edit()}
        w={12}
        h={8}
        borderRadius={4}
        justifyContent="center"
        alignItems={'center'}
        bg={changeStatus ? 'primary.100' : 'white'}>
        <Text fontWeight={'bold'} color={'white'} fontSize="sm">
          完成
        </Text>
      </Pressable>
    );
  };

  useEffect(() => {
    setStatus(inputValue !== params.value);
  }, [inputValue]);

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => <HeaderRight value={inputValue} />,
    });
  }, [changeStatus, inputValue]);

  useLayoutEffect(() => {
    if (params.type === 'nickName') {
      props.navigation.setOptions({
        title: '设置昵称',
      });
    } else {
      props.navigation.setOptions({
        title: '个人头像',
        headerStyle: {backgroundColor: '#000000'},
        headerTintColor: '#b2b2b2',
      });
    }
  }, []);

  const edit = async (imgKey = '') => {
    if (!changeStatus && params.type !== 'headImg') {
      return;
    }
    if (imgKey) {
      // 此时为更新头像
      const {success} = await run({headImg: imgKey});
      if (success) {
        dispatch(getMyInfo());
      }
    } else {
      const {success} = await run({nickName: inputValue});
      if (success) {
        dispatch(getMyInfo());
        props.navigation.goBack();
      }
    }
  };

  const choosePhoto = async () => {
    try {
      const {path} = await openPicker();
      onClose();
      const imgKey = await upload({path});
      edit(imgKey);
      setImg(path);
    } catch (error) {
      console.error(error);
    }
  };

  const cameraPhoto = async () => {
    try {
      const {path} = await openCamera();
      onClose();
      const imgKey = await upload({path});
      edit(imgKey);
      setImg(path);
    } catch (error) {
      console.error(error);
    }
  };

  if (params.type === 'nickName') {
    return (
      <Box flex={1}>
        <HStack px={4} alignItems={'center'} h={16}>
          <Text fontWeight={'bold'} fontSize={'md'}>
            昵称：
          </Text>
          <Input
            returnKeyType="send"
            enablesReturnKeyAutomatically={true}
            clearButtonMode="while-editing"
            onChangeText={e => setValue(e)}
            flex={1}
            maxLength={13}
            fontSize={'md'}
            onSubmitEditing={() => {
              edit();
            }}
            value={inputValue}
            placeholder="请输入昵称"
          />
        </HStack>
      </Box>
    );
  }
  if (params.type === 'headImg') {
    return (
      <Box bg={'black'} flex={1}>
        <StatusBar barStyle={'light-content'} />
        <Actionsheet hideDragIndicator isOpen={isOpen} onClose={onClose}>
          <Actionsheet.Content>
            <Actionsheet.Item
              onPress={() => cameraPhoto()}
              justifyContent={'center'}>
              拍照
            </Actionsheet.Item>
            <Actionsheet.Item
              onPress={() => choosePhoto()}
              justifyContent={'center'}>
              从相册选择
            </Actionsheet.Item>
          </Actionsheet.Content>
          <Actionsheet.Footer
            mt={2}
            borderRadius={0}
            style={{
              paddingBottom: insets.bottom,
            }}>
            <Actionsheet.Item
              onPress={() => onClose()}
              justifyContent={'center'}>
              取消
            </Actionsheet.Item>
          </Actionsheet.Footer>
        </Actionsheet>
        <Box flex={1} pt={'30%'}>
          <CFastImage
            url={selectImg || params.value}
            styles={{
              width,
              height: width,
            }}
          />
        </Box>
      </Box>
    );
  }
  return <Box flex={1} />;
};

export default Index;
