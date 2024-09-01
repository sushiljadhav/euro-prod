import { useState } from "react"
import toast from "react-hot-toast"

import ApiService from "./apiService"

interface IUseDeleteEmployee {
  deleteEmployee: (employeeId: string) => Promise<void>
  isDeleting: boolean
  isDeleteAPIHasError: string | null
}

const useDeleteEmployee = (): IUseDeleteEmployee => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false)
  const [isDeleteAPIHasError, setIsDeleteAPIHasError] = useState<string | null>(
    null
  )
  const apiService = new ApiService()

  const deleteEmployee = async (employeeId: string): Promise<void> => {
    setIsDeleting(true)
    setIsDeleteAPIHasError(null)

    try {
      await apiService.deleteData(`/employees/${employeeId}`)
      toast.success("User Deleted Successfully")
    } catch (error: any) {
      console.error("Error deleting employee:", error)
      if (error !== undefined) {
        const errorMessage =
          Boolean(error?.response?.data?.payload) || "An error occurred"
        setIsDeleteAPIHasError(errorMessage as string)
        toast.error(errorMessage as string)
      }
    } finally {
      setIsDeleting(false)
    }
  }

  return { deleteEmployee, isDeleting, isDeleteAPIHasError }
}

export default useDeleteEmployee
