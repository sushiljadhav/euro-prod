"use client"
import React, { useEffect, useMemo, useState } from "react"

import { Input } from "@nextui-org/react"
import { LuEyeOff, LuEye } from "react-icons/lu"

import { InputManager } from "./InputManager"
import { type IInputBehavior } from "../../../model/IInputBehavior"

// Styles for different parts of the input component

const getStyles = (size: string | undefined): any => {
  const baseStyles = {
    label: [
      "text-foreground",
      "font-semibold",
      "text-medium",
      "pl-4",
      "bottom-0",
    ],
    input: [
      "bg-transparent",
      "text-tiny",
      "text-textContent",
      "placeholder:text-textContent",
      "w-full",
    ],
    innerWrapper: ["bg-transparent"],
    inputWrapper: ["border", "border-primary", "h-[50px]", "py-4", "px-6"],
  }

  const InputFormStyle = {
    label: ["text-foreground", "font-semibold", "text-tiny", "pl-1"],
    input: [
      "bg-transparent",
      "text-tiny",
      "text-textContent",
      "placeholder:text-textContent",
      "w-full",
    ],
    inputWrapper: ["border", "border-primary"],
    helperWrapper: ["absolute", "bottom-[-23px]"],
  }

  if (size === "md") {
    return {
      ...baseStyles,
      label: [...baseStyles.label],
      input: [...baseStyles.input],
      innerWrapper: [...baseStyles.innerWrapper],
      inputWrapper: [...baseStyles.inputWrapper],
    }
  }

  if (size === "md") {
    return baseStyles
  } else {
    return InputFormStyle
  }
}

/**
 * InputUI component for rendering an input field with validation and styling.
 * @param param0 - Properties for the input field, including type, color, size, etc.
 * @returns JSX element representing the input field.
 */

const InputUI: React.FC<IInputBehavior> = ({
  type = "text",
  color,
  variant,
  size,
  placeholder,
  label,
  labelPlacement,
  radius,
  isRequired,
  validationType,
  precisionType,
  endContent,
  value,
  name,
  isTouched = false,
  isInputValid = false,
  onChange,
  onValidationChange,
  showError = false,
  submitError,
  ...props
}) => {
  const [inputValue, setInputValue] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [inputValid, setInputValid] = useState<boolean>(false)
  const [touched, setTouched] = useState<boolean>(isTouched)
  const [isVisible, setIsVisible] = useState<boolean>(type !== "password")
  const styles = getStyles(size)

  const toggleVisibility = (): void => {
    setIsVisible(!isVisible)
  }

  // Create an instance of InputManager

  // Create an instance of InputManager
  const inputManager = useMemo(
    () => new InputManager(validationType),
    [validationType]
  )

  // Handle change events for the input
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value
    setInputValue(value)

    // Validate on change but don't set the error immediately

    const validationResult =
      precisionType !== undefined
        ? inputManager.validate(value, precisionType)
        : inputManager.validate(value)

    if (!touched) {
      setError(null)
      setInputValid(validationResult.error)
    } else {
      setInputValid(validationResult.error)
      setError(validationResult.error ? validationResult.msg : null)
    }

    if (onValidationChange !== undefined && name !== undefined) {
      onValidationChange(!validationResult.error, name, validationResult.msg)
    }
    if (onChange !== undefined) {
      onChange(event, inputValid)
    }
  }

  // Handle blur events for displaying validation errors

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>): void => {
    setTouched(true)
    const validationResult = inputManager.validate(inputValue)
    const hasError = validationResult.error
    setError(hasError ? validationResult.msg : null)
    setInputValid(hasError)

    if (onValidationChange !== undefined && name !== undefined) {
      onValidationChange(!hasError, name, validationResult.msg)
    }
  }

  useEffect(() => {
    if (submitError !== undefined) {
      if (submitError?.msg !== null && (submitError?.error ?? false)) {
        setError(submitError.msg)
        setInputValid(submitError.error)
      }
    }
  }, [submitError])

  useEffect(() => {
    if (value !== "" && value !== undefined) {
      setInputValue(value)
    }
  }, [value])

  return (
    <Input
      type={type === "password" && !isVisible ? "password" : "text"}
      classNames={{ ...styles }}
      variant={variant}
      placeholder={placeholder}
      color={color}
      radius={radius}
      label={label}
      labelPlacement={labelPlacement}
      value={inputValue}
      isInvalid={error != null}
      isDisabled={false}
      errorMessage={error}
      isRequired={isRequired}
      onBlur={handleBlur}
      onChange={handleChange}
      name={name}
      endContent={
        type === "password" ? (
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility}
            aria-label="toggle password visibility"
          >
            {isVisible ? (
              <LuEye className="pointer-events-none text-2xl text-default-400" />
            ) : (
              <LuEyeOff className="pointer-events-none text-2xl text-default-400" />
            )}
          </button>
        ) : (
          endContent
        )
      }
      {...props}
    />
  )
}

export default InputUI
