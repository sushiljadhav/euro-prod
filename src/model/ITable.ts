import {
  type TableProps,
  type TableBodyProps,
  type TableRowProps,
  type TableCellProps,
  type TableHeaderProps,
  type TableColumnProps,
} from "@nextui-org/react"

// Define generic types for TableBodyProps and TableHeaderProps if needed
type TableHeaderType = unknown // Replace with appropriate type if known
type TableBodyType = unknown // Replace with appropriate type if known
type TableColumnType = unknown
export interface ITableBehavior extends TableProps {
  ariaLabel?: string // Optional aria-label for accessibility
  classNames?: {
    base?: string // Optional class name for the base table container
    header?: string // Optional class name for table headers
    row?: string // Optional class name for table rows
    cell?: string // Optional class name for table cells
  }
  columns: Array<{ key: string; label: string }> // Column definition with key and label
  rows: Array<{
    id?: string
    name?: string
    role?: string
    status?: string
    key?: string
  }> // Row data with id, name, role, and status
  headerProps?: TableHeaderProps<TableHeaderType> // Optional header props with type argument
  bodyProps?: TableBodyProps<TableBodyType> // Optional body props with type argument
  rowProps?: TableRowProps // Optional row props
  cellProps?: TableCellProps // Optional cell props
  columnProps?: TableColumnProps<TableColumnType>
  renderCell?: (key: string, value: any) => JSX.Element // Optional custom cell rendering
  pagination?: {
    currentPage: number // Current page for pagination
    pageSize: number // Number of rows per page
    totalItems: number // Total number of items
  }
  sorting?: {
    sortKey?: string // Key to sort by
    sortDirection?: "asc" | "desc" // Direction of sorting
  }
  onRowClick?: (rowId: string) => void // Optional callback for row clicks
}
