"use client"

import React, { useState, useEffect } from "react"

import {
  Autocomplete,
  AutocompleteItem,
  type AutocompleteProps,
} from "@nextui-org/react"

import { AutocompleteManager, type Item } from "./AutoCompleteMultipleManger"
import { ChipGroup } from "../ChipGroup/ChipGroup"
import { type IDropDown } from "@/src/model/Roles/IRoles"

export interface AutocompleteWithChipsProps extends Partial<AutocompleteProps> {
  items?: IDropDown[]
  selectedKeys?: string[]
  onAutoCompleteSelect?: (values: string[]) => void
}

export function AutoCompleteMultipleUI({
  items: defaultItems,
  selectedKeys = [],
  label = "State",
  placeholder = "select options",
  variant = "bordered",
  description,
  color = "default",
  labelPlacement = "outside",
  radius = "md",
  size = "lg",
  isRequired = false,
  onAutoCompleteSelect,
}: AutocompleteWithChipsProps): JSX.Element {
  const [manager] = useState(new AutocompleteManager(defaultItems ?? []))
  const [items, setItems] = useState<Item[]>(manager.getItems())
  const [selectedItems, setSelectedItems] = useState<Item[]>(
    manager.getSelectedItems()
  )
  const [inputValue, setInputValue] = useState(manager.getInputValue())

  useEffect(() => {
    manager.setInputValue(inputValue)
    setItems(manager.getFilteredItems())
  }, [inputValue, manager])

  const handleRemoveItem = (itemKey: string): void => {
    manager.handleRemoveItem(itemKey)
    setSelectedItems(manager.getSelectedItems())
    setItems(manager.getItems())
    onAutoCompleteSelect?.(manager.getSelectedItems().map((item) => item.key))
  }

  const handleSelectItem = (item: Item): void => {
    manager.handleSelectItem(item)
    setSelectedItems(manager.getSelectedItems())
    setItems(manager.getItems())
    onAutoCompleteSelect?.(manager.getSelectedItems().map((item) => item.key))
  }

  useEffect(() => {
    if (selectedKeys.length > 0 && defaultItems != null) {
      const selected = selectedKeys
        .map((key) => defaultItems.find((item) => item.key === key))
        .filter((item): item is Item => item !== undefined)
      setSelectedItems(selected)
    }
  }, [selectedKeys, defaultItems])

  const renderItems = items.map((item) => (
    <AutocompleteItem key={item.key} textValue={item.label}>
      {item.label}
    </AutocompleteItem>
  ))

  return (
    <div className="flex w-full flex-wrap gap-4 md:flex-nowrap">
      <Autocomplete
        items={items}
        label={label}
        placeholder={placeholder}
        classNames={{
          listboxWrapper: "max-h-[200px]",
        }}
        variant={variant}
        description={description}
        color={color}
        size={size}
        labelPlacement={labelPlacement}
        radius={radius}
        inputProps={{
          classNames: {
            label: "text-foreground font-medium pl-1 text-[14px]",
            input:
              "bg-transparent text-tiny text-textContent placeholder:text-textContent w-full",
            inputWrapper:
              "border border-primary min-h-[38px] h-[38px] rounded-[8px]",
          },
        }}
        listboxProps={{
          hideSelectedIcon: true,
          itemClasses: {
            base: [
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
        startContent={
          <div className="justify-start">
            <ChipGroup
              className="w-full justify-end"
              items={selectedItems.map((item) => ({
                key: item.key,
                label: item.label,
                className: "cursor-pointer",
                variant: "dot",
              }))}
              onChipRemove={(key) => {
                handleRemoveItem(key)
              }}
            />
          </div>
        }
        onSelectionChange={(key) => {
          if (key !== null) {
            const selectedItem = defaultItems?.find((item) => item.key === key)
            if (selectedItem != null) {
              handleSelectItem(selectedItem)
            }
          }
        }}
        inputValue={inputValue}
        onInputChange={setInputValue} // Directly set inputValue
      >
        {renderItems}
      </Autocomplete>
      {/* <p>Selected items: {selectedItems.map(item => item.label).join(", ")}</p> */}
    </div>
  )
}
