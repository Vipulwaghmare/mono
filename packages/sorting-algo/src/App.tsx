import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Play, Pause, RefreshCw } from "lucide-react";

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

const useSortingSpeed = (initialValue: number = 50) => {
  const sortingSpeedRef = useRef<number>(initialValue);
  const [sortingSpeed, _setSortingSpeed] = useState<number>(initialValue);

  const setSortingSpeed = (value: number) => {
    sortingSpeedRef.current = value;
    _setSortingSpeed(value);
  };

  return {
    sortingSpeed,
    setSortingSpeed,
    sortingSpeedRef,
  };
};

export default function SortingVisualizer() {
  const [array, setArray] = useState<number[]>([]);
  const [arraySize, setArraySize] = useState<number>(50);
  const [algorithm, setAlgorithm] = useState<string>("bubble");
  const [isSorted, setIsSorted] = useState<boolean>(false);
  const [currentIndices, setCurrentIndices] = useState<number[]>([-1, -1]);
  const [comparisonCount, setComparisonCount] = useState<number>(0);
  const [swapCount, setSwapCount] = useState<number>(0);
  const { isSorting, setIsSorting, sortingRef } = useIsSorting();
  const { sortingSpeedRef, sortingSpeed, setSortingSpeed } = useSortingSpeed();

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Generate a new random array
  const generateArray = () => {
    if (isSorting) return;

    const newArray = [];
    for (let i = 0; i < arraySize; i++) {
      newArray.push(Math.floor(Math.random() * 100) + 5);
    }
    setArray(newArray);
    setIsSorted(false);
    setComparisonCount(0);
    setSwapCount(0);
    setCurrentIndices([-1, -1]);
  };

  // Initialize array on component mount and when array size changes
  useEffect(() => {
    generateArray();
  }, [arraySize]);

  // Clean up timeouts when component unmounts
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Update the sortingRef when isSorting changes
  useEffect(() => {
    sortingRef.current = isSorting;
  }, [isSorting]);

  // Calculate delay based on sorting speed
  const getDelay = () => {
    return 500 - sortingSpeedRef.current * 4.9; // 500ms at speed 1, 10ms at speed 100
  };

  // Bubble Sort Algorithm
  const bubbleSort = async () => {
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
        await new Promise((resolve) => {
          timeoutRef.current = setTimeout(resolve, getDelay());
        });

        if (arrayCopy[j] > arrayCopy[j + 1]) {
          // Swap elements
          [arrayCopy[j], arrayCopy[j + 1]] = [arrayCopy[j + 1], arrayCopy[j]];
          setArray([...arrayCopy]);
          setSwapCount((prev) => prev + 1);
          swapped = true;

          // Wait for visualization after swap
          await new Promise((resolve) => {
            timeoutRef.current = setTimeout(resolve, getDelay());
          });
        }
      }

      if (!swapped) break;
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

  // Selection Sort Algorithm
  const selectionSort = async () => {
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

  // Insertion Sort Algorithm
  const insertionSort = async () => {
    const arrayCopy = [...array];
    const n = arrayCopy.length;

    for (let i = 1; i < n; i++) {
      if (!sortingRef.current) return;

      const key = arrayCopy[i];
      let j = i - 1;

      // Highlight current element being inserted
      setCurrentIndices([i, -1]);
      await new Promise((resolve) => {
        timeoutRef.current = setTimeout(resolve, getDelay());
      });

      while (j >= 0 && arrayCopy[j] > key) {
        if (!sortingRef.current) return;

        // Highlight comparison
        setCurrentIndices([j, i]);
        setComparisonCount((prev) => prev + 1);

        // Wait for visualization
        await new Promise((resolve) => {
          timeoutRef.current = setTimeout(resolve, getDelay());
        });

        // Move elements
        arrayCopy[j + 1] = arrayCopy[j];
        setArray([...arrayCopy]);
        setSwapCount((prev) => prev + 1);

        j--;
      }

      arrayCopy[j + 1] = key;
      setArray([...arrayCopy]);

      // Wait for visualization after insertion
      await new Promise((resolve) => {
        timeoutRef.current = setTimeout(resolve, getDelay());
      });
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

  // Merge Sort Algorithm
  const mergeSort = async () => {
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
        await new Promise((resolve) => {
          timeoutRef.current = setTimeout(resolve, getDelay());
        });

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
        await new Promise((resolve) => {
          timeoutRef.current = setTimeout(resolve, getDelay() / 2);
        });
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
        await new Promise((resolve) => {
          timeoutRef.current = setTimeout(resolve, getDelay() / 2);
        });
      }

      while (j < n2) {
        if (!sortingRef.current) return;

        arr[k] = R[j];
        setArray([...arr]);
        setSwapCount((prev) => prev + 1);

        j++;
        k++;

        // Wait for visualization
        await new Promise((resolve) => {
          timeoutRef.current = setTimeout(resolve, getDelay() / 2);
        });
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
      await new Promise((resolve) => {
        timeoutRef.current = setTimeout(resolve, 10);
      });
    }

    setCurrentIndices([-1, -1]);
    setIsSorting(false);
    setIsSorted(true);
  };

  // Quick Sort Algorithm
  const quickSort = async () => {
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

  // Start sorting based on selected algorithm
  const startSorting = () => {
    if (isSorting || isSorted) return;

    setIsSorting(true);
    setComparisonCount(0);
    setSwapCount(0);

    switch (algorithm) {
      case "bubble":
        bubbleSort();
        break;
      case "selection":
        selectionSort();
        break;
      case "insertion":
        insertionSort();
        break;
      case "merge":
        mergeSort();
        break;
      case "quick":
        quickSort();
        break;
      default:
        bubbleSort();
    }
  };

  // Stop sorting
  const stopSorting = () => {
    setIsSorting(false);
  };

  // Get color for array bar
  const getBarColor = (index: number) => {
    if (currentIndices.includes(index)) {
      return "bg-red-500";
    } else if (isSorted) {
      return "bg-green-500";
    } else {
      return "bg-primary";
    }
  };

  // Get algorithm name for display
  const getAlgorithmName = () => {
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

  // Get algorithm description
  const getAlgorithmDescription = () => {
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

  // Get algorithm time complexity
  const getTimeComplexity = () => {
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

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">
        Sorting Algorithm Visualizer
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Algorithm</CardTitle>
            <CardDescription>Select a sorting algorithm</CardDescription>
          </CardHeader>
          <CardContent>
            <Select
              value={algorithm}
              onValueChange={setAlgorithm}
              disabled={isSorting}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select algorithm" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bubble">Bubble Sort</SelectItem>
                <SelectItem value="selection">Selection Sort</SelectItem>
                <SelectItem value="insertion">Insertion Sort</SelectItem>
                <SelectItem value="merge">Merge Sort</SelectItem>
                <SelectItem value="quick">Quick Sort</SelectItem>
              </SelectContent>
            </Select>

            <div className="mt-4">
              <h3 className="font-medium mb-1">Description:</h3>
              <p className="text-sm text-muted-foreground">
                {getAlgorithmDescription()}
              </p>
            </div>

            <div className="mt-2">
              <h3 className="font-medium mb-1">Time Complexity:</h3>
              <p className="text-sm text-muted-foreground">
                {getTimeComplexity()}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Controls</CardTitle>
            <CardDescription>Adjust visualization parameters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Array Size: {arraySize}
              </label>
              <Slider
                value={[arraySize]}
                onValueChange={(value) => setArraySize(value[0])}
                min={10}
                max={100}
                step={1}
                disabled={isSorting}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Sorting Speed: {sortingSpeed}
              </label>
              <Slider
                value={[sortingSpeed]}
                onValueChange={(value) => setSortingSpeed(value[0])}
                min={1}
                max={100}
                step={1}
              />
            </div>

            <div className="flex gap-2 pt-2">
              {!isSorting ? (
                <Button
                  onClick={startSorting}
                  disabled={isSorting || isSorted}
                  className="flex-1"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Start
                </Button>
              ) : (
                <Button
                  onClick={stopSorting}
                  variant="destructive"
                  className="flex-1"
                >
                  <Pause className="w-4 h-4 mr-2" />
                  Stop
                </Button>
              )}

              <Button
                onClick={generateArray}
                variant="outline"
                disabled={isSorting}
                className="flex-1"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Statistics</CardTitle>
            <CardDescription>Performance metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium">Algorithm:</h3>
              <p className="text-lg">{getAlgorithmName()}</p>
            </div>

            <div>
              <h3 className="font-medium">Comparisons:</h3>
              <p className="text-lg">{comparisonCount}</p>
            </div>

            <div>
              <h3 className="font-medium">Array Accesses:</h3>
              <p className="text-lg">{swapCount}</p>
            </div>

            <div>
              <h3 className="font-medium">Status:</h3>
              <p className="text-lg">
                {isSorting ? "Sorting..." : isSorted ? "Sorted!" : "Ready"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-muted p-6 rounded-lg">
        <div className="flex items-end h-64 gap-[2px]">
          {array.map((value, index) => (
            <div
              key={index}
              className={`${getBarColor(
                index,
              )} w-full transition-all duration-100`}
              style={{
                height: `${value}%`,
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
