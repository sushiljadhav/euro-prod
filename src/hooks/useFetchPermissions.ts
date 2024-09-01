import { useState, useEffect } from "react"

import { type IDropDown, type IPermission } from "../model/Roles/IRoles"
import ApiService from "../utils/apiService"

export const useFetchPermissions = (): {
  permissions: IDropDown[]
  isPermissionFetching: boolean
  isPermissionAPIHasError: string | null
} => {
  const [permissions, setPermissions] = useState<IDropDown[]>([])
  const [isPermissionFetching, setIsPermissionFetching] =
    useState<boolean>(false)
  const [isPermissionAPIHasError, setIsPermissionAPIHasError] = useState<
    string | null
  >(null)
  const API_SERVICE = new ApiService()

  useEffect(() => {
    const fetchPermissions = async (): Promise<void> => {
      try {
        setIsPermissionFetching(true)
        const permissionsData =
          await API_SERVICE.fetchData<IPermission>("/permission-types")
        const dropdownOptions: IDropDown[] = permissionsData.map(
          (permission) => ({
            label: permission.description,
            key: permission.permission_type_id,
          })
        )
        setPermissions(dropdownOptions)
      } catch (err) {
        console.error("Error fetching permissions:", err)
        setIsPermissionAPIHasError("Failed to fetch permissions")
      } finally {
        setIsPermissionFetching(false)
      }
    }

    void fetchPermissions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { permissions, isPermissionFetching, isPermissionAPIHasError }
}
