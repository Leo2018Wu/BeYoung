import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import IconNew from 'react-native-vector-icons/AntDesign';
import layout from '../../components/Layout';

const list = [
  {
    routeName: 'PhotoSelection',
    iconUrl: require('../assets/account_security.png'),
    name: '精选照片',
  },
  {
    routeName: 'QuickReply',
    iconUrl: require('../assets/notice.png'),
    name: '快捷回复设置',
  },
  {
    routeName: 'ReplyExpPackage',
    iconUrl: require('../assets/privacy.png'),
    name: '回复表情包上传',
  },
  {
    routeName: 'Wallet',
    iconUrl: require('../assets/wallet.png'),
    name: '钱包',
  },
  // {
  //   routeName: 'Promote',
  //   iconUrl: require('../assets/Promote.png'),
  //   name: '帮助教程',
  // },
  {
    routeName: 'logout',
    iconUrl: require('../assets/logout.png'),
    name: '退出登录',
  },
];
type IProps = {
  onPress: Function;
};
export default function Index({onPress}: IProps) {
  const ITEMS = list.map((item, index) => (
    <View key={index} style={styles.contain}>
      <TouchableOpacity
        onPress={() => {
          onPress(item.routeName);
        }}
        style={styles.itemView}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={item.iconUrl}
            style={{
              width: 16,
              height: 16,
            }}
            resizeMode="cover"
          />
          <Text style={styles.textStyle}>{item.name}</Text>
        </View>
        <View style={{justifyContent: 'flex-end'}}>
          <IconNew name="right" size={16} color="#000" />
        </View>
      </TouchableOpacity>
    </View>
  ));

  return <>{ITEMS}</>;
}

const styles = StyleSheet.create({
  textStyle: {
    color: '#767676',
    fontSize: 16,
    marginLeft: 10,
  },
  contain: {
    // padding: 15,
  },
  itemView: {
    flexDirection: 'row',
    width: layout.width - 40,
    marginLeft: 20,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
});
