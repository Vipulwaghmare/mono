import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { MinHeap, MaxHeap } from "@/lib/heap";
import { THeap, THeapTypes } from "@/types";
import HeapArrays from "./cards/heap-arrays";
import HeapDetails from "./cards/heap-details";
import Operations from "./cards/operations";
import HeapNodes from "./cards/heap-nodes";
import useSortingSpeed from "@/hooks/useSortingSpeed";
import useIsSorting from "@/hooks/useIsSorting";
import useTimeout from "@/hooks/useTimeout";

const HeapPage = () => {
  const [currentIndices, setCurrentIndices] = useState<number[]>([-1]);
  const [heapType, setHeapType] = useState<THeapTypes>("min");
  const [_, setRandomValue] = useState<boolean>(false);
  const { isSorting: isAnimating } = useIsSorting();
  const { sortingSpeedRef } = useSortingSpeed(1);
  const { delay: _delay } = useTimeout(sortingSpeedRef);

  const delay = async () => {
    await _delay();
  };

  const render = () => {
    setRandomValue((prev) => !prev);
  };
  const heapRef = useRef<THeap>(new MinHeap(setCurrentIndices, delay, render));
  const heap = heapRef.current;

  const heapArray = useMemo(() => {
    return heap.toArray();
  }, [render, heap]);

  useEffect(() => {
    render();
  }, [heap]);

  const handleHeapTypeChange = async (type: THeapTypes) => {
    setHeapType(type);
    await heap.buildNewHeapFromArray(heap.toArray(), heapRef);
  };

  const handleInsert = async (inputValue: string) => {
    const value = Number.parseInt(inputValue);
    if (isNaN(value)) {
      toast.error("Invalid Input", {
        description: "Please enter a valid number",
      });
      return;
    }
    await heap.push(value);
    render();
    toast("Element Inserted", {
      description: `${value} has been inserted into the ${heapType} heap`,
    });
  };

  const handleExtractRoot = async () => {
    const root = await heap.pop();
    if (root === null) {
      toast.error("Heap Empty", {
        description: "Cannot extract from an empty heap",
      });
      return;
    }

    render();
    toast("Root Extracted", {
      description: `${root} has been extracted from the ${heapType} heap`,
    });
  };

  const handlePeek = async () => {
    setCurrentIndices([0]);
    await delay();
    setCurrentIndices([]);
    const root = heap.peek();
    if (typeof root !== "number") {
      toast.error("Heap Empty", {
        description: "Heap is empty",
      });
      return;
    }

    toast("Peek Result", {
      description: `The ${heapType === "min" ? "minimum" : "maximum"} element is ${root}`,
    });
  };

  const handleBuildHeap = async (buildArrayInput: string) => {
    const arrayStr = buildArrayInput.trim();
    if (!arrayStr) {
      toast.error("Invalid Input", {
        description: "Please enter comma-separated numbers",
      });
      return;
    }

    try {
      const array = arrayStr.split(",").map((str) => {
        const num = Number.parseInt(str.trim());
        if (isNaN(num)) throw new Error("Invalid number");
        return num;
      });

      await heap.buildNewHeapFromArray(array, heapRef);
      render();
      toast("Heap Built", {
        description: `${heapType} heap built from array`,
      });
    } catch (error) {
      toast.error("Invalid Input", {
        description: "Please enter valid comma-separated numbers",
      });
    }
  };

  const handleClear = () => {
    (heapRef.current =
      heapType === "min"
        ? new MinHeap(setCurrentIndices, delay, render)
        : new MaxHeap(setCurrentIndices, delay, render)),
      toast("Heap Cleared", {
        description: "All elements have been removed from the heap",
      });
  };

  return (
    <div className="grid grid-cols-2  gap-6">
      <HeapNodes heapArray={heapArray} highlightedIndices={currentIndices} />
      <div className="grid grid-cols-1 gap-6 mb-8">
        <Operations
          heapType={heapType}
          handleInsert={handleInsert}
          handleExtractRoot={handleExtractRoot}
          handlePeek={handlePeek}
          handleBuildHeap={handleBuildHeap}
          handleClear={handleClear}
          isAnimating={isAnimating}
        />
        <HeapDetails
          handleHeapTypeChange={handleHeapTypeChange}
          heap={heap}
          heapType={heapType}
          isAnimating={isAnimating}
        />
        <HeapArrays heapArray={heapArray} highlightedIndices={currentIndices} />
      </div>
    </div>
  );
};

export default HeapPage;
