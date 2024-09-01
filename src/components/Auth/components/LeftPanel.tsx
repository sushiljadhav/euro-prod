import React from "react"

import Image from "next/image"

import ButtonUI from "../../UISandbox/Button/ButtonUI"

interface ILeftPanel {
  isBack?: boolean
}

const LeftPanel: React.FC<ILeftPanel> = ({ isBack }) => {
  return (
    <div className="w-full  max-w-[700px] rounded-l-[10px] border border-[rgba(39,79,140,0.19)] bg-white px-16 py-[41px] shadow-[3px_3px_2.6px_rgba(39,79,140,0.07)]">
      <div className="mb-2">
        <Image src="/logo.png" width={184} height={80} alt="logo"></Image>
      </div>
      <div className="mb-8">
        <Image src="/taxi.png" width={375} height={248} alt="taxi"></Image>
      </div>
      <h2 className="mb-4 w-full max-w-[473px] font-robotoFont text-[40px] font-bold leading-[50px] text-black">
        Quality car rental services across India
      </h2>
      <p className="mb-7 w-full max-w-[473px] text-lg text-black">
        In a world of aggregators, we take pride in owning our fleet of vehicles
        and assigning chauffeurs who strive to deliver professional and
        courteous services.
      </p>
      <ButtonUI
        className="min-h-[60px] w-full max-w-[180px] cursor-pointer border-2 border-primary-50 text-lg text-black hover:bg-primary-50 hover:hover:text-black"
        variant="bordered"
      >
        Know More
      </ButtonUI>
    </div>
  )
}

export default LeftPanel
