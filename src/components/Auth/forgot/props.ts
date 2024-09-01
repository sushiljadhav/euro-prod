import { color, radius, size } from "@/src/@types/TCommonProps"
import { TInputType, TInputVariant } from "@/src/@types/TInputs"
import { TValidation } from "@/src/@types/TValidation"
import { type ICheckBoxBehavior } from "@/src/model/ICheckBoxBehavior"
import { type IInputBehavior } from "@/src/model/IInputBehavior"

export const CurrentPassword: IInputBehavior = {
  type: TInputType.password,
  color: color.primary,
  variant: TInputVariant.bordered,
  size: size.sm,
  placeholder: " Please enter your current password to reset your Password",
  label: "Current Password",
  labelPlacement: "outside",
  radius: radius.sm,
  isRequired: false,
  validationType: [TValidation.isRequired],
}

export const NewPassword: IInputBehavior = {
  type: TInputType.password,
  color: color.primary,
  variant: TInputVariant.bordered,
  size: size.sm,
  placeholder: " Please enter your new password",
  label: "New Password",
  labelPlacement: "outside",
  radius: radius.sm,
  isRequired: false,
  validationType: [TValidation.isRequired],
}

export const ConfirmPassword: IInputBehavior = {
  type: TInputType.password,
  color: color.primary,
  variant: TInputVariant.bordered,
  size: size.sm,
  placeholder: " Please re-enter your new password",
  label: "Confirm New Password",
  labelPlacement: "outside",
  radius: radius.sm,
  isRequired: false,
  validationType: [TValidation.isRequired],
}

export const Terms: ICheckBoxBehavior = {}
