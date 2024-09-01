import { type InputProps } from "@nextui-org/react"

import { type color, type radius } from "../@types/TCommonProps"
import { type TInputType } from "@/src/@types/TInputs"
import { type TValidation } from "@/src/@types/TValidation"

export type TInputVariant = "flat" | "bordered" | "underlined" | "faded"
export type TInputSize = "sm" | "md" | "lg"
export type TInputRadius =
  | radius.none
  | radius.sm
  | radius.md
  | radius.lg
  | radius.full

export type TIColor =
  | color.primary
  | color.default
  | color.secondary
  | color.success
  | color.warning
  | color.danger

export interface ISubmitError {
  error: boolean
  msg: string
}
export interface IInputBehavior extends Partial<InputProps> {
  className?: string
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    hasError?: boolean
  ) => void
  precisionType?: "default" | "volume"
  type?: TInputType
  value?: string
  validationType?: TValidation[]
  isInputValid?: boolean
  isTouched?: boolean
  submitError?: ISubmitError
  [key: string]: any
  classNames?: {
    input?: string
    label?: string
    [key: string]: string | undefined // Allows for additional keys
  }
}
