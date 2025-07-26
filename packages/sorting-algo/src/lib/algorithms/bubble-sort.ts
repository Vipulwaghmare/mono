import { TSortFnPayload } from "@/types";

export const bubbleSort = async ({
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
  let swapped = false;

  for (let i = 0; i < n; i++) {
    swapped = false;

    for (let j = 0; j < n - i - 1; j++) {
      if (!sortingRef.current) return; // Stop if sorting is cancelled

      // Highlight current comparison
      setCurrentIndices([j, j + 1]);
      setComparisonCount((prev) => prev + 1);

      // Wait for visualization
      await delay();

      if (arrayCopy[j] > arrayCopy[j + 1]) {
        // Swap elements
        [arrayCopy[j], arrayCopy[j + 1]] = [arrayCopy[j + 1], arrayCopy[j]];
        setArray([...arrayCopy]);
        setSwapCount((prev) => prev + 1);
        swapped = true;

        // Wait for visualization after swap
        await delay();
      }
    }

    if (!swapped) break;
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
