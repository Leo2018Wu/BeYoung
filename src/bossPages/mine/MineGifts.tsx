import React from 'react';
import {Box} from 'native-base';
import Gifts from '../../components/base/Gifts';
const Index = () => {
  return (
    <Box
      flex={1}
      px={2}
      style={{
        backgroundColor: '#1f2937',
      }}>
      <Gifts />
    </Box>
  );
};

export default Index;
