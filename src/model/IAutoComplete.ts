import { type AutocompleteProps } from "@nextui-org/react"

import { type SelectData } from "../data/animal"

type itemStartContent = AutocompleteProps["startContent"]
type itemEndContent = AutocompleteProps["startContent"]

export interface IAutoCompleteBehavior extends Partial<AutocompleteProps> {
  itemStartContent?: itemStartContent
  itemEndContent?: itemEndContent
  data?: SelectData[]
  onAutocompleteChange?: (value: string) => void
}
