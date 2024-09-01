import React from "react"

import { Slider } from "@nextui-org/react"

import styles from "../../../styles/ProgressBarUI.module.css"
import { type ISlider } from "@/src/model/ISlider"

const ProgressBarUI: React.FC<ISlider> = ({
  size = "md",
  step = 1,
  color = "primary",
  showSteps = true,
  maxValue = 3,
  minValue = 0,
  defaultValue = 2,
  showOutline = false,
  hideThumb = false,
  isDisabled = true,
}) => {
  return (
    <Slider
      aria-labelledby="slider"
      size={size}
      step={step}
      color={color}
      label=""
      showSteps={showSteps}
      maxValue={maxValue}
      minValue={minValue}
      defaultValue={defaultValue}
      showOutline={showOutline}
      isDisabled={isDisabled}
      classNames={{
        base: "max-w-md gap-10 opacity-1",
        track: "bg-default-50",
        filler: "bg-primary",
        step: `bg-white ${styles.step} data-[in-range=true]:bg-white w-8 h-8 border-2 border-primary data-[in-range=false]:bg-white `,
        thumb: `${styles["slider-thumb"]} w-3.5 h-3.5 `,
      }}
    />
  )
}

export default ProgressBarUI
