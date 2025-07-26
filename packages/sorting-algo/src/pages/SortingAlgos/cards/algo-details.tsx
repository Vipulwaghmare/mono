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
import { getAlgorithmDescription, getTimeComplexity } from "@/lib/utils";

const AlgoDetails = ({
  algorithm,
  setAlgorithm,
  isSorting,
}: {
  algorithm: string;
  isSorting: boolean;
  setAlgorithm: (val: string) => void;
}) => {
  return (
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
            {getAlgorithmDescription(algorithm)}
          </p>
        </div>

        <div className="mt-2">
          <h3 className="font-medium mb-1">Time Complexity:</h3>
          <p className="text-sm text-muted-foreground">
            {getTimeComplexity(algorithm)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AlgoDetails;
