import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Play, Pause, RefreshCw } from "lucide-react";

type ControlsProps = {
  arraySize: number;
  setArraySize: (size: number) => void;
  sortingSpeed: number;
  setSortingSpeed: (speed: number) => void;
  isSorting: boolean;
  isSorted: boolean;
  startSorting: () => void;
  generateArray: () => void;
  setIsSorting: (value: boolean) => void;
};

const Controls = ({
  arraySize,
  setArraySize,
  sortingSpeed,
  setSortingSpeed,
  isSorting,
  isSorted,
  startSorting,
  generateArray,
  setIsSorting,
}: ControlsProps) => {
  const stopSorting = () => {
    setIsSorting(false);
  };

  return (
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
  );
};

export default Controls;
