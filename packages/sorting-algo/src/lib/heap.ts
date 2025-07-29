import { THeap } from "@/types";
import React from "react";

type TSetCurrentIndices = React.Dispatch<React.SetStateAction<number[]>>;
type TDelay = (customTime?: number) => Promise<void>;
type TUpdateState = () => void;
type THeapRef = React.RefObject<THeap>

class Heap {
  protected heap: number[] = [];


  constructor(protected setCurrentIndices: TSetCurrentIndices, protected delay: TDelay, protected updateState: TUpdateState) {
    this.heap = []
  }

  protected async swap(i: number, j: number) {
    let temp = this.heap[j];
    this.heap[j] = this.heap[i];
    this.heap[i] = temp;
  }

  protected getParentIndex(i: number) {
    return Math.floor((i - 1) / 2) // IF IT was starting with 1, it would be simle
  }

  protected getLeftChildIndex(i: number) {
    return (i * 2) + 1
  }

  protected getRightChildIndex(i: number) {
    return (i * 2) + 2
  }

  /**
   * The number of elements in the heap.
   * @returns The number of elements in the heap.
   */
  get size() {
    return this.heap.length;
  }

  /**
   * Checks if the heap is empty.
   * @returns True if the heap is empty, false otherwise.
   */
  isEmpty() {
    return this.heap.length === 0
  }

  /**
   * Returns the element at the top of the heap without removing it.
   * @returns The element at the top of the heap. If the heap is empty, undefined is returned.
   */
  peek() {
    return this.heap[0]
  }

  /**
   * Returns an array containing the elements of the heap.
   * @returns An array of the elements in the heap, in order.
   */
  toArray() {
    return [...this.heap]
  }

  clear() {
    this.heap = [];
  }
}

export class MinHeap extends Heap {
  constructor(setCurrentIndices: TSetCurrentIndices, delay: TDelay, updateState: TUpdateState) {
    super(setCurrentIndices, delay, updateState);
  }
  private async bubbleUp(i: number) {
    const current = this.heap[i];
    while (i > 0) {
      const parentIndex = this.getParentIndex(i);
      const parent = this.heap[parentIndex];
      this.setCurrentIndices([parentIndex, i]);
      await this.delay();
      if (parent > current) {
        await this.swap(parentIndex, i);
        this.updateState();
        this.setCurrentIndices([]);
      } else {
        break;
      }
      i = parentIndex;
    }
    this.setCurrentIndices([])
  }

  private async bubbleDown(i: number) {
    const leftIndex = this.getLeftChildIndex(i);
    const rightIndex = this.getRightChildIndex(i);
    const leftItem = this.heap[leftIndex]
    const rightItem = this.heap[rightIndex]
    const current = this.heap[i]
    let swapIndex = i;
    if (leftIndex < this.size && leftItem < current) {
      swapIndex = leftIndex
    }
    if (rightIndex < this.size && rightItem < this.heap[swapIndex]) {
      swapIndex = rightIndex
    }
    if (swapIndex === i) {
      return;
    }
    this.setCurrentIndices([swapIndex, i]);
    await this.delay();
    this.swap(swapIndex, i)
    this.setCurrentIndices([]);
    await this.bubbleDown(swapIndex);
  }

  /**
   * Adds a number to the heap and ensures the heap property is maintained.
   * @param num The number to add to the heap.
   * @returns The number that was added to the heap.
   */

  async push(num: number) {
    this.heap.push(num);
    this.setCurrentIndices([this.heap.length - 1]);
    this.updateState();
    await this.delay();
    await this.bubbleUp(this.heap.length - 1);
    return num;
  }

  /**
   * Removes the smallest element from the heap and returns it.
   * If the heap is empty, returns undefined.
   * @returns The element that was removed from the heap.
   */

  async pop() {
    if (this.size === 0) return undefined;
    const item = this.peek();
    this.setCurrentIndices([0]);
    const endItem = this.heap.pop()!;
    // If we just removed the last element, we’re done
    if (this.heap.length > 0) {
      this.heap[0] = endItem;
      await this.bubbleDown(0);
    }
    this.setCurrentIndices([]);
    return item;
  }

  /**
   * Clears the current heap and builds a new one from an array.
   * @param arr The array to build the heap from.
   */
  async buildNewHeapFromArray(arr: number[], heapRef: THeapRef) {
    this.clear();
    const heap = new MinHeap(this.setCurrentIndices, this.delay, this.updateState);
    heapRef.current = heap;
    this.updateState();
    for (const num of arr) {
      await heap.push(num)
    }
    return heap.toArray()
  }
}

export class MaxHeap extends Heap {
  constructor(setCurrentIndices: TSetCurrentIndices, delay: TDelay, updateState: TUpdateState) {
    super(setCurrentIndices, delay, updateState);
  }
  private async bubbleUp(i: number) {
    const current = this.heap[i]
    while (i > 0) {
      const parentIndex = this.getParentIndex(i);
      const parent = this.heap[parentIndex];
      this.setCurrentIndices([parentIndex, i]);
      if (parent < current) { // only diff
        await this.swap(parentIndex, i);
        this.updateState();
        this.setCurrentIndices([]);
      } else {
        break;
      }
      i = parentIndex;
    }
    this.setCurrentIndices([])
  }

  private async bubbleDown(i: number) {
    const leftIndex = this.getLeftChildIndex(i);
    const rightIndex = this.getRightChildIndex(i);
    const leftItem = this.heap[leftIndex]
    const rightItem = this.heap[rightIndex]
    const current = this.heap[i]
    let swapIndex = i;
    if (leftIndex < this.size && leftItem > current) { // diff
      swapIndex = leftIndex
    }
    if (rightIndex < this.size && rightItem > this.heap[swapIndex]) { // diff
      swapIndex = rightIndex
    }
    if (swapIndex === i) {
      return;
    }
    this.setCurrentIndices([swapIndex, i]);
    await this.delay();
    this.swap(swapIndex, i)
    this.setCurrentIndices([]);
    await this.bubbleDown(swapIndex);
  }

  /**
   * Adds a number to the heap and ensures the heap property is maintained.
   * @param num The number to add to the heap.
   * @returns The number that was added to the heap.
   */

  async push(num: number) {
    this.heap.push(num);
    this.setCurrentIndices([this.heap.length - 1]);
    this.updateState();
    await this.delay();
    await this.bubbleUp(this.heap.length - 1);
    return num;
  }

  /**
   * Removes an element from the top of the heap and returns it.
   * @returns The element that was removed from the heap. If the heap is empty, undefined is returned.
   */
  async pop() {
    if (this.size === 0) return undefined;
    const item = this.peek();
    this.setCurrentIndices([0]);
    const endItem = this.heap.pop()!;
    // If we just removed the last element, we’re done
    if (this.heap.length > 0) {
      this.heap[0] = endItem;
      await this.bubbleDown(0);
    }
    this.setCurrentIndices([]);
    return item;
  }

  /**
   * Clears the current heap and builds a new one from an array.
   * @param arr The array to build the heap from.
   */
  async buildNewHeapFromArray(arr: number[], heapRef: THeapRef) {
    this.clear();
    const heap = new MaxHeap(this.setCurrentIndices, this.delay, this.updateState);
    heapRef.current = heap;
    this.updateState();
    for (const num of arr) {
      await heap.push(num)
      this.updateState();
    }
    return heap.toArray()
  }
}