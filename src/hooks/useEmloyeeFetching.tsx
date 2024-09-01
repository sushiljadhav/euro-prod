import { useState, useEffect } from "react"

import { type IUser } from "../model/employee/IEmployeeTable"
import ApiService from "../utils/apiService"

const useEmployees = (): {
  employeesList: IUser[]
  isEmployeeLoading: boolean
  isEmployeeFetchHasError: string | null
  refetchEmployees: () => Promise<void>
} => {
  const [employeesList, setEmployeesList] = useState<IUser[]>([])
  const [isEmployeeLoading, setIsEmployeeLoading] = useState<boolean>(true)
  const [isEmployeeFetchHasError, setIsEmployeeFetchHasError] = useState<
    string | null
  >(null)

  const apiService = new ApiService()

  const fetchEmployees = async (): Promise<void> => {
    setIsEmployeeLoading(true)
    try {
      const data = await apiService.fetchData<IUser>("/employees")
      setEmployeesList(
        data.map((emp) => ({
          ...emp,
          status: emp.is_active ? "Active" : "Inactive",
        }))
      )
    } catch (error) {
      setIsEmployeeFetchHasError("Failed to fetch employees")
    } finally {
      setIsEmployeeLoading(false)
    }
  }

  useEffect(() => {
    void fetchEmployees()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    employeesList,
    isEmployeeLoading,
    isEmployeeFetchHasError,
    refetchEmployees: fetchEmployees,
  }
}

export default useEmployees
