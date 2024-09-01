import { radius, size } from "@/src/@types/TCommonProps"
import { TInputType, TInputVariant } from "@/src/@types/TInputs"
import { type IAddressDetails } from "@/src/model/company/ICompanyDetails"
import { type IInputBehavior } from "@/src/model/IInputBehavior"

export const CompanyName: IInputBehavior = {
  type: TInputType.text,
  variant: TInputVariant.flat,
  size: size.lg,
  placeholder: "Euro Cars",
  label: "Company Name",
  labelPlacement: "outside-left",
  radius: radius.sm,
  isRequired: false,
  classNames: {
    input: "border-none",
    inputWrapper: "border-none shadow-none w-full",
    mainWrapper: "w-full max-w-[80%]",
  },
  className: "justify-between pl-4 pr-4",
  css: {
    "& .nextui-input": {
      border: "none", // Remove default border
      boxShadow: "none", // Remove default shadow
    },
  },
}
export const CompanyCode: IInputBehavior = {
  type: TInputType.number,
  variant: TInputVariant.flat,
  size: size.lg,
  placeholder: "Enter Company Code",
  label: "Company Code",
  labelPlacement: "outside-left",
  radius: radius.sm,
  isRequired: false,
  classNames: {
    input: "border-none",
    inputWrapper: "border-none shadow-none w-full",
    mainWrapper: "w-full max-w-[80%]",
  },
  className: "justify-between pl-4 pr-4",
  css: {
    "& .nextui-input": {
      border: "none", // Remove default border
      boxShadow: "none", // Remove default shadow
    },
  },
  validation: true,
}
export const PanNum: IInputBehavior = {
  type: TInputType.text,
  variant: TInputVariant.flat,
  size: size.lg,
  placeholder: "Enter PAN Number",
  label: "PAN Number",
  labelPlacement: "outside-left",
  radius: radius.sm,
  isRequired: false,
  classNames: {
    input: "border-none",
    inputWrapper: "border-none shadow-none w-full",
    mainWrapper: "w-full max-w-[80%]",
  },
  className: "justify-between pl-4 pr-4",
  css: {
    "& .nextui-input": {
      border: "none", // Remove default border
      boxShadow: "none", // Remove default shadow
    },
  },
}
export const Gstn: IInputBehavior = {
  type: TInputType.number,
  variant: TInputVariant.flat,
  size: size.lg,
  placeholder: "Enter GST Number",
  label: "GST Number",
  labelPlacement: "outside-left",
  radius: radius.sm,
  isRequired: false,
  classNames: {
    input: "border-none",
    inputWrapper: "border-none shadow-none w-full",
    mainWrapper: "w-full max-w-[80%]",
  },
  className: "justify-between pl-4 pr-4",
  css: {
    "& .nextui-input": {
      border: "none", // Remove default border
      boxShadow: "none", // Remove default shadow
    },
  },
}
export const Address: IAddressDetails = {
  address_line: {
    type: TInputType.text,
    variant: TInputVariant.flat,
    size: size.lg,
    placeholder: "Enter Company Address",
    label: "Address",
    labelPlacement: "outside-left",
    radius: radius.sm,
    isRequired: false,
    classNames: {
      input: "border-none",
      inputWrapper: "border-none shadow-none w-full",
      mainWrapper: "w-full max-w-[80%]",
    },
    className: "justify-between pl-4 pr-4",
    css: {
      "& .nextui-input": {
        border: "none", // Remove default border
        boxShadow: "none", // Remove default shadow
      },
    },
  },
  pincode: {
    type: TInputType.text,
    variant: TInputVariant.flat,
    size: size.lg,
    placeholder: "Enter Pincode ",
    label: "Pincode",
    labelPlacement: "outside-left",
    radius: radius.sm,
    isRequired: false,
    classNames: {
      input: "border-none",
      inputWrapper: "border-none shadow-none w-full",
      mainWrapper: "w-full max-w-[80%]",
    },
    className: "justify-between pl-4 pr-4",
    css: {
      "& .nextui-input": {
        border: "none", // Remove default border
        boxShadow: "none", // Remove default shadow
      },
    },
  },
}
