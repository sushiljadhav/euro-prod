export interface IEmployeeForm {
  employee_id: string
  employee_name: string
  mobile_no: string
  email: string
  employee_code?: string
  is_active: boolean
  roles?: string[]
}
