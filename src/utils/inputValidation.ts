import { TValidation } from "../@types/TValidation"

export interface IInputError {
  error: boolean
  msg: string
}

export const ValidationRules = {
  /**
   * Validates if the input value is a valid email address.
   * @param value - The email address to validate.
   * @returns An object indicating whether the email is valid and an error message if not.
   */

  validateEmail(value: string): IInputError {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailPattern.test(value)
      ? { error: false, msg: "" }
      : { error: true, msg: "Invalid email address" }
  },

  /**
   * Validates if the input value meets the password requirements.
   * Password must be at least 8 characters long and contain both letters and numbers.
   * @param value - The password to validate.
   * @returns An object indicating whether the password is valid and an error message if not.
   */

  validatePassword(value: string): IInputError {
    // Regex to validate password: at least 8 characters long, containing both letters and numbers
    // Allows special characters
    const passwordPattern =
      // eslint-disable-next-line no-useless-escape
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+{}\[\]:;"'<>,.?/~`-]{8,}$/
    return passwordPattern.test(value)
      ? { error: false, msg: "" }
      : {
          error: true,
          msg: "Please choose a minimum of 8 characters with a combination of both letters and numbers.",
        }
  },

  /**
   * Validates if the input value is not empty (i.e., not just whitespace).
   * @param value - The value to check.
   * @returns An object indicating whether the value is not empty and an error message if it is.
   */

  validateIsRequired(value: string): IInputError {
    return value.trim() !== ""
      ? { error: false, msg: "" }
      : { error: true, msg: "This field cannot be empty." }
  },

  /**
   * Validates if the input value is a valid number.
   * @param value - The value to validate.
   * @returns An object indicating whether the value is a valid number and an error message if not.
   */

  validateIsNumber(value: string): IInputError {
    return !isNaN(Number(value))
      ? { error: false, msg: "" }
      : { error: true, msg: "Invalid number." }
  },

  /**
   * Validates if the input value contains only letters and spaces.
   * @param value - The value to validate.
   * @returns An object indicating whether the value contains only text and an error message if it does not.
   */

  validateTextOnly(value: string): IInputError {
    const isTextOnly = /^[a-zA-Z\s]+$/.test(value)
    return isTextOnly
      ? { error: false, msg: "" }
      : { error: true, msg: "Only text allowed" }
  },

  /**
   * Validates if the input value is a valid phone number.
   * Allows optional country codes (e.g., +91), spaces, and dashes.
   * @param value - The phone number to validate.
   * @returns An object indicating whether the phone number is valid and an error message if not.
   */
  validatePhoneNumber(value: string): IInputError {
    const phonePattern = /^\+?[1-9]\d{1,14}(?:[\s-]\d{1,15})*$/
    return phonePattern.test(value)
      ? { error: false, msg: "" }
      : { error: true, msg: "Invalid phone number." }
  },

  /**
   * Validates if the input value is a valid float number with specific precision.
   * @param value - The float number to validate.
   * @param precisionType - Type of precision to validate ('default' or 'volume').
   * @returns An object indicating whether the number is valid and an error message if not.
   */
  validateFloat(
    value: string,
    precisionType: "default" | "volume"
  ): IInputError {
    // Default precision (2 digits after the decimal point)
    const defaultPattern = /^\d+(\.\d{1,2})?$/

    // Volume precision (4 digits after the decimal point)
    const volumePattern = /^\d+(\.\d{1,4})?$/

    // Determine which pattern to use based on precisionType
    const pattern = precisionType === "volume" ? volumePattern : defaultPattern

    // Validate the value against the chosen pattern
    return pattern.test(value)
      ? { error: false, msg: "" }
      : {
          error: true,
          msg:
            precisionType === "volume"
              ? "Invalid volume number. It must have up to 4 digits after the decimal point."
              : "Invalid number. It must have up to 2 digits after the decimal point.",
        }
  },

  /**
   * Validates if the input value is either a valid email address or a valid mobile number with the country code +91.
   * @param value - The login ID to validate.
   * @returns An object indicating whether the login ID is valid and an error message if not.
   */
  isLoginId(value: string): IInputError {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const phonePattern = /^91\d{10}$/ // Matches '91' followed by a 10-digit phone number

    if (emailPattern.test(value) || phonePattern.test(value)) {
      return { error: false, msg: "" }
    }

    return {
      error: true,
      msg: "Invalid login ID. Please enter a valid email address or a mobile number in the format '91XXXXXXXXXX'.",
    }
  },
  /**
   * Validates if the input value is either a valid OTP or a valid password.
   * @param value - The input to validate.
   * @returns An object indicating whether the input is valid and an error message if not.
   */
  isOtpOrPassword(value: string): IInputError {
    // OTP should be a 6-digit number
    const otpPattern = /^\d{6}$/

    // Password should be at least 8 characters long and contain both letters and numbers
    const passwordPattern =
      // eslint-disable-next-line no-useless-escape
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+{}\[\]:;"'<>,.?/~`-]{8,}$/

    if (otpPattern.test(value) || passwordPattern.test(value)) {
      return { error: false, msg: "" }
    }

    return {
      error: true,
      msg: "Invalid input. Please enter a 6-digit OTP or a password that is at least 8 characters long, containing both letters and numbers.",
    }
  },
  /**
   * Retrieves the appropriate validation method based on the provided validation types.
   * Each type is validated in sequence until one fails or all pass.
   * @param types - An array of validation types to apply.
   * @returns A function that applies all specified validation rules to a given value.
   */

  getValidationMethod(types: TValidation[]): (value: string) => IInputError {
    const validators = types.map((type) => {
      switch (type) {
        case TValidation.email:
          return this.validateEmail
        case TValidation.password:
          return this.validatePassword
        case TValidation.isRequired:
          return this.validateIsRequired
        case TValidation.isNumber:
          return this.validateIsNumber
        case TValidation.textOnly:
          return this.validateTextOnly
        case TValidation.isPhoneNumber:
          return this.validatePhoneNumber
        case TValidation.floatDefault:
          return (value: string) => this.validateFloat(value, "default")
        case TValidation.floatVolume:
          return (value: string) => this.validateFloat(value, "volume")
        case TValidation.loginId:
          return this.isLoginId
        case TValidation.otpOrPassword:
          return this.isOtpOrPassword
        default:
          return (value: string) => ({ error: false, msg: "" }) // Default to always valid
      }
    })

    return (value: string) => {
      for (const validator of validators) {
        const result = validator(value)
        if (result.error !== false) {
          return result
        }
      }
      return { error: false, msg: "" }
    }
  },
}
