import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getAlgorithmName = (algorithm: string) => {
  switch (algorithm) {
    case "bubble":
      return "Bubble Sort";
    case "selection":
      return "Selection Sort";
    case "insertion":
      return "Insertion Sort";
    case "merge":
      return "Merge Sort";
    case "quick":
      return "Quick Sort";
    default:
      return "Bubble Sort";
  }
};

export const getAlgorithmDescription = (algorithm: string) => {
  switch (algorithm) {
    case "bubble":
      return "Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.";
    case "selection":
      return "Divides the input list into a sorted and an unsorted region, and repeatedly selects the smallest element from the unsorted region.";
    case "insertion":
      return "Builds the sorted array one item at a time by comparing each with the items before it and inserting it into its correct position.";
    case "merge":
      return "Divides the array into halves, sorts them recursively, then merges the sorted halves.";
    case "quick":
      return "Selects a 'pivot' element and partitions the array around the pivot, then recursively sorts the sub-arrays.";
    default:
      return "";
  }
};

export const getTimeComplexity = (algorithm: string) => {
  switch (algorithm) {
    case "bubble":
      return "O(n²)";
    case "selection":
      return "O(n²)";
    case "insertion":
      return "O(n²)";
    case "merge":
      return "O(n log n)";
    case "quick":
      return "O(n log n) average, O(n²) worst case";
    default:
      return "";
  }
};