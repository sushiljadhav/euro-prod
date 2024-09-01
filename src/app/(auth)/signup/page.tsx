import React from "react"

import {
  FirstName,
  LastName,
  PhoneNumber,
  Email,
  Password,
  AlternatePhoneNumber,
} from "@/src/components/Auth/SignUp/props"
import SignUP from "@/src/components/Auth/SignUp/SignUp"

const SignUpPage: React.FC<any> = () => {
  return (
    <SignUP
      firstName={{ ...FirstName }}
      lastName={{ ...LastName }}
      phoneNumber={{ ...PhoneNumber }}
      alternatePhoneNumber={{ ...AlternatePhoneNumber }}
      email={{ ...Email }}
      password={{ ...Password }}
    ></SignUP>
  )
}

export default SignUpPage
