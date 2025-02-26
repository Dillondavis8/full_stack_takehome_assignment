// components/AgGrid.tsx

import { useState, useMemo, useRef } from "react";
import {
  AllCommunityModule, ModuleRegistry, ColDef, SizeColumnsToContentStrategy,
  SizeColumnsToFitGridStrategy,
  SizeColumnsToFitProvidedWidthStrategy,
  ITooltipParams, CellStyle,
} from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import ErrorSummaryCellRenderer from "./cell_renderers/ErrorSummaryCellRenderer";
import { Button } from "@headlessui/react";
import { DocumentTextIcon } from "@heroicons/react/24/outline";

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

interface DataGridProps<T> {
  data: T[];
}

export default function DataGrid<T>({ data }: DataGridProps<T>): JSX.Element {
  const gridRef = useRef<AgGridReact>(null);
  // Column Definitions: Defines the columns to be displayed.
  const [colDefs] = useState<ColDef[]>([
    {
      field: "name", tooltipValueGetter: (p: ITooltipParams) =>
        p.data.errors?.name?.message, cellStyle: params => styleCell(params.data.errors?.name?.severity)
    },
    {
      field: "email", tooltipValueGetter: (p: ITooltipParams) =>
        p.data.errors?.email?.message, cellStyle: params => styleCell(params.data.errors?.email?.severity)
    },
    {
      field: "phone", tooltipValueGetter: (p: ITooltipParams) =>
        p.data.errors?.phone?.message, cellStyle: params => styleCell(params.data.errors?.phone?.severity)
    },
    {
      field: "street", tooltipValueGetter: (p: ITooltipParams) =>
        p.data.errors?.street?.message, cellStyle: params => styleCell(params.data.errors?.street?.severity)
    },
    {
      field: "city", tooltipValueGetter: (p: ITooltipParams) =>
        p.data.errors?.city?.message, cellStyle: params => styleCell(params.data.errors?.city?.severity)
    },
    {
      field: "zipcode", tooltipValueGetter: (p: ITooltipParams) =>
        p.data.errors?.zipcode?.message, cellStyle: params => styleCell(params.data.errors?.zipcode?.severity)
    },
    {
      field: "status", tooltipValueGetter: (p: ITooltipParams) =>
        p.data.errors?.status?.message, cellStyle: params => styleCell(params.data.errors?.status?.severity)
    },
    {
      field: "Error Summary", cellStyle: { display: "flex", alignItems: "center", justifyContent: "center",  },
      cellRenderer: ErrorSummaryCellRenderer, maxWidth: 160,
    },
  ]);

  // Auto Size Strategy: Defines the way columns are sized. In this case, columns are sized to fit the grid width.
  const autoSizeStrategy = useMemo<
    | SizeColumnsToFitGridStrategy
    | SizeColumnsToFitProvidedWidthStrategy
    | SizeColumnsToContentStrategy
  >(() => {
    return {
      type: "fitGridWidth",
    };
  }, []);

  // Cell Style: Defines the style of the cell based on the severity of the error.
  const styleCell = (severity: string): CellStyle => {
    // Base Cell Style
    const cellStyle = { display: "flex", alignItems: "center" }
    if (!severity) {
      return {...cellStyle, backgroundColor: 'rgb(142, 208, 129, .8)'}
    } else if (severity === 'critical') {
      return { ...cellStyle, backgroundColor: 'rgb(219, 34, 42, .5)', borderColor: "rgb(219, 34, 42)", borderWidth: "2px" }
    } else {
      return { ...cellStyle, backgroundColor: 'rgb(253, 184, 51, .5)', borderColor: "rgb(253, 184, 51)", borderWidth: "2px" }
    }
  }

  // Grid CSV Export: Exports the grid data to a CSV file.
  const exportCsv = () => {
    gridRef.current!.api.exportDataAsCsv();
  }

  return (
    <div style={{ height: 880 }}>
      <div className="items-center justify-between flex mb-2.5">
        <h1 className="text-xl font-bold ml-1">Data Review</h1>
        <Button className="bg-sky-600 hover:bg-sky-500 text-white font-bold py-2 px-4 rounded flex"
          onClick={exportCsv}>
          <DocumentTextIcon className="size-6 mr-2" />
           Export to CSV 
        </Button>
      </div>
      <hr className="border-gray-300 border-thin mb-2.5"></hr>
      <AgGridReact
        rowData={data}
        ref={gridRef}
        columnDefs={colDefs}
        autoSizeStrategy={autoSizeStrategy}
        tooltipShowDelay={500}
      />
    </div>
  )
}
