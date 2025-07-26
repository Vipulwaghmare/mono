import { useEffect, useState } from "react";
import { toast } from "sonner";
import { MinHeap, MaxHeap } from "basic-dsa";
import { THeap, THeapTypes } from "@/types";
import HeapArrays from "./cards/heap-arrays";
import HeapDetails from "./cards/heap-details";
import Operations from "./cards/operations";
import HeapNodes from "./cards/heap-nodes";

const HeapPage = () => {
  const [heap, setHeap] = useState<THeap>(new MinHeap());
  const [heapType, setHeapType] = useState<THeapTypes>("min");
  const [heapArray, setHeapArray] = useState<number[]>([]);

  const updateHeapArray = () => {
    setHeapArray(heap.toArray());
  };

  useEffect(() => {
    updateHeapArray();
  }, [heap]);

  const handleHeapTypeChange = (type: THeapTypes) => {
    setHeapType(type);
    setHeap((prev) => {
      const newHeap = type === "min" ? new MinHeap() : new MaxHeap();
      newHeap.buildNewHeapFromArray(prev.toArray());
      return newHeap;
    });
  };

  const handleInsert = (inputValue: string) => {
    const value = Number.parseInt(inputValue);
    if (isNaN(value)) {
      toast.error("Invalid Input", {
        description: "Please enter a valid number",
      });
      return;
    }
    heap.push(value);
    updateHeapArray();
    toast("Element Inserted", {
      description: `${value} has been inserted into the ${heapType} heap`,
    });
  };

  const handleExtractRoot = () => {
    const root = heap.pop();
    if (root === null) {
      toast.error("Heap Empty", {
        description: "Cannot extract from an empty heap",
      });
      return;
    }

    updateHeapArray();
    toast("Root Extracted", {
      description: `${root} has been extracted from the ${heapType} heap`,
    });
  };

  const handlePeek = () => {
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

  const handleBuildHeap = (buildArrayInput: string) => {
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

      heap.buildNewHeapFromArray(array);
      updateHeapArray();
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
    setHeap(heapType === "min" ? new MinHeap() : new MaxHeap());
    toast("Heap Cleared", {
      description: "All elements have been removed from the heap",
    });
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <HeapDetails
          handleHeapTypeChange={handleHeapTypeChange}
          heap={heap}
          heapType={heapType}
        />
        <Operations
          heapType={heapType}
          handleInsert={handleInsert}
          handleExtractRoot={handleExtractRoot}
          handlePeek={handlePeek}
          handleBuildHeap={handleBuildHeap}
          handleClear={handleClear}
        />
        <HeapArrays heapArray={heapArray} />
      </div>
      <HeapNodes heapArray={heapArray} />
    </>
  );
};

export default HeapPage;
