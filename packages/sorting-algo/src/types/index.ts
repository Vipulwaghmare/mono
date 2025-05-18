export type TSortFnPayload = {
  array: number[];
  sortingRef: React.RefObject<boolean>;
  setCurrentIndices: React.Dispatch<React.SetStateAction<number[]>>;
  setComparisonCount: React.Dispatch<React.SetStateAction<number>>;
  timeoutRef: React.RefObject<NodeJS.Timeout | null>;
  getDelay: () => number;
  setArray: React.Dispatch<React.SetStateAction<number[]>>;
  setSwapCount: React.Dispatch<React.SetStateAction<number>>;
  setIsSorted: React.Dispatch<React.SetStateAction<boolean>>
  setIsSorting: (value: boolean) => void;
};