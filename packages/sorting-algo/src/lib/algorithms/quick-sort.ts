import { TSortFnPayload } from "@/types";

export const quickSort = async ({
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

  const partition = async (arr: number[], low: number, high: number) => {
    if (!sortingRef.current) return -1;

    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      if (!sortingRef.current) return -1;

      // Highlight comparison
      setCurrentIndices([j, high]);
      setComparisonCount((prev) => prev + 1);

      // Wait for visualization
      await new Promise((resolve) => {
        timeoutRef.current = setTimeout(resolve, getDelay());
      });

      if (arr[j] < pivot) {
        i++;

        // Swap elements
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setArray([...arr]);
        setSwapCount((prev) => prev + 1);

        // Wait for visualization after swap
        await new Promise((resolve) => {
          timeoutRef.current = setTimeout(resolve, getDelay());
        });
      }
    }
    // Swap pivot to its final position
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    setArray([...arr]);
    setSwapCount((prev) => prev + 1);

    // Wait for visualization after final swap
    await new Promise((resolve) => {
      timeoutRef.current = setTimeout(resolve, getDelay());
    });

    return i + 1;
  };

  const quickSortHelper = async (
    arr: number[],
    low: number,
    high: number,
  ) => {
    if (low < high) {
      if (!sortingRef.current) return;

      // Find pivot element
      const pi = await partition(arr, low, high);
      if (pi === -1) return; // Sorting was cancelled

      // Sort elements before and after partition
      await quickSortHelper(arr, low, pi - 1);
      await quickSortHelper(arr, pi + 1, high);
    }
  };

  await quickSortHelper(arrayCopy, 0, arrayCopy.length - 1);

  // Final pass to show sorted array
  for (let i = 0; i < arrayCopy.length; i++) {
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
