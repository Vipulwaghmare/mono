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

const HeapNodes = ({
  heapArray,
  highlightedIndices,
}: {
  heapArray: number[];
  highlightedIndices: number[];
}) => {
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

  // Get node color based on highlighting
  const getNodeColor = (index: number) => {
    if (highlightedIndices.includes(index)) {
      return "var(--destructive)"; // Red for highlighted nodes
    }
    return "var(--primary)"; // Default color
  };

  const getNodeTextColor = (index: number) => {
    if (highlightedIndices.includes(index)) {
      return "var(--destructive-foreground)";
    }
    return "var(--primary-foreground)";
  };
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
                    fill={getNodeColor(node.index)}
                    stroke={getNodeTextColor(node.index)}
                    strokeWidth="2"
                    className="transition-all duration-200"
                  />
                  <text
                    x={node.x}
                    y={node.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={getNodeTextColor(node.index)}
                    fontSize="14"
                    fontWeight="bold"
                    className="transition-all duration-200"
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
