import React, {useState} from 'react';
import {KeyboardAvoidingView, Platform} from 'react-native';
import {Pressable, HStack, Input} from 'native-base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';

const Index = ({pressCb}: {pressCb: Function}) => {
  const insets = useSafeAreaInsets();
  const [textValue, setValue] = useState(''); // 输入框内容
  const userInfo = useSelector(state => state.user.myUserInfo);

  const sendMsg = (type = 'text') => {
    if (type === 'text') {
      pressCb({type: 'text', value: textValue});
      setValue('');
    } else {
      pressCb({type});
    }
  };

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={90}
      behavior={Platform.OS === 'ios' ? 'position' : 'height'}
      contentContainerStyle={{
        width: '100%',
        position: 'absolute',
        bottom: 0,
        left: 0,
      }}>
      <HStack
        shadow={2}
        alignItems="center"
        w={'full'}
        h={16}
        px={4}
        style={{
          paddingBottom: insets.bottom + 10,
          backgroundColor: '#fff',
        }}>
        <FontAwesome5 name="smile" size={28} color="#C1C0C9" />
        {userInfo.gender === 'GENDER_MALE' && (
          <Pressable onPress={() => sendMsg('gift')} ml={4}>
            <Ionicons name="gift" size={26} color="#9650FF" />
          </Pressable>
        )}
        <Input
          multiline
          enablesReturnKeyAutomatically={true}
          returnKeyType="send"
          onSubmitEditing={() => {
            sendMsg();
          }}
          blurOnSubmit
          fontSize={'sm'}
          variant="filled"
          mx={4}
          type="text"
          textAlignVertical="top"
          h={8}
          onChangeText={e => setValue(e)}
          value={textValue}
          maxLength={300}
          placeholder="输入你的评论..."
          placeholderTextColor={'tip.placeholder'}
          flex={1}
        />
        {textValue ? (
          <FontAwesome
            onPress={() => sendMsg()}
            name="send"
            size={24}
            color="#9650FF"
          />
        ) : null}
      </HStack>
    </KeyboardAvoidingView>
  );
};

export default Index;
