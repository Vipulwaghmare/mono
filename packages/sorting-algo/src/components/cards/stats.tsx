import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAlgorithmName } from "@/lib/utils";

type StatsProps = {
  algorithm: string;
  comparisonCount: number;
  swapCount: number;
};

const Stats = ({ algorithm, comparisonCount, swapCount }: StatsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Statistics</CardTitle>
        <CardDescription>Performance metrics</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-medium">Algorithm:</h3>
          <p className="text-lg">{getAlgorithmName(algorithm)}</p>
        </div>

        <div>
          <h3 className="font-medium">Comparisons:</h3>
          <p className="text-lg">{comparisonCount}</p>
        </div>

        <div>
          <h3 className="font-medium">Array Accesses:</h3>
          <p className="text-lg">{swapCount}</p>
        </div>

        {/* <div>
          <h3 className="font-medium">Status:</h3>
          <p className="text-lg">
            {isSorting ? "Sorting..." : isSorted ? "Sorted!" : "Ready"}
          </p>
        </div> */}
      </CardContent>
    </Card>
  );
};

export default Stats;
