import React from "react"

const Footer = ({ className }): React.JSX.Element => {
  return (
    <footer className={className}>
      <div className="container mx-auto flex h-full items-center justify-center px-6">
        <p className="text-sm">© 2024 Your Company. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
