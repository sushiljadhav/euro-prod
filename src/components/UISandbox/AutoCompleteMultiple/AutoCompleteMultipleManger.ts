export interface Item {
  key: string
  label: string
}

export class AutocompleteManager {
  private readonly defaultItems: Item[]
  private items: Item[]
  private selectedItems: Item[]
  private inputValue: string

  constructor(defaultItems: Item[], selectedItems: Item[] = []) {
    if (!Array.isArray(defaultItems)) {
      throw new Error("defaultItems must be an array of Item")
    }
    this.defaultItems = defaultItems
    this.items = [...defaultItems]
    // Initialize selectedItems with provided selectedItems
    this.selectedItems = selectedItems.filter((item) =>
      defaultItems.some((defaultItem) => defaultItem.key === item.key)
    )
    this.inputValue = ""
  }

  getInputValue(): string {
    return this.inputValue
  }

  getFilteredItems(): Item[] {
    // Filter items based on the input value and exclude selected items
    return this.inputValue.length > 0
      ? this.items.filter((item) =>
          item.label.toLowerCase().includes(this.inputValue.toLowerCase())
        )
      : this.items
  }

  handleSelectItem(item: Item): void {
    if (!this.selectedItems.some((selected) => selected.key === item.key)) {
      this.selectedItems = [...this.selectedItems, item]
      this.items = this.items.filter((i) => i.key !== item.key)
    }
    this.inputValue = ""
  }

  handleRemoveItem(itemKey: string): void {
    this.selectedItems = this.selectedItems.filter(
      (selectedItem) => selectedItem.key !== itemKey
    )

    const itemToReAdd = this.defaultItems.find((item) => item.key === itemKey)
    if (itemToReAdd != null && !this.items.some((i) => i.key === itemKey)) {
      this.items = [...this.items, itemToReAdd]
    }
  }

  setInputValue(value: string): void {
    this.inputValue = value
  }

  getSelectedItems(): Item[] {
    return this.selectedItems
  }

  getItems(): Item[] {
    return this.items
  }
}
