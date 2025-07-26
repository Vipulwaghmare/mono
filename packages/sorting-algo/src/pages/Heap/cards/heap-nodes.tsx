import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface HeapNode {
  value: number;
  index: number;
  x: number;
  y: number;
}

const HeapNodes = ({ heapArray }: { heapArray: number[] }) => {
  // Calculate node positions for tree visualization
  const calculateNodePositions = (array: number[]): HeapNode[] => {
    if (array.length === 0) return [];

    const nodes: HeapNode[] = [];
    const levels = Math.ceil(Math.log2(array.length + 1));
    const treeWidth = 800;
    const treeHeight = 400;
    const levelHeight = treeHeight / (levels + 1);

    for (let i = 0; i < array.length; i++) {
      const level = Math.floor(Math.log2(i + 1));
      const positionInLevel = i - (Math.pow(2, level) - 1);
      const nodesInLevel = Math.pow(2, level);
      const levelWidth = treeWidth / (nodesInLevel + 1);

      nodes.push({
        value: array[i],
        index: i,
        x: levelWidth * (positionInLevel + 1),
        y: levelHeight * (level + 1),
      });
    }

    return nodes;
  };

  const nodes = calculateNodePositions(heapArray);
  const getConnections = () => {
    const connections = [];
    for (let i = 0; i < heapArray.length; i++) {
      const leftChild = 2 * i + 1;
      const rightChild = 2 * i + 2;

      if (leftChild < heapArray.length) {
        connections.push({ parent: i, child: leftChild });
      }
      if (rightChild < heapArray.length) {
        connections.push({ parent: i, child: rightChild });
      }
    }
    return connections;
  };

  const connections = getConnections();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tree Visualization</CardTitle>
        <CardDescription>
          Binary tree representation of the heap
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full h-96 border rounded-lg bg-muted/20 relative overflow-hidden">
          {heapArray.length === 0 ? (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              Heap is empty. Insert elements to see the tree visualization.
            </div>
          ) : (
            <svg width="100%" height="100%" viewBox="0 0 800 400">
              {/* Draw connections */}
              {connections.map(({ parent, child }, index) => {
                const parentNode = nodes[parent];
                const childNode = nodes[child];
                return (
                  <line
                    key={index}
                    x1={parentNode.x}
                    y1={parentNode.y}
                    x2={childNode.x}
                    y2={childNode.y}
                    stroke="var(--muted-foreground)"
                    strokeWidth="2"
                  />
                );
              })}

              {/* Draw nodes */}
              {nodes.map((node) => (
                <g key={node.index}>
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="25"
                    fill="var(--primary)"
                    stroke="var(--primary-foreground)"
                    strokeWidth="2"
                  />
                  <text
                    x={node.x}
                    y={node.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="var(--primary-foreground)"
                    fontSize="14"
                    fontWeight="bold"
                  >
                    {node.value}
                  </text>
                  <text
                    x={node.x}
                    y={node.y + 40}
                    textAnchor="middle"
                    fill="var(--muted-foreground)"
                    fontSize="10"
                  >
                    [{node.index}]
                  </text>
                </g>
              ))}
            </svg>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default HeapNodes;
