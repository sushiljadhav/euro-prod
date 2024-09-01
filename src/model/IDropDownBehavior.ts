import type React from "react"

import { type SelectProps } from "@nextui-org/react"

type itemStartContent = SelectProps["startContent"]
type itemEndContent = SelectProps["startContent"]

export interface SelectData {
  label: string
  value: string
  description?: string
}

export interface IDropDownBehavior extends Partial<SelectProps> {
  itemStartContent?: itemStartContent
  itemEndContent?: itemEndContent
  data?: SelectData[]
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void
}
