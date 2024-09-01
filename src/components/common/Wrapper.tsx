import React from "react"

const Wrapper = ({ children }): React.JSX.Element => {
  return (
    <div className="container relative mx-auto  flex min-h-screen w-full items-center">
      <div className="mx-auto flex min-h-full w-full max-w-[1440px] items-start rounded-[10px] bg-white p-2.5">
        {children}
      </div>
    </div>
  )
}

export default Wrapper
