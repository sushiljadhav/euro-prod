import React from "react"

import { type IconSvgProps } from "@/src/@types/IconSvgProps"

export const VerticalDotsIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps): React.JSX.Element => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={height ?? size}
    role="presentation"
    viewBox="0 0 24 24"
    width={width ?? size}
    {...props}
  >
    <path
      d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
      fill="currentColor"
    />
  </svg>
)
