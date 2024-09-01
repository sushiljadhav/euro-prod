import React, { useState } from "react"

// Icons
import { FaUser } from "react-icons/fa"
import { HiReceiptTax } from "react-icons/hi"
import { IoDocumentTextSharp } from "react-icons/io5"
import { MdLocationOn } from "react-icons/md"

// Components
import StepItem from "./StepContain"

const StepList: React.FC = () => {
  const [activeSteps, setActiveSteps] = useState<number[]>([])

  const handleStepClick = (index: number): void => {
    setActiveSteps((prev) => {
      // Create an array from 0 to index
      const newActiveSteps = Array.from({ length: index + 1 }, (_, i) => i)
      return newActiveSteps
    })
  }

  return (
    <div className="relative">
      <StepItem
        icon={<FaUser className="size-6" />}
        title="Personal Details"
        description="Provide your name, mobile number, alternate number, and email address."
        isActive={activeSteps.includes(0)}
        onClick={() => {
          handleStepClick(0)
        }}
      />
      <StepItem
        icon={<MdLocationOn className="size-6" />}
        title="Address Details"
        description="Primary Address: Enter your primary address details including geo address, city, full address, and pincode."
        isActive={activeSteps.includes(1)}
        onClick={() => {
          handleStepClick(1)
        }}
      />
      <StepItem
        icon={<IoDocumentTextSharp className="size-6" />}
        title="Kyc Documents"
        description="Select your KYC document type from the drop down and provide the document reference number."
        isActive={activeSteps.includes(2)}
        onClick={() => {
          handleStepClick(2)
        }}
      />
      <StepItem
        icon={<HiReceiptTax className="size-6" />}
        title="GST Information"
        description="Indicate if a GST bill is required and provide your GST registration number."
        isActive={activeSteps.includes(3)}
        onClick={() => {
          handleStepClick(3)
        }}
      />
      <StepItem
        icon={<MdLocationOn className="size-6" />}
        title="Additional Address"
        description="Provide any additional addresses as needed."
        isActive={activeSteps.includes(4)}
        onClick={() => {
          handleStepClick(4)
        }}
      />
      <div className="absolute left-5 top-5 h-[360px] w-px bg-white"></div>
    </div>
  )
}

export default StepList
