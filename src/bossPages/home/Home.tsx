import React from 'react';

import {Box, Pressable, Text} from 'native-base';
import HomeNav from './HomeNav';
import Icon from 'react-native-vector-icons/Feather';

import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Platform, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';

const Home = () => {
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();

  return (
    <Box flex={1} style={{paddingTop: insets.top}}>
      {/* <LinearGradient
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 0.5}}
        colors={['#B83AF3', '#6950FB']}>
        <Box justifyContent="center" style={{paddingTop: insets.top}}>
          <Box
            flexDirection={'row'}
            px={3}
            justifyContent="center"
            alignItems={'center'}
            w="full"
            style={{
              height: 52,
            }}
          />
        </Box>
      </LinearGradient> */}
      <Pressable
        style={[
          styles.header_right,
          {
            ...Platform.select({
              ios: {
                top: insets.top + 8,
              },
              android: {
                top: insets.top + 6,
              },
            }),
          },
        ]}
        flexDirection={'row'}
        onPress={() =>
          dispatch({
            type: 'Girl_FILTER_FLAG',
            GirlsFilterFlag: true,
          })
        }
        ml={'auto'}
        alignItems={'center'}>
        <Text color={'#333'} fontSize={'md'}>
          全部
        </Text>
        <Icon name={'chevron-down'} size={20} color="#333" />
      </Pressable>
      <HomeNav />
    </Box>
  );
};

export default Home;

const styles = StyleSheet.create({
  header_right: {
    position: 'absolute',
    zIndex: 1,
    right: 16,
  },
});
