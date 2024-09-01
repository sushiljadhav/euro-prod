import React from "react"

import EmployeeComp from "@/src/components/Auth/employee/Employee"
import {
  employee_name,
  PhoneNumber,
  Email,
  EmployeeRole,
  EmployeeAttribute,
  TableAttribute,
  EmployeeCode,
} from "@/src/components/Auth/employee/props"
const EmployeePage: React.FC<any> = () => {
  return (
    <div>
      <EmployeeComp
        employeeName={{ ...employee_name }}
        phoneNumber={{ ...PhoneNumber }}
        employeeCode={{ ...EmployeeCode }}
        email={{ ...Email }}
        role={{ ...EmployeeRole }}
        attribute={{ ...EmployeeAttribute }}
        tableData={{ ...TableAttribute }}
      ></EmployeeComp>
    </div>
  )
}
export default EmployeePage
