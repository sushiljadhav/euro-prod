import { useState, useEffect } from "react"

import ApiService from "@/src/utils/apiService"

interface IRole {
  role_id: string
  description: string
}

interface IDropDown {
  label: string
  key: string
}

const useFetchRoles = (): {
  rolesList: IDropDown[]
  isRoleAPILoading: boolean
  isRoleAPIHasError: string | null
} => {
  const API_SERVICE = new ApiService()
  const [rolesList, setRolesList] = useState<IDropDown[]>([])
  const [isRoleAPILoading, setsIsRoleAPILoading] = useState<boolean>(true)
  const [isRoleAPIHasError, setIsRoleAPIHasError] = useState<string | null>(
    null
  )

  const fetchRoles = async (): Promise<void> => {
    try {
      setsIsRoleAPILoading(true)
      const roles: IRole[] = await API_SERVICE.fetchData<IRole>("/roles")
      const dropdownOptions: IDropDown[] = roles.map((role) => ({
        label: role.description,
        key: role.role_id,
      }))
      setRolesList(dropdownOptions)
    } catch (error) {
      console.error("Error fetching roles:", error)
      setIsRoleAPIHasError("Failed to fetch roles.")
    } finally {
      setsIsRoleAPILoading(false)
    }
  }

  useEffect(() => {
    void fetchRoles()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    rolesList,
    isRoleAPILoading,
    isRoleAPIHasError,
  }
}

export default useFetchRoles
