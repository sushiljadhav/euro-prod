import React from "react"

import { Spinner, type SpinnerProps } from "@nextui-org/react"

const LoaderUI: React.FC<SpinnerProps> = ({
  size = "md",
  color = "primary",
  label = "loading",
}) => {
  return <Spinner size={size} color={color} label={label} />
}

export default LoaderUI
