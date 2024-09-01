"use client"
import React from "react"

import { FaLock } from "react-icons/fa"

import Wrapper from "../../common/Wrapper"
import ButtonUI from "../../UISandbox/Button/ButtonUI"
import InputUI from "../../UISandbox/Input/InputUI"
import LeftPanel from "../components/LeftPanel"
import { type IForgotPasswordProps } from "@/src/@types/Auth/forgot.types"

const Forgot: React.FC<IForgotPasswordProps> = ({
  currentPassword,
  newPassword,
  confirmPassword,
}) => {
  return (
    <Wrapper>
      <LeftPanel isBack={true}></LeftPanel>
      <div className="min-h-[743px] w-full max-w-[816px] rounded-r-[10px] bg-white pb-[77px] pt-[62px]">
        <div className="mx-auto w-full max-w-[580px]">
          <div className="mb-10 font-robotoFont text-5xl font-bold leading-[52px] tracking-tight text-black">
            Change Password
          </div>
          <div className="mb-8">
            <div className="mb-4 flex w-full justify-between gap-4">
              <div className="w-full">
                <InputUI
                  startContent={<FaLock className="mr-1 text-primary"></FaLock>}
                  {...currentPassword}
                />
              </div>
            </div>
          </div>
          <div className="mb-8">
            <div className="mb-4 flex w-full justify-between gap-4">
              <div className="w-full">
                <InputUI
                  startContent={<FaLock className="mr-1 text-primary"></FaLock>}
                  {...newPassword}
                />
              </div>
            </div>
          </div>
          <div className="mb-8">
            <div className="mb-4 flex w-full justify-between gap-4">
              <div className="w-full">
                <InputUI
                  startContent={<FaLock className="mr-1 text-primary"></FaLock>}
                  {...confirmPassword}
                />
              </div>
            </div>
          </div>
          <div className="mt-4 flex flex-col items-center justify-between">
            <div className="mb-4 w-full">
              <ButtonUI className="w-full">Submit</ButtonUI>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default Forgot
