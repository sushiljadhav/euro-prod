import { color, radius, size } from "@/src/@types/TCommonProps"
import { TInputType, TInputVariant } from "@/src/@types/TInputs"
import { TValidation } from "@/src/@types/TValidation"
import { type ICheckBoxBehavior } from "@/src/model/ICheckBoxBehavior"
import { type IInputBehavior } from "@/src/model/IInputBehavior"

export const UserName: IInputBehavior = {
  type: TInputType.text,
  color: color.primary,
  variant: TInputVariant.bordered,
  size: size.sm,
  placeholder: "Enter your mobile number or email address",
  label: "User Name",
  labelPlacement: "outside",
  radius: radius.sm,
  isRequired: false,
  validationType: [TValidation.isRequired, TValidation.loginId],
}

export const Password: IInputBehavior = {
  type: TInputType.password,
  color: color.primary,
  variant: TInputVariant.bordered,
  size: size.sm,
  placeholder: "Enter your password or OTP",
  label: "Password",
  labelPlacement: "outside",
  radius: radius.sm,
  isRequired: false,
  validationType: [TValidation.isRequired],
}

export const Terms: ICheckBoxBehavior = {}
