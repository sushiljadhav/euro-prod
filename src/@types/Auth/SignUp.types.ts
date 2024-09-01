// src/components/SignUp/SignUp.types.ts
import { type ICheckBoxBehavior } from "@/src/model/ICheckBoxBehavior"
import { type IInputBehavior } from "@/src/model/IInputBehavior"

export interface ISignUpProps {
  firstName: IInputBehavior
  lastName: IInputBehavior
  phoneNumber: IInputBehavior
  alternatePhoneNumber: IInputBehavior
  email: IInputBehavior
  password: IInputBehavior
  termsAccepted?: ICheckBoxBehavior
}
