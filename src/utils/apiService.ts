import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios"

class ApiService {
  private readonly baseUrl: string | undefined
  private readonly authToken: string | undefined

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL
    this.authToken = process.env.NEXT_PUBLIC_AUTH_TOKEN
  }

  private getConfig(): AxiosRequestConfig {
    console.log("Auth Token:", this.authToken)
    return {
      headers: {
        Authorization: `Bearer ${this.authToken}`,
      },
      maxBodyLength: Infinity,
    }
  }

  public async fetchData<T>(endpoint: string): Promise<T[]> {
    try {
      const config = {
        ...this.getConfig(),
        method: "get",
        url: `${this.baseUrl}/api${endpoint}`,
      }
      const response: AxiosResponse<{ success: boolean; payload: T[] }> =
        await axios.request(config)

      if (response.data?.success && Array.isArray(response.data.payload)) {
        return response.data.payload
      }
      throw new Error("Data fetching failed.")
    } catch (error) {
      console.error("Error fetching data:", error)
      throw error
    }
  }

  public async deleteData(endpoint: string): Promise<void> {
    try {
      const config = {
        ...this.getConfig(),
        method: "delete",
        url: `${this.baseUrl}/api$  }`,
      }
      const response = await axios.request(config)

      if (response?.data.success === true) {
        console.log("Item deleted successfully")
      } else {
        throw new Error("Failed to delete item.")
      }
    } catch (error) {
      console.error("Error deleting data:", error)
      throw error
    }
  }

  public async post<T>(endpoint: string, data: any): Promise<T> {
    try {
      const config = {
        ...this.getConfig(),
        method: "post",
        url: `${this.baseUrl}/api${endpoint}`,
        data,
      }
      const response: AxiosResponse<{ success: boolean; payload: T }> =
        await axios.request(config)

      if (response.data?.success) {
        return response.data.payload
      }
      throw new Error("Data submission failed.")
    } catch (error) {
      console.error("Error submitting data:", error)
      throw error
    }
  }

  public async fetchById<T>(endpoint: string, id: string): Promise<T> {
    try {
      const config = {
        ...this.getConfig(),
        method: "get",
        url: `${this.baseUrl}/api${endpoint}${id}`, // Adjust the endpoint if necessary
      }
      const response: AxiosResponse<{ success: boolean; payload: T }> =
        await axios.request(config)

      if (response.data?.success) {
        return response.data.payload // Return the payload which is of type T
      }
      throw new Error("Employee fetching failed.")
    } catch (error) {
      console.error("Error fetching employee:", error)
      throw error
    }
  }

  public async update<T>(endpoint: string, id: string, data: T): Promise<T> {
    try {
      const config = {
        ...this.getConfig(),
        method: "put",
        url: `${this.baseUrl}/api${endpoint}/${id}`,
        data,
      }
      const response: AxiosResponse<{ success: boolean; payload: T }> =
        await axios.request(config)

      if (response.data?.success) {
        return response.data.payload
      }
      throw new Error("Employee update failed.")
    } catch (error) {
      console.error("Error updating employee:", error)
      throw error
    }
  }
}

export default ApiService
