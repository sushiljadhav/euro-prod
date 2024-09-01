export interface IRole {
  role_id: string
  description: string
  is_active?: boolean
  created_by?: string
  created_date?: string
  modified_by?: string
  modified_date?: string
  deleted_by?: string
  deleted_date?: string
}

export interface IPermission {
  permission_type_id: string
  description: string
  is_active?: boolean
  sort_order?: number
  created_by?: string
  created_date?: string
  modified_by?: string
  modified_date?: string
  deleted_by?: string
  deleted_date?: string
}

export interface IDropDown {
  label: string
  key: string
}
