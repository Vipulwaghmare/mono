"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Trash2,
  Eraser,
  Pencil,
  Square,
  Circle,
  PaintBucket,
} from "lucide-react";

interface DrawingCanvasProps {
  isDrawing: boolean;
  onDrawingData: (data: any) => void;
  receivedData?: any;
}

type DrawingTool = "pencil" | "eraser" | "rectangle" | "circle" | "fill";

export default function DrawingCanvas({
  isDrawing,
  onDrawingData,
  receivedData,
}: DrawingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawingMode, setIsDrawingMode] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });
  const [color, setColor] = useState("#000000");
  const [lineWidth, setLineWidth] = useState(5);
  const [tool, setTool] = useState<DrawingTool>("pencil");
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  // Colors palette
  const colors = [
    "#000000",
    "#ffffff",
    "#ff0000",
    "#00ff00",
    "#0000ff",
    "#ffff00",
    "#00ffff",
    "#ff00ff",
    "#c0c0c0",
    "#808080",
    "#800000",
    "#808000",
    "#008000",
    "#800080",
    "#008080",
    "#000080",
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size to match parent container
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;

        // Fill with white background
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  // Handle received drawing data
  useEffect(() => {
    if (!receivedData || isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (receivedData.type === "pencil" || receivedData.type === "eraser") {
      ctx.beginPath();
      ctx.moveTo(receivedData.from.x, receivedData.from.y);
      ctx.lineTo(receivedData.to.x, receivedData.to.y);
      ctx.strokeStyle =
        receivedData.type === "eraser" ? "#ffffff" : receivedData.color;
      ctx.lineWidth = receivedData.lineWidth;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();
    } else if (receivedData.type === "rectangle") {
      ctx.beginPath();
      ctx.strokeStyle = receivedData.color;
      ctx.lineWidth = receivedData.lineWidth;
      ctx.strokeRect(
        receivedData.start.x,
        receivedData.start.y,
        receivedData.end.x - receivedData.start.x,
        receivedData.end.y - receivedData.start.y,
      );
    } else if (receivedData.type === "circle") {
      ctx.beginPath();
      const radius = Math.sqrt(
        Math.pow(receivedData.end.x - receivedData.start.x, 2) +
          Math.pow(receivedData.end.y - receivedData.start.y, 2),
      );
      ctx.arc(
        receivedData.start.x,
        receivedData.start.y,
        radius,
        0,
        2 * Math.PI,
      );
      ctx.strokeStyle = receivedData.color;
      ctx.lineWidth = receivedData.lineWidth;
      ctx.stroke();
    } else if (receivedData.type === "clear") {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }, [receivedData, isDrawing]);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setIsDrawingMode(true);
    setLastPos({ x, y });

    if (tool === "rectangle" || tool === "circle") {
      setStartPos({ x, y });
    } else if (tool === "fill") {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        floodFill(x, y, color);
        onDrawingData({
          type: "fill",
          x,
          y,
          color,
        });
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !isDrawingMode) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (tool === "pencil" || tool === "eraser") {
      ctx.beginPath();
      ctx.moveTo(lastPos.x, lastPos.y);
      ctx.lineTo(x, y);
      ctx.strokeStyle = tool === "eraser" ? "#ffffff" : color;
      ctx.lineWidth = lineWidth;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();

      onDrawingData({
        type: tool,
        from: { x: lastPos.x, y: lastPos.y },
        to: { x, y },
        color: tool === "eraser" ? "#ffffff" : color,
        lineWidth,
      });
    }

    setLastPos({ x, y });
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !isDrawingMode) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (tool === "rectangle") {
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.strokeRect(startPos.x, startPos.y, x - startPos.x, y - startPos.y);

      onDrawingData({
        type: "rectangle",
        start: startPos,
        end: { x, y },
        color,
        lineWidth,
      });
    } else if (tool === "circle") {
      ctx.beginPath();
      const radius = Math.sqrt(
        Math.pow(x - startPos.x, 2) + Math.pow(y - startPos.y, 2),
      );
      ctx.arc(startPos.x, startPos.y, radius, 0, 2 * Math.PI);
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.stroke();

      onDrawingData({
        type: "circle",
        start: startPos,
        end: { x, y },
        color,
        lineWidth,
      });
    }

    setIsDrawingMode(false);
  };

  const handleMouseLeave = () => {
    setIsDrawingMode(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    onDrawingData({
      type: "clear",
    });
  };
  const floodFill = (x: number, y: number, fillColor: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    // const data = imageData.data;
    const width = canvas.width;
    const height = canvas.height;

    // Get target color
    const targetColor = getPixelColor(imageData, x, y);

    // Convert hex to rgba
    const fillRgba = hexToRgba(fillColor);

    // Don't fill if target color is the same as fill color
    if (
      targetColor[0] === fillRgba[0] &&
      targetColor[1] === fillRgba[1] &&
      targetColor[2] === fillRgba[2]
    ) {
      return;
    }

    // Queue for flood fill
    const queue: [number, number][] = [[x, y]];
    const visited = new Set<string>();

    while (queue.length > 0) {
      const [px, py] = queue.shift()!;
      const key = `${px},${py}`;

      if (px < 0 || px >= width || py < 0 || py >= height || visited.has(key)) {
        continue;
      }

      const currentColor = getPixelColor(imageData, px, py);

      if (
        Math.abs(currentColor[0] - targetColor[0]) <= 10 &&
        Math.abs(currentColor[1] - targetColor[1]) <= 10 &&
        Math.abs(currentColor[2] - targetColor[2]) <= 10
      ) {
        setPixelColor(imageData, px, py, fillRgba);
        visited.add(key);

        queue.push([px + 1, py]);
        queue.push([px - 1, py]);
        queue.push([px, py + 1]);
        queue.push([px, py - 1]);
      }
    }

    ctx.putImageData(imageData, 0, 0);
  };

  const getPixelColor = (
    imageData: ImageData,
    x: number,
    y: number,
  ): [number, number, number, number] => {
    const index = (y * imageData.width + x) * 4;
    return [
      imageData.data[index],
      imageData.data[index + 1],
      imageData.data[index + 2],
      imageData.data[index + 3],
    ];
  };

  const setPixelColor = (
    imageData: ImageData,
    x: number,
    y: number,
    color: [number, number, number, number],
  ) => {
    const index = (y * imageData.width + x) * 4;
    imageData.data[index] = color[0];
    imageData.data[index + 1] = color[1];
    imageData.data[index + 2] = color[2];
    imageData.data[index + 3] = color[3];
  };

  const hexToRgba = (hex: string): [number, number, number, number] => {
    const r = Number.parseInt(hex.slice(1, 3), 16);
    const g = Number.parseInt(hex.slice(3, 5), 16);
    const b = Number.parseInt(hex.slice(5, 7), 16);
    return [r, g, b, 255];
  };
  return (
    <div className="flex flex-col h-full">
      {isDrawing && (
        <div className="flex flex-wrap items-center gap-2 p-2 bg-gray-100 rounded-t-md">
          <div className="flex gap-2">
            <Button
              variant={tool === "pencil" ? "default" : "outline"}
              size="icon"
              onClick={() => setTool("pencil")}
              title="Pencil"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant={tool === "eraser" ? "default" : "outline"}
              size="icon"
              onClick={() => setTool("eraser")}
              title="Eraser"
            >
              <Eraser className="h-4 w-4" />
            </Button>
            <Button
              variant={tool === "rectangle" ? "default" : "outline"}
              size="icon"
              onClick={() => setTool("rectangle")}
              title="Rectangle"
            >
              <Square className="h-4 w-4" />
            </Button>
            <Button
              variant={tool === "circle" ? "default" : "outline"}
              size="icon"
              onClick={() => setTool("circle")}
              title="Circle"
            >
              <Circle className="h-4 w-4" />
            </Button>
            <Button
              variant={tool === "fill" ? "default" : "outline"}
              size="icon"
              onClick={() => setTool("fill")}
              title="Fill"
            >
              <PaintBucket className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={clearCanvas}
              title="Clear Canvas"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2 ml-2">
            <div className="w-24">
              <Slider
                value={[lineWidth]}
                min={1}
                max={20}
                step={1}
                onValueChange={(value) => setLineWidth(value[0])}
              />
            </div>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-8 h-8 p-0 border rounded cursor-pointer"
            />
          </div>

          <div className="flex flex-wrap gap-1 ml-2">
            {colors.map((c) => (
              <div
                key={c}
                className="w-6 h-6 rounded-sm cursor-pointer border border-gray-300"
                style={{ backgroundColor: c }}
                onClick={() => setColor(c)}
              />
            ))}
          </div>
        </div>
      )}

      <div className="flex-1 relative">
        {!isDrawing && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <p className="text-gray-400">Waiting for drawer...</p>
          </div>
        )}
        <canvas
          ref={canvasRef}
          className="w-full h-full cursor-crosshair"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        />
      </div>
    </div>
  );
}
