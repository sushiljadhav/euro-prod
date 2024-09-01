"use client"
import React from "react"

import ProfileAvatar from "../UISandbox/ProfileAvatar/ProfileAvatar"

const Header = ({ className }): React.JSX.Element => {
  return (
    <header className={className}>
      <div className="container mx-auto flex h-full items-center justify-between px-6">
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <ProfileAvatar />
      </div>
    </header>
  )
}

export default Header
