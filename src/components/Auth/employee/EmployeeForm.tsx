import React, { useEffect, useState } from "react"
import toast from "react-hot-toast"

import { AutoCompleteMultipleUI } from "../../UISandbox/AutoCompleteMultiple/AutoCompleteMultipleUI"
import ButtonUI from "../../UISandbox/Button/ButtonUI"
import { InputManager } from "../../UISandbox/Input/InputManager"
import InputUI from "../../UISandbox/Input/InputUI"
import {
  type IEmployeeFormError,
  type IEmployeeProps,
} from "@/src/@types/Auth/Employee.type"
import useEmployeeForm from "@/src/hooks/useCreateEmployee"
import useUpdateResource from "@/src/hooks/useUpdate"
import { type IEmployeeForm } from "@/src/model/employee/IEmployeeForm"
import {
  type IInputBehavior,
  type ISubmitError,
} from "@/src/model/IInputBehavior"

const EmployeeForm: React.FC<IEmployeeProps> = ({
  employeeToAction,
  employeeName,
  phoneNumber,
  email,
  rolesOption,
  employeeCode,
  isEmployeeEdit,
  onClick,
  onEmployeeEdit,
}): React.JSX.Element => {
  const [submitClick, setSubmitClick] = useState(false)
  const [formState, setFormState] = useState<IEmployeeForm>({
    employee_id: "",
    employee_name: "",
    mobile_no: "",
    email: "",
    employee_code: "",
    is_active: true,
    roles: [],
  })

  const { updateResource } = useUpdateResource<any>("/employees")

  const [errors, setErrors] = useState<IEmployeeFormError>({
    employee_name: { error: false, msg: "" },
    mobile_no: { error: false, msg: "" },
    email: { error: false, msg: "" },
  })

  const [isEmployeeEditable, setIsEmployeeEditable] = useState<boolean>(false)
  const validateField = (
    name: string,
    value: string,
    field: IInputBehavior
  ): ISubmitError => {
    const inputManager = new InputManager(field.validationType)
    return inputManager.validate(value)
  }

  const handleValidation = (): void => {
    if (
      formState.employee_name !== undefined &&
      formState.mobile_no !== undefined &&
      formState.email !== undefined
    ) {
      const validationErrors = {
        employee_name: validateField(
          "employee_name",
          formState.employee_name,
          employeeName
        ),
        mobile_no: validateField(
          "phoneNumber",
          formState.mobile_no,
          phoneNumber
        ),
        email: validateField("email", formState.email, email),
      }
      setErrors(validationErrors)
    }
  }

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = event.target
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const { isFormValid, formSubmissionError } = useEmployeeForm(
    formState,
    errors,
    submitClick,
    setSubmitClick,
    () => {
      if (onClick !== undefined && isEmployeeEditable) {
        void onClick()
      }
    }
  )

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault()
    handleValidation()
    if (isEmployeeEditable) {
      await updateResource(formState.employee_id, formState)
      if (onEmployeeEdit !== undefined) {
        void onEmployeeEdit()
      }
    } else {
      setSubmitClick(true)
    }
  }

  const handleRoleSelection = (values: string[]): void => {
    formState.roles = [...values]
  }

  useEffect(() => {
    if (formSubmissionError !== null) {
      toast.error(formSubmissionError)
    }
  }, [isFormValid, formSubmissionError])

  useEffect(() => {
    if (employeeToAction !== undefined) {
      setFormState({
        employee_id: employeeToAction.employee_id,
        employee_name: employeeToAction.employee_name,
        mobile_no: employeeToAction.mobile_no,
        email: employeeToAction.email,
        roles: employeeToAction.roles,
        employee_code: employeeToAction.employee_code,
        is_active: employeeToAction.is_active,
      })
    }
  }, [employeeToAction])

  useEffect(() => {
    if (isEmployeeEdit ?? false) {
      setIsEmployeeEditable(true)
    }
  }, [isEmployeeEdit])

  console.log("form state", formState)
  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={handleSubmit}>
      <div className="mt-5 flex w-full flex-col gap-6">
        <div className="w-full">
          <InputUI
            {...employeeName}
            name="employee_name"
            onChange={handleInputChange}
            className="w-full"
            size="sm"
            value={formState?.employee_name ?? ""}
            submitError={errors.employee_name}
          />
        </div>
        <div className="w-full">
          <InputUI
            {...phoneNumber}
            name="mobile_no"
            onChange={handleInputChange}
            value={formState?.mobile_no ?? ""}
            submitError={errors.mobile_no}
            className="w-full"
            size="sm"
          />
        </div>
        <div className="w-full">
          <InputUI
            {...email}
            name="email"
            onChange={handleInputChange}
            value={formState?.email ?? ""}
            submitError={errors.email}
            className="w-full"
            size="sm"
          />
        </div>
        <div className="w-full">
          <InputUI
            {...employeeCode}
            name="employee_code"
            onChange={handleInputChange}
            value={formState?.employee_code ?? ""}
            className="w-full"
            size="sm"
          />
        </div>
        <div className="w-full">
          <AutoCompleteMultipleUI
            placeholder="Select the User Role"
            label="Role"
            items={rolesOption ?? rolesOption}
            onAutoCompleteSelect={handleRoleSelection}
            selectedKeys={formState?.roles}
          ></AutoCompleteMultipleUI>
        </div>
        {isEmployeeEditable ? (
          <div className="flex w-full gap-3">
            <ButtonUI
              color="secondary"
              variant="bordered"
              type="reset"
              className="w-full text-tiny
            !font-normal text-black"
            >
              cancel
            </ButtonUI>
            <ButtonUI
              color="success"
              variant="solid"
              type="submit"
              className="w-full text-tiny !font-normal text-white"
            >
              Save
            </ButtonUI>
          </div>
        ) : (
          <div className="w-full">
            <ButtonUI type="submit" className="w-full">
              Add Employee
            </ButtonUI>
          </div>
        )}
      </div>
    </form>
  )
}

export default EmployeeForm
