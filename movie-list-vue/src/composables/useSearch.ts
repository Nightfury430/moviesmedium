import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMovieStore } from '@/stores/movies'

/**
 * Composable for handling search functionality
 * @module useSearch
 * @requires ref, computed, useRoute, useRouter, useMovieStore - Pinia stores
 */
export function useSearch() {
  const searchQuery = ref('')
  const route = useRoute()
  const router = useRouter()
  const movieStore = useMovieStore()
  let debounceTimeout: NodeJS.Timeout

  const loading = computed(() => movieStore.loading)
  const isSearchActive = computed(() => movieStore.isSearchActive)
  const hasMovies = computed(
    () => Object.keys(movieStore.categories).length > 0,
  )

  // Handles the search functionality
  const handleSearch = async (query: string) => {
    if (query.trim()) {
      await movieStore.searchMovies(query)
      router.replace({ query: { q: query } })
    } else {
      await movieStore.fetchMovies()
      router.replace({ query: {} })
    }
  }

  // Debounces the search functionality
  const debounceSearch = (query: string) => {
    clearTimeout(debounceTimeout)
    debounceTimeout = setTimeout(() => {
      handleSearch(query)
    }, 300)
  }

  // Initializes the search functionality
  const initializeSearch = () => {
    const searchQuery = route.query.q as string
    if (searchQuery) {
      handleSearch(searchQuery)
    } else {
      movieStore.fetchMovies()
    }
  }

  return {
    searchQuery,
    loading,
    isSearchActive,
    hasMovies,
    handleSearch,
    debounceSearch,
    initializeSearch,
  }
}
