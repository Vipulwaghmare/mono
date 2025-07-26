import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const HeapArrays = ({ heapArray }: { heapArray: number[] }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Array Representation</CardTitle>
        <CardDescription>Heap as array with indices</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Heap Array:</h3>
            <div className="flex flex-wrap gap-2">
              {heapArray.length === 0 ? (
                <span className="text-muted-foreground">Empty</span>
              ) : (
                heapArray.map((value, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center p-2 border rounded"
                  >
                    <span className="text-xs text-muted-foreground">
                      {index}
                    </span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Navigation:</h3>
            <div className="text-sm text-muted-foreground space-y-1">
              <div>Parent of i: (i-1)/2</div>
              <div>Left child of i: 2i+1</div>
              <div>Right child of i: 2i+2</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HeapArrays;
