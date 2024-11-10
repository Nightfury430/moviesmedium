import { MovieResponse } from '@/types/movies'
import { apiClient } from './apiClient'

class MovieService {
  // Fetches all movies from the API
  async getMovies(): Promise<MovieResponse> {
    return apiClient.fetch('')
  }

  // Searches for movies by a given term
  async searchMovies(term: string): Promise<MovieResponse> {
    return apiClient.fetch(`?q=${encodeURIComponent(term)}`)
  }
}

export const movieService = new MovieService()
