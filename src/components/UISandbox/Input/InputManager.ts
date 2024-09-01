import { TValidation } from "@/src/@types/TValidation"
import { type IInputError, ValidationRules } from "@/src/utils/inputValidation"

/**
 * Manages input behavior, including validation and styling.
 */

export class InputManager {
  private readonly validationType: TValidation[]
  private readonly email?: string

  /**
   * Constructs an InputManager instance.
   * @param validationType - An array of validation types to apply to the input value.
   * @param precisionType - Optional precision type for float validation.
   */

  constructor(
    validationType: TValidation[] = [TValidation.isRequired],
    email?: string
  ) {
    this.validationType = validationType
    this.email = email
  }

  /**
   * Generates the class names for the input element based on variant, size, and radius.
   * @returns A string of class names.
   */

  getClassNames(): string {
    return ``
  }

  /**
   * Validates the input value based on the provided validation types and optional precision type.
   * @param value - The value to validate.
   * @param precisionType - Optional precision type for float validation ('default' or 'volume').
   * @returns An object indicating whether the validation passed and an error message if not.
   */
  validate(value: string, precisionType?: "default" | "volume"): IInputError {
    const validationMethod = ValidationRules.getValidationMethod(
      this.validationType
    )

    // Perform general validation
    const result = validationMethod(value)

    // If float validation is required, apply it with the provided precisionType

    if (precisionType !== undefined) {
      if (
        precisionType.length > 0 &&
        (this.validationType.includes(TValidation.floatDefault) ||
          this.validationType.includes(TValidation.floatVolume))
      ) {
        const floatValidationResult = ValidationRules.validateFloat(
          value,
          precisionType
        )
        return floatValidationResult.error ? floatValidationResult : result
      }
    }

    return result
  }

  /**
   * Handles changes to the input element, performs validation, and triggers the optional onChange callback.
   * @param event - The change event from the input element.
   * @param onChange - Optional callback function to handle the change event and validation result.
   * @returns The current value of the input.
   */

  handleChange(
    event: React.ChangeEvent<HTMLInputElement>,
    onChange?: (
      event: React.ChangeEvent<HTMLInputElement>,
      value: string,
      error?: IInputError
    ) => void,
    precisionType?: "default" | "volume"
  ): string {
    const { value } = event.target

    const validationResult = this.validate(value, precisionType)

    if (validationResult !== null) {
      console.warn("Validation failed:", validationResult.msg)
    }

    if (onChange != null) {
      onChange(event, value, validationResult)
    }

    return value // Return the input value
  }
}
