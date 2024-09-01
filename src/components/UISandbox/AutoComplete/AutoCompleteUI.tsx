import React from "react"

import { Autocomplete, AutocompleteItem } from "@nextui-org/react"

import { animals } from "@/src/data/animal"
import { type IAutoCompleteBehavior } from "@/src/model/IAutoComplete"

const AutoCompleteUI: React.FC<IAutoCompleteBehavior> = ({
  label = "State",
  placeholder = "select options",
  variant = "bordered",
  description,
  color = "default",
  labelPlacement = "outside",
  radius = "md",
  size = "lg",
  isRequired = false,
  data = animals,
  onAutocompleteChange,
}) => {
  const [value, setValue] = React.useState<string>("")

  const handleSelectionChange = (value: string): void => {
    setValue(value)
    if (onAutocompleteChange !== undefined) {
      onAutocompleteChange(value)
    }
  }

  return (
    <>
      <Autocomplete
        label={label}
        variant={variant}
        placeholder={placeholder}
        description={description}
        color={color}
        size={size}
        labelPlacement={labelPlacement}
        radius={radius}
        classNames={{
          listboxWrapper: "max-h-[200px]",
        }}
        onInputChange={handleSelectionChange}
        inputProps={{
          classNames: {
            label: "text-foreground font-medium pl-1 text-[14px]",
            input:
              "bg-transparent text-tiny text-textContent placeholder:text-textContent w-full",
            inputWrapper: "border border-primary min-h-[38px] h-[38px]",
          },
        }}
        listboxProps={{
          hideSelectedIcon: true,
          itemClasses: {
            base: [
              "rounded-medium",
              "text-default-500",
              "transition-opacity",
              "data-[hover=true]:text-foreground",
              "dark:data-[hover=true]:bg-default-50",
              "data-[pressed=true]:opacity-70",
              "data-[hover=true]:bg-default-200",
              "data-[selectable=true]:focus:bg-default-100",
              "data-[focus-visible=true]:ring-default-500",
            ],
          },
        }}
        selectedKey={value}
      >
        {data.map((animal) => (
          <AutocompleteItem key={animal.value} value={animal.value}>
            {animal.label}
          </AutocompleteItem>
        ))}
      </Autocomplete>
      {/* <p className="text-small text-default-500">Selected: {value}</p> */}
    </>
  )
}

export default AutoCompleteUI
