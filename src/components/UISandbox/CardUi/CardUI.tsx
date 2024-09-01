import React, { useState } from "react"

import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Image,
  Chip,
} from "@nextui-org/react"
import { FaTimes } from "react-icons/fa"

import ButtonUI from "../Button/ButtonUI"

const CardUI: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true)

  const handleClose = (): void => {
    setIsVisible(false)
  }

  const employeeData: Record<string, string> = {
    "Employee ID": "123456",
    Name: "Yogesh Tiwari",
    "Employee Code": "YT2024",
    Email: "yogesh.tiwari@example.com",
    "Mobile No": "+91-9876543210",
    Status: "Active",
    "Created By": "Admin",
    "Created Date": "2024-09-01",
    "Modified By": "Admin",
    "Modified Date": "2024-09-01",
    "Deleted By": "N/A",
    "Deleted Date": "N/A",
  }

  // Generate a row with label and value
  const generateRow = (label: string, value: string): JSX.Element => (
    <div className="flex flex-row items-center gap-3" key={label}>
      <p className="w-full max-w-[100px] text-sm text-default-500">{label}</p>
      <Chip className="text-sm font-medium " size="sm" radius="sm">
        {value}
      </Chip>
    </div>
  )

  if (!isVisible) {
    return null
  }

  return (
    <Card className="max-w-[400px]">
      <CardHeader className="relative flex flex-col gap-3">
        <Image
          alt="Employee"
          height={100}
          width={100}
          radius="full"
          src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
        />
        <ButtonUI className="absolute -top-1 right-[-20px] z-10 m-0 size-fit min-h-0 border-none bg-transparent p-0">
          <FaTimes
            className="relative z-0 size-4 text-rose-500"
            onClick={handleClose}
          />
        </ButtonUI>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="flex flex-col gap-3 rounded-md border p-4">
          {Object.entries(employeeData).map(([label, value]) =>
            generateRow(label, value)
          )}
        </div>
      </CardBody>
      <Divider />
    </Card>
  )
}

export default CardUI
