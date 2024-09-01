import { useState, useEffect } from "react"
import toast from "react-hot-toast"

import ApiService from "@/src/utils/apiService"
import isPayloadError from "@/src/utils/isPayloadError"

interface FetchResult<T> {
  fetchApiData: T | null
  apiIsLoading: boolean
  fetchApiHasError: string | null
  refetch: () => Promise<void>
}

const useFetch = <T>(endpoint: string): FetchResult<T[]> => {
  const [fetchApiData, setFetchApiData] = useState<T[] | null>(null)
  const [apiIsLoading, setApiIsLoading] = useState<boolean>(true)
  const [fetchApiHasError, setFetchApiHasError] = useState<string | null>(null)

  const apiService = new ApiService()

  const fetchData = async (): Promise<void> => {
    setApiIsLoading(true)
    setFetchApiHasError(null)

    try {
      const result = await apiService.fetchData<T>(endpoint)
      setFetchApiData(result)
    } catch (error: any) {
      if (isPayloadError(error)) {
        const payload = error?.response?.data?.payload
        if (payload !== undefined) {
          setFetchApiHasError(payload)
        }
      } else {
        console.error("Unexpected error:", error)
        setFetchApiHasError("An unexpected error occurred")
        toast.error("An unexpected error occurred")
      }
    } finally {
      setApiIsLoading(false)
    }
  }

  useEffect(() => {
    void fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint])

  return {
    fetchApiData,
    apiIsLoading,
    fetchApiHasError,
    refetch: fetchData,
  }
}

export default useFetch
