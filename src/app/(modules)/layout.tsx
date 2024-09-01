import React from "react"

import Footer from "@/src/components/common/Footer"
import Header from "@/src/components/common/Header"
import Sidebar from "@/src/components/common/SideBar"
interface Props {
  children: React.ReactNode
}

const RootLayout: React.FC<Props> = ({ children }) => {
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return (
    <div className="flex min-h-screen font-interFont">
      {/* Sidebar */}
      <Sidebar className="h-screen w-64 border-r-1 border-[#274f8d36] bg-[#F8FAFC]" />

      <div className="flex grow flex-col">
        {/* Header */}
        <Header className="h-16 bg-gray-100 shadow-md" />

        {/* Main Content */}
        <main className="grow bg-gray-50 p-6">{children}</main>

        {/* Footer */}
        <Footer className="h-16 bg-gray-100 shadow-inner" />
      </div>
    </div>
  )
}

export default RootLayout
