import { useRef, useState } from "react";

const useSortingSpeed = (initialValue: number = 50) => {
  const sortingSpeedRef = useRef<number>(initialValue);
  const [sortingSpeed, _setSortingSpeed] = useState<number>(initialValue);

  const setSortingSpeed = (value: number) => {
    sortingSpeedRef.current = value;
    _setSortingSpeed(value);
  };

  return {
    sortingSpeed,
    setSortingSpeed,
    sortingSpeedRef,
  };
};

export default useSortingSpeed;