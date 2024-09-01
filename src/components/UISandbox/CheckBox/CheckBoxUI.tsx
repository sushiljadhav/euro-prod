import React from "react"

import { Checkbox } from "@nextui-org/checkbox"

// import CheckBoxManager from "./CheckBoxManager"
import { type ICheckBoxBehavior } from "@/src/model/ICheckBoxBehavior"

const styles = {
  slots: {
    base: "border-primary",
    icon: "text-white",
    content: "text-secondary-foreground text-tiny",
  },
}

const CheckBoxUI: React.FC<ICheckBoxBehavior> = ({
  classNames,
  children,
  radius = "sm",
  size = "lg",
  color = "primary",
  name = "",
  value,
  isDisabled = false,
  isInvalid = false,
  defaultSelected = false,
  onCheckBoxClick,
}) => {
  // const checkBoxManager = new CheckBoxManager()

  const handleRadioChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    // Ensure CheckBoxManager and handleClick are correctly typed and initialized
    // const result = checkBoxManager?.handleClick(event)
    if (onCheckBoxClick !== undefined) onCheckBoxClick(event)
    // if (result !== null && onCheckBoxClick !== undefined) {
    // }
  }
  return (
    <Checkbox
      size={size}
      classNames={{
        base: styles.slots.base,
        icon: styles.slots.icon,
        label: styles.slots.content,
      }}
      defaultSelected={defaultSelected}
      onChange={handleRadioChange}
      color={color}
      name={name}
      value={value}
      isDisabled={isDisabled}
      isInvalid={isInvalid}
      radius={radius}
      style={{
        borderColor: "border-primary",
      }}
    >
      {children}
    </Checkbox>
  )
}

export default CheckBoxUI
