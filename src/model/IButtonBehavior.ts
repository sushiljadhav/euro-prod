import type React from "react"

import { type ButtonProps } from "@nextui-org/react"

export interface IButtonBehavior extends Partial<ButtonProps> {
  buttonType?: "default" | "url"
  href?: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>
}
