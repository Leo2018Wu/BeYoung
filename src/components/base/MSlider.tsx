import React from 'react';
import {Box} from 'native-base';

const heightMap = {
  small: 12,
  md: 24,
};

const getPercent = (num: number, total: number) => {
  if (isNaN(num) || isNaN(total)) {
    return 0;
  }
  const percent =
    Math.round((num / total) * 10000) / 100.0 < 100
      ? Math.round((num / total) * 10000) / 100.0
      : 100;
  return total <= 0 ? 0 : percent + '%';
};

const Slider = ({
  start = 0,
  end = 100,
  currentNum = 33,
  bg = '#E7E7E7',
  activeColor = '#FF5FB0',
  size = 'small',
}: {
  start: number;
  end: number;
  bg?: string;
  activeColor?: string;
  size?: string;
  currentNum: number;
}) => {
  const percent = getPercent(currentNum - start, end - start);
  return (
    <Box
      borderRadius={'full'}
      style={{height: heightMap[size], backgroundColor: bg}}>
      <Box
        borderRadius={'full'}
        style={{
          backgroundColor: activeColor,
          zIndex: 1,
          width: percent,
        }}
        height="full"
      />
    </Box>
  );
};

export default Slider;
