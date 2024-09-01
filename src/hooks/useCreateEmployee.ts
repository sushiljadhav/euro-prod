import { useState, useEffect } from "react"
import toast from "react-hot-toast"

import { type IEmployeeFormError } from "../@types/Auth/Employee.type"
import { type IEmployeeForm } from "../model/employee/IEmployeeForm"
import ApiService from "../utils/apiService"
import isPayloadError from "../utils/isPayloadError"

interface UseEmployeeFormReturn {
  isFormValid: boolean
  isFormSubmitting: boolean
  formSubmissionError: string | null
}

interface ApiResponse<T> {
  success: boolean
  payload: T
}

const useEmployeeForm = (
  employeeFormState: IEmployeeForm,
  employeeFormErrors: IEmployeeFormError,
  employeeFormSubmitClick: boolean,
  setEmployeeFormSubmitClick: (value: boolean) => void,
  onClick?: () => void
): UseEmployeeFormReturn => {
  const [isFormValid, setIsFormValid] = useState(false)
  const [isFormSubmitting, setIsFormSubmitting] = useState(false)
  const [formSubmissionError, setFormSubmissionError] = useState<string | null>(
    null
  )

  const apiService = new ApiService()

  const createEmployee = async (): Promise<void> => {
    setIsFormSubmitting(true)
    setFormSubmissionError(null)

    const allFieldsValid = Object.values(employeeFormErrors).every(
      (field) => field.error === false
    )
    setIsFormValid(allFieldsValid)

    if (allFieldsValid) {
      const data = {
        employee_name: employeeFormState.employee_name,
        mobile_no: employeeFormState.mobile_no,
        email: employeeFormState.email,
        employee_code: employeeFormState.employee_code,
        is_active: true,
        roles: employeeFormState.roles,
      }

      try {
        const response: ApiResponse<unknown> = await apiService.post(
          "/employees",
          data
        )

        if (response !== undefined) {
          toast.success("Employee Created Successfully")
          if (onClick != null) {
            onClick()
          }
        } else {
          throw new Error("Failed to create employee")
        }
      } catch (error: unknown) {
        if (isPayloadError(error)) {
          const payload = error?.response?.data?.payload
          if (payload !== undefined) {
            setFormSubmissionError(payload)
          }
        } else {
          console.error("Unexpected error:", error)
          setFormSubmissionError("An unexpected error occurred")
          toast.error("An unexpected error occurred")
        }
      } finally {
        setIsFormSubmitting(false)
        setEmployeeFormSubmitClick(false)
      }
    } else {
      toast.error("Form fields are not valid")
      setIsFormSubmitting(false)
      setEmployeeFormSubmitClick(false)
    }
  }

  useEffect(() => {
    if (employeeFormSubmitClick) {
      void createEmployee()
    }
  }, [employeeFormSubmitClick]) // eslint-disable-line react-hooks/exhaustive-deps

  return {
    isFormValid,
    isFormSubmitting,
    formSubmissionError,
  }
}

export default useEmployeeForm
