import { TSortFnPayload } from "@/types";

export const selectionSort = async ({
  array,
  sortingRef,
  setCurrentIndices,
  setComparisonCount,
  timeoutRef,
  getDelay,
  setArray,
  setSwapCount,
  setIsSorted,
  setIsSorting,
}: TSortFnPayload) => {
  const arrayCopy = [...array];
  const n = arrayCopy.length;

  for (let i = 0; i < n - 1; i++) {
    if (!sortingRef.current) return;

    let minIndex = i;

    for (let j = i + 1; j < n; j++) {
      if (!sortingRef.current) return;

      // Highlight current comparison
      setCurrentIndices([minIndex, j]);
      setComparisonCount((prev) => prev + 1);

      // Wait for visualization
      await new Promise((resolve) => {
        timeoutRef.current = setTimeout(resolve, getDelay());
      });

      if (arrayCopy[j] < arrayCopy[minIndex]) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      // Swap elements
      [arrayCopy[i], arrayCopy[minIndex]] = [
        arrayCopy[minIndex],
        arrayCopy[i],
      ];
      setArray([...arrayCopy]);
      setSwapCount((prev) => prev + 1);

      // Wait for visualization after swap
      await new Promise((resolve) => {
        timeoutRef.current = setTimeout(resolve, getDelay());
      });
    }
  }

  // Final pass to show sorted array
  for (let i = 0; i < n; i++) {
    if (!sortingRef.current) return;

    setCurrentIndices([i, -1]);
    await new Promise((resolve) => {
      timeoutRef.current = setTimeout(resolve, 10);
    });
  }

  setCurrentIndices([-1, -1]);
  setIsSorting(false);
  setIsSorted(true);
};

