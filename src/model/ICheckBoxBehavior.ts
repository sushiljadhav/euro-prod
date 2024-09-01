import { type CheckboxProps } from "@nextui-org/react"

export type children = CheckboxProps["children"]
export type classNames = CheckboxProps["classNames"]
export type size = CheckboxProps["size"]
export type color = CheckboxProps["color"]
export type name = CheckboxProps["name"]
export type value = CheckboxProps["value"]
export type isDisabled = CheckboxProps["isDisabled"]
export type isInvalid = CheckboxProps["isInvalid"]
export type defaultSelected = CheckboxProps["defaultSelected"]
export type radius = CheckboxProps["radius"]
export type lineThrough = CheckboxProps["lineThrough"]
export type isRequired = CheckboxProps["isRequired"]

export interface ICheckBoxBehavior {
  children?: children
  classNames?: classNames
  defaultSelected?: defaultSelected
  size?: size
  color?: color
  name?: name
  radius?: radius
  value?: value
  lineThrough?: lineThrough
  isDisabled?: isDisabled
  isInvalid?: isInvalid
  isRequired?: isRequired
  onCheckBoxClick?: (event: React.ChangeEvent<HTMLInputElement>) => void
}
