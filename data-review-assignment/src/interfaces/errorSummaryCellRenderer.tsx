import type { CustomCellRendererProps } from 'ag-grid-react';

export default interface ErrorSummaryCellRendererParams extends CustomCellRendererProps {
  src?: (params: boolean) => string;
}