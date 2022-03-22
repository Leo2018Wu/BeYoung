import React from 'react';
import {Center, Pressable} from 'native-base';

import Icon from 'react-native-vector-icons/Ionicons';
import {StyleSheet} from 'react-native';

type IProps = {
  focus: Boolean;
  onPress: Function;
};

const Index = ({focus, onPress}: IProps) => {
  return (
    <Pressable onPress={() => onPress(!focus)}>
      <Center
        style={!focus ? styles.active : styles.inActive}
        borderRadius={'full'}
        width={5}
        height={5}>
        {focus && <Icon name="checkmark" size={18} color="white" />}
      </Center>
    </Pressable>
  );
};

export default Index;

const styles = StyleSheet.create({
  active: {
    borderWidth: 1,
    borderColor: '#C7C4CC',
  },
  inActive: {
    backgroundColor: '#9650FF',
  },
});
