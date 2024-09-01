import { type IInputBehavior } from "@/src/model/IInputBehavior"

export interface IAddressDetails {
  address_line: IInputBehavior
  pincode: IInputBehavior
}
export interface ICompanyDetails {
  company_name: IInputBehavior
  company_code: IInputBehavior
  pan: IInputBehavior
  gstn: IInputBehavior
  session_usage_count?: number
  address: IAddressDetails
}
