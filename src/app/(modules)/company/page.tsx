import React from "react"

import CompanyDetailsForm from "@/src/components/Auth/company/Company"
import {
  CompanyCode,
  CompanyName,
  PanNum,
  Gstn,
  Address,
} from "@/src/components/Auth/company/props"
const CompanyPage: React.FC = () => {
  return (
    <div>
      <CompanyDetailsForm
        company_name={{ ...CompanyName }}
        company_code={{ ...CompanyCode }}
        gstn={{ ...Gstn }}
        pan={{ ...PanNum }}
        address={{
          address_line: Address.address_line,
          pincode: Address?.pincode,
        }}
      ></CompanyDetailsForm>
    </div>
  )
}

export default CompanyPage
