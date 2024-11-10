/**
 * Movie store for managing movie data and state
 * @module movieStore
 * @requires defineStore - Pinia store definition
 * @requires movieService - Movie service for fetching data
 * @requires Movie, ApiError - Movie and API error types
 */
import { defineStore } from 'pinia'
import { movieService } from '@/services'
import { Movie, ApiError } from '@/types/movies'

interface MovieState {
  movies: Movie[]
  loading: boolean
  error: ApiError | null
  categories: Record<string, Movie[]>
  isSearchActive: boolean
}

// Define the movie store
export const useMovieStore = defineStore('movies', {
  state: (): MovieState => ({
    movies: [],
    loading: false,
    error: null,
    categories: {},
    isSearchActive: false,
  }),

  actions: {
    // Fetches all movies from the API
    async fetchMovies() {
      this.loading = true
      this.isSearchActive = false
      try {
        const data = await movieService.getMovies()
        this.movies = data.movies
        this.loadBookmarks()
        this.groupByCategories()
      } catch (err) {
        this.error =
          err instanceof Error
            ? {
                name: 'ApiError',
                message: err.message,
                status: (err as ApiError).status,
              }
            : { name: 'ApiError', message: 'An unknown error occurred' }
      } finally {
        this.loading = false
      }
    },

    // Searches for movies by a given term
    async searchMovies(term: string) {
      this.loading = true
      this.isSearchActive = true
      try {
        const data = await movieService.searchMovies(term)
        this.movies = data.movies
        this.groupByCategories()
      } catch (err) {
        this.error =
          err instanceof Error
            ? {
                name: 'ApiError',
                message: err.message,
                status: (err as ApiError).status,
              }
            : { name: 'ApiError', message: 'An unknown error occurred' }
      } finally {
        this.loading = false
      }
    },

    // Groups movies by categories
    groupByCategories() {
      this.categories = this.movies.reduce<Record<string, Movie[]>>(
        (acc, movie) => {
          movie.genres.forEach((genre) => {
            acc[genre] = [...(acc[genre] || []), movie]
          })
          return acc
        },
        {},
      )
      this.categories['Bookmarked Movies'] = this.movies.filter(movie => movie.bookmarked)
    },

    toggleBookmark(movieId: string) {
      const movie = this.movies.find(m => m.id === movieId)
      if (movie) {
        movie.bookmarked = !movie.bookmarked
        this.saveBookmarks()
        this.groupByCategories()
        this.updateBookmarkedMovies()
      }
    },

    saveBookmarks() {
      const bookmarkedIds = this.movies
        .filter(movie => movie.bookmarked)
        .map(movie => movie.id);
      localStorage.setItem('bookmarkedMovies', JSON.stringify(bookmarkedIds));
    },

    loadBookmarks() {
      const bookmarkedIds = JSON.parse(localStorage.getItem('bookmarkedMovies') || '[]')
      this.movies.forEach(movie => {
        movie.bookmarked = bookmarkedIds.includes(movie.id)
      })
      this.updateBookmarkedMovies()
    },

    updateBookmarkedMovies() {
      this.groupByCategories()
    },
  },

  getters: {
    // Checks if there are any movies
    hasMovies: (state) => state.movies.length > 0,
  },
})
