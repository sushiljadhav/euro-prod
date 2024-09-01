import * as React from "react"

import { Button, Link } from "@nextui-org/react"

import ButtonManger from "./ButtonManager"
import { type IButtonBehavior } from "@/src/model/IButtonBehavior"

const styles = {
  default:
    "text-white border-1 px-6 py-3.5 text-medium rounded-2 font-medium opacity-1",
  disabled: "opacity-50 cursor-not-allowed",
}

/**
 * ButtonUI component for rendering a styled button or link.
 * @param param0 - Properties for configuring the button or link.
 * @returns JSX.Element - The rendered button or link component.
 */
const ButtonUI: React.FC<IButtonBehavior> = ({
  buttonType = "default",
  type,
  children,
  color = "primary",
  className,
  variant,
  size,
  radius = "sm",
  isDisabled,
  isLoading,
  fullWidth,
  href = "https://github.com/nextui-org/nextui",
  onClick,
  style,
  endContent,
  ...props
}) => {
  // Create ButtonManager instance for handling click logic
  const buttonManager = new ButtonManger()

  // Determine the styles based on the variant prop
  const variantStyle = Boolean(styles[variant ?? ""]) || styles.default

  // Combine provided className with the computed variant style
  const combinedClassName = `${variantStyle} ${className} ${(isDisabled ?? false) ? styles.disabled : ""}`
  // Decide whether to render as a Link or Button based on type
  const componentType = buttonType === "url" ? Link : Button
  const redirectLink = href ?? ""

  /**
   *
   * @param event - Mouse click event
   */
  const handleButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    const result = buttonManager.handleClick(event)
    if (result) {
      if (onClick != null) {
        void onClick(event)
      }
    }
  }

  return (
    <Button
      type={type}
      variant={variant}
      className={combinedClassName}
      color={color}
      isDisabled={isDisabled}
      radius={radius}
      size={size}
      isLoading={isLoading}
      style={{
        fontWeight: 700,
        cursor: "pointer",
        ...style,
      }}
      fullWidth={fullWidth}
      as={componentType}
      href={redirectLink}
      onClick={componentType === Button ? handleButtonClick : undefined}
      endContent={endContent}
    >
      {children}
    </Button>
  )
}

export default ButtonUI
