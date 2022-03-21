/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect, useReducer, useCallback} from 'react';

export function useCountdown(initCount: number, interval = 1000) {
  const [count, setCount] = useState(initCount);
  // 一个增长的计时器，用于重置倒计时
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

  const reset = useCallback(() => {
    setCount(initCount);
    forceUpdate();
  }, [initCount]);

  useEffect(() => {
    reset();
  }, [reset]);

  useEffect(() => {
    if (initCount === 0) {
      return;
    }
    const time = setInterval(() => {
      setCount(preCount => {
        if (preCount <= interval) {
          clearInterval(time);
          return 0;
        }
        return preCount - interval;
      });
    }, interval);
    return () => {
      clearInterval(time);
    };
  }, [interval, ignored]);

  return {count, reset};
}
