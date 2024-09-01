import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosResponse,
} from "axios"

/**
 * Interface defining the options for configuring the API call.
 * @property url - The URL for the API endpoint.
 * @property body - The body of the request (optional).
 * @property headers - The headers to include in the request (optional).
 */
interface ApiCallOptions {
  url: string
  body?: any
  headers?: any
}

/**
 * Class to handle API calls using Axios.
 * This class manages the state of loading and handles errors for API requests.
 */
export class HttpClient {
  private readonly axiosInstance: AxiosInstance
  private readonly url: string
  private readonly body?: any
  private readonly headers?: any

  // State to track loading
  public isLoading: boolean = false

  // Base URL from environment variable
  private static readonly BASE_URL: string = (() => {
    const BASE_URL = process.env.NEXT_PUBLIC_API_URL
    if (BASE_URL !== undefined && BASE_URL.trim() !== "") {
      return BASE_URL
    } else {
      throw new Error(
        "NEXT_PUBLIC_API_URL environment variable is not set or is empty."
      )
    }
  })()

  /**
   * Constructor to initialize the HttpClient instance with provided options.
   * @param param0 - Object containing URL, body, and headers for the API call.
   */
  constructor({ url, body, headers }: ApiCallOptions) {
    this.axiosInstance = axios.create({
      baseURL: HttpClient.BASE_URL,
      headers,
    })
    this.url = url
    this.body = body
    this.headers = headers
  }

  /**
   * Makes a GET request to the specified URL.
   * @returns A promise that resolves to the AxiosResponse object.
   */
  async get(): Promise<AxiosResponse<any>> {
    this.isLoading = true
    try {
      return await this.axiosInstance.get(this.url, {
        headers: this.headers,
      })
    } catch (error) {
      this.handleError(error)
      throw error // Re-throw the error after handling
    } finally {
      this.isLoading = false
    }
  }

  /**
   * Makes a POST request to the specified URL.
   * @returns A promise that resolves to the AxiosResponse object.
   */
  async post(): Promise<AxiosResponse<any>> {
    this.isLoading = true
    try {
      return await this.axiosInstance.post(this.url, this.body, {
        headers: this.headers,
      })
    } catch (error) {
      this.handleError(error)
      throw error // Re-throw the error after handling
    } finally {
      this.isLoading = false
    }
  }

  /**
   * Makes a PUT request to the specified URL.
   * @returns A promise that resolves to the AxiosResponse object.
   */
  async put(): Promise<AxiosResponse<any>> {
    this.isLoading = true
    try {
      return await this.axiosInstance.put(this.url, this.body, {
        headers: this.headers,
      })
    } catch (error) {
      this.handleError(error)
      throw error // Re-throw the error after handling
    } finally {
      this.isLoading = false
    }
  }

  /**
   * Handles errors that occur during API requests.
   * @param error - The error object caught during the API call.
   */
  private handleError(error: unknown): void {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError
      console.error("API call failed with status:", axiosError.response?.status)
      console.error("Error details:", axiosError.message)
      /**
       * TODO - Add more detailed error handling if needed
       */
    } else {
      console.error("Unexpected error:", error)
    }
  }
}
