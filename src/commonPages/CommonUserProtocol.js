import React, {useEffect, useState} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import HTMLView from 'react-native-htmlview';
import {
  fetchUserProtocolFeMale,
  fetchUserProtocolMale,
  fetchPrivateProtocol,
} from '../api/common';
import useRequest from '../hooks/useRequest';
import {useSelector} from 'react-redux';

export default function Index() {
  const userInfo = useSelector(state => state.user.myUserInfo);
  const [htmlData, setHtmlData] = useState('');
  const {run: runFeMale} = useRequest(
    fetchUserProtocolFeMale.url,
    {},
    fetchUserProtocolFeMale.options,
  );
  const {run: runMale} = useRequest(
    fetchUserProtocolMale.url,
    {},
    fetchUserProtocolMale.options,
  );

  useEffect(() => {
    userInfo.gender === 'GENDER_MALE' ? getMale() : getFeMale();
  }, []);

  const getMale = async () => {
    const {data} = await runMale();
    setHtmlData(data);
  };

  const getFeMale = async () => {
    const {data} = await runFeMale();
    setHtmlData(data);
  };

  return (
    <ScrollView>
      <HTMLView value={htmlData} stylesheet={styles} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  div: {
    padding: 10,
  },
});
