import { type IInputBehavior } from "@/src/model/IInputBehavior"

export interface IForgotPasswordProps {
  currentPassword: IInputBehavior
  newPassword: IInputBehavior
  confirmPassword: IInputBehavior
}
