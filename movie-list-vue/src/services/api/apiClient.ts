/**
 * API client imports and types
 * @module apiClient
 * @requires API_CONFIG - Configuration settings for the API client
 * @requires ApiError - Custom error type for API errors
 *
 */
import { API_CONFIG } from '@/config/api.config'
import { ApiError } from '@/types/movies'

class ApiClient {
  // Handles the response from the API and throws an error if the response is not ok
  private async handleResponse(response: Response) {
    if (!response.ok) {
      const error: ApiError = new Error(response.statusText)
      error.status = response.status
      throw error
    }
    return response.json()
  }

  // Fetches data from the API
  async fetch(endpoint: string, options: RequestInit = {}) {
    // Create a new AbortController instance to handle request cancellation
    const controller = new AbortController()
    // Set a timeout to abort the request if it takes too long
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT)

    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          Authorization: API_CONFIG.AUTH_TOKEN,
          ...options.headers,
        },
      })

      clearTimeout(timeoutId)
      return this.handleResponse(response)
    } catch (error) {
      clearTimeout(timeoutId)
      throw error
    }
  }
}

export const apiClient = new ApiClient()
