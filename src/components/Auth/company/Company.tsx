/* eslint-disable @typescript-eslint/naming-convention */
"use client"
import React, { useEffect, useState } from "react"

import { FaIndustry, FaCode, FaIdCard, FaOrcid, FaHome } from "react-icons/fa"
import { IoLocationSharp } from "react-icons/io5"

import ButtonUI from "../../UISandbox/Button/ButtonUI"
import { InputManager } from "../../UISandbox/Input/InputManager"
import InputUI from "../../UISandbox/Input/InputUI"
import useFetch from "@/src/hooks/generic/useFetchResult"
import useFetchById from "@/src/hooks/useFetchByID"
import useUpdateResource from "@/src/hooks/useUpdate"
import {
  type ICompanyFormError,
  type ICompany,
} from "@/src/model/company/ICompany"
import { type ICompanyDetails } from "@/src/model/company/ICompanyDetails"
import {
  type IInputBehavior,
  type ISubmitError,
} from "@/src/model/IInputBehavior"

const CompanyDetailsForm: React.FC<ICompanyDetails> = ({
  company_name,
  company_code,
  gstn,
  pan,
  address,
}): React.JSX.Element => {
  const [formState, setFormState] = useState<ICompany>({
    company_id: "",
    company_name: "",
    company_code: "",
    pan: "",
    gstn: "",
    address_id: "",
    address: {
      address_id: "",
      reference_id: "",
      address_type_id: "",
      address_line: "",
      pincode: "",
      state_id: "",
      country_id: "",
      lat: "",
      lng: "",
    },
  })
  const { updateResource } = useUpdateResource<any>("/companies")
  const { dataByID: fullCompanyDetails, refetchDataByID } =
    useFetchById<ICompany>("/companies/", formState?.company_id ?? "")

  const validateField = (
    name: string,
    value: string,
    field: IInputBehavior
  ): ISubmitError => {
    const inputManager = new InputManager(field.validationType)
    return inputManager.validate(value)
  }

  const [errors, setErrors] = useState<ICompanyFormError>({
    company_name: { error: false, msg: "" },
    company_code: { error: false, msg: "" },
    pan: { error: false, msg: "" },
    gstn: { error: false, msg: "" },
    address: {
      address_line: { error: false, msg: "" },
      pincode: { error: false, msg: "" },
    },
  })

  const {
    fetchApiData: companyData,
    apiIsLoading,
    fetchApiHasError,
    refetch,
  } = useFetch<ICompany>("/companies")

  const [isEditing, setIsEditing] = useState(false)

  const toggleEditing = (): void => {
    setIsEditing(!isEditing)
  }

  const handleValidation = (): void => {
    if (
      formState.company_name !== undefined &&
      formState.company_code !== undefined &&
      formState.pan !== undefined &&
      formState.gstn !== undefined &&
      formState.address.address_line !== undefined &&
      formState.address.pincode !== undefined
    ) {
      const validationErrors = {
        company_name: validateField(
          "company_name",
          formState.company_name,
          company_name
        ),
        company_code: validateField(
          "company_code",
          formState.company_code,
          company_code
        ),
        pan: validateField("pan", formState.pan, pan),
        gstn: validateField("gstn", formState.gstn, gstn),
        address: {
          address_line: validateField(
            "address_line",
            formState.address.address_line,
            address.address_line
          ),
          pincode: validateField(
            "pincode",
            formState.address.pincode,
            address.pincode
          ),
        },
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

  const handleFormSubmit = (event: React.FormEvent): void => {
    event.preventDefault()
    handleValidation()
    if (formState !== undefined) {
      void (async () => {
        try {
          if (formState.company_id !== undefined) {
            await updateResource(formState.company_id, formState)
            toggleEditing()
            await refetch()
            await refetchDataByID()
          }
        } catch (error) {
          // Handle error if needed
          console.error(error)
        }
      })()
    }
  }

  const onCancelClick = (): void => {
    toggleEditing()
    void refetch()
    void refetchDataByID()
  }

  useEffect(() => {
    if (companyData !== null) {
      setFormState({
        company_id: companyData[0]?.company_id,
        company_name: companyData[0]?.company_name,
        company_code: companyData[0]?.company_code,
        pan: companyData[0]?.pan,
        gstn: companyData[0]?.gstn,
        address_id: companyData[0]?.address_id,
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        address: companyData[0]?.address || {
          address_line: "",
          pincode: "",
        },
      })
    }
  }, [companyData])

  useEffect(() => {
    if (fullCompanyDetails != null) {
      const { address } = fullCompanyDetails
      setFormState((prevState) => ({
        ...prevState,
        ...fullCompanyDetails,
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        address: address || prevState.address,
      }))
    }
  }, [fullCompanyDetails])

  return apiIsLoading || fetchApiHasError !== null ? (
    <div>Loading...</div>
  ) : (
    <div className="mx-auto flex w-full max-w-screen-xl flex-col justify-items-center rounded-xl bg-white p-4">
      <div className="mb-8 font-robotoFont">
        <h2 className="mb-2 text-xl font-bold leading-6 tracking-tight text-slate-900">
          Company Information
        </h2>
        <p className="text-base font-medium leading-5 tracking-tight text-slate-900">
          Official Company Information: Registration and Compliance Details
        </p>
      </div>
      <form onSubmit={handleFormSubmit}>
        <div className="mt-2 w-full text-2xl">
          <div className="mb-4 flex w-full flex-col justify-between gap-4 last:border-b-small last:pb-5">
            <div className="w-full border-t-small border-solid border-slate-200 pt-5">
              <InputUI
                startContent={
                  <FaIndustry className="mr-1 text-sm text-primary" />
                }
                disabled={!isEditing}
                {...company_name}
                onChange={handleInputChange}
                name="company_name"
                classNames={{
                  inputWrapper: `shadow-none w-full ${!isEditing ? "no-hover opacity-80 pointer-events-none" : ""}`,
                  mainWrapper: `w-full max-w-[80%] ${!isEditing ? "no-hover" : ""}`,
                }}
                value={formState?.company_name}
                submitError={errors.company_name}
              />
            </div>
            <div className="w-full border-t-small border-solid border-slate-200 pt-5">
              <InputUI
                startContent={<FaCode className="mr-1 text-sm text-primary" />}
                disabled={!isEditing}
                {...company_code}
                onChange={handleInputChange}
                classNames={{
                  inputWrapper: `shadow-none w-full ${!isEditing ? "no-hover opacity-80 pointer-events-none" : ""}`,
                  mainWrapper: `w-full max-w-[80%] ${!isEditing ? "no-hover" : ""}`,
                }}
                name="company_code"
                value={formState?.company_code}
                submitError={errors.company_code}
              />
            </div>
            <div className="w-full border-t-small border-solid border-slate-200 pt-5">
              <InputUI
                startContent={
                  <FaIdCard className="mr-1 text-sm text-primary" />
                }
                onChange={handleInputChange}
                disabled={!isEditing}
                {...gstn}
                classNames={{
                  inputWrapper: `shadow-none w-full ${!isEditing ? "no-hover opacity-80 pointer-events-none" : ""}`,
                  mainWrapper: `w-full max-w-[80%] ${!isEditing ? "no-hover" : ""}`,
                }}
                name="gstn"
                value={formState?.gstn}
                submitError={errors.gstn}
              />
            </div>
            <div className="w-full border-t-small border-solid border-slate-200 pt-5">
              <InputUI
                startContent={<FaOrcid className="mr-1 text-sm text-primary" />}
                disabled={!isEditing}
                onChange={handleInputChange}
                {...pan}
                classNames={{
                  inputWrapper: `shadow-none w-full ${!isEditing ? "no-hover opacity-80 pointer-events-none" : ""}`,
                  mainWrapper: `w-full max-w-[80%] ${!isEditing ? "no-hover" : ""}`,
                }}
                name="pan"
                value={formState?.pan}
                submitError={errors.pan}
              />
            </div>
            <div className="w-full border-t-small border-solid border-slate-200 pt-5">
              <InputUI
                startContent={<FaHome className="mr-1 text-sm text-primary" />}
                disabled={!isEditing}
                onChange={handleInputChange}
                {...address.address_line}
                classNames={{
                  inputWrapper: `shadow-none w-full ${!isEditing ? "no-hover opacity-80 pointer-events-none" : ""}`,
                  mainWrapper: `w-full max-w-[80%] ${!isEditing ? "no-hover" : ""}`,
                }}
                name="address"
                value={formState?.address?.address_line}
                submitError={errors.address.address_line}
              />
            </div>
            <div className="w-full border-t-small border-solid border-slate-200 pt-5">
              <InputUI
                startContent={
                  <IoLocationSharp className="mr-1 text-sm text-primary" />
                }
                disabled={!isEditing}
                onChange={handleInputChange}
                {...address.pincode}
                classNames={{
                  inputWrapper: `shadow-none w-full ${!isEditing ? "no-hover opacity-80 pointer-events-none" : ""}`,
                  mainWrapper: `w-full max-w-[80%] ${!isEditing ? "no-hover" : ""}`,
                }}
                name="pincode"
                value={formState?.address?.pincode}
                submitError={errors.address.pincode}
              />
            </div>
          </div>
        </div>
        <div className="mt-4 flex flex-col items-center justify-between">
          {isEditing ? (
            <div className="flex flex-row justify-end gap-3 self-end">
              <div className="mb-4 ml-auto w-full max-w-40">
                <ButtonUI
                  className="text-tiny !font-normal text-black"
                  onClick={onCancelClick}
                  size="md"
                  color="secondary"
                  variant="bordered"
                >
                  Cancel
                </ButtonUI>
              </div>
              <div className="mb-4 ml-auto w-full max-w-40">
                <ButtonUI
                  type="submit"
                  className="w-full text-tiny !font-normal text-white"
                  size="md"
                  color="success"
                  variant="solid"
                >
                  Save
                </ButtonUI>
              </div>
            </div>
          ) : (
            <div className="mb-4 ml-auto w-full max-w-40">
              <ButtonUI className="w-full" onClick={toggleEditing} size="md">
                Edit
              </ButtonUI>
            </div>
          )}
        </div>
      </form>
    </div>
  )
}

export default CompanyDetailsForm
