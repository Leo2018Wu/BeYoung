import React, {useEffect, useState} from 'react';
import {Box, HStack, Text, VStack} from 'native-base';
import MSlider from '../../components/base/MSlider';
import CFastImage from '../../components/CFastImage';
import CustomFuncFlatList from '../../components/CustomFuncFlatList';
import {queryMyRelation} from '../../api/user';
import {querySysConfig} from '../../api/common';
import useRequest from '../../hooks/useRequest';
import {PageLoading} from '../../components/base/Pagination';

interface ItemProp {
  relateNickName: string;
  intimacy: number;
  relateHeadImg: string;
}

const Index = () => {
  const [levelList, setLevelList] = useState([]);

  const {result} = useRequest(
    querySysConfig.url,
    {code: 'INTIMACY_GRADE'},
    {manual: false},
  );

  useEffect(() => {
    if (result) {
      setLevelList(JSON.parse(result.value));
    }
  }, [result]);

  const Item = ({item}: {item: ItemProp}) => {
    let curItem;
    const curIndex = levelList.findIndex(
      level => item.intimacy >= level.start && item.intimacy <= level.end,
    );
    if (curIndex === -1 && item.intimacy > 2000) {
      curItem = levelList[levelList.length - 1];
    } else {
      curItem = levelList[curIndex];
    }

    return (
      <HStack>
        <CFastImage
          url={item.relateHeadImg}
          styles={{
            width: 52,
            height: 52,
            borderRadius: 52,
          }}
        />
        <VStack ml={2} justifyContent="space-around">
          <Text>{item.relateNickName}</Text>
          <HStack alignItems={'center'}>
            <Text fontSize={'xs'} style={{color: '#BBBBBB'}}>
              等级{curItem.level}
            </Text>
            <Box ml={2} style={{width: 90}}>
              <MSlider
                start={curItem.start}
                end={curItem.end}
                currentNum={item.intimacy}
              />
            </Box>
          </HStack>
        </VStack>
        <Text alignSelf={'center'} ml={'auto'} fontSize="md">
          亲密度{item.intimacy}
        </Text>
      </HStack>
    );
  };

  if (levelList.length <= 0) {
    return <PageLoading />;
  }

  return (
    <Box flex={1}>
      <Box flex={1}>
        <CustomFuncFlatList
          url={queryMyRelation.url}
          par={{}}
          renderItem={({item}: {item: ItemProp}) => (
            <Box p={3} mb={4} borderRadius={4} bg="white">
              <Item item={item} />
            </Box>
          )}
        />
      </Box>
    </Box>
  );
};

export default Index;
