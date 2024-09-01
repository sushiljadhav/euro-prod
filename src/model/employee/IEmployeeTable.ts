import type React from "react"

export interface ITableColumn {
  name: string
  uid: string
  sortable?: boolean
}

export interface IUserStatus {
  name: string
  uid: string
}

export interface IUser {
  employee_id: string
  employee_name: string
  employee_code: string
  email: string
  mobile_no: string
  is_active: boolean
  created_by?: string
  created_date?: string
  modified_by?: string
  modified_date?: string
  deleted_by?: null
  deleted_date?: null
  status?: string
  roles?: string[]
}

export interface IStaus {
  status: IUserStatus[]
}

export interface IEmployee {
  users: IUser[]
}

export interface IEmployeeTable {
  columns: ITableColumn[]
  status?: IUserStatus[]
  users: IUser[]
  initialColumns?: string[]
  isLoading?: boolean
  onAddButtonClick?: (event: React.MouseEvent) => void
  onViewClick?: (value: unknown) => void
  onEditClick?: (value: unknown) => void
  onDeleteClick?: (value: unknown) => void
}
