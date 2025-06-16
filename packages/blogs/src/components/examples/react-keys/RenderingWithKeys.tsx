"use client";
import React, { useCallback, useState } from "react";
import { AgGridReact, AgGridReactProps } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import type { ColDef } from "ag-grid-community";

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

interface IRow {
  make: string;
  model: string;
  price: number;
  electric: boolean;
}
const rowData: IRow[] = [
  { make: "Tesla", model: "Model Y", price: 64950, electric: true },
  { make: "Ford", model: "F-Series", price: 33850, electric: false },
  { make: "Toyota", model: "Corolla", price: 29600, electric: false },
];

const colDefs: ColDef<IRow>[] = [
  { field: "make" },
  { field: "model" },
  { field: "price" },
  { field: "electric" },
];

export default function RenderingWithKeys() {
  const [tableData, setTableData] = useState<AgGridReactProps<IRow>[]>([
    {
      rowData: rowData.map((row) => ({ ...row, price: 1 })),
      columnDefs: colDefs.map((def) => ({
        ...def,
        headerStyle: { color: "red", backgroundColor: "yellow" },
      })),
    },
    {
      rowData: rowData.map((row) => ({ ...row, price: 10 })),
      columnDefs: colDefs.map((def) => ({
        ...def,
        headerStyle: { color: "navy", backgroundColor: "lightblue" },
      })),
    },
  ]);
  const onDelete = useCallback(() => {
    setTableData((prev) => [prev[1], prev[0]]);
  }, []);
  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <button onClick={() => onDelete()}>Delete</button>
        <div style={{ height: 200, width: "100%" }}>
          <AgGridReact {...tableData[0]} />
        </div>
      </div>
    </div>
  );
}
