import React from "react"

import Image from "next/image"
const Logo = (): React.JSX.Element => {
  return (
    <div className="mb-2">
      <Image src="/logo.png" width={184} height={80} alt="logo"></Image>
    </div>
  )
}

export default Logo
