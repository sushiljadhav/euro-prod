import React from "react"

import { Select, SelectItem } from "@nextui-org/react"

import { animals } from "@/src/data/animal"
import { type IDropDownBehavior } from "@/src/model/IDropDownBehavior"

const DropDownUI: React.FC<IDropDownBehavior> = ({
  label = "State",
  placeholder = "select options",
  variant = "bordered",
  description,
  color = "default",
  labelPlacement = "outside",
  radius = "md",
  size = "lg",
  isRequired = false,
  isDisabled = false,
  data = animals,
  selectionMode = "single",
  onChange,
}) => {
  const [value, setValue] = React.useState<string>("")

  const handleSelectionChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setValue(e.target.value)
    if (onChange !== undefined) {
      onChange(e)
    }
    console.log(value)
  }

  return (
    <div className="flex w-full flex-wrap gap-4 md:flex-nowrap">
      <Select
        label={label}
        variant={variant}
        placeholder={placeholder}
        description={description}
        color={color}
        size={size}
        labelPlacement={labelPlacement}
        onChange={handleSelectionChange}
        radius={radius}
        classNames={{
          trigger: "border-primary border px-6 py-[18px]",
          listboxWrapper: "max-h-[200px]",
          innerWrapper: "text-tiny text-foreground placeholder:text-tiny",
          label: "text-foreground font-semibold text-tiny",
        }}
        isRequired={isRequired}
        isDisabled={isDisabled}
        selectionMode={selectionMode}
      >
        {data.map((animal) => (
          <SelectItem key={animal.value}>{animal.label}</SelectItem>
        ))}
      </Select>
      {/* <p className="text-small text-default-500">Selected: {value}</p> */}
    </div>
  )
}

export default DropDownUI
