import React from "react"

import { RadioGroup } from "@nextui-org/react"

import RadioGroupManager from "./RadioGroupManager"
import { type IRadioGroupBehavior } from "@/src/model/IRadioGroupBehavior"

const RadioGroupUI: React.FC<IRadioGroupBehavior> = ({
  children,
  label = "Select an option",
  size = "md",
  color = "default",
  orientation = "horizontal",
  name = "",
  value,
  defaultValue,
  isDisabled = false,
  isInvalid = false,
  classNames = {},
  onRadioClick = () => {},
}) => {
  const radioGroupManager = new RadioGroupManager()

  const combinedClassNames = [
    "font-bold",
    classNames.base,
    classNames.description,
    classNames.errorMessage,
    classNames.label,
    classNames.wrapper,
  ]
    .filter(Boolean) // Remove any undefined or empty values
    .join(" ")

  const handleRadioChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    // Ensure radioGroupManager and handleClick are correctly typed and initialized
    const result = radioGroupManager?.handleClick(event)
    if (result !== null && onRadioClick !== undefined) {
      onRadioClick(result)
    }
  }
  return (
    <RadioGroup
      label={label}
      size={size}
      color={color}
      orientation={orientation}
      isDisabled={isDisabled}
      isInvalid={isInvalid}
      onChange={handleRadioChange}
      style={{
        fontWeight: 700,
      }}
      className={combinedClassNames}
      name={name}
    >
      {children}
    </RadioGroup>
  )
}

export default RadioGroupUI
