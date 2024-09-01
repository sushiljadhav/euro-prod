import { type ReactNode } from "react"

import { type RadioGroupProps } from "@nextui-org/react"

type label = RadioGroupProps["label"]
type size = RadioGroupProps["size"]
type color = RadioGroupProps["color"]
type orientation = RadioGroupProps["orientation"]
type name = RadioGroupProps["name"]
type value = RadioGroupProps["value"]
type defaultValue = RadioGroupProps["defaultValue"]
type isDisabled = RadioGroupProps["isDisabled"]
type isInvalid = RadioGroupProps["isInvalid"]
type isRequired = RadioGroupProps["isRequired"]
type isReadOnly = RadioGroupProps["isReadOnly"]
type classNames = RadioGroupProps["classNames"]
type children = RadioGroupProps["children"]
export interface IRadioGroupBehavior {
  classNames?: classNames
  children?: ReactNode | ReactNode[] | children
  label?: label
  size?: size
  color?: color
  orientation?: orientation
  name?: name
  value?: value
  defaultValue?: defaultValue
  isDisabled?: isDisabled
  isInvalid?: isInvalid
  isRequired?: isRequired
  isReadOnly?: isReadOnly
  onRadioClick?: (value: string) => void
}
