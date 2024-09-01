import React from "react"

interface Props {
  children: React.ReactNode
}

const RootLayout: React.FC<Props> = ({ children }) => {
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <section className="bg-gray-300">{children}</section>
}

export default RootLayout
