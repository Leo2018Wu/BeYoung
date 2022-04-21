import React, {useState, useEffect} from 'react';
import {KeyboardAvoidingView, Platform} from 'react-native';
import {HStack, Input} from 'native-base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import getStorage from '../../util/Storage';

const Index = ({pressCb}: {pressCb: Function}) => {
  const insets = useSafeAreaInsets();
  const [textValue, setValue] = useState(''); // 输入框内容
  const [isBoss, setIsBoss] = useState('MALE_LOGIN');

  const sendMsg = () => {
    pressCb({type: 'text', value: textValue});
    setValue('');
  };

  useEffect(async () => {
    const boss = await getStorage(['LOGIN_NAVIGAITON_NAME']);
    setIsBoss(boss);
  }, []);

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
        px={4}
        py={4}
        style={{
          paddingBottom: insets.bottom + 10,
          backgroundColor: '#fff',
        }}>
        <FontAwesome5 name="smile" size={28} color="#C1C0C9" />

        <Input
          multiline
          enablesReturnKeyAutomatically={true}
          returnKeyType="send"
          onSubmitEditing={() => {
            sendMsg();
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
        {isBoss === 'MALE_LOGIN' && (
          <Ionicons name="gift" size={26} color="#9650FF" />
        )}
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
