"use client"
import React from "react"

import { color, radius, size } from "@/src/@types/TCommonProps"
import { TInputType, TInputVariant } from "@/src/@types/TInputs"
import { TValidation } from "@/src/@types/TValidation"
import AutoCompleteUI from "@/src/components/UISandbox/AutoComplete/AutoCompleteUI"
import { AutoCompleteMultipleUI } from "@/src/components/UISandbox/AutoCompleteMultiple/AutoCompleteMultipleUI"
import ButtonUI from "@/src/components/UISandbox/Button/ButtonUI"
import CardUI from "@/src/components/UISandbox/CardUi/CardUI"
import DropDownUI from "@/src/components/UISandbox/DropDown/DropDownUI"
import FileUploaderUI from "@/src/components/UISandbox/FileUploader/FileUploaderUI"
import InputUI from "@/src/components/UISandbox/Input/InputUI"
import LoaderUI from "@/src/components/UISandbox/Loader/LoaderUI"
import ModalSingleButtonUI from "@/src/components/UISandbox/ModalSingleButton/ModalSingleButtonUI"
import ModalWithoutButtonUI from "@/src/components/UISandbox/ModalWithoutButton/ModalWithoutButtonUI"
import ProgressBarUI from "@/src/components/UISandbox/ProgressBar/ProgressBarUI"
import { type IInputBehavior } from "@/src/model/IInputBehavior"
// Hii I am Yogesh
const UIPage = (): JSX.Element => {
  const FirstName: IInputBehavior = {
    type: TInputType.text,
    color: color.primary,
    variant: TInputVariant.bordered,
    size: size.sm,
    placeholder: "First Name",
    label: "First Name",
    labelPlacement: "outside",
    radius: radius.sm,
    isRequired: false,
    validationType: [TValidation.isRequired],
  }
  const Password: IInputBehavior = {
    type: TInputType.password,
    color: color.primary,
    variant: TInputVariant.bordered,
    size: size.sm,
    placeholder:
      "Please choose a minimum of 8 characters with a combination of both letters and numbers.",
    label: "Password",
    labelPlacement: "outside",
    radius: radius.sm,
    isRequired: false,
    validationType: [TValidation.isRequired, TValidation.password],
  }
  const Email: IInputBehavior = {
    type: TInputType.email,
    color: color.primary,
    variant: TInputVariant.bordered,
    size: size.sm,
    placeholder: "sushilj76@gmail.com",
    label: "Email",
    labelPlacement: "outside",
    radius: radius.sm,
    isRequired: false,
    validationType: [TValidation.isRequired, TValidation.email],
  }
  return (
    <div className="px-3">
      <InputUI {...FirstName}></InputUI>
      <InputUI {...Password}></InputUI>
      <InputUI {...Email}></InputUI>
      <AutoCompleteUI></AutoCompleteUI>
      <AutoCompleteMultipleUI
        items={[
          {
            key: "sushil",
            label: "sushil",
          },
          {
            key: "Yogesh",
            label: "Yogesh",
          },
        ]}
      ></AutoCompleteMultipleUI>
      <DropDownUI></DropDownUI>
      <FileUploaderUI radius="sm" className="mt-10"></FileUploaderUI>
      <ButtonUI radius="sm">Create</ButtonUI>
      <LoaderUI></LoaderUI>
      <ModalWithoutButtonUI isModalOpen={false}></ModalWithoutButtonUI>
      <ModalSingleButtonUI
        isModalOpen={false}
        actionButtonProps={{
          children: "Close",
        }}
      ></ModalSingleButtonUI>
      <ProgressBarUI></ProgressBarUI>
      <CardUI></CardUI>
    </div>
  )
}

export default UIPage
