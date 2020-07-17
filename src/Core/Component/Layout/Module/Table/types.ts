import React, { ReactNode } from 'react';
import DynamicTable from "@atlaskit/dynamic-table";

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

export interface TableProps {
  title: ReactNode | string;
  head: TableHeadDefinition;
  data: TableRowDataDefinition[];
  dataTransformation?: TableRowDataTransformation;
  defaultPage?: number;
  showActions?: boolean;
  creationRoute: string;
  modificationRoute: (id: string) => string;
  onDeleteConfirmed: (id: string) => any;
  isRankable?: any;
}

export interface TableState {
  isModalOpen: boolean;
  removalId: string;
}
