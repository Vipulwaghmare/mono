import { TSortFnPayload } from "@/types";

export const insertionSort = async ({
  array,
  sortingRef,
  setCurrentIndices,
  setComparisonCount,
  delay,
  setArray,
  setSwapCount,
  setIsSorted,
  setIsSorting,
}: TSortFnPayload) => {
  const arrayCopy = [...array];
  const n = arrayCopy.length;

  for (let i = 1; i < n; i++) {
    if (!sortingRef.current) return;

    const key = arrayCopy[i];
    let j = i - 1;

    // Highlight current element being inserted
    setCurrentIndices([i, -1]);
    await delay();

    while (j >= 0 && arrayCopy[j] > key) {
      if (!sortingRef.current) return;

      // Highlight comparison
      setCurrentIndices([j, i]);
      setComparisonCount((prev) => prev + 1);

      // Wait for visualization
      await delay();

      // Move elements
      arrayCopy[j + 1] = arrayCopy[j];
      setArray([...arrayCopy]);
      setSwapCount((prev) => prev + 1);

      j--;
    }

    arrayCopy[j + 1] = key;
    setArray([...arrayCopy]);

    // Wait for visualization after insertion
    await delay();
  }

  // Final pass to show sorted array
  for (let i = 0; i < n; i++) {
    if (!sortingRef.current) return;

    setCurrentIndices([i, -1]);
    await delay(10);
  }

  setCurrentIndices([-1, -1]);
  setIsSorting(false);
  setIsSorted(true);
};
