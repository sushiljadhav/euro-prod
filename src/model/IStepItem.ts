import type { ReactElement } from "react"

export interface StepItemProps {
  icon: ReactElement
  title: string
  description: string
  isActive?: boolean
  onClick?: () => void
}
