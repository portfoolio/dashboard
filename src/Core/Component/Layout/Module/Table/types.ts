import { ReactNode } from 'react';

export interface TableHeadCellDefinition {
  key: string;
  content: ReactNode | string;
  shouldTruncate?: boolean;
  isSortable?: boolean;
  width?: number;
}

export interface TableHeadDefinition {
  cells: TableHeadCellDefinition[];
}

export interface TableRowDataDefinition {
  [key: string]: ReactNode | string | null;
  id: string;
}

export interface TableRowDataTransformation {
  [key: string]: (data: any) => ReactNode | string | null;
}

export interface TableCell {
  key: string;
  content: ReactNode | string | null;
}

export interface TableRow {
  id: string;
  cells: TableCell[];
}
