"use client"

import { useEffect, useState } from "react"
import toast from "react-hot-toast"

import { RiDeleteBin5Fill } from "react-icons/ri"

import EmployeeForm from "./EmployeeForm"
import CustomDrawer from "../../UISandbox/Drawer/CustomDrawer"
import ModalWithTwoButton from "../../UISandbox/ModalWithTwoButton/ModalWithTwoButton"
import PageLoader from "../../UISandbox/PageLoader/PageLoader"
import TableUI from "../../UISandbox/Table/TableUI"
import { type IEmployeeProps } from "@/src/@types/Auth/Employee.type"
import useEmployees from "@/src/hooks/useEmloyeeFetching"
import useFetchById from "@/src/hooks/useFetchByID"
import useFetchRoles from "@/src/hooks/useFetchRoles"
import { type IUser } from "@/src/model/employee/IEmployeeTable"
import { EMPLOYEE_COLUMN } from "@/src/utils/columns"
import useDeleteEmployee from "@/src/utils/useDeleteEmployee"

const EmployeeComp: React.FC<IEmployeeProps> = ({
  employeeName,
  phoneNumber,
  email,
  role,
  attribute,
  employeeCode,
  tableData,
}) => {
  const [employeeToPerformAction, setEmployeeToPerformAction] =
    useState<string>("")
  const [isFormModalOpen, setIsFormModalOpen] = useState<boolean>(false)
  const [isDeleteClick, setIsDeleteClick] = useState<boolean>(false)
  const initialVisibleColumns: string[] = [
    "employee_id",
    "employee_name",
    "is_active",
    "email",
    "employee_code",
    "actions",
    "mobile_no",
  ]

  const [employees, setEmployees] = useState<IUser[]>([])
  const [employeeToEdit, setEmployeeToEdit] = useState<IUser | null>(null)
  const [isFormEdit, setIsFormEdit] = useState<boolean>(false)

  const { rolesList, isRoleAPILoading, isRoleAPIHasError } = useFetchRoles()
  const {
    employeesList,
    isEmployeeLoading,
    isEmployeeFetchHasError,
    refetchEmployees,
  } = useEmployees()

  const { deleteEmployee, isDeleting, isDeleteAPIHasError } =
    useDeleteEmployee()

  const { dataByID: employeeData } = useFetchById<IUser>(
    "/employees/",
    employeeToPerformAction ?? ""
  )

  const handleAddButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    setIsFormModalOpen(true)
    setEmployeeToEdit({
      employee_id: "",
      employee_code: "",
      employee_name: "",
      email: "",
      mobile_no: "",
      roles: [],
      is_active: true,
    })
  }

  const onModalClose = (value: boolean): void => {
    setIsFormModalOpen(value)
  }

  const handleEditClick = (user: IUser): void => {
    if (user !== null) {
      setEmployeeToPerformAction(user?.employee_id)
      setIsFormEdit(true)
      setIsFormModalOpen(true)
    }
  }

  const handleDeleteClick = (user: IUser): void => {
    setIsDeleteClick(true)
    if (user !== null) {
      setEmployeeToPerformAction(user?.employee_id)
    }
  }

  const handleViewClick = (user: IUser): void => {
    console.log(user)
  }

  const onDeleteModalClose = (value: boolean): void => {
    setIsDeleteClick(false)
  }

  const handleActionClick = async (): Promise<void> => {
    setIsDeleteClick(false)
    await deleteEmployee(employeeToPerformAction)
    await refetchEmployees()
  }

  const handleCloseClick = (): void => {
    setIsDeleteClick(false)
  }

  const onEmployeeChange = async (): Promise<void> => {
    await refetchEmployees()
  }

  useEffect(() => {
    if (isRoleAPIHasError !== null) {
      toast.error(isRoleAPIHasError)
    }
    if (isEmployeeFetchHasError !== null) {
      toast.error(isEmployeeFetchHasError)
    }
  }, [isRoleAPIHasError, isEmployeeFetchHasError, isDeleteAPIHasError])

  useEffect(() => {
    if (employeeToPerformAction !== "") {
      setEmployeeToEdit(employeeData)
    }
  }, [employeeData, employeeToPerformAction])

  useEffect(() => {
    if (employeesList.length > 0) {
      setEmployees(employeesList)
    }
  }, [employeesList])

  return isRoleAPILoading || isEmployeeLoading || isDeleting ? (
    <PageLoader
      isModalOpen={isRoleAPILoading || isEmployeeLoading || isDeleting}
    />
  ) : (
    <div className="w-full rounded-xl bg-white p-4">
      <div className="font-robotoFont text-sm font-bold leading-9 tracking-tight text-slate-900">
        Employee Details
      </div>
      <div className="mt-2 w-full text-2xl">
        {!isEmployeeLoading || !isDeleting ? (
          <TableUI
            columns={[...EMPLOYEE_COLUMN] ?? []}
            users={employees ?? []}
            initialColumns={initialVisibleColumns}
            onAddButtonClick={handleAddButtonClick}
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteClick}
            onViewClick={handleViewClick}
            isLoading={isEmployeeLoading || isDeleting}
          />
        ) : (
          "loading"
        )}
      </div>
      <CustomDrawer isModalOpen={isFormModalOpen} onOpenChange={onModalClose}>
        <EmployeeForm
          employeeToAction={employeeToEdit ?? undefined}
          employeeName={employeeName}
          phoneNumber={phoneNumber}
          email={email}
          role={role}
          attribute={attribute}
          employeeCode={employeeCode}
          rolesOption={rolesList ?? []}
          onClick={onEmployeeChange}
          isEmployeeEdit={isFormEdit}
          onEmployeeEdit={onEmployeeChange}
        />
      </CustomDrawer>
      <ModalWithTwoButton
        isModalOpen={isDeleteClick}
        size="sm"
        backdrop="blur"
        onModalClose={onDeleteModalClose}
        actionButtonProps={{
          children: "Yes, I'm sure",
          color: "danger",
          variant: "solid",
          className: "!font-normal text-tiny text-white",
          onClick: handleActionClick,
          disabled: isDeleting,
        }}
        closeButtonProps={{
          children: " No, cancel",
          color: "secondary",
          variant: "bordered",
          className: "text-black !font-normal text-tiny",
          onClick: handleCloseClick,
          disabled: isDeleting,
        }}
      >
        <RiDeleteBin5Fill className="size-10 text-[#858585]" />
        <p className="mb-4 text-sm text-gray-500 dark:text-gray-300">
          Are you sure you want to delete this item?
        </p>
      </ModalWithTwoButton>
    </div>
  )
}

export default EmployeeComp
