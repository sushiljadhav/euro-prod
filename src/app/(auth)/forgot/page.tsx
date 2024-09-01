"use client"
import React from "react"

import Forgot from "@/src/components/Auth/forgot/Forgot"
import {
  ConfirmPassword,
  CurrentPassword,
  NewPassword,
} from "@/src/components/Auth/forgot/props"

const ForgotPage: React.FC<any> = () => {
  return (
    <Forgot
      newPassword={{ ...NewPassword }}
      currentPassword={{ ...CurrentPassword }}
      confirmPassword={{ ...ConfirmPassword }}
    ></Forgot>
  )
}

export default ForgotPage
