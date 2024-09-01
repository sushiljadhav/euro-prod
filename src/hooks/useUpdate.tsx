import { useState } from "react"
import toast from "react-hot-toast"

import ApiService from "../utils/apiService"
import isPayloadError from "../utils/isPayloadError"

const useUpdateResource = <T,>(
  endpoint: string
): {
  updateResource: (id: string, data: T) => Promise<void>
  isLoading: boolean
  error: string | null
} => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const API_SERVICE = new ApiService()

  const updateResource = async (id: string, data: T): Promise<void> => {
    setIsLoading(true)
    setError(null)
    try {
      await API_SERVICE.update(endpoint, id, data)
      toast.success("Resource updated successfully")
    } catch (error: unknown) {
      if (isPayloadError(error)) {
        const payload = error?.response?.data?.payload
        if (payload !== undefined) {
          setError(payload)
        }
      } else {
        console.error("Unexpected error:", error)
        setError("An unexpected error occurred")
        toast.error("An unexpected error occurred")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return { updateResource, isLoading, error }
}

export default useUpdateResource
