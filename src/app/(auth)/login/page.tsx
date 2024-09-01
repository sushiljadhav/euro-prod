import React from "react"

import { UserName, Password } from "@/src/components/Auth/signIn/props"
import SignIn from "@/src/components/Auth/signIn/SignIn"

const Login: React.FC<any> = () => {
  return <SignIn login_id={{ ...UserName }} password={{ ...Password }}></SignIn>
}

export default Login
