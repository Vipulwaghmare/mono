import { useRef, useState } from "react";

const useIsSorting = (initialValue = false) => {
  const sortingRef = useRef<boolean>(initialValue);
  const [isSorting, _setIsSorting] = useState<boolean>(initialValue);

  const setIsSorting = (value: boolean) => {
    sortingRef.current = value;
    _setIsSorting(value);
  };

  return {
    isSorting,
    setIsSorting,
    sortingRef,
  };
};

export default useIsSorting;