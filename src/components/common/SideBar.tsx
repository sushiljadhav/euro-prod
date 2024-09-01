import React from "react"

import { Link } from "@nextui-org/react"
import {
  FaUsers,
  FaUserCog,
  FaDatabase,
  FaMoneyBill,
  FaCar,
  FaWhatsappSquare,
} from "react-icons/fa"
import { FaMoneyCheckDollar } from "react-icons/fa6"
import { GrOrganization } from "react-icons/gr"
import { IoCar } from "react-icons/io5"
import { MdOutlineDashboard, MdOutlineReduceCapacity } from "react-icons/md"
import { RiLoginBoxFill, RiBillLine } from "react-icons/ri"

import Logo from "./Logo"

const Sidebar = ({ className }): React.JSX.Element => {
  return (
    <div className={`${className} pt-4`}>
      <div className="mb-10 px-4">
        <Logo></Logo>
      </div>
      <div>
        <ul>
          <li className="mb-1 cursor-pointer rounded-lg px-4 py-2 hover:bg-white">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-sm text-[#0f172a]"
            >
              <MdOutlineDashboard className="size-4 font-semibold text-[#0f172a]"></MdOutlineDashboard>{" "}
              Dashboard
            </Link>
          </li>
          <li className="mb-1 cursor-pointer rounded-lg px-4 py-2 hover:bg-white">
            <Link
              href="/company"
              className="flex items-center gap-2 text-sm text-[#0f172a]"
            >
              <GrOrganization className="size-4 font-semibold text-[#0f172a]"></GrOrganization>{" "}
              Company
            </Link>
          </li>
          <li className="mb-1 cursor-pointer rounded-lg px-4 py-2 hover:bg-white">
            <Link
              href="/employee"
              className="flex items-center gap-2 text-sm text-[#0f172a]"
            >
              <FaUsers className="size-4 font-semibold text-[#0f172a]"></FaUsers>{" "}
              Employee
            </Link>
          </li>
          <li className="mb-1 cursor-pointer rounded-lg px-4 py-2 hover:bg-white">
            <Link className="flex items-center gap-2 text-sm text-[#0f172a]">
              <MdOutlineReduceCapacity className="size-4 font-semibold text-[#0f172a]"></MdOutlineReduceCapacity>{" "}
              Customers
            </Link>
          </li>
          <li className="mb-1 cursor-pointer rounded-lg px-4 py-2 hover:bg-white">
            <Link
              href="/userrole"
              className="flex items-center gap-2 text-sm text-[#0f172a]"
            >
              <FaUserCog className="size-4 font-semibold text-[#0f172a]"></FaUserCog>{" "}
              User Role
            </Link>
          </li>
          <li className="mb-1 cursor-pointer rounded-lg px-4 py-2 hover:bg-white">
            <Link className="flex items-center gap-2 text-sm text-[#0f172a]">
              <RiLoginBoxFill className="size-4 font-semibold text-[#0f172a]"></RiLoginBoxFill>{" "}
              Login Manger
            </Link>
          </li>
          <li className="mb-1 cursor-pointer rounded-lg px-4 py-2 hover:bg-white">
            <Link className="flex items-center gap-2 text-sm text-[#0f172a]">
              <FaDatabase className="size-4 font-semibold text-[#0f172a]"></FaDatabase>{" "}
              Schema Definition
            </Link>
          </li>
          <li className="mb-1 cursor-pointer rounded-lg px-4 py-2 hover:bg-white">
            <Link className="flex items-center gap-2 text-sm text-[#0f172a]">
              <RiBillLine className="size-4 font-semibold text-[#0f172a]"></RiBillLine>{" "}
              Billing Items
            </Link>
          </li>
          <li className="mb-1 cursor-pointer rounded-lg px-4 py-2 hover:bg-white">
            <Link className="flex items-center gap-2 text-sm text-[#0f172a]">
              <FaMoneyBill className="size-4 font-semibold text-[#0f172a]"></FaMoneyBill>{" "}
              Billing Value
            </Link>
          </li>
          <li className="mb-1 cursor-pointer rounded-lg px-4 py-2 hover:bg-white">
            <Link className="flex items-center gap-2 text-sm text-[#0f172a]">
              <FaMoneyCheckDollar className="size-4 font-semibold text-[#0f172a]"></FaMoneyCheckDollar>{" "}
              Billing Structure Definition
            </Link>
          </li>
          <li className="mb-1 cursor-pointer rounded-lg px-4 py-2 hover:bg-white">
            <Link className="flex items-center gap-2 text-sm text-[#0f172a]">
              <FaCar className="size-4 font-semibold text-[#0f172a]"></FaCar>{" "}
              Import Indecab Masters
            </Link>
          </li>{" "}
          <li className="mb-1 cursor-pointer rounded-lg px-4 py-2 hover:bg-white">
            <Link className="flex items-center gap-2 text-sm text-[#0f172a]">
              <FaWhatsappSquare className="size-4 font-semibold text-[#0f172a]"></FaWhatsappSquare>{" "}
              Whatsapp Templates
            </Link>
          </li>
          <li className="mb-1 cursor-pointer rounded-lg px-4 py-2 hover:bg-white">
            <Link className="flex items-center gap-2 text-sm text-[#0f172a]">
              <IoCar className="size-4 font-semibold text-[#0f172a]"></IoCar>{" "}
              Car Details
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
