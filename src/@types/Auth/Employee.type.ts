import { type IFieldError } from "@/src/model/common/error"
import { type IUser } from "@/src/model/employee/IEmployeeTable"
import { type IDropDownBehavior } from "@/src/model/IDropDownBehavior"
import { type IInputBehavior } from "@/src/model/IInputBehavior"
import { type ITableBehavior } from "@/src/model/ITable"
import { type IDropDown } from "@/src/model/Roles/IRoles"

export interface IEmployeeProps {
  employeeToAction?: IUser
  employeeName: IInputBehavior
  phoneNumber: IInputBehavior
  email: IInputBehavior
  role: IDropDownBehavior
  attribute: IDropDownBehavior
  tableData?: ITableBehavior
  employeeCode: IInputBehavior
  rolesOption?: IDropDown[]
  permissionOption?: IDropDown[]
  isEmployeeEdit?: boolean
  onClick?: () => void | Promise<void>
  onEmployeeEdit?: () => void | Promise<void>
}

export interface IEmployeeFormError {
  employee_name: IFieldError
  mobile_no: IFieldError
  email: IFieldError
}
