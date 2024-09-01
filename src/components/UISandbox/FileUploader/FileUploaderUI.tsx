import React, { useState, useEffect } from "react"

import { Input } from "@nextui-org/react"
import { FaTimes } from "react-icons/fa"

import { validateFile } from "./FileManger"
import { type IInputBehavior } from "@/src/model/IInputBehavior"

const styles = {
  base: ["absolute", "left-0", "top-0", "w-full"],
  inputWrapper: [
    "border",
    "h-[48px]",
    "h-full",
    "!cursor-pointer",
    "opacity-0",
    "p-0",
  ],
  mainWrapper: ["height-12", "top-0", "left-0", "absolute", "w-full"],
  innerWrapper: ["min-h-[48px]"],
  input: ["min-h-[48px]", "cursor-pointer"],
}

/**
 *
 * @param param0 - IInputBehavior
 * @returns
 */

const FileUploaderUI: React.FC<IInputBehavior> = ({
  variant = "flat",
  placeholder = "Upload CIN",
  label,
  isRequired = false,
  isDisabled = false,
}) => {
  const [inputValue, setInputValue] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)

  /**
   * @param e - event for the input element
   * Handle file change and validation
   */

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0] ?? null

    /**
     * Validate the file using the imported function
     */
    const validationError = validateFile(file)
    if (validationError != null) {
      setError(validationError)
      setInputValue(null)
    } else {
      setInputValue(file)
      setError(null)
    }
  }

  /**
   *  Function to handle clearing the file input
   */

  const clearFile = (): void => {
    setInputValue(null)
    setError(null)
    ;(document.getElementById("fileInput") as HTMLInputElement).value = ""
  }

  /**
   * Handle the case where a required file is missing
   */
  useEffect(() => {
    if (isRequired && inputValue == null) {
      setError("File is required.")
    } else {
      setError(null)
    }
  }, [inputValue, isRequired])

  return (
    <div className="relative mx-auto max-w-sm">
      {label !== undefined && (
        <label className="mb-2 block text-medium font-bold text-white">
          {label}
        </label>
      )}
      <div
        className={`flex min-h-12 cursor-pointer items-center justify-center rounded-lg bg-primary shadow-sm transition-transform-colors-opacity hover:opacity-80 motion-reduce:transition-none ${
          isDisabled ? "opacity-50" : ""
        }`}
      >
        <Input
          id="fileInput"
          type="file"
          classNames={{ ...styles }}
          onChange={handleFileChange}
          disabled={isDisabled}
          required={isRequired}
        />
        <span className="font-bold text-white">{placeholder}</span>
      </div>
      {error !== null && (
        <div data-slot="error-message" className="mt-2 text-tiny text-danger">
          {error}
        </div>
      )}
      <span className="mt-1 flex items-center justify-between text-tiny font-bold text-primary">
        {inputValue !== null ? inputValue.name : ""}
        {inputValue !== null && (
          <FaTimes
            onClick={clearFile}
            className="ml-2 cursor-pointer text-danger"
            size={14}
          />
        )}
      </span>
    </div>
  )
}

export default FileUploaderUI
