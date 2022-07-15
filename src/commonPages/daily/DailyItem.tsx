import React, {useState, useEffect} from 'react';
import {
  HStack,
  Box,
  Image,
  View,
  VStack,
  Text,
  Button,
  Modal,
  Stack,
} from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import {Pressable, StyleSheet, useWindowDimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {BASE_DOWN_URL} from '../../util/config';
import getStorage from '../../util/Storage';
import CFastImage from '../../components/CFastImage';

const Index = ({...props}) => {
  const navigation = useNavigation();
  const {item} = props;

  const [imgList, setImgList] = useState([]);
  const {width} = useWindowDimensions();
  const IMG_ITEM_WIDTH = (width - 104) / 3;
  const IMG_ITEM_HEIGHT = IMG_ITEM_WIDTH;
  const [isBoss, setIsBoss] = useState('MALE_LOGIN');
  const [lookOpintion, setLookOpintion] = useState(false);
  const [delDynamicModal, setDelDynamicModal] = useState(false);

  useEffect(async () => {
    const boss = await getStorage(['LOGIN_NAVIGAITON_NAME']);
    setIsBoss(boss);
    if (item.images && JSON.parse(item.images).length) {
      setImgList(JSON.parse(item.images));
    }
  }, []);

  const delDynamic = dynamicId => {
    setDelDynamicModal(false);
    props.pressCb(dynamicId);
  };

  const getAuditStatus = item => {
    if (item.auditStatus === 'AUDIT_STATUS_PASS') {
      return;
    } else {
      return (
        <Pressable
          onPress={() => {
            if (item.auditStatus === 'AUDIT_STATUS_DENY') {
              setLookOpintion(true);
            }
          }}
          style={
            item.auditStatus === 'AUDIT_STATUS_DENY'
              ? styles.denystatus
              : styles.waitstatus
          }>
          <Text
            fontSize={'sm'}
            style={{
              color:
                item.auditStatus === 'AUDIT_STATUS_DENY'
                  ? '#F94C4C'
                  : '#FFE132',
              textAlign: 'center',
            }}>
            {item.auditStatusName}
          </Text>
        </Pressable>
      );
    }
  };

  return (
    <>
      {!item.delFlag ? (
        <Box bg="white" marginBottom={10}>
          <Modal
            isOpen={delDynamicModal}
            onClose={() => setDelDynamicModal(false)}>
            <Modal.Content p={4} alignItems="center">
              <Text fontSize={'lg'} mb={1} style={{color: '#222'}}>
                提示
              </Text>
              <Text
                fontSize={'md'}
                mb={1}
                style={{color: '#222', marginTop: 10}}>
                确定要删除该动态吗
              </Text>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  marginTop: 20,
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                  }}>
                  <Text onPress={() => delDynamic(item.id)}>确定</Text>
                </View>
                <View style={{flex: 1, alignItems: 'center'}}>
                  <Text onPress={() => setDelDynamicModal(false)}>取消</Text>
                </View>
              </View>
            </Modal.Content>
          </Modal>
          <Modal isOpen={lookOpintion} onClose={() => setLookOpintion(false)}>
            <Modal.Content>
              <Modal.Header>审核未通过原因</Modal.Header>
              <Modal.Body>
                <Text>{item.auditOpinion}</Text>
              </Modal.Body>
            </Modal.Content>
          </Modal>
          <View>
            <HStack alignItems="center">
              <CFastImage
                url={item.headImg}
                styles={{width: 50, height: 50, borderRadius: 50}}
              />
              <VStack
                flex={5}
                mr={'auto'}
                ml={2}
                justifyContent={'space-around'}>
                <Text
                  fontSize={'sm'}
                  style={{
                    color: '#8E8895',
                  }}>
                  {item.nickName}
                </Text>
                <Text
                  fontSize={'xs'}
                  style={{
                    color: '#C7C4CC',
                  }}>
                  {item.createTime}
                </Text>
              </VStack>
              <VStack w={90} mr={'auto'} ml={2}>
                {getAuditStatus(item)}
              </VStack>
              {item.auditStatus === 'AUDIT_STATUS_DENY' && (
                <VStack flex={1} mr={'auto'} ml={4}>
                  <Pressable
                    onPress={() => setDelDynamicModal(true)}
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignContent: 'center',
                    }}>
                    <Icon name="closecircle" size={14} color="#B2B2B2" />
                  </Pressable>
                </VStack>
              )}

              {/* {isBoss == 'MALE_LOGIN' ? (
                <Button
                  disabled
                  py={1}
                  borderRadius={'full'}
                  borderColor="#9650FF"
                  borderWidth={0.5}
                  bg={'transparent'}>
                  <Text fontSize={'xs'} color={'primary.100'}>
                    关注
                  </Text>
                </Button>
              ) : null} */}
            </HStack>
            <Pressable
              onPress={() => {
                navigation.navigate('DailyDetail', {
                  dynamicId: item.id,
                });
              }}
              style={{
                marginLeft: 56,
                marginTop: 10,
              }}
              pt={0}>
              <HStack mb={2} flexWrap={'wrap'}>
                {imgList.length === 1 ? (
                  <Image
                    alt="dairy"
                    borderRadius={10}
                    style={{
                      marginRight: 8,
                      width: IMG_ITEM_WIDTH * 2,
                      height: IMG_ITEM_HEIGHT * 3,
                    }}
                    source={{uri: BASE_DOWN_URL + imgList}}
                  />
                ) : (
                  imgList &&
                  imgList.map((item, index) => (
                    <Image
                      key={index}
                      mb={2}
                      alt="dairy"
                      borderRadius={10}
                      style={{
                        marginRight: (index + 1) % 3 === 0 ? 0 : 8,
                        width: IMG_ITEM_WIDTH,
                        height: IMG_ITEM_HEIGHT,
                      }}
                      source={{uri: BASE_DOWN_URL + item}}
                    />
                  ))
                )}
              </HStack>
              <Text fontSize={'sm'} color={'fontColors._72'}>
                {item.content}
              </Text>
            </Pressable>
            <Stack
              space={2}
              pt={2}
              style={{
                marginLeft: 56,
              }}
              direction={'row'}
              alignItems={'center'}>
              <HStack mr={'auto'} alignItems={'center'}>
                <Text fontSize={'xs'} style={{color: '#C7C4CC'}}>
                  评分
                </Text>
                <Text fontSize={'xs'} style={{color: '#C7C4CC'}}>
                  {item.score}
                </Text>
              </HStack>
              <HStack alignItems={'center'}>
                <Icon
                  name="hearto"
                  size={18}
                  color={false ? '#9650FF' : '#C7C4CC'}
                />
                <Text ml={1} fontSize={'xs'} style={{color: '#C7C4CC'}}>
                  {item.likeNum}
                </Text>
              </HStack>
              <HStack alignItems={'center'}>
                <Icon name="message1" size={18} color="#C7C4CC" />
                <Text ml={1} fontSize={'xs'} style={{color: '#C7C4CC'}}>
                  {item.commentNum}
                </Text>
              </HStack>
              <HStack alignItems={'center'}>
                <Icon name="gift" size={18} color="#C7C4CC" />
                <Text ml={1} fontSize={'xs'} style={{color: '#C7C4CC'}}>
                  {item.giftNum}
                </Text>
              </HStack>
            </Stack>
          </View>
        </Box>
      ) : null}
    </>
  );
};
export default Index;

const styles = StyleSheet.create({
  denystatus: {
    backgroundColor: '#FEF2F2',
    borderColor: '#F94C4C',
    borderWidth: 1,
    borderRadius: 6,
  },
  waitstatus: {
    backgroundColor: '#FFFDD4',
    borderColor: '#FFE132',
    borderWidth: 1,
    borderRadius: 6,
  },
});
