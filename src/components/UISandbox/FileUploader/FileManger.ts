/**
 * List of allowed MIME types for files
 */
const ALLOWED_FILE_TYPES: string[] = [
  "application/pdf",
  "image/jpeg",
  "text/csv",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "image/png",
]
const MAX_FILE_SIZE_MB: number = 5
const MAX_FILE_SIZE_BYTES: number = MAX_FILE_SIZE_MB * 1024 * 1024 // Convert MB to bytes

/**
 * Validates the provided file based on type and size.
 * @param file - The file to validate
 * @returns A string with an error message if validation fails, otherwise null
 */

export function validateFile(file: File | null): string | null {
  if (file == null) {
    return "File is required."
  }

  /**
   * Check if file type is allowed
   */
  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    return "Invalid file type. Allowed types: PDF, JPEG, CSV, XLS, XLSX, PNG."
  }

  /**
   * Check if file size exceeds the maximum allowed size
   */
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return `File size exceeds ${MAX_FILE_SIZE_MB}MB.`
  }

  return null
}
