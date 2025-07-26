import { TSortFnPayload } from "@/types";

export async function mergeSort({
  array,
  sortingRef,
  setCurrentIndices,
  setComparisonCount,
  delay,
  setArray,
  setSwapCount,
  setIsSorted,
  setIsSorting,
}: TSortFnPayload) {
  const arrayCopy = [...array];

  const merge = async (
    arr: number[],
    left: number,
    mid: number,
    right: number,
  ) => {
    if (!sortingRef.current) return;

    const n1 = mid - left + 1;
    const n2 = right - mid;

    // Create temp arrays
    const L = arr.slice(left, mid + 1);
    const R = arr.slice(mid + 1, right + 1);

    let i = 0,
      j = 0,
      k = left;

    while (i < n1 && j < n2) {
      if (!sortingRef.current) return;

      // Highlight comparison
      setCurrentIndices([left + i, mid + 1 + j]);
      setComparisonCount((prev) => prev + 1);

      // Wait for visualization
      await delay();

      if (L[i] <= R[j]) {
        arr[k] = L[i];
        i++;
      } else {
        arr[k] = R[j];
        j++;
      }

      setArray([...arr]);
      setSwapCount((prev) => prev + 1);
      k++;

      // Wait for visualization after placement
      await delay();
    }

    // Copy remaining elements
    while (i < n1) {
      if (!sortingRef.current) return;

      arr[k] = L[i];
      setArray([...arr]);
      setSwapCount((prev) => prev + 1);

      i++;
      k++;

      // Wait for visualization
      await delay();
    }

    while (j < n2) {
      if (!sortingRef.current) return;

      arr[k] = R[j];
      setArray([...arr]);
      setSwapCount((prev) => prev + 1);

      j++;
      k++;

      // Wait for visualization
      await delay();
    }
  };

  const mergeSortHelper = async (
    arr: number[],
    left: number,
    right: number,
  ) => {
    if (left < right) {
      if (!sortingRef.current) return;

      const mid = Math.floor((left + right) / 2);

      // Sort first and second halves
      await mergeSortHelper(arr, left, mid);
      await mergeSortHelper(arr, mid + 1, right);

      // Merge the sorted halves
      await merge(arr, left, mid, right);
    }
  };

  await mergeSortHelper(arrayCopy, 0, arrayCopy.length - 1);

  // Final pass to show sorted array
  for (let i = 0; i < arrayCopy.length; i++) {
    if (!sortingRef.current) return;

    setCurrentIndices([i, -1]);
    await delay(10);
  }

  setCurrentIndices([-1, -1]);
  setIsSorting(false);
  setIsSorted(true);
}
