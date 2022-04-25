import React, {useContext} from 'react';
import {Box} from 'native-base';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import CustomFuncFlatList from '../../../components/CustomFuncFlatList';
import {queryDynamic} from '../../../api/daily';
import MyContext from './Context';
import DailyItem from '../../daily/DailyItem';

interface ItemProp {
  userId: string;
  headImg: string;
  nickName: string;
  createTime: string;
  content: string;
  score: number;
  likeNum: string;
  liked: boolean;
  images: string;
  commentNum: number;
  giftNum: number;
}

const Index = () => {
  const userInfo = useContext(MyContext); // 共享的用户信息
  const insets = useSafeAreaInsets();

  return (
    <Box
      flex={1}
      bg="white"
      style={{
        paddingBottom: insets.bottom + 60,
      }}>
      <CustomFuncFlatList
        url={queryDynamic.url}
        par={{
          userId: userInfo?.id,
        }}
        renderItem={({item}: {item: ItemProp}) => (
          <Box p={3} borderRadius={4} bg="white">
            <DailyItem
              returnFunc={daily => {
                console.log('daily', daily);
              }}
              item={item}
            />
          </Box>
        )}
      />
    </Box>
  );
};
export default Index;
