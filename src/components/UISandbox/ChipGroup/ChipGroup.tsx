import React from "react"

import { Chip } from "@nextui-org/react"

export interface ChipProps {
  key: string
  label: string
  className?: string
  variant?: "dot" | "outlined" | "filled"
  onClick?: () => void
}

interface ChipGroupProps {
  items: ChipProps[]
  className?: string
  onChipRemove?: (key: string) => void // Callback when a chip is removed
}

export const ChipGroup: React.FC<ChipGroupProps> = ({
  items,
  className,
  onChipRemove,
}) => {
  // Handle chip removal
  const handleClose = (key: string): void => {
    if (onChipRemove != null) {
      onChipRemove(key) // Notify parent to handle removal
    }
  }

  return (
    <div className={`flex gap-2 ${className}`}>
      {items.map((chip) => (
        <Chip
          key={chip.key} // Use the unique key prop for each chip
          className={`${chip.className} bg-primary text-white`}
          // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
          onClick={chip.onClick}
          onClose={() => {
            handleClose(chip.key)
          }}
        >
          {chip.label}
        </Chip>
      ))}
    </div>
  )
}
