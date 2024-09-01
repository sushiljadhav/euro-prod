interface CustomError {
  response?: {
    data?: {
      payload?: string
    }
  }
}

// Utility function to check if the error matches the expected structure
function isPayloadError(error: unknown): error is CustomError {
  return (
    error !== null &&
    typeof error === "object" &&
    "response" in error &&
    Boolean((error as any).response) &&
    typeof (error as any).response === "object" &&
    "data" in (error as any).response &&
    Boolean((error as any).response.data) &&
    typeof (error as any).response.data === "object" &&
    "payload" in (error as any).response.data
  )
}

export default isPayloadError
