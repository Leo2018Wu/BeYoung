import React from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  ImageBackground,
  Platform,
} from 'react-native';

import layout from '../../components/Layout';
import UserInfo from './UserInfo';
import LinkList from './LinkList';

const Mine = ({...props}) => {
  return (
    <View>
      <StatusBar backgroundColor="transparent" translucent />
      <ImageBackground
        source={require('../assets/mineBg.png')}
        style={styles.banner}
        resizeMode="cover">
        <UserInfo />
      </ImageBackground>
      <LinkList
        onPress={(routeName: any) => {
          props.navigation.navigate(routeName);
        }}
      />
    </View>
  );
};

export default Mine;

const styles = StyleSheet.create({
  banner: {
    width: layout.width,
    height: 280,
    ...Platform.select({
      ios: {
        paddingTop: 28 + 40,
      },
      android: {
        paddingTop: layout.STATUSBAR_HEIGHT + 20,
      },
    }),
    position: 'relative',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
});
