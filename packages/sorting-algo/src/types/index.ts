import { MinHeap, MaxHeap } from 'basic-dsa';

export type TSortFnPayload = {
  array: number[];
  sortingRef: React.RefObject<boolean>;
  setCurrentIndices: React.Dispatch<React.SetStateAction<number[]>>;
  setComparisonCount: React.Dispatch<React.SetStateAction<number>>;
  delay: (delay?: number) => Promise<void>;
  setArray: React.Dispatch<React.SetStateAction<number[]>>;
  setSwapCount: React.Dispatch<React.SetStateAction<number>>;
  setIsSorted: React.Dispatch<React.SetStateAction<boolean>>
  setIsSorting: (value: boolean) => void;
};

export type THeapTypes = 'min' | 'max';

export type THeap = MinHeap | MaxHeap;