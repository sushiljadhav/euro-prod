import React from "react"

import Image from "next/image"

import StepList from "../../UISandbox/StepperComponent/StepperItemList"
const SignUpStepper = (): JSX.Element => {
  return (
    <div className="mx-auto w-full max-w-[606px] rounded-xl bg-primary px-6 py-2.5">
      <div className="mb-7">
        <Image
          src="/logo.png"
          width={"184"}
          height={80}
          alt="Euro Cars Logo"
        ></Image>
      </div>
      <h3 className="mb-4 text-white">🌟 Welcome Aboard!</h3>
      <p className="mb-12 text-white">
        We’re thrilled to have you join us! 🎉 To get you set up quickly and
        smoothly, we’ve streamlined our registration process into a few easy
        steps. Each step is designed to gather key information and personalize
        your account just the way you need it.
      </p>
      <StepList />
    </div>
  )
}

export default SignUpStepper
