/**
 * API configuration settings for the movie service
 * @property {string} BASE_URL - Base URL for the movie API, defaults to wookie.codesubmit.io
 * @property {string} AUTH_TOKEN - Authentication token for API requests, defaults to Bearer Wookie2021
 * @property {number} TIMEOUT - Request timeout in milliseconds
 * @property {number} RETRY_ATTEMPTS - Number of retry attempts for failed requests
 */
export const API_CONFIG = {
  BASE_URL:
    import.meta.env.VITE_API_BASE_URL || 'https://wookie.codesubmit.io/movies',
  AUTH_TOKEN: import.meta.env.VITE_API_AUTH_TOKEN || 'Bearer Wookie2021',
  TIMEOUT: 5000,
  RETRY_ATTEMPTS: 3,
}
