/* eslint-disable @typescript-eslint/naming-convention */
import { color, radius, size } from "@/src/@types/TCommonProps"
import { TInputType, TInputVariant } from "@/src/@types/TInputs"
import { TValidation } from "@/src/@types/TValidation"
import { type IDropDownBehavior } from "@/src/model/IDropDownBehavior"
import { type IInputBehavior } from "@/src/model/IInputBehavior"
import { type ITableBehavior } from "@/src/model/ITable"

export const employee_name: IInputBehavior = {
  type: TInputType.text,
  color: color.primary,
  variant: TInputVariant.bordered,
  size: size.sm,
  placeholder: "Enter Employee Name",
  label: "Employee Name",
  labelPlacement: "outside",
  radius: radius.sm,
  isRequired: true,
  validationType: [TValidation.isRequired, TValidation.textOnly],
}

export const EmployeeCode: IInputBehavior = {
  type: TInputType.text,
  color: color.primary,
  variant: TInputVariant.bordered,
  size: size.sm,
  placeholder: "Enter Employee Code",
  label: "Employee Code",
  labelPlacement: "outside",
  radius: radius.sm,
  isRequired: true,
  validationType: [TValidation.isRequired],
}

export const PhoneNumber: IInputBehavior = {
  type: TInputType.text,
  color: color.primary,
  variant: TInputVariant.bordered,
  size: size.sm,
  placeholder: "+91 912-345-6789",
  label: "Phone Number",
  labelPlacement: "outside",
  radius: radius.sm,
  isRequired: true,
  validationType: [TValidation.isRequired, TValidation.isPhoneNumber],
}

export const Email: IInputBehavior = {
  type: TInputType.email,
  color: color.primary,
  variant: TInputVariant.bordered,
  size: size.sm,
  placeholder: "Your email",
  label: "Email",
  labelPlacement: "outside",
  radius: radius.sm,
  isRequired: true,
  validationType: [TValidation.isRequired, TValidation.email],
}

export const EmployeeRole: IDropDownBehavior = {
  label: "Role",
  color: color.primary,
  variant: TInputVariant.bordered,
  size: size.lg,
  placeholder: "Select Employee Role",
  labelPlacement: "outside",
  radius: radius.sm,
  isRequired: true,
}
export const EmployeeAttribute: IDropDownBehavior = {
  label: "Attribute",
  color: color.primary,
  variant: TInputVariant.bordered,
  size: size.lg,
  placeholder: "Select Employee Attribute",
  labelPlacement: "outside",
  radius: radius.sm,
  isRequired: true,
}

export const TableAttribute: ITableBehavior = {
  columns: [
    {
      key: "name",
      label: "NAME",
    },
    {
      key: "role",
      label: "ROLE",
    },
    {
      key: "status",
      label: "STATUS",
    },
  ],
  rows: [
    {
      key: "1",
      name: "Tony Reichert",
      role: "CEO",
      status: "Active",
    },
    {
      key: "2",
      name: "Zoey Lang",
      role: "Technical Lead",
      status: "Paused",
    },
    {
      key: "3",
      name: "Jane Fisher",
      role: "Senior Developer",
      status: "Active",
    },
    {
      key: "4",
      name: "William Howard",
      role: "Community Manager",
      status: "Vacation",
    },
  ],
}
