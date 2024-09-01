import { useState, useEffect } from "react"

import ApiService from "../utils/apiService"

// Define the custom hook
const useFetchById = <T>(
  endpoint: string,
  id: string
): {
  dataByID: T | null
  isDataByIDLoading: boolean
  isDataByIDHasError: string | null
  refetchDataByID: () => Promise<void>
} => {
  const [dataByID, setDataByID] = useState<T | null>(null)
  const [isDataByIDLoading, setIsDataByIDLoading] = useState<boolean>(true)
  const [isDataByIDHasError, setIsDataByIDHasError] = useState<string | null>(
    null
  )

  const API_SERVICE = new ApiService()

  const fetchData = async (): Promise<void> => {
    setIsDataByIDLoading(true)
    setIsDataByIDHasError(null)

    try {
      const result = await API_SERVICE.fetchById<T>(endpoint, id)
      setDataByID(result)
    } catch (error) {
      setIsDataByIDHasError("Failed to fetch data.")
    } finally {
      setIsDataByIDLoading(false)
    }
  }

  useEffect(() => {
    if (id.length > 0) {
      void fetchData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint, id])

  useEffect(() => {
    void fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    dataByID,
    isDataByIDLoading,
    isDataByIDHasError,
    refetchDataByID: fetchData,
  }
}

export default useFetchById
