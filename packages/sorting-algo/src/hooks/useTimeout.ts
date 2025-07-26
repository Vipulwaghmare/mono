import { RefObject, useEffect, useRef } from "react";

const useTimeout = (speedRef: RefObject<number>) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const getDelayTime = () => {
    return 500 - speedRef.current * 4.9; // 500ms at speed 1, 10ms at speed 100
  };

  const delay = async (customTime?: number) => {
    await new Promise((resolve) => {
      timeoutRef.current = setTimeout(resolve, customTime ?? getDelayTime());
    });
  }

  return {
    delay,
    timeoutRef,
  }
};

export default useTimeout;