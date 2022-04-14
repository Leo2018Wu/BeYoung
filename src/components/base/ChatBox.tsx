import React, {useRef, useState} from 'react';
import {KeyboardAvoidingView, Platform} from 'react-native';
import {HStack, Input} from 'native-base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Index = () => {
  const insets = useSafeAreaInsets();
  const inputRef = useRef(null);
  const [textValue, setValue] = useState(''); // 输入框内容
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={90}
      behavior={Platform.OS === 'ios' ? 'position' : 'padding'}>
      <HStack
        shadow={2}
        alignItems="center"
        w={'full'}
        px={4}
        py={4}
        style={{
          paddingBottom: insets.bottom,
          backgroundColor: '#fff',
        }}>
        <FontAwesome5 name="smile" size={28} color="#C1C0C9" />
        <Ionicons
          style={{
            marginLeft: 16,
          }}
          name="gift"
          size={26}
          color="#9650FF"
        />
        <Input
          ref={e => (inputRef.current = e)}
          multiline
          enablesReturnKeyAutomatically={true}
          returnKeyType="send"
          onSubmitEditing={() => {
            sendMsg();
            inputRef.current.focus();
          }}
          blurOnSubmit
          fontSize={'md'}
          variant="filled"
          py={2}
          mx={4}
          type="text"
          textAlignVertical="top"
          height="full"
          onChangeText={e => setValue(e)}
          value={textValue}
          maxLength={300}
          placeholder="输入你的评论..."
          placeholderTextColor={'tip.placeholder'}
          flex={1}
        />
        <FontAwesome name="send" size={24} color="#9650FF" />
      </HStack>
    </KeyboardAvoidingView>
  );
};

export default Index;
