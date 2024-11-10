import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useMovieStore } from '@/stores/movies'

/**
 * Composable for handling movie detail functionality
 * @module useMovieDetail
 * @requires useRoute, useMovieStore - Pinia stores
 */
export function useMovieDetail() {
  const route = useRoute()
  const movieStore = useMovieStore()

  // Fetches movies when the composable is mounted
  onMounted(async () => {
    if (!movieStore.movies.length) {
      await movieStore.fetchMovies()
    }
  })

  // Finds the movie by ID
  const movie = computed(() =>
    movieStore.movies.find((m) => m.id === route.params.id),
  )

  // Computed properties for loading and error states
  const loading = computed(() => movieStore.loading)
  const error = computed(() => movieStore.error)

  // Gets the year from a date string
  const getYear = (date: string) => {
    return new Date(date).getFullYear()
  }

  const mockReturnValueOnce = () => {
    return {
      movie,
      loading,
      error,
      getYear,
    }
  }

  return {
    movie,
    loading,
    error,
    getYear,
    mockReturnValueOnce,
  }
}
