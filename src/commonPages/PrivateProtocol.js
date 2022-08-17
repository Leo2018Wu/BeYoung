import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import HTMLView from 'react-native-htmlview';
import {fetchPrivateProtocol} from '../api/common';
import useRequest from '../hooks/useRequest';

export default function Index() {
  const {result: protocol} = useRequest(
    fetchPrivateProtocol.url,
    {},
    fetchPrivateProtocol.options,
  );

  return (
    <ScrollView style={{paddingHorizontal: 10}}>
      <HTMLView value={protocol} stylesheet={styles} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  div: {
    padding: 10,
  },
});
