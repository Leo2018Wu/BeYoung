import React from 'react';
import {Center, Spinner} from 'native-base';

const Splash = () => {
  return (
    <Center flex={1}>
      <Spinner color="primary.100" size={'lg'} />
    </Center>
  );
};
export default Splash;
