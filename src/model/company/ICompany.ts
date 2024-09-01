import { type IFieldError } from "../common/error"

export interface IAddress {
  address_id?: string
  reference_id?: string
  address_type_id?: string
  address_line: string
  pincode: string
  state_id?: string
  country_id?: string
  lat?: string
  lng?: string
  is_default?: boolean
  is_active?: boolean
  created_by?: string
  created_date?: string
  modified_by?: string
  modified_date?: string
  deleted_by?: string | null
  deleted_date?: string | null
}

export interface ICompany {
  company_id?: string
  company_name: string
  company_code: string
  pan: string
  gstn: string
  address_id: string
  address: IAddress
  session_usage_count?: number
  created_by?: string
  created_date?: string
  modified_by?: string
  modified_date?: string
  deleted_by?: string | null
  deleted_date?: string | null
}

export interface ICompanyFormError {
  company_name: IFieldError
  company_code: IFieldError
  pan: IFieldError
  gstn: IFieldError
  address: {
    address_line: IFieldError
    pincode: IFieldError
  }
}
