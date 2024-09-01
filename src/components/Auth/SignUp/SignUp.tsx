"use client"

import Wrapper from "../../common/Wrapper"
import ButtonUI from "../../UISandbox/Button/ButtonUI"
import InputUI from "../../UISandbox/Input/InputUI"
import SignUpStepper from "../components/SignUpStepper"
import { type ISignUpProps } from "@/src/@types/Auth/SignUp.types"

const SignUP: React.FC<ISignUpProps> = ({
  firstName,
  phoneNumber,
  alternatePhoneNumber,
  email,
}) => {
  return (
    <Wrapper>
      <div className="w-full max-w-[606px] pr-3">
        <SignUpStepper></SignUpStepper>
      </div>
      <div className="w-full max-w-[816px] rounded-r-xl bg-white">
        <div className="mx-auto w-full max-w-[608px]">
          <div className="mb-1 font-robotoFont text-xl font-bold leading-9 tracking-tight text-slate-900">
            Tell us about yourself
          </div>
          <p className="mb-6 text-black">
            To set up your account, please provide the following details:
          </p>
          <div className="mb-[51px]">
            <div className="mb-4 flex w-full">
              <div className="w-full">
                <InputUI {...firstName} />
              </div>
            </div>
            <div className="mb-4 flex w-full">
              <InputUI {...email} />
            </div>
            <div className="mb-4 flex  w-full gap-8">
              <InputUI {...phoneNumber} />
              <InputUI {...alternatePhoneNumber} />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="w-full">
              <ButtonUI className="w-full">Create Account</ButtonUI>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default SignUP
