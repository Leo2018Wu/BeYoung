import React, {useState} from 'react';
import StackMain from './boss/Main';
import StackLogin from './boss/Login';

const Index = () => {
  const [isLogin] = useState(false);
  return !isLogin ? <StackMain /> : <StackLogin />;
};

export default Index;
