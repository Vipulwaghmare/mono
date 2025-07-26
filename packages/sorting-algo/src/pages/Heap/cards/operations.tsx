import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Minus, Plus, RotateCcw, TreePine } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { THeapTypes } from "@/types";

const Operations = ({
  heapType,
  handleInsert,
  handleExtractRoot,
  handlePeek,
  handleBuildHeap,
  handleClear,
}: {
  heapType: THeapTypes;
  handleInsert: (val: string) => void;
  handleExtractRoot: () => void;
  handlePeek: () => void;
  handleBuildHeap: (val: string) => void;
  handleClear: () => void;
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [buildArrayInput, setBuildArrayInput] = useState<string>("");

  const insert = () => {
    handleInsert(inputValue);
    setInputValue("");
  };

  const buildHeap = () => {
    handleBuildHeap(buildArrayInput);
    setBuildArrayInput("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Operations</CardTitle>
        <CardDescription>Perform heap operations</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Insert Element</label>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Enter number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && insert()}
            />
            <Button onClick={insert} size="sm">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handleExtractRoot}
            variant="outline"
            className="flex-1 bg-transparent"
          >
            <Minus className="w-4 h-4 mr-2" />
            Extract {heapType === "min" ? "Min" : "Max"}
          </Button>
          <Button
            onClick={handlePeek}
            variant="outline"
            className="flex-1 bg-transparent"
          >
            <Eye className="w-4 h-4 mr-2" />
            Peek
          </Button>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Build from Array</label>
          <div className="flex gap-2">
            <Input
              placeholder="1,2,3,4,5"
              value={buildArrayInput}
              onChange={(e) => setBuildArrayInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && buildHeap()}
            />
            <Button onClick={buildHeap} size="sm">
              <TreePine className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <Button onClick={handleClear} variant="destructive" className="w-full">
          <RotateCcw className="w-4 h-4 mr-2" />
          Clear Heap
        </Button>
      </CardContent>
    </Card>
  );
};

export default Operations;
