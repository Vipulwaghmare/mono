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
import { Badge } from "@/components/ui/badge";
import { THeap, THeapTypes } from "@/types";

const HeapDetails = ({
  heapType,
  handleHeapTypeChange,
  heap,
  isAnimating,
}: {
  heapType: THeapTypes;
  handleHeapTypeChange: (val: THeapTypes) => void;
  heap: THeap;
  isAnimating: boolean;
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Heap Type</CardTitle>
        <CardDescription>Select heap type and view properties</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Select
          value={heapType}
          onValueChange={handleHeapTypeChange}
          disabled={isAnimating}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select heap type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="min">Min Heap</SelectItem>
            <SelectItem value="max">Max Heap</SelectItem>
          </SelectContent>
        </Select>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="font-medium">Type:</span>
            <Badge variant="default">
              {heapType === "min" ? "Min Heap" : "Max Heap"}
            </Badge>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Size:</span>
            <span>{heap.size}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Root:</span>
            <span>{heap.peek() ?? "Empty"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Height:</span>
            <span>
              {heap.isEmpty() ? 0 : Math.floor(Math.log2(heap.size)) + 1}
            </span>
          </div>
        </div>

        {/* <div>
          <h3 className="font-medium mb-2">Properties:</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Complete binary tree</li>
            <li>
              • {heapType === "min" ? "Parent ≤ Children" : "Parent ≥ Children"}
            </li>
            <li>• Root is {heapType === "min" ? "minimum" : "maximum"}</li>
            <li>• Insert/Extract: O(log n)</li>
          </ul>
        </div> */}
      </CardContent>
    </Card>
  );
};

export default HeapDetails;
