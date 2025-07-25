import { useState, useEffect, useCallback } from "react";
import useIsSorting from "../../hooks/useIsSorting";
import useSortingSpeed from "../../hooks/useSortingSpeed";
import AlgoDetails from "./cards/algo-details";
import Controls from "./cards/controls";
import Stats from "./cards/stats";
import ChartBar from "../../components/chart-bar";
import { TSortFnPayload } from "../../types";
import {
  bubbleSort,
  selectionSort,
  insertionSort,
  quickSort,
  mergeSort,
} from "../../lib/algorithms";
import useTimeout from "@/hooks/useTimeout";

export default function SortingVisualizer() {
  const [array, setArray] = useState<number[]>([]);
  const [arraySize, setArraySize] = useState<number>(15);
  const [algorithm, setAlgorithm] = useState<string>("bubble");
  const [isSorted, setIsSorted] = useState<boolean>(false);
  const [currentIndices, setCurrentIndices] = useState<number[]>([-1, -1]);
  const [comparisonCount, setComparisonCount] = useState<number>(0);
  const [swapCount, setSwapCount] = useState<number>(0);
  const { isSorting, setIsSorting, sortingRef } = useIsSorting();
  const { sortingSpeedRef, sortingSpeed, setSortingSpeed } = useSortingSpeed();
  const { delay } = useTimeout(sortingSpeedRef);

  const generateArray = useCallback(() => {
    if (sortingRef.current) return;
    const newArray = [];
    for (let i = 0; i < arraySize; i++) {
      newArray.push(Math.floor(Math.random() * 100) + 5);
    }
    setArray(newArray);
    setIsSorted(false);
    setComparisonCount(0);
    setSwapCount(0);
    setCurrentIndices([-1, -1]);
  }, [arraySize]);

  useEffect(() => {
    console.log("array", array.join(","));
    generateArray();
  }, [arraySize, generateArray]);

  useEffect(() => {
    sortingRef.current = isSorting;
  }, [isSorting, sortingRef]);

  const startSorting = () => {
    if (isSorting || isSorted) return;

    setIsSorting(true);
    setComparisonCount(0);
    setSwapCount(0);

    const payload: TSortFnPayload = {
      array,
      sortingRef,
      setCurrentIndices,
      setComparisonCount,
      delay,
      setArray,
      setSwapCount,
      setIsSorted,
      setIsSorting,
    };

    switch (algorithm) {
      case "bubble":
        bubbleSort(payload);
        break;
      case "selection":
        selectionSort(payload);
        break;
      case "insertion":
        insertionSort(payload);
        break;
      case "merge":
        mergeSort(payload);
        break;
      case "quick":
        quickSort(payload);
        break;
      default:
        bubbleSort(payload);
    }
  };

  const getBarColor = (index: number) => {
    if (currentIndices.includes(index)) {
      return "bg-red-500";
    } else if (isSorted) {
      return "bg-green-500";
    } else {
      return "bg-primary";
    }
  };
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-4">
        <AlgoDetails
          algorithm={algorithm}
          setAlgorithm={setAlgorithm}
          isSorting={isSorting}
        />
        <Controls
          arraySize={arraySize}
          setArraySize={setArraySize}
          sortingSpeed={sortingSpeed}
          setSortingSpeed={setSortingSpeed}
          isSorting={isSorting}
          isSorted={isSorted}
          startSorting={startSorting}
          setIsSorting={setIsSorting}
          generateArray={generateArray}
        />
        <Stats
          algorithm={algorithm}
          comparisonCount={comparisonCount}
          swapCount={swapCount}
        />
      </div>
      <div className="bg-muted p-6 rounded-lg">
        <div className="flex items-end h-64 gap-[2px]">
          {array.map((value, index) => (
            <ChartBar
              index={index}
              value={value}
              getBarColor={getBarColor}
              key={index}
            />
          ))}
        </div>
      </div>
    </>
  );
}
