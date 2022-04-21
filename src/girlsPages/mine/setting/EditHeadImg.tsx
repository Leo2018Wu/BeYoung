import React, {useEffect, useState} from 'react';
import {Actionsheet, Box, Pressable, StatusBar, useDisclose} from 'native-base';
import {updateUserInfo} from '../../../api/common';
import useRequest from '../../../hooks/useRequest';
import CFastImage from '../../../components/CFastImage';
import Icon from 'react-native-vector-icons/Feather';
import {getMyInfo} from '../../../store/action/index';
import {useDispatch} from 'react-redux';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useWindowDimensions} from 'react-native';
import {openPicker, openCamera} from '../../../util/cameraPhoto';
import {upload} from '../../../util/newUploadOSS';

const Index = ({...props}) => {
  const params = props.route.params;
  const insets = useSafeAreaInsets();
  const {width} = useWindowDimensions();
  const dispatch = useDispatch();
  const {run} = useRequest(updateUserInfo.url);
  const [selectImg, setImg] = useState(''); // 选中的图片地址
  const {isOpen, onOpen, onClose} = useDisclose();

  const HeaderRight = () => {
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
  };

  useEffect(() => {
    props.navigation.setOptions({
      title: '编辑头像',
      headerStyle: {backgroundColor: '#000000'},
      headerTintColor: '#b2b2b2',
      headerRight: () => <HeaderRight />,
    });
  }, []);

  const edit = async (imgKey = '') => {
    const {success} = await run({headImg: imgKey});
    if (success) {
      dispatch(getMyInfo());
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
          <Actionsheet.Item onPress={() => onClose()} justifyContent={'center'}>
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
};
export default Index;
