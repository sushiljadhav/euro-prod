"use client"

import React from "react"

import { type StepItemProps } from "../../../model/IStepItem"

const StepItem: React.FC<StepItemProps> = ({
  icon,
  title,
  description,
  isActive = false,
  onClick,
}) => {
  return (
    <div
      className={`relative z-20 mb-10 flex cursor-pointer gap-2`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClick?.()
        }
      }}
    >
      <div
        className={`box-border flex size-10 items-center justify-center rounded-lg border border-[#ECECEC] bg-white drop-shadow-custom`}
      >
        {React.cloneElement(icon, {
          className: `size-6 ${isActive ? "text-primary" : "text-[#868686]"}`,
        })}
      </div>
      <div className="flex max-w-[349px] flex-col">
        <h4 className={`text-sm font-medium text-white`}>{title}</h4>
        <p className={`text-xs text-[#CDCDCD]`}>{description}</p>
      </div>
    </div>
  )
}

export default StepItem
