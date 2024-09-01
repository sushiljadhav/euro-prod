import { color, radius, size } from "@/src/@types/TCommonProps"
import { TInputType, TInputVariant } from "@/src/@types/TInputs"
import { TValidation } from "@/src/@types/TValidation"
import { type ICheckBoxBehavior } from "@/src/model/ICheckBoxBehavior"
import { type IInputBehavior } from "@/src/model/IInputBehavior"

export const FirstName: IInputBehavior = {
  type: TInputType.text,
  color: color.primary,
  variant: TInputVariant.bordered,
  size: size.sm,
  placeholder: "First Name",
  label: "First Name",
  labelPlacement: "outside",
  radius: radius.sm,
  isRequired: false,
  validationType: [TValidation.isRequired],
}

export const LastName: IInputBehavior = {
  type: TInputType.text,
  color: color.primary,
  variant: TInputVariant.bordered,
  size: size.sm,
  placeholder: "Last Name",
  label: "Last Name",
  labelPlacement: "outside",
  radius: radius.sm,
  isRequired: false,
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
  isRequired: false,
  validationType: [TValidation.isRequired, TValidation.isPhoneNumber],
}
export const AlternatePhoneNumber: IInputBehavior = {
  type: TInputType.text,
  color: color.primary,
  variant: TInputVariant.bordered,
  size: size.sm,
  placeholder: "+91 912-345-6789",
  label: "Alternate Phone Number",
  labelPlacement: "outside",
  radius: radius.sm,
  isRequired: false,
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
  isRequired: false,
  validationType: [TValidation.isRequired, TValidation.email],
}

export const Password: IInputBehavior = {
  type: TInputType.password,
  color: color.primary,
  variant: TInputVariant.bordered,
  size: size.sm,
  placeholder: "Min 8 Characters with a combination of letters and numbers",
  label: "Password",
  labelPlacement: "outside",
  radius: radius.sm,
  isRequired: false,
  validationType: [TValidation.isRequired, TValidation.password],
}

export const Terms: ICheckBoxBehavior = {}
